import {CSSAnimation} from './type';
import {parseSingleAnimationShorthand} from './parseSingleAnimationShorthand';

export const parseAnimationShorthand = (
    input: string,
): Array<CSSAnimation> => input.split(',').map(parseSingleAnimationShorthand);
