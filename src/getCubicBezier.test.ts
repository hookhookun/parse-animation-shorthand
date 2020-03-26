import ava from 'ava';
import {getCubicBezier} from './getCubicBezier';

const test = (
    input: string,
    start: number,
    expected: null | {
        start: number,
        end: number,
        value: [number, number, number, number],
    },
): void => {
    ava(`${input} ${start} -> ${expected ? JSON.stringify(expected) : 'Error'}`, (t) => {
        if (expected) {
            t.deepEqual(getCubicBezier(input, start), {
                start: expected.start,
                end: expected.end,
                value: {
                    type: 'cubic-bezier',
                    value: expected.value,
                },
            });
        } else {
            t.throws(() => getCubicBezier(input, start));
        }
    });
};

test('(0,0,1,1)', 0, {start: 0, end: 9, value: [0, 0, 1, 1]});
test('( 0.1 , 0.2 , 0.3 , 0.4 )', 0, {start: 0, end: 25, value: [0.1, 0.2, 0.3, 0.4]});
test('( 0.1 , 0.2 , 0.3 , 0.4 ', 0, null);
test(' 0.1 , 0.2 , 0.3 , 0.4 )', 0, null);
