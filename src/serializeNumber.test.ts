import * as assert from 'assert';
import {serializeNumber} from './serializeNumber';

const test = (input: number, expected: string): void => {
    console.info(`${input} -> ${expected}`);
    assert.equal(serializeNumber(input), expected);
};

test(0, '0');
test(1, '1');
test(1.1, '1.1');
test(0.010, '.01');
