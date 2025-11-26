import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.js'],
    format: ['cjs', 'esm'],
    dts: true,              
    clean: false,           
    sourcemap: false,
    splitting: false,
  },

  {
    entry: { bin: 'src/bin.js' },
    format: ['esm'],
    clean: false,
    minify: true,
  }
]);