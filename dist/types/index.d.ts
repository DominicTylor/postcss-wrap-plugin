import { AtRule, Container } from 'postcss';
export declare type IWrapSelector = string | string[];
export declare enum IHandleRootTags {
    'replace' = "replace",
    'remove' = "remove"
}
export declare type IOptions = {
    wrapSelector: IWrapSelector;
    handleRootTags?: IHandleRootTags;
};
export declare const isAtRule: (rule: Container<import("postcss").ChildNode>) => rule is AtRule;
