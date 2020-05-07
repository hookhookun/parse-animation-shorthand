import ava from 'ava';
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
    ava(`${input} ${start} -> ${expected ? JSON.stringify(expected) : 'Error'}`, (t) => {
        if (typeof expected === 'string') {
            t.throws(() => getString(input, start), {code: expected});
        } else {
            t.deepEqual(getString(input, start), expected);
        }
    });
};

test('"abc"', 0, {start: 0, end: 5, value: 'abc'});
test('abc', 0, 'InvalidQuote');
test('"abc', 0, 'UnterminatedString');
test('"abc\\"def"', 0, {start: 0, end: 10, value: 'abc"def'});
test('\'abc\'', 0, {start: 0, end: 5, value: 'abc'});
test('\'abc', 0, 'UnterminatedString');
test('\'abc\\"def\'', 0, {start: 0, end: 10, value: 'abc"def'});
