import * as assert from 'assert';
import {getString} from './getString';

const test = (
    input: string,
    start: number,
    expected: string | {
        start: number,
        end: number,
        value: string,
    },
): void => {
    console.info(`${input} ${start} -> ${expected ? JSON.stringify(expected) : 'Error'}`);
    if (typeof expected === 'string') {
        assert.throws(() => getString(input, start), {code: expected});
    } else {
        assert.deepEqual(getString(input, start), expected);
    }
};

test('"abc"', 0, {start: 0, end: 5, value: 'abc'});
test('abc', 0, 'InvalidQuote');
test('"abc', 0, 'UnterminatedString');
test('"abc\\"def"', 0, {start: 0, end: 10, value: 'abc"def'});
test('\'abc\'', 0, {start: 0, end: 5, value: 'abc'});
test('\'abc', 0, 'UnterminatedString');
test('\'abc\\"def\'', 0, {start: 0, end: 10, value: 'abc"def'});
