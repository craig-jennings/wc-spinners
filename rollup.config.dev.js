import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: pkg.main,

  output: {
    file: pkg.browser,
    format: 'umd',
    name: 'WcEpicSpinners',
    sourcemap: 'inline',
  },

  plugins: [
    resolve(),
  ],
};
