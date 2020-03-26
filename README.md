# @hookun/parse-animation-shorthand

A parser for [The animation shorthand CSS property](https://developer.mozilla.org/docs/Web/CSS/animation).

## Install

```
npm install @hookun/parse-animation-shorthand
```

## parse(value: string)

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

## serialize(value: CSSAnimation)

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

## License

[Apache License, Version 2.0](LICENSE.txt)
