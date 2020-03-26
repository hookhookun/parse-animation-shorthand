import ava from 'ava';
import {serializeAnimation} from './serializeAnimation';
import {CSSAnimation} from './type';

const test = (
    input: Partial<CSSAnimation> & {name: string},
    expected: string,
): void => {
    ava(`${JSON.stringify(input)} -> ${expected}`, (t) => {
        t.is(serializeAnimation(input), expected);
    });
};

test(
    {name: 'abc'},
    'abc',
);
test(
    {
        name: 'abc',
        duration: 200,
        timingFunction: 'ease-in-out',
    },
    '.2s ease-in-out abc',
);
test(
    {
        name: 'abc',
        duration: 200,
        delay: 50,
        iterationCount: 'infinite',
        timingFunction: 'ease-in-out',
        playState: 'running',
        fillMode: 'forwards',
    },
    '.2s 50ms ease-in-out infinite forwards running abc',
);
