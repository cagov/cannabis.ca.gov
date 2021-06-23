import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'accordion.js',
  output: {
    file: 'accordion.min.js',
    format: 'esm'
  },
  plugins: [nodeResolve(), terser()]
};