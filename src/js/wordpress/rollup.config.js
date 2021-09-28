import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/js/wordpress/wordpress-clientside.js',
  output: {
    dir: 'src/js/wordpress/generated/',
		entryFileNames: 'index-[hash].min.js',
    format: 'esm'
  },
  plugins: [nodeResolve(), terser()]
};
