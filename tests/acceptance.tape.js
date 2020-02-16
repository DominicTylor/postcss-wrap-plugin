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
    'Test wrap styles with keyframes': {
        message: 'Check that keyframe styles with not wrap',
        options: {
            wrapSelector: '.test-wrap',
        },
        source: 'source/styles-with-keyframes.css',
        expect: 'expect/styles-with-keyframes.css',
        result: 'result/styles-with-keyframes.css',
    },
    'Test wrap styles with media queries': {
        message: 'Check that styles with media queries correct wrap',
        options: {
            wrapSelector: '#test-wrap',
        },
        source: 'source/styles-with-media.css',
        expect: 'expect/styles-with-media.css',
        result: 'result/styles-with-media.css',
    },
    'Test wrap styles with root tags #1': {
        message:
            'Check that styles with root tags and without handleRootTags correct wrap',
        options: {
            wrapSelector: '#test',
        },
        source: 'source/styles-with-root-tags.css',
        expect: 'expect/styles-with-root-tags-as-is.css',
        result: 'result/styles-with-root-tags-as-is.css',
    },
    'Test wrap styles with root tags #2': {
        message:
            'Check that styles with root tags and handleRootTags=replace correct wrap',
        options: {
            wrapSelector: '#test',
            handleRootTags: 'replace',
        },
        source: 'source/styles-with-root-tags.css',
        expect: 'expect/styles-with-root-tags-replace.css',
        result: 'result/styles-with-root-tags-replace.css',
    },
    'Test wrap styles with root tags #3': {
        message:
            'Check that styles with root tags and handleRootTags=remove correct wrap',
        options: {
            wrapSelector: '#test',
            handleRootTags: 'remove',
        },
        source: 'source/styles-with-root-tags.css',
        expect: 'expect/styles-with-root-tags-remove.css',
        result: 'result/styles-with-root-tags-remove.css',
    },
};
