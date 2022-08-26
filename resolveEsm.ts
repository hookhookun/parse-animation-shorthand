import * as path from 'path';
import * as fs from 'fs/promises';
import * as ts from 'typescript';

const listEsmFiles = async function* () {
    const directory = path.join(__dirname, 'esm');
    for (const filename of await fs.readdir(directory)) {
        yield path.join(directory, filename);
    }
}

const walkNodes = function* (node: ts.Node, source: ts.SourceFile): Generator<ts.Node> {
    yield node;
    for (const child of node.getChildren(source)) {
        yield* walkNodes(child, source);
    }
};

const getImportOrExportSpecifier = (node: ts.Node) => {
    if (ts.isImportDeclaration(node)) {
        const {moduleSpecifier} = node;
        if (ts.isStringLiteral(moduleSpecifier)) {
            return moduleSpecifier;
        }
    }
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        const [argument] = node.arguments;
        if (ts.isStringLiteral(argument)) {
            return argument;
        }
    }
    if (ts.isExportDeclaration(node)) {
        const {moduleSpecifier} = node;
        if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier)) {
            return moduleSpecifier;
        }
    }
    if (ts.isImportTypeNode(node)) {
        const {argument} = node;
        if (ts.isLiteralTypeNode(argument)) {
            const {literal} = argument;
            if (ts.isStringLiteral(literal)) {
                return literal;
            }
        }
    }
    return null;
};

const resolve = async () => {
    const renames = new Map<string, string>();
    for await (const file of listEsmFiles()) {
        const renamed = file.replace(/\.([jt]s)$/, '.m$1');
        if (file !== renamed) {
            renames.set(file, renamed);
        }
    }
    for await (const [file, renamed] of renames) {
        let code = await fs.readFile(file, 'utf8');
        const source = ts.createSourceFile(file, code, ts.ScriptTarget.ESNext);
        const directory = path.dirname(file);
        const mutations: Array<{from: number, to: number, text: string}> = [];
        for (const node of walkNodes(source, source)) {
            const moduleSpecifier = getImportOrExportSpecifier(node);
            if (moduleSpecifier) {
                const specifier = moduleSpecifier.text;
                if (specifier.startsWith('.')) {
                    const absolutePath = path.join(directory, specifier);
                    const resolved = require.resolve(absolutePath);
                    const renamed = renames.get(resolved);
                    if (!renamed) {
                        throw new Error(`NoRename: ${resolved}`);
                    }
                    const from = moduleSpecifier.getStart(source);
                    const to = moduleSpecifier.getEnd();
                    let text = path.relative(directory, renamed);
                    if (!text.startsWith('.')) {
                        text = `./${text}`;
                    }
                    text = `'${text}'`;
                    mutations.push({from, to, text});
                }
            }
        }
        for (let i = mutations.length; i--;) {
            const {from, to, text} = mutations[i];
            code = `${code.slice(0, from)}${text}${code.slice(to)}`;
        }
        await fs.writeFile(renamed, code);
    }
    for await (const [file] of renames) {
        await fs.unlink(file);
    }
};

resolve().catch((error) => {
    console.error(error);
    process.exit(1);
});
