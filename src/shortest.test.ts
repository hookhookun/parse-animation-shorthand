import ava from 'ava';
import {shortest} from './shortest';

const test = (expected: string, ...input: Array<string>): void => {
    ava(`${JSON.stringify(input)} -> ${expected}`, (t) => {
        t.is(shortest(...input), expected);
    });
};

test('a', 'a', 'b', 'c', 'd');
test('b', 'aa', 'b', 'c', 'd');
test('c', 'aa', 'bb', 'c', 'd');
test('d', 'aa', 'bb', 'cc', 'd');
test('aa', 'aa', 'bb', 'cc', 'dd');
