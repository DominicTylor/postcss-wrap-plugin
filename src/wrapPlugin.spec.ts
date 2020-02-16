import PostCSS, { Rule } from 'postcss';

import { WrapPlugin } from './wrapPlugin';
import { IHandleRootTags } from './types';

describe('WrapPlugin tests', () => {
    const wrapSelector = '.my-custom-wrap';

    it('WrapPlugin.runWrap() correct wrap elements', () => {
        const plugin = new WrapPlugin({ wrapSelector });
        const cssContainer = PostCSS.rule({
            selector: 'body',
        });
        const selectors = ['div', '#id', '.class'];

        selectors.map(selector =>
            cssContainer.append({
                selector,
            }),
        );

        plugin.checkIncludeCssRule = (): boolean => false;

        plugin.runWrap()(cssContainer);

        selectors.forEach((selector, index) => {
            const cssRule = cssContainer.nodes && cssContainer.nodes[index];

            if (cssRule && 'selector' in cssRule) {
                expect(cssRule.selector).toStrictEqual(selector);
            }
        });

        plugin.checkIncludeCssRule = (): boolean => true;

        plugin.runWrap()(cssContainer);

        selectors.forEach((selector, index) => {
            const cssRule = cssContainer.nodes && cssContainer.nodes[index];

            if (cssRule && 'selector' in cssRule) {
                expect(cssRule.selector).toStrictEqual(
                    `${wrapSelector} ${selector}`,
                );
            }
        });
    });

    it('WrapPlugin check params test', () => {
        try {
            new WrapPlugin({
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                wrapSelector: true,
            });
        } catch (e) {
            expect(e.message).toStrictEqual(
                'postcss-wrap-plugin: wrapSelector option should be of type a string or an array.',
            );
        }

        try {
            new WrapPlugin({
                wrapSelector: '',
            });
        } catch (e) {
            expect(e.message).toStrictEqual(
                'postcss-wrap-plugin: empty wrapSelector option.',
            );
        }

        try {
            new WrapPlugin({
                wrapSelector,
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                handleRootTags: true,
            });
        } catch (e) {
            expect(e.message).toStrictEqual(
                'postcss-wrap-plugin: handleRootTags option incorrect type.',
            );
        }
    });

    it('WrapPlugin checkIsCssRuleKeyframes test', () => {
        const plugin = new WrapPlugin({ wrapSelector });
        const cssContainer = PostCSS.rule({
            selector: 'div',
        });

        cssContainer.append({
            selector: 'a',
        });

        let cssRule = cssContainer.nodes && cssContainer.nodes[0];

        if (cssRule) {
            expect(plugin.checkIsCssRuleKeyframes(cssRule as Rule)).toBeFalsy();
        }

        const cssContainer2 = PostCSS.atRule({
            name: '@keyframes',
        });

        cssContainer2.append({
            selector: 'a',
        });

        cssRule = cssContainer2.nodes && cssContainer2.nodes[0];

        if (cssRule) {
            expect(
                plugin.checkIsCssRuleKeyframes(cssRule as Rule),
            ).toBeTruthy();
        }
    });

    it('WrapPlugin isRootTags test', () => {
        const plugin = new WrapPlugin({ wrapSelector });
        const data = [
            'body',
            'html',
            'a',
            '#idbody',
            '.ahtmls',
            'bodyc',
            '#id body',
            '[data-atr] body .class',
        ];

        expect(plugin.isRootTag(data[0])).toBeTruthy();
        expect(plugin.isRootTag(data[1])).toBeTruthy();
        expect(plugin.isRootTag(data[2])).toBeFalsy();
        expect(plugin.isRootTag(data[3])).toBeFalsy();
        expect(plugin.isRootTag(data[4])).toBeFalsy();
        expect(plugin.isRootTag(data[5])).toBeFalsy();
        expect(plugin.isRootTag(data[6])).toBeTruthy();
        expect(plugin.isRootTag(data[7])).toBeTruthy();
    });

    it('WrapPlugin addWrapToRootSelector test', () => {
        const selector = 'body div';
        let plugin = new WrapPlugin({
            wrapSelector,
            handleRootTags: IHandleRootTags.replace,
        });

        expect(plugin.addWrapToRootSelector(selector)).toStrictEqual(
            `${wrapSelector}.${selector}`,
        );

        plugin = new WrapPlugin({
            wrapSelector,
            handleRootTags: IHandleRootTags.remove,
        });

        expect(plugin.addWrapToRootSelector(selector)).toStrictEqual(
            `${wrapSelector} div`,
        );

        try {
            plugin = new WrapPlugin({
                wrapSelector,
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                handleRootTags: 'wrong',
            });
            plugin.addWrapToRootSelector(selector);
        } catch (e) {
            expect(e.message).toStrictEqual(
                'postcss-wrap-plugin: incorrect value for handleRootTags options',
            );
        }
    });

    it('WrapPlugin addWrapToSelector test', () => {
        const selector = 'body div';
        const plugin = new WrapPlugin({
            wrapSelector,
            handleRootTags: IHandleRootTags.replace,
        });

        expect(plugin.addWrapToSelector(selector)).toStrictEqual(
            `${wrapSelector} ${selector}`,
        );
    });

    it('WrapPlugin wrapCSSSelector test', () => {
        const plugin = new WrapPlugin({
            wrapSelector,
            handleRootTags: IHandleRootTags.replace,
        });

        plugin.addWrapToRootSelector = (): string => 'root wrapped';
        plugin.addWrapToSelector = (): string => 'common wrapped';

        expect(plugin.wrapCSSSelector('')).toStrictEqual(null);
        expect(plugin.wrapCSSSelector('body')).toStrictEqual('root wrapped');
        expect(plugin.wrapCSSSelector('#id')).toStrictEqual('common wrapped');
    });

    it('WrapPlugin addWrapToSelector test', () => {
        const selector = 'body div';
        const plugin = new WrapPlugin({
            wrapSelector,
            handleRootTags: IHandleRootTags.replace,
        });

        expect(plugin.addWrapToSelector(selector)).toStrictEqual(
            `${wrapSelector} ${selector}`,
        );
    });

    it('WrapPlugin checkIncludeCssRule test', () => {
        const plugin = new WrapPlugin({
            wrapSelector,
        });
        const cssRule = PostCSS.rule({
            selector: 'div',
        });

        plugin.checkIsCssRuleKeyframes = (): boolean => true;
        expect(plugin.checkIncludeCssRule(cssRule)).toBeFalsy();

        plugin.checkIsCssRuleKeyframes = (): boolean => false;
        expect(plugin.checkIncludeCssRule(cssRule)).toBeTruthy();
    });

    it('WrapPlugin wrapSelectors test', () => {
        let plugin = new WrapPlugin({
            wrapSelector,
        });

        expect(plugin.wrapSelectors).toStrictEqual([wrapSelector]);

        plugin = new WrapPlugin({
            wrapSelector: [wrapSelector, wrapSelector],
        });

        expect(plugin.wrapSelectors).toStrictEqual([
            wrapSelector,
            wrapSelector,
        ]);
    });
});
