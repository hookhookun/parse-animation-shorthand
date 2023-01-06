import * as assert from 'assert';
import {parseAnimationShorthand} from './parseAnimationShorthand';
import {CSSAnimation} from './type';

const test = (
    input: string,
    expected: Array<CSSAnimation>,
): void => {
    console.info(input);
    assert.deepEqual([...parseAnimationShorthand(input)], expected);
};

test(
    '3s ease-in SlideIn, .2s .1s ease forwards FadeIn',
    [
        {
            name: 'SlideIn',
            duration: 3000,
            delay: 'unset',
            timingFunction: 'ease-in',
            iterationCount: 'unset',
            direction: 'unset',
            fillMode: 'unset',
            playState: 'unset',
        },
        {
            name: 'FadeIn',
            duration: 200,
            delay: 100,
            timingFunction: 'ease',
            iterationCount: 'unset',
            direction: 'unset',
            fillMode: 'forwards',
            playState: 'unset',
        },
    ] as Array<CSSAnimation>,
);

test(
    '3s ease-in 1s infinite reverse both running slideIn, .5s linear 1s 3 alternate slideIn',
    [
        {
            name: 'slideIn',
            duration: 3000,
            delay: 1000,
            timingFunction: 'ease-in',
            iterationCount: 'infinite',
            direction: 'reverse',
            fillMode: 'both',
            playState: 'running',
        },
        {
            name: 'slideIn',
            duration: 500,
            delay: 1000,
            timingFunction: 'linear',
            iterationCount: 3,
            direction: 'alternate',
            fillMode: 'unset',
            playState: 'unset',
        },
    ] as Array<CSSAnimation>,
);

test(
    '3s ease-in ease-out',
    [
        {
            name: 'ease-out',
            duration: 3000,
            delay: 'unset',
            timingFunction: 'ease-in',
            iterationCount: 'unset',
            direction: 'unset',
            fillMode: 'unset',
            playState: 'unset',
        },
    ] as Array<CSSAnimation>,
);
