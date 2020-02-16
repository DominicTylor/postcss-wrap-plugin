"use strict";var r,t,e=(r=require("postcss"))&&"object"==typeof r&&"default"in r?r.default:r;
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
***************************************************************************** */function o(){for(var r=0,t=0,e=arguments.length;t<e;t++)r+=arguments[t].length;var o=Array(r),n=0;for(t=0;t<e;t++)for(var a=arguments[t],s=0,p=a.length;s<p;s++,n++)o[n]=a[s];return o}!function(r){r.replace="replace",r.remove="remove"}(t||(t={}));var n=/\b(html|body)\b/g,a=function(){function r(r){!function(r){var t=r.wrapSelector,e=r.handleRootTags;if("string"!=typeof t&&!Array.isArray(t))throw new Error("postcss-wrap-plugin: wrapSelector option should be of type a string or an array.");if(!t.length)throw new Error("postcss-wrap-plugin: empty wrapSelector option.");if(e&&"string"!=typeof e)throw new Error("postcss-wrap-plugin: handleRootTags option incorrect type.")}(r);var t=r.wrapSelector,e=r.handleRootTags;this.wrapSelectors=Array.isArray(t)?t:[t],this.handleRootTags=e||null}return r.prototype.checkIsCssRuleKeyframes=function(r){var t=r.parent;return"atrule"===t.type&&t.name.includes("keyframes")},r.prototype.isRootTag=function(r){return n.lastIndex=0,n.test(r)},r.prototype.addWrapToRootSelector=function(r){var e=this;return this.wrapSelectors.map((function(o){if(e.handleRootTags===t.remove)return o+r.replace(n,"");if(e.handleRootTags===t.replace)return o+"."+r;throw new Error("postcss-wrap-plugin: incorrect value for handleRootTags options")})).join(", ")},r.prototype.addWrapToSelector=function(r){return this.wrapSelectors.map((function(t){return t+" "+r})).join(", ")},r.prototype.wrapCSSSelector=function(r){return""===r?null:this.isRootTag(r)&&this.handleRootTags?this.addWrapToRootSelector(r):this.addWrapToSelector(r)},r.prototype.wrapCssRuleSelector=function(r){var t=this;return r.split(",").map((function(r){return t.wrapCSSSelector(r.trim())})).filter((function(r){return r})).join(", ")},r.prototype.checkIncludeCssRule=function(r){return!this.checkIsCssRuleKeyframes(r)},r.prototype.runWrap=function(){var r=this;return function(t){t.walkRules((function(t){if(r.checkIncludeCssRule(t)){var e=t.selector;t.selector=r.wrapCssRuleSelector(e)}}))}},r}(),s=e.plugin("postcss-wrap-plugin",(function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return(new(a.bind.apply(a,o([void 0],r)))).runWrap()}));module.exports=s;
//# sourceMappingURL=index.js.map
