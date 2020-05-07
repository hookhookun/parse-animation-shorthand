import {
    isWhiteSpace,
    Comma,
    CloseParenthesis,
    OpenParenthesis,
} from './character';
import {skip} from './skip';
import {getNumber} from './getNumber';
import {CSSCubicBezier} from './type';
import {$Error as Error} from './Error';

export const getCubicBezier = (
    input: string,
    start: number,
): {start: number, end: number, value: CSSCubicBezier} => {
    if (input.charCodeAt(start) !== OpenParenthesis) {
        throw new Error('NoOpenParenthesis');
    }
    const value: [number, number, number, number] = [0, 0, 0, 0];
    let end = start + 1;
    for (let index = 0; index < 4; index++) {
        end = skip(input, end, isWhiteSpace);
        if (0 < index) {
            if (input.charCodeAt(end) === Comma) {
                end = skip(input, end + 1, isWhiteSpace);
            } else {
                throw new Error('NoComma');
            }
        }
        const number = getNumber(input, end);
        value[index] = number.value;
        end = number.end;
    }
    end = skip(input, end, isWhiteSpace);
    if (input.charCodeAt(end) !== CloseParenthesis) {
        throw new Error('UnclosedParenthesis');
    }
    return {
        start,
        end: end + 1,
        value: {type: 'cubic-bezier', value},
    };
};
