# @hookun/parse-animation-shorthand

[![codecov](https://codecov.io/gh/hookhookun/parse-animation-shorthand/branch/master/graph/badge.svg?token=QSujt7t9AA)](https://codecov.io/gh/hookhookun/parse-animation-shorthand)
![Test](https://github.com/hookun/parse-animation-shorthand/workflows/Test/badge.svg)

A parser for [The animation shorthand CSS property](https://developer.mozilla.org/docs/Web/CSS/animation).

## Install

```
npm install @hookun/parse-animation-shorthand
```

## API

### parse(*value*: `string`) → <code>Array<[*CSSAnimation*](#whats-the-cssanimation)></code>

```javascript
import {parse} from '@hookun/parse-animation-shorthand';
const result = parse('3s ease-in SlideIn, .2s .1s ease FadeIn');
const expectedResult = [
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
];
```

### serialize(*value*: *<code>[CSSAnimation](#whats-the-cssanimation)</code>*) → `string`

```javascript
import {serialize} from '@hookun/parse-animation-shorthand';
const result = serialize({
    name: 'SlideIn',
    duration: 3000,
    delay: 'unset',
    timingFunction: 'ease-in',
    iterationCount: 'unset',
    direction: 'unset',
    fillMode: 'unset',
    playState: 'unset',
});
const expectedResult = '3s ease-in SlideIn';
```

### What's the *`CSSAnimation`*?

```typescript
interface CSSAnimation {
    name: string
    duration: number | Unset
    timingFunction: CSSTimingFunction | Unset
    delay: number | Unset
    iterationCount: number | 'infinite' | Unset
    direction: CSSAnimationDirection | Unset
    fillMode: CSSAnimationFillMode | Unset
    playState: CSSAnimationPlayState | Unset
}

type Unset = 'unset'

type CSSTimingFunction =
| CSSTimingFunctionKeyword
| CSSCubicBezier
| CSSSteps

type CSSTimingFunctionKeyword =
| 'ease'
| 'ease-in'
| 'ease-out'
| 'ease-in-out'
| 'linear'
| 'step-start'
| 'step-end'

interface CSSCubicBezier {
    type: 'cubic-bezier'
    value: [number, number, number, number]
}

interface CSSSteps {
    type: 'steps'
    stepCount: number
    direction: CSSStepDirection
}

type CSSStepDirection =
| 'jump-start'
| 'jump-end'
| 'jump-none'
| 'jump-both'
| 'start'
| 'end'

type CSSAnimationDirection =
| 'normal'
| 'reverse'
| 'alternate'
| 'alternate-reverse';

type CSSAnimationFillMode =
| 'none'
| 'forwards'
| 'backwards'
| 'both'

type CSSAnimationPlayState =
| 'paused'
| 'running'
```

## License

[Apache License, Version 2.0](LICENSE.txt)
