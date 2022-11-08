import PostCSS from 'postcss';

import { WrapPlugin } from './wrapPlugin';
import { IHandleRootTags } from './types';

describe('WrapPlugin tests', () => {
    const wrapSelector = '.my-custom-wrap';

    it('WrapPlugin correct wrap elements', async () => {
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

    describe('WrapPlugin private methods', () => {
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

            expect(plugin._isRootTag(data[0])).toBeTruthy();
            expect(plugin._isRootTag(data[1])).toBeTruthy();
            expect(plugin._isRootTag(data[2])).toBeFalsy();
            expect(plugin._isRootTag(data[3])).toBeFalsy();
            expect(plugin._isRootTag(data[4])).toBeFalsy();
            expect(plugin._isRootTag(data[5])).toBeFalsy();
            expect(plugin._isRootTag(data[6])).toBeTruthy();
            expect(plugin._isRootTag(data[7])).toBeTruthy();
        });

        it('WrapPlugin addWrapToRootSelector test', () => {
            const selector = 'body div';
            let plugin = new WrapPlugin({
                wrapSelector,
                handleRootTags: IHandleRootTags.replace,
            });

            expect(plugin._addWrapToRootSelector(selector)).toStrictEqual(
                `${wrapSelector}.${selector}`,
            );

            plugin = new WrapPlugin({
                wrapSelector,
                handleRootTags: IHandleRootTags.remove,
            });

            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            expect(plugin._addWrapToRootSelector(selector)).toStrictEqual(
                `${wrapSelector} div`,
            );

            try {
                plugin = new WrapPlugin({
                    wrapSelector,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    handleRootTags: 'wrong',
                });
                plugin._addWrapToRootSelector(selector);
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

            expect(plugin._addWrapToSelector(selector)).toStrictEqual(
                `${wrapSelector} ${selector}`,
            );
        });

        it('WrapPlugin wrapCSSSelector test', () => {
            const plugin = new WrapPlugin({
                wrapSelector,
                handleRootTags: IHandleRootTags.replace,
            });

            plugin._addWrapToRootSelector = (): string => 'root wrapped';
            plugin._addWrapToSelector = (): string => 'common wrapped';

            expect(plugin._wrapCSSSelector('')).toStrictEqual(null);
            expect(plugin._wrapCSSSelector('body')).toStrictEqual(
                'root wrapped',
            );
            expect(plugin._wrapCSSSelector('#id')).toStrictEqual(
                'common wrapped',
            );
        });

        it('WrapPlugin addWrapToSelector test', () => {
            const selector = 'body div';
            const plugin = new WrapPlugin({
                wrapSelector,
                handleRootTags: IHandleRootTags.replace,
            });

            expect(plugin._addWrapToSelector(selector)).toStrictEqual(
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

            plugin._checkIsCssRuleKeyframes = (): boolean => true;
            expect(plugin._checkIncludeCssRule(cssRule)).toBeFalsy();

            plugin._checkIsCssRuleKeyframes = (): boolean => false;
            expect(plugin._checkIncludeCssRule(cssRule)).toBeTruthy();
        });

        it('WrapPlugin wrapSelectors test', () => {
            let plugin = new WrapPlugin({
                wrapSelector,
            });

            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore 'cause it's a private method
            expect(plugin.wrapSelectors).toStrictEqual([wrapSelector]);

            plugin = new WrapPlugin({
                wrapSelector: [wrapSelector, wrapSelector],
            });

            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore 'cause it's a private method
            expect(plugin.wrapSelectors).toStrictEqual([
                wrapSelector,
                wrapSelector,
            ]);
        });
    });
});
