import {
    CSSAnimation,
    Unset as UnsetType,
} from './type';
export const Unset: UnsetType = 'unset';
export const fillAnimation = (patch: Partial<CSSAnimation> & {name: string}): CSSAnimation => Object.assign(
    {
        duration: Unset,
        delay: Unset,
        timingFunction: Unset,
        iterationCount: Unset,
        direction: Unset,
        fillMode: Unset,
        playState: Unset,
        name: patch.name,
    },
    patch,
);
