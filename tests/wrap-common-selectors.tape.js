module.exports = {
    'wrap common selectors test': {
        message: 'Check correct wrap common selectors',
        options: {
            wrapSelectors: ['.test-wrap1', ['[test-wrap="2"]']]
        },
        source: './fixtures/source/wrap-common-selectors.css',
        expect: './fixtures/expect/wrap-common-selectors.css',
    }
};