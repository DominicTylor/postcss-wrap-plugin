import r from"postcss";
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
***************************************************************************** */function t(){for(var r=0,t=0,o=arguments.length;t<o;t++)r+=arguments[t].length;var e=Array(r),n=0;for(t=0;t<o;t++)for(var a=arguments[t],s=0,p=a.length;s<p;s++,n++)e[n]=a[s];return e}var o=function(){function r(r,t){void 0===t&&(t={}),function(r,t){var o=t.isReplaceRootTags;if("string"!=typeof r||!Array.isArray(r))throw new Error("postcss-wrap-plugin: wrapSelector option should be of type a string or an array.");if(!r.length)throw new Error("postcss-wrap-plugin: empty wrapSelector option.");if("boolean"!=typeof o)throw new Error("postcss-wrap-plugin: isReplaceRootTags option should be a boolean.")}(r,t),this.wrapSelectors=Array.isArray(r)?r:[r],this.isReplaceRootTags=t.isReplaceRootTags||!1}return r.prototype.checkCssRuleKeyframes=function(r){var t=r.parent;return"atrule"!==t.type||!t.name.includes("keyframes")},r.prototype.isRootTag=function(r){return"html"===r||"body"===r},r.prototype.addWrapToSelector=function(r){return this.wrapSelectors.map((function(t){return t+" "+r})).join(", ")},r.prototype.addWrapToRootSelector=function(r){return this.wrapSelectors.map((function(t){return t+"."+r})).join(", ")},r.prototype.wrapCSSSelector=function(r){return""===r?null:this.isRootTag(r)&&this.isReplaceRootTags?this.addWrapToRootSelector(r):this.addWrapToSelector(r)},r.prototype.wrapCssRuleSelector=function(r){var t=this;return r.split(",").map((function(r){return t.wrapCSSSelector(r.trim())})).filter((function(r){return r})).join(", ")},r.prototype.checkIncludeCssRule=function(r){return!this.checkCssRuleKeyframes(r)},r.prototype.runWrap=function(){var r=this;return function(t){t.walkRules((function(t){if(r.checkIncludeCssRule(t)){var o=t.selector;t.selector=r.wrapCssRuleSelector(o)}}))}},r}(),e=r.plugin("postcss-wrap-plugin",(function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return(new(o.bind.apply(o,t([void 0],r)))).runWrap()}));module.exports=e;
//# sourceMappingURL=index.es.js.map
