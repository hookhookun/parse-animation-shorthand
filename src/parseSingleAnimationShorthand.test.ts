import ava from 'ava';
import {parseSingleAnimationShorthand} from './parseSingleAnimationShorthand';
import {CSSAnimation} from './type';
import {fillAnimation} from './fillAnimation';

const test = (
    input: string,
    expected: string | Partial<CSSAnimation> & {name: string},
): void => {
    ava(`${input} -> ${expected ? JSON.stringify(expected) : 'Error'}`, (t) => {
        if (typeof expected === 'string') {
            t.throws(() => parseSingleAnimationShorthand(input), {code: expected});
        } else {
            t.deepEqual(parseSingleAnimationShorthand(input), fillAnimation(expected));
        }
    });
};

test('none', {name: 'none'});
test('3s MyAnimation', {
    name: 'MyAnimation',
    duration: 3000,
});
test('3s 3s', 'NoName');
test('3s ease-in MyAnimation', {
    name: 'MyAnimation',
    duration: 3000,
    timingFunction: 'ease-in',
});
test('0.3s 100ms ease-in "ease"', {
    name: 'ease',
    duration: 300,
    delay: 100,
    timingFunction: 'ease-in',
});
test('100ms ease \'ease-in\' 0.3s', {
    name: 'ease-in',
    duration: 100,
    delay: 300,
    timingFunction: 'ease',
});
test('100ms \'ease\' ease-in 0.3s', {
    name: 'ease',
    duration: 100,
    delay: 300,
    timingFunction: 'ease-in',
});
test('100ms \'ease\' \'ease-in\' 0.3s', 'UnexpectedValue');
test('100ms 0.3s 0.3s MyAnimation', 'UnexpectedValue');
test('100ms 0.3em MyAnimation', 'InvalidUnit');
test('3s cubic-bezier(0.3,0.4,0.5,0.6) cubic-bezier', {
    name: 'cubic-bezier',
    duration: 3000,
    timingFunction: {
        type: 'cubic-bezier',
        value: [0.3, 0.4, 0.5, 0.6],
    },
});
test('3s steps(4,jump-both) steps', {
    name: 'steps',
    duration: 3000,
    timingFunction: {
        type: 'steps',
        stepCount: 4,
        direction: 'jump-both',
    },
});
