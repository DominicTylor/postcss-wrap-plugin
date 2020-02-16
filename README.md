[![codecov.io](https://img.shields.io/codecov/c/github/DominicTylor/postcss-wrap-plugin/master.svg?style=flat-square)](http://codecov.io/github/DominicTylor/postcss-wrap-plugin?branch=master)

# postcss-wrap-plugin

Plugin for help you to wrap your styles into some selectors.

Usage example:

###### [webpack.config]

```
require('postcss-wrap-plugins')({
  loader: require.resolve('postcss-loader'),
  options: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-wrap-plugins')({
        wrapSelector: ['#test', 'div ~']
      }),
    ],
  },
```

### api

`wrapSelector` - required params, your wrap selector or array of selectors
```
require('postcss-wrap-plugins')({
    wrapSelector: ['#test', '#test ~'],
}),
ORIGINAL STYLE
div {
  // some styles
}
RESULT STYLE
#test div, #test ~ div {
  // some styles
}
```
OR
```
require('postcss-wrap-plugins')({
    wrapSelector: '#test',
}),
ORIGINAL STYLE
div {
  // some styles
}
RESULT STYLE
#test div {
  // some styles
}
```

`handleRootTags` - optional params that say should modify root tags (html, body) or not

when using option `replace` - tags will be transform to class, like a `body -> .body`, `html -> .html`
```
require('postcss-wrap-plugins')({
    wrapSelector: '#test',
    handleRootTags: 'replace',
}),
ORIGINAL STYLE
body div {
    // some styles
}
RESULT STYLE
#test.body div {
    // some styles
}
```
when using option `remove` - tags will be remove from selector
```
require('postcss-wrap-plugins')({
    wrapSelector: '#test',
    handleRootTags: 'remove',
}),
ORIGINAL STYLE
body div {
    // some styles
}
RESULT STYLE
#test  div {
    // some styles
}
```
when options is not setup, root tags also will be wrapped
```
require('postcss-wrap-plugins')({
    wrapSelector: '#test',
}),
ORIGINAL STYLE
body div {
    // some styles
}
RESULT STYLE
#test body div {
    // some styles
}
```
