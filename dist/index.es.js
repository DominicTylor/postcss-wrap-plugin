import PostCSS from 'postcss';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var IHandleRootTags;
(function (IHandleRootTags) {
    IHandleRootTags["replace"] = "replace";
    IHandleRootTags["remove"] = "remove";
})(IHandleRootTags || (IHandleRootTags = {}));

var checkParameters = function (_a) {
    var wrapSelector = _a.wrapSelector, handleRootTags = _a.handleRootTags;
    if (typeof wrapSelector !== 'string' && !Array.isArray(wrapSelector)) {
        throw new Error('postcss-wrap-plugin: wrapSelector option should be of type a string or an array.');
    }
    if (!wrapSelector.length) {
        throw new Error('postcss-wrap-plugin: empty wrapSelector option.');
    }
    if (handleRootTags && typeof handleRootTags !== 'string') {
        throw new Error('postcss-wrap-plugin: handleRootTags option incorrect type.');
    }
};
var ROOT_TAG_REGEXP = /\b(html|body)\b/g;
var WrapPlugin = /** @class */ (function () {
    function WrapPlugin(options) {
        checkParameters(options);
        var wrapSelector = options.wrapSelector, handleRootTags = options.handleRootTags;
        this.wrapSelectors = Array.isArray(wrapSelector)
            ? wrapSelector
            : [wrapSelector];
        this.handleRootTags = handleRootTags || null;
    }
    WrapPlugin.prototype.checkIsCssRuleKeyframes = function (cssRule) {
        var parent = cssRule.parent;
        return parent.type === 'atrule' && parent.name.includes('keyframes');
    };
    WrapPlugin.prototype.isRootTag = function (selector) {
        ROOT_TAG_REGEXP.lastIndex = 0;
        return ROOT_TAG_REGEXP.test(selector);
    };
    WrapPlugin.prototype.addWrapToRootSelector = function (selector) {
        var _this = this;
        return this.wrapSelectors
            .map(function (wrapSelector) {
            if (_this.handleRootTags === IHandleRootTags['remove']) {
                return wrapSelector + selector.replace(ROOT_TAG_REGEXP, '');
            }
            if (_this.handleRootTags === IHandleRootTags['replace']) {
                return wrapSelector + "." + selector;
            }
            throw new Error('postcss-wrap-plugin: incorrect value for handleRootTags options');
        })
            .join(', ');
    };
    WrapPlugin.prototype.addWrapToSelector = function (selector) {
        return this.wrapSelectors
            .map(function (wrapSelector) { return wrapSelector + " " + selector; })
            .join(', ');
    };
    WrapPlugin.prototype.wrapCSSSelector = function (selector) {
        if (selector === '') {
            return null;
        }
        if (this.isRootTag(selector) && this.handleRootTags) {
            return this.addWrapToRootSelector(selector);
        }
        return this.addWrapToSelector(selector);
    };
    WrapPlugin.prototype.wrapCssRuleSelector = function (cssRuleSelector) {
        var _this = this;
        return cssRuleSelector
            .split(',')
            .map(function (selector) { return _this.wrapCSSSelector(selector.trim()); })
            .filter(function (cssSelector) { return cssSelector; })
            .join(', ');
    };
    WrapPlugin.prototype.checkIncludeCssRule = function (cssRule) {
        // Do not prefix keyframes rules.
        if (this.checkIsCssRuleKeyframes(cssRule)) {
            return false;
        }
        return true;
    };
    WrapPlugin.prototype.runWrap = function () {
        var _this = this;
        return function (css) {
            css.walkRules(function (cssRule) {
                if (_this.checkIncludeCssRule(cssRule)) {
                    var selector = cssRule.selector;
                    cssRule.selector = _this.wrapCssRuleSelector(selector);
                }
            });
        };
    };
    return WrapPlugin;
}());

var index = PostCSS.plugin('postcss-wrap-plugin', function () {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        options[_i] = arguments[_i];
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return new (WrapPlugin.bind.apply(WrapPlugin, __spreadArrays([void 0], options)))().runWrap();
});

export default index;
//# sourceMappingURL=index.es.js.map
