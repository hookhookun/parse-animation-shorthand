export interface CodePointTest {
    (cp: number): boolean,
}

export type Unset = 'unset';

export interface CSSCubicBezier {
    type: 'cubic-bezier',
    value: [number, number, number, number],
}

export type CSSStepDirection =
| 'jump-start'
| 'jump-end'
| 'jump-none'
| 'jump-both'
| 'start'
| 'end';

export interface CSSSteps {
    type: 'steps',
    stepCount: number,
    direction: CSSStepDirection,
}

export type CSSTimingFunctionKeyword =
| 'ease'
| 'ease-in'
| 'ease-out'
| 'ease-in-out'
| 'linear'
| 'step-start'
| 'step-end';

export type CSSTimingFunction = CSSCubicBezier | CSSSteps | CSSTimingFunctionKeyword;

export type CSSAnimationDirection =
| 'normal'
| 'reverse'
| 'alternate'
| 'alternate-reverse';

export type CSSAnimationFillMode =
| 'none'
| 'forwards'
| 'backwards'
| 'both';

export type CSSAnimationPlayState =
| 'paused'
| 'running';

export interface CSSAnimation {
    name: string,
    duration: number | Unset,
    timingFunction: CSSTimingFunction | Unset,
    delay: number | Unset,
    iterationCount: number | 'infinite' | Unset,
    direction: CSSAnimationDirection | Unset,
    fillMode: CSSAnimationFillMode | Unset,
    playState: CSSAnimationPlayState | Unset,
}
