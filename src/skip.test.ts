import ava from 'ava';
import {skip} from './skip';
import {CodePointTest} from './type';
import {isWhiteSpace} from './character';

const test = (
    input: string,
    start: number,
    codePointTest: CodePointTest,
    expected: string | number,
): void => {
    ava(`${input} ${start} ${codePointTest.name} -> ${expected ? JSON.stringify(expected) : 'Error'}`, (t) => {
        if (typeof expected === 'string') {
            t.throws(() => skip(input, start, codePointTest), {code: expected});
        } else {
            t.deepEqual(skip(input, start, codePointTest), expected);
        }
    });
};

test('   a', 0, isWhiteSpace, 3);
const isPair: CodePointTest = (codePoint?: number): codePoint is number => {
    return typeof codePoint === 'number' && 0xFFFF < codePoint;
};
test('🍎🍎🍎a', 0, isPair, 6);
