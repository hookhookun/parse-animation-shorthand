import * as assert from 'assert';
import {getSteps} from './getSteps';
import {CSSStepDirection} from './type';

const test = (
    input: string,
    start: number,
    expected: string | {
        start: number,
        end: number,
        count: number,
        direction: string,
    },
): void => {
    console.info(`${input} ${start} -> ${expected ? JSON.stringify(expected) : 'Error'}`);
    if (typeof expected === 'string') {
        assert.throws(() => getSteps(input, start), {code: expected});
    } else {
        assert.deepEqual(getSteps(input, start), {
            start: expected.start,
            end: expected.end,
            value: {
                type: 'steps',
                stepCount: expected.count,
                direction: expected.direction as CSSStepDirection,
            },
        });
    }
};

test('(2,jump-start)', 0, {start: 0, end: 14, count: 2, direction: 'jump-start'});
test('( 4 , jump-both )', 0, {start: 0, end: 17, count: 4, direction: 'jump-both'});
test('( 4 , jump-bo )', 0, 'UnknownStepDirection');
test('( 4 , jump-both ', 0, 'UnclosedParenthesis');
test(' 4 , jump-both )', 0, 'NoOpenParenthesis');
test('( 4 jump-both )', 0, 'UnclosedParenthesis');
test('( 10 )', 0, {start: 0, end: 6, count: 10, direction: 'end'});
