import { AtRule, Container } from 'postcss';

export type IWrapSelector = string | string[];

export enum IHandleRootTags {
    'replace' = 'replace',
    'remove' = 'remove',
}
export type IOptions = {
    wrapSelector: IWrapSelector;
    handleRootTags?: IHandleRootTags;
};

export const isAtRule = (rule: Container): rule is AtRule => {
    return rule.type === 'atrule';
};
