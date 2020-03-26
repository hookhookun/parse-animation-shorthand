import {CodePointTest} from './type';

export const skip = (
    input: string,
    start: number,
    test: CodePointTest,
): number => {
    let end = start;
    const inputLength = input.length;
    while (end <= inputLength && test(input.charCodeAt(end))) {
        end += 1;
    }
    return end;
};
