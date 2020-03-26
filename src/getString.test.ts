import ava from 'ava';
import {getString} from './getString';

const test = (
    input: string,
    start: number,
    expected: null | {
        start: number,
        end: number,
        value: string,
    },
): void => {
    ava(`${input} ${start} -> ${expected ? JSON.stringify(expected) : 'Error'}`, (t) => {
        if (expected) {
            t.deepEqual(getString(input, start), expected);
        } else {
            t.throws(() => getString(input, start));
        }
    });
};

test('"abc"', 0, {start: 0, end: 5, value: 'abc'});
test('"abc', 0, null);
test('"abc\\"def"', 0, {start: 0, end: 10, value: 'abc"def'});
test('\'abc\'', 0, {start: 0, end: 5, value: 'abc'});
test('\'abc', 0, null);
test('\'abc\\"def\'', 0, {start: 0, end: 10, value: 'abc"def'});
