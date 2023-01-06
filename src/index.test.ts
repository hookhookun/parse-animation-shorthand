import * as assert from 'assert';
import {parse} from './index';

const test = (
    input: string,
    expected: ReturnType<typeof parse>,
): void => {
    console.info(input);
    assert.deepEqual(parse(input), expected);
};

test(
    'play1 .8s steps(10) infinite, play2 .8s steps(10) infinite',
    [
        {
            duration: 800,
            delay: 'unset',
            timingFunction: {
                direction: 'end',
                stepCount: 10,
                type: 'steps',
            },
            iterationCount: 'infinite',
            direction: 'unset',
            fillMode: 'unset',
            playState: 'unset',
            name: 'play1',
        },
        {
            duration: 800,
            delay: 'unset',
            timingFunction: {
                direction: 'end',
                stepCount: 10,
                type: 'steps',
            },
            iterationCount: 'infinite',
            direction: 'unset',
            fillMode: 'unset',
            playState: 'unset',
            name: 'play2',
        },
    ],
);
