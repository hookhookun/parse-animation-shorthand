import {CSSAnimation} from './type';
import {parseSingleAnimationShorthand} from './parseSingleAnimationShorthand';
import {isWhiteSpace, Comma} from './character';
import {skip} from './skip';

export const parseAnimationShorthand = (
    input: string,
): Array<CSSAnimation> => {
    const list: Array<CSSAnimation> = [];
    let start = 0;
    while (start < input.length) {
        const result = parseSingleAnimationShorthand(input, start);
        list.push(result.value);
        start = result.end;
        start = skip(input, start, isWhiteSpace);
        if (input.codePointAt(start) === Comma) {
            start = skip(input, start + 1, isWhiteSpace);
        } else {
            break;
        }
    }
    return list;
};
