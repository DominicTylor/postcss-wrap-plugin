module.exports = {
    'Test wrap common selectors': {
        message: 'Check correct wrap common selectors',
        options: {
            wrapSelector: ['.test-wrap1', '[test-wrap="2"]']
        },
        source: 'source/wrap-common-selectors.css',
        expect: 'expect/wrap-common-selectors.css',
        result: 'result/wrap-common-selectors.css',
    },
    'Test wrap complex styles': {
        message: 'Check correct wrap complex styles',
        options: {
            wrapSelector: ['#test-wrap', '.test-wrap2 ~', '#test-wrap3 ~ div'],
            handleRootTags: 'replace',
        },
        source: 'source/complex-styles.css',
        expect: 'expect/complex-styles.css',
        result: 'result/complex-styles.css',
    },
};
