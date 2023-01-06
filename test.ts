import * as fs from 'node:fs/promises';
import * as childProcess from 'node:child_process';
import {pathToFileURL, fileURLToPath} from 'node:url';

const rootDir = pathToFileURL(`${process.cwd()}/`);
const srcDir = new URL('./src/', rootDir);
const listTestFiles = async function* () {
    for (const file of await fs.readdir(srcDir)) {
        if (file.endsWith('.test.ts')) {
            yield new URL(file, srcDir);
        }
    }
};
const runTest = async (file: URL) => {
    const command = [
        'npx',
        'ts-node',
        fileURLToPath(file),
    ].join(' ');
    console.info('--------');
    console.info(command);
    childProcess.execSync(
        command,
        {
            cwd: fileURLToPath(rootDir),
            stdio: 'inherit',
        },
    );
};
const runAllTest = async () => {
    const errors = new Map<string, unknown>();
    for await (const file of listTestFiles()) {
        try {
            await runTest(file);
        } catch (error) {
            errors.set(fileURLToPath(file), error);
        }
    }
    if (0 < errors.size) {
        for (const [file, error] of errors) {
            console.error(file);
            console.error(error);
        }
        throw new Error(`Failed: ${errors.size}`);
    }
};

runAllTest().catch((error) => {
    console.error(error);
    process.exit(1);
});
