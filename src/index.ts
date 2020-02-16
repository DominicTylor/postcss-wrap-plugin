import PostCSS, { Rule } from 'postcss';
import { IHandleRootTags, IOptions } from './types';

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
}

const ROOT_TAG_REGEXP = /\b(html|body)\b/g;

class WrapPlugin {
    public wrapSelectors: string[];
    public handleRootTags: IHandleRootTags | null;

    constructor(options: IOptions) {
        checkParameters(options);

        const { wrapSelector, handleRootTags } = options;

        this.wrapSelectors = Array.isArray(wrapSelector)
            ? wrapSelector
            : [wrapSelector];
        this.handleRootTags = handleRootTags || null;
    }

    checkIsCssRuleKeyframes(cssRule: Rule): boolean {
        const { parent } = cssRule;

        return parent.type === 'atrule' && parent.name.includes('keyframes');
    }

    isRootTag(selector: string): boolean {
        ROOT_TAG_REGEXP.lastIndex = 0;

        return ROOT_TAG_REGEXP.test(selector);
    }

    addWrapToRootSelector(selector: string): string {
        return this.wrapSelectors
            .map((wrapSelector: string) => {
                if (this.handleRootTags === IHandleRootTags['remove']) {
                    return wrapSelector + selector.replace(ROOT_TAG_REGEXP, '');
                }

                if (this.handleRootTags === IHandleRootTags['replace']) {
                    return `${wrapSelector}.${selector}`;
                }

                throw new Error('Incorrect value for handleRootTags options');
            })
            .join(', ');
    }

    addWrapToSelector(selector: string): string {
        return this.wrapSelectors
            .map((wrapSelector: string) => `${wrapSelector} ${selector}`)
            .join(', ');
    }

    wrapCSSSelector(selector: string): string | null {
        if (selector === '') {
            return null;
        }

        if (this.isRootTag(selector) && this.handleRootTags) {
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
        if (this.checkIsCssRuleKeyframes(cssRule)) {
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
