import {getNumber} from './getNumber';
import {getCustomIdent} from './getCustomIdent';
import {
    isWhiteSpace,
    Comma,
    CloseParenthesis,
    OpenParenthesis,
} from './character';
import {skip} from './skip';
import {StepDirection} from './keyword';
import {CSSSteps, CSSStepDirection} from './type';

export const getSteps = (
    input: string,
    start: number,
): {start: number, end: number, value: CSSSteps} => {
    if (input.charCodeAt(start) !== OpenParenthesis) {
        throw new Error('NoOpenParenthesis');
    }
    let end = skip(input, start + 1, isWhiteSpace);
    const count = getNumber(input, end);
    end = skip(input, count.end, isWhiteSpace);
    if (input.charCodeAt(end) !== Comma) {
        throw new Error('NoComma');
    }
    end = skip(input, end + 1, isWhiteSpace);
    const direction = getCustomIdent(input, end);
    if (!StepDirection.has(direction.value)) {
        throw new Error(`UnknownStepDirection: ${direction.value}`);
    }
    end = skip(input, direction.end, isWhiteSpace);
    if (input.charCodeAt(end) !== CloseParenthesis) {
        throw new Error('UnclosedParenthesis');
    }
    return {
        start,
        end: end + 1,
        value: {
            type: 'steps',
            stepCount: count.value,
            direction: direction.value as CSSStepDirection,
        },
    };
};
