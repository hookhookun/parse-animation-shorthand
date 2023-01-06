import * as assert from 'assert';
import {shortest} from './shortest';

const test = (expected: string, ...input: Array<string>): void => {
    console.info(`${JSON.stringify(input)} -> ${expected}`);
    assert.equal(shortest(...input), expected);
};

test('a', 'a', 'b', 'c', 'd');
test('b', 'aa', 'b', 'c', 'd');
test('c', 'aa', 'bb', 'c', 'd');
test('d', 'aa', 'bb', 'cc', 'd');
test('aa', 'aa', 'bb', 'cc', 'dd');
