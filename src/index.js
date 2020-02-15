import postcss from 'postcss';

const checkParameters = (wrapSelector, {
    isWrapRootTags
}) => {
    if (typeof wrapSelector !== 'string' || !Array.isArray(wrapSelector)) {
        throw new Error('postcss-wrap-plugin: wrapSelector option should be of type a string or an array.');
    }

    if (!wrapSelector.length) {
        throw new Error('postcss-wrap-plugin: empty wrapSelector option.');
    }

    if (typeof isWrapRootTags !== 'boolean') {
        throw new Error('postcss-wrap-plugin: isWrapRootTags option should be a boolean.');
    }
};

class WrapPlugin {
    constructor(wrapSelector, options) {
        options = {
            isWrapRootTags: false,
            ...options,
        };

        checkParameters(wrapSelector, options);

        this.wrapSelector = wrapSelector;
        this.isWrapRootTags = isWrapRootTags;
    }

    checkCssRuleKeyframes(cssRule) {
        const { parent } = cssRule;

        return parent.type !== "atrule" || !parent.name.includes('keyframes');
    }

    wrapCssSelector(cssSelector, cssRule) {
        if (cssSelector === "") {
            return null;
        }

        // Do not prefix keyframes rules.
        if (this.checkCssRuleKeyframes(cssRule)) {
            return cssSelector;
        }

        if (Selector.isNotRootTag(cleanSelector)) {
            return this.prefixSelector + " " + cssSelector;
        }

        if (this.isWrapRootTags) {
            return this.prefixSelector + " ." + cssSelector;
        }

        // HTML and Body elements cannot be contained within our container so lets
        // extract their styles.
        return cssSelector.replace(/^(body|html)/, this.prefixSelector);
    }

    wrapCssRule(cssRule) {
        return cssRule
            .split(",")
            .map((selector) => this.wrapCssSelector(selector.trim(), cssRule))
            .filter(cssSelector => cssSelector)
            .join(", ");
    }

    runWrap() {
        return css => {
            css.walkRules((cssRule) => {
                if (this.checkIncludeCssRule(cssRule)) {
                    const { selector } = cssRule;

                    cssRule.selector = this.wrapCssRule(selector);
                }
            });
        }
    }
}


export default postcss.plugin('postcss-wrap-plugin', (...options) => new WrapPlugin(...options).runWrap());