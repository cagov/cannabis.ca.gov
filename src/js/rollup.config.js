import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

// @DOCS @TODO Quick summary of what this is doing.
// @DOCS Q: what dist/built.js?
export default {
  input: 'src/js/client.js',
  output: {
    file: 'dist/built.js',
    format: 'esm'
  },
  plugins: [resolve(), terser()]
};