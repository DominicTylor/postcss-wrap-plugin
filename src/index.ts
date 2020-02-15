import PostCSS, { Rule } from 'postcss';
import { IOptions, IWrapSelector } from './types';

const checkParameters = (
    wrapSelector: IWrapSelector,
    { isReplaceRootTags }: IOptions,
): void => {
    if (typeof wrapSelector !== 'string' || !Array.isArray(wrapSelector)) {
        throw new Error(
            'postcss-wrap-plugin: wrapSelector option should be of type a string or an array.',
        );
    }

    if (!wrapSelector.length) {
        throw new Error('postcss-wrap-plugin: empty wrapSelector option.');
    }

    if (typeof isReplaceRootTags !== 'boolean') {
        throw new Error(
            'postcss-wrap-plugin: isReplaceRootTags option should be a boolean.',
        );
    }
};

class WrapPlugin {
    public wrapSelectors: string[];
    public isReplaceRootTags: boolean;

    constructor(wrapSelector: IWrapSelector, options: IOptions = {}) {
        checkParameters(wrapSelector, options);

        this.wrapSelectors = Array.isArray(wrapSelector)
            ? wrapSelector
            : [wrapSelector];
        this.isReplaceRootTags = options.isReplaceRootTags || false;
    }

    checkCssRuleKeyframes(cssRule: Rule): boolean {
        const { parent } = cssRule;

        return parent.type !== 'atrule' || !parent.name.includes('keyframes');
    }

    isRootTag(selector: string): boolean {
        return selector === 'html' || selector === 'body';
    }

    addWrapToSelector(selector: string): string {
        return this.wrapSelectors
            .map((wrapSelector: string) => wrapSelector + ' ' + selector)
            .join(', ');
    }

    addWrapToRootSelector(selector: string): string {
        return this.wrapSelectors
            .map((wrapSelector: string) => wrapSelector + '.' + selector)
            .join(', ');
    }

    wrapCSSSelector(selector: string): string | null {
        if (selector === '') {
            return null;
        }

        if (this.isRootTag(selector) && this.isReplaceRootTags) {
            return this.addWrapToRootSelector(selector);
        }

        return this.addWrapToSelector(selector);
    }

    wrapCssRuleSelector(cssRuleSelector: string): string {
        return cssRuleSelector
            .split(',')
            .map((selector: string) => this.wrapCSSSelector(selector.trim()))
            .filter((cssSelector: string | null) => cssSelector)
            .join(', ');
    }

    checkIncludeCssRule(cssRule: Rule): boolean {
        // Do not prefix keyframes rules.
        if (this.checkCssRuleKeyframes(cssRule)) {
            return false;
        }

        return true;
    }

    runWrap() {
        return (css: Rule): void => {
            css.walkRules((cssRule: Rule) => {
                if (this.checkIncludeCssRule(cssRule)) {
                    const { selector } = cssRule;

                    cssRule.selector = this.wrapCssRuleSelector(selector);
                }
            });
        };
    }
}

const myPlugin: PostCSS.Plugin<string> = PostCSS.plugin(
    'postcss-wrap-plugin',
    (...options) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return new WrapPlugin(...options).runWrap();
    },
);

module.exports = myPlugin;
