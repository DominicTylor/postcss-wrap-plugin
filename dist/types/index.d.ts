export declare type IWrapSelector = string | string[];
export declare enum IHandleRootTags {
    'replace' = "replace",
    'remove' = "remove"
}
export declare type IOptions = {
    wrapSelector: IWrapSelector;
    handleRootTags?: IHandleRootTags;
};
