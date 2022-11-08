import { Plugin } from 'postcss';
import { IOptions } from './types';
declare const creator: {
    (options: IOptions): Plugin;
    postcss: boolean;
};
export default creator;
