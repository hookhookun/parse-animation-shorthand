import ava from 'ava';
import {parseSingleAnimationShorthand} from './parseSingleAnimationShorthand';
import {CSSAnimation} from './type';
import {fillAnimation} from './fillAnimation';

const test = (
    input: string,
    expected: null | Partial<CSSAnimation> & {name: string},
): void => {
    ava(`${input} -> ${expected ? JSON.stringify(expected) : 'Error'}`, (t) => {
        if (expected) {
            t.deepEqual(parseSingleAnimationShorthand(input), fillAnimation(expected));
        } else {
            t.throws(() => parseSingleAnimationShorthand(input));
        }
    });
};

test('none', {name: 'none'});
test('3s MyAnimation', {
    name: 'MyAnimation',
    duration: 3000,
});
test('3s ease-in MyAnimation', {
    name: 'MyAnimation',
    duration: 3000,
    timingFunction: 'ease-in',
});
test('0.3s 100ms ease-in ease', {
    name: 'ease',
    duration: 300,
    delay: 100,
    timingFunction: 'ease-in',
});
test('100ms ease ease-in 0.3s', {
    name: 'ease-in',
    duration: 100,
    delay: 300,
    timingFunction: 'ease',
});
test('100ms 0.3s 0.3s MyAnimation', null);
