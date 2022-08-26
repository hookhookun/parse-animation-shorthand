import ava from 'ava';
import {getNumber} from './getNumber';

const test = (
    input: string,
    start: number,
    expected: null | {
        start: number,
        end: number,
        value: number,
    },
): void => {
    ava(`${input} ${start} -> ${expected ? JSON.stringify(expected) : 'Error'}`, (t) => {
        if (expected) {
            t.deepEqual(getNumber(input, start), expected);
        } else {
            t.throws(() => getNumber(input, start));
        }
    });
};

test('12.34', 0, {start: 0, end: 5, value: 12.34});
test('-12.34', 0, {start: 0, end: 6, value: -12.34});
test('0.123', 0, {start: 0, end: 5, value: 0.123});
test('.123', 0, {start: 0, end: 4, value: 0.123});
test('0.0.123', 0, null);
test('00.123', 0, null);
