import ava from 'ava';
import {getCustomIdent} from './getCustomIdent';

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
            t.deepEqual(getCustomIdent(input, start), expected);
        } else {
            t.throws(() => getCustomIdent(input, start));
        }
    });
};

test('"xyz"', 0, null);
test('xyz', 0, {start: 0, end: 3, value: 'xyz'});
test('-xyz', 0, {start: 0, end: 4, value: '-xyz'});
test('--xyz', 0, {start: 0, end: 5, value: '--xyz'});
test('_xyz', 0, {start: 0, end: 4, value: '_xyz'});
test('_xyz\\?', 0, {start: 0, end: 6, value: '_xyz?'});
test('_xyz\\3F', 0, {start: 0, end: 7, value: '_xyz?'});
test('_xyz\\3f', 0, {start: 0, end: 7, value: '_xyz?'});
