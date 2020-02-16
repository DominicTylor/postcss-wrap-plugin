export type IWrapSelector = string | string[];

export enum IHandleRootTags {
    'replace' = 'replace',
    'remove' = 'remove',
}
export type IOptions = {
    wrapSelector: IWrapSelector;
    handleRootTags?: IHandleRootTags;
};
