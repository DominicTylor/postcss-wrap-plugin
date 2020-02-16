import PostCSS from 'postcss';
import { WrapPlugin } from './wrapPlugin';
import { IOptions } from './types';

export default PostCSS.plugin<IOptions>('postcss-wrap-plugin', (...options) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return new WrapPlugin(...options).runWrap();
});
