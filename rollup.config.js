import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';

import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            preserveModules: false,
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true,
        },
    ],
    plugins: [
        external(),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true,
        }),
        terser(),
        commonjs(),
        cleanup({
            comments: 'none',
        }),
    ],
};
