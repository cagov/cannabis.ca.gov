import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/js/wordpress/accordion.js',
  output: {
    file: 'src/js/wordpress/generated/accordion.min.js',
    format: 'esm'
  },
  plugins: [nodeResolve(), terser()]
};