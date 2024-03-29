import * as assert from 'assert';
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
    console.info(`${input} ${start} -> ${expected ? JSON.stringify(expected) : 'Error'}`);
    if (expected) {
        assert.deepEqual(getCustomIdent(input, start), expected);
    } else {
        assert.throws(() => getCustomIdent(input, start));
    }
};

test('"xyz"', 0, null);
test('xyz', 0, {start: 0, end: 3, value: 'xyz'});
test('-xyz', 0, {start: 0, end: 4, value: '-xyz'});
test('--xyz', 0, {start: 0, end: 5, value: '--xyz'});
test('_xyz', 0, {start: 0, end: 4, value: '_xyz'});
test('_xyz\\?', 0, {start: 0, end: 6, value: '_xyz?'});
test('_xyz\\3F', 0, {start: 0, end: 7, value: '_xyz?'});
test('_xyz\\3f', 0, {start: 0, end: 7, value: '_xyz?'});
