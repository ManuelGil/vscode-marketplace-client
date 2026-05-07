import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],

  outDir: 'dist',

  clean: true,

  format: ['esm', 'cjs'],

  target: 'node18',

  platform: 'node',

  dts: true,

  sourcemap: true,

  treeshake: true,

  splitting: false,

  minify: true,

  external: ['axios'],

  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.js',
    };
  },
});
