module.exports = {
    'wrap common selectors test': {
        message: 'Check correct wrap common selectors',
        options: ['.test-wrap1', '[test-wrap="2"]'],
        source: 'source/wrap-common-selectors.css',
        expect: 'expect/wrap-common-selectors.css',
    },
};
