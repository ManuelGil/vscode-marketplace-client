import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  outDir: 'dist',
  clean: true,
  format: ['esm', 'cjs'],
  target: ['es2022', 'node18'],
  dts: true,
  minify: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  external: ['axios'],
});
