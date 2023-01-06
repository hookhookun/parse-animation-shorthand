import * as assert from 'assert';
import {skip} from './skip';
import {CodePointTest} from './type';
import {isWhiteSpace} from './character';

const test = (
    input: string,
    start: number,
    codePointTest: CodePointTest,
    expected: string | number,
): void => {
    console.info(`${input} ${start} ${codePointTest.name} -> ${expected ? JSON.stringify(expected) : 'Error'}`);
    if (typeof expected === 'string') {
        assert.throws(() => skip(input, start, codePointTest), {code: expected});
    } else {
        assert.deepEqual(skip(input, start, codePointTest), expected);
    }
};

test('   a', 0, isWhiteSpace, 3);
const isPair: CodePointTest = (codePoint?: number): codePoint is number => {
    return typeof codePoint === 'number' && 0xFFFF < codePoint;
};
test('🍎🍎🍎a', 0, isPair, 6);
