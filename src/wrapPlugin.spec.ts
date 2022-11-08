/* eslint-disable @typescript-eslint/ban-ts-ignore */

import PostCSS from 'postcss';

import { WrapPlugin } from './wrapPlugin';
import { IHandleRootTags } from './types';

describe('WrapPlugin tests', () => {
    const wrapSelector = '.my-custom-wrap';

    it('WrapPlugin wraps elements correctly', async () => {
        const input = `
            body { color: black; }
            .test-class { color: black; }
            #test-id { color: black }
            
            @charset "UTF-8";
            @keyframes mymove {
                50% { top: 5px; }
            };
            @media only screen and (max-width: 600px) {
                div.test-class { color: red; }
            };
        `;

        const result = await PostCSS()
            .use(new WrapPlugin({ wrapSelector }))
            .process(input, { from: undefined });

        expect(result.css).toContain(`${wrapSelector} body`);
        expect(result.css).toContain(`${wrapSelector} .test-clas`);
        expect(result.css).toContain(`${wrapSelector} #test-id`);
        expect(result.css).toContain(`${wrapSelector} div.test-class`);

        expect(result.css).not.toContain(`${wrapSelector} @charset`);
        expect(result.css).not.toContain(`${wrapSelector} @keyframes`);
        expect(result.css).not.toContain(`${wrapSelector} 50%`);
        expect(result.css).not.toContain(`${wrapSelector} @media`);
    });

    it('WrapPlugin check params', () => {
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

    it('WrapPlugin.isRootTags test', () => {
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

        // @ts-ignore 'cause it's a private method
        expect(plugin.isRootTag(data[0])).toBeTruthy();
        // @ts-ignore 'cause it's a private method
        expect(plugin.isRootTag(data[1])).toBeTruthy();
        // @ts-ignore 'cause it's a private method
        expect(plugin.isRootTag(data[2])).toBeFalsy();
        // @ts-ignore 'cause it's a private method
        expect(plugin.isRootTag(data[3])).toBeFalsy();
        // @ts-ignore 'cause it's a private method
        expect(plugin.isRootTag(data[4])).toBeFalsy();
        // @ts-ignore 'cause it's a private method
        expect(plugin.isRootTag(data[5])).toBeFalsy();
        // @ts-ignore 'cause it's a private method
        expect(plugin.isRootTag(data[6])).toBeTruthy();
        // @ts-ignore 'cause it's a private method
        expect(plugin.isRootTag(data[7])).toBeTruthy();
    });

    it('WrapPlugin.addWrapToRootSelector test', () => {
        const selector = 'body div';
        let plugin = new WrapPlugin({
            wrapSelector,
            handleRootTags: IHandleRootTags.replace,
        });

        // @ts-ignore 'cause it's a private method
        expect(plugin.addWrapToRootSelector(selector)).toStrictEqual(
            `${wrapSelector}.${selector}`,
        );

        plugin = new WrapPlugin({
            wrapSelector,
            handleRootTags: IHandleRootTags.remove,
        });

        // @ts-ignore 'cause it's a private method
        expect(plugin.addWrapToRootSelector(selector)).toStrictEqual(
            `${wrapSelector} div`,
        );

        try {
            plugin = new WrapPlugin({
                wrapSelector,

                // @ts-ignore
                handleRootTags: 'wrong',
            });

            // @ts-ignore 'cause it's a private method
            plugin.addWrapToRootSelector(selector);
        } catch (e) {
            expect(e.message).toStrictEqual(
                'postcss-wrap-plugin: incorrect value for handleRootTags options',
            );
        }
    });

    it('WrapPlugin.addWrapToSelector test', () => {
        const selector = 'body div';
        const plugin = new WrapPlugin({
            wrapSelector,
            handleRootTags: IHandleRootTags.replace,
        });

        // @ts-ignore 'cause it's a private method
        expect(plugin.addWrapToSelector(selector)).toStrictEqual(
            `${wrapSelector} ${selector}`,
        );
    });

    it('WrapPlugin.wrapCSSSelector test', () => {
        const plugin = new WrapPlugin({
            wrapSelector,
            handleRootTags: IHandleRootTags.replace,
        });

        // @ts-ignore 'cause it's a private method
        plugin.addWrapToRootSelector = (): string => 'root wrapped';
        // @ts-ignore 'cause it's a private method
        plugin.addWrapToSelector = (): string => 'common wrapped';

        // @ts-ignore 'cause it's a private method
        expect(plugin.wrapCSSSelector('')).toStrictEqual(null);
        // @ts-ignore 'cause it's a private method
        expect(plugin.wrapCSSSelector('body')).toStrictEqual('root wrapped');
        // @ts-ignore 'cause it's a private method
        expect(plugin.wrapCSSSelector('#id')).toStrictEqual('common wrapped');
    });

    it('WrapPlugin.addWrapToSelector test', () => {
        const selector = 'body div';
        const plugin = new WrapPlugin({
            wrapSelector,
            handleRootTags: IHandleRootTags.replace,
        });

        // @ts-ignore 'cause it's a private method
        expect(plugin.addWrapToSelector(selector)).toStrictEqual(
            `${wrapSelector} ${selector}`,
        );
    });

    it('WrapPlugin.checkIncludeCssRule test', () => {
        const plugin = new WrapPlugin({
            wrapSelector,
        });
        const cssRule = PostCSS.rule({
            selector: 'div',
        });

        // @ts-ignore 'cause it's a private method
        plugin.checkIsCssRuleKeyframes = (): boolean => true;
        // @ts-ignore 'cause it's a private method
        expect(plugin.checkIncludeCssRule(cssRule)).toBeFalsy();

        // @ts-ignore 'cause it's a private method
        plugin.checkIsCssRuleKeyframes = (): boolean => false;
        // @ts-ignore 'cause it's a private method
        expect(plugin.checkIncludeCssRule(cssRule)).toBeTruthy();
    });

    it('WrapPlugin.wrapSelectors test', () => {
        let plugin = new WrapPlugin({
            wrapSelector,
        });

        // @ts-ignore 'cause it's a private variable
        expect(plugin.wrapSelectors).toStrictEqual([wrapSelector]);

        plugin = new WrapPlugin({
            wrapSelector: [wrapSelector, wrapSelector],
        });

        // @ts-ignore 'cause it's a private variable
        expect(plugin.wrapSelectors).toStrictEqual([
            wrapSelector,
            wrapSelector,
        ]);
    });
});
