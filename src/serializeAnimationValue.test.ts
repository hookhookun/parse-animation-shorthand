import * as assert from 'assert';
import {serializeAnimationValue} from './serializeAnimationValue';
import {CSSAnimation} from './type';

const test = <Key extends keyof CSSAnimation>(
    key: Key,
    value: CSSAnimation[Key],
    expected: string,
): void => {
    console.info(`${key}: ${value} -> ${expected}`);
    assert.equal(serializeAnimationValue(key, value), expected);
};

test('name', 'foo', 'foo');
test('duration', 1, '1ms');
test('duration', 10, '10ms');
test('duration', 100, '.1s');
test('duration', 1000, '1s');
test('delay', 1, '1ms');
test('delay', 10, '10ms');
test('delay', 100, '.1s');
test('delay', 1000, '1s');
test('iterationCount', 10, '10');
test('iterationCount', 'unset', '');
test('timingFunction', 'ease-in', 'ease-in');
test(
    'timingFunction',
    {type: 'steps', stepCount: 3, direction: 'jump-both'},
    'steps(3,jump-both)',
);
test(
    'timingFunction',
    {type: 'cubic-bezier', value: [0.01, 0.1, 0.7, 1.0]},
    'cubic-bezier(.01,.1,.7,1)',
);
