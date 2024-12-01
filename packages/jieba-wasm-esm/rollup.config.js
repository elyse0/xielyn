import { defineConfig } from 'rollup';

import rollupNodeResolve from '@rollup/plugin-node-resolve';
import rollupWasm from '@rollup/plugin-wasm';
import rollupCopy from 'rollup-plugin-copy';

export default defineConfig({
    input: 'src/index.js',
    output: {
        dir: 'dist',
        format: 'es',
    },
    preserveEntrySignatures: true,
    treeshake: false,
    plugins: [
        rollupNodeResolve(),
        rollupWasm(),
        rollupCopy({
            targets: [
                {
                    src: 'node_modules/jieba-wasm/pkg/web/jieba_rs_wasm_bg.wasm',
                    dest: 'dist',
                },
                {
                    src: 'node_modules/jieba-wasm/pkg/web/jieba_rs_wasm.d.ts',
                    dest: 'dist',
                },
            ],
        }),
    ],
});