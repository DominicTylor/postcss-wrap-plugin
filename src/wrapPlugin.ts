import { Plugin, Rule } from 'postcss';
import { IHandleRootTags, IOptions, isAtRule } from './types';

const checkParameters = ({ wrapSelector, handleRootTags }: IOptions): void => {
    if (typeof wrapSelector !== 'string' && !Array.isArray(wrapSelector)) {
        throw new Error(
            'postcss-wrap-plugin: wrapSelector option should be of type a string or an array.',
        );
    }

    if (!wrapSelector.length) {
        throw new Error('postcss-wrap-plugin: empty wrapSelector option.');
    }

    if (handleRootTags && typeof handleRootTags !== 'string') {
        throw new Error(
            'postcss-wrap-plugin: handleRootTags option incorrect type.',
        );
    }
};

const ROOT_TAG_REGEXP = /\b(html|body)\b/g;

export class WrapPlugin implements Plugin {
    public postcssPlugin = 'postcss-wrap-plugin';

    private wrapSelectors: string[];
    private handleRootTags: IHandleRootTags | null;

    constructor(options: IOptions) {
        checkParameters(options);

        const { wrapSelector, handleRootTags } = options;

        this.wrapSelectors = Array.isArray(wrapSelector)
            ? wrapSelector
            : [wrapSelector];
        this.handleRootTags = handleRootTags || null;
    }

    public Rule = (cssRule: Rule): void => {
        if (this._checkIncludeCssRule(cssRule)) {
            cssRule.selector = this._wrapCssRuleSelector(cssRule.selector);
        }
    };

    _checkIncludeCssRule(cssRule: Rule): boolean {
        // Do not prefix keyframes rules.
        if (this._checkIsCssRuleKeyframes(cssRule)) {
            return false;
        }

        return true;
    }

    _checkIsCssRuleKeyframes({ parent }: Rule): boolean {
        if (parent && isAtRule(parent)) {
            return parent.name.includes('keyframes');
        }

        return false;
    }

    _isRootTag(selector: string): boolean {
        ROOT_TAG_REGEXP.lastIndex = 0;

        return ROOT_TAG_REGEXP.test(selector);
    }

    _addWrapToRootSelector(selector: string): string {
        return this.wrapSelectors
            .map((wrapSelector: string) => {
                if (this.handleRootTags === IHandleRootTags['remove']) {
                    return wrapSelector + selector.replace(ROOT_TAG_REGEXP, '');
                }

                if (this.handleRootTags === IHandleRootTags['replace']) {
                    return `${wrapSelector}.${selector}`;
                }

                throw new Error(
                    'postcss-wrap-plugin: incorrect value for handleRootTags options',
                );
            })
            .join(', ');
    }

    _addWrapToSelector(selector: string): string {
        return this.wrapSelectors
            .map((wrapSelector: string) => `${wrapSelector} ${selector}`)
            .join(', ');
    }

    _wrapCSSSelector(selector: string): string | null {
        if (selector === '') {
            return null;
        }

        if (this._isRootTag(selector) && this.handleRootTags) {
            return this._addWrapToRootSelector(selector);
        }

        return this._addWrapToSelector(selector);
    }

    _wrapCssRuleSelector(cssRuleSelector: string): string {
        return cssRuleSelector
            .split(',')
            .map((selector: string) => this._wrapCSSSelector(selector.trim()))
            .filter((cssSelector: string | null) => cssSelector)
            .join(', ');
    }
}
