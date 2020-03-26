import ava from 'ava';
import {serializeNumber} from './serializeNumber';

const test = (input: number, expected: string): void => {
    ava(`${input} -> ${expected}`, (t) => {
        t.is(serializeNumber(input), expected);
    });
};

test(0, '0');
test(1, '1');
test(1.1, '1.1');
test(0.010, '.01');
