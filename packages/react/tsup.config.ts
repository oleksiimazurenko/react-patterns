import { defineConfig } from 'tsup'

export default defineConfig({
  // One entry per recipe (plus the barrel). Adding a recipe = add its
  // src/<recipe>/index.ts here and a subpath export in package.json.
  entry: [
    'src/index.ts',
    'src/fit-text/index.ts',
    'src/parallax/index.ts',
    'src/reveal/index.ts',
    'src/accordion/index.ts',
    'src/analytics/index.ts',
    'src/scroll-progress/index.ts',
    'src/sticky-shrink/index.ts',
    'src/slider/index.ts',
  ],
  format: ['esm', 'cjs'],
  // Declarations are emitted by tsc (tsconfig.build.json), not tsup's
  // rollup-plugin-dts — decoupling types from the JS bundler and keeping
  // the toolchain compatible with the native TypeScript compiler.
  dts: false,
  treeshake: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react/jsx-runtime'],
})
