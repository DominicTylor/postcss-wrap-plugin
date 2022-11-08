import { Plugin, Rule } from 'postcss';
import { IOptions } from './types';
export declare class WrapPlugin implements Plugin {
    postcssPlugin: string;
    private wrapSelectors;
    private handleRootTags;
    constructor(options: IOptions);
    Rule: (cssRule: Rule) => void;
    private checkIncludeCssRule;
    private checkIsCssRuleKeyframes;
    private isRootTag;
    private addWrapToRootSelector;
    private addWrapToSelector;
    private wrapCSSSelector;
    private wrapCssRuleSelector;
}
