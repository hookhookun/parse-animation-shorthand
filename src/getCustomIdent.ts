import {
    isIdentCharacter,
    Backslash,
    isHexCharacter,
} from './character';
import {skip} from './skip';
import {$Error as Error} from './Error';

export const getCustomIdent = (
    input: string,
    start: number,
): {start: number, end: number, value: string} => {
    let end = start;
    const fragments: Array<string> = [];
    while (1) {
        const fragmentStart = end;
        end = skip(input, end, isIdentCharacter);
        fragments.push(input.slice(fragmentStart, end));
        if (input.charCodeAt(end) === Backslash) {
            end += 1;
            const hexEnd = skip(input, end, isHexCharacter);
            if (end < hexEnd) {
                const cp = Number.parseInt(input.slice(end, hexEnd), 16);
                fragments.push(String.fromCodePoint(cp));
                end = hexEnd;
            } else {
                fragments.push(input.charAt(end));
                end += 1;
            }
        } else {
            break;
        }
    }
    const value = fragments.join('');
    if (value) {
        return {start, end, value};
    }
    throw new Error('NoIdent', [input.slice(0, start), input.slice(start)].join('→'));
};
