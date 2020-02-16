import { Rule } from 'postcss';
import { IHandleRootTags, IOptions } from './types';
export declare class WrapPlugin {
    wrapSelectors: string[];
    handleRootTags: IHandleRootTags | null;
    constructor(options: IOptions);
    checkIsCssRuleKeyframes(cssRule: Rule): boolean;
    isRootTag(selector: string): boolean;
    addWrapToRootSelector(selector: string): string;
    addWrapToSelector(selector: string): string;
    wrapCSSSelector(selector: string): string | null;
    wrapCssRuleSelector(cssRuleSelector: string): string;
    checkIncludeCssRule(cssRule: Rule): boolean;
    runWrap(): (css: Rule) => boolean | void;
}
