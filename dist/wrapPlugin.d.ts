import { Plugin, Rule } from 'postcss';
import { IOptions } from './types';
export declare class WrapPlugin implements Plugin {
    postcssPlugin: string;
    private wrapSelectors;
    private handleRootTags;
    constructor(options: IOptions);
    Rule: (cssRule: Rule) => void;
    _checkIncludeCssRule(cssRule: Rule): boolean;
    _checkIsCssRuleKeyframes({ parent }: Rule): boolean;
    _isRootTag(selector: string): boolean;
    _addWrapToRootSelector(selector: string): string;
    _addWrapToSelector(selector: string): string;
    _wrapCSSSelector(selector: string): string | null;
    _wrapCssRuleSelector(cssRuleSelector: string): string;
}
