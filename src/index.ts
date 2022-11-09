import { Plugin } from 'postcss';

import { IOptions } from './types';
import { WrapPlugin } from './wrapPlugin';

const creator = (options: IOptions): Plugin => {
    return new WrapPlugin(options);
};

creator.postcss = true;

export default creator;
