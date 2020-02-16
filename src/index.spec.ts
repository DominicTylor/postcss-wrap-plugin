import Assert from 'assert';
import PostCSS from 'postcss';

import WrapPlugin from './index';

describe('WrapPlugin tests', () => {
    const wrapSelector = '.my-custom-wrap';

    it('WrapPlugin.runWrap() correct wrap empty elements', async () => {
        const plugin = WrapPlugin.process;
        const cssRule = PostCSS.rule({
            selector: '',
        });

        await plugin(cssRule, { wrapSelector });

        Assert.strictEqual(cssRule.selector, '');
    });

    it('WrapPlugin.runWrap() correct wrap non root tag elements', async () => {
        const plugin = WrapPlugin.process;

        for (const selector of ['div', 'p', 'h1']) {
            const cssRule = PostCSS.rule({
                selector: selector,
            });
            await plugin(cssRule, { wrapSelector });
            Assert.strictEqual(cssRule.selector, `${wrapSelector} ${selector}`);
        }
    });
});
