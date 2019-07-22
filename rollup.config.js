import html from 'rollup-plugin-fill-html';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: pkg.main,

  output: {
    file: 'docs/index.js',
    format: 'umd',
    name: 'WcSpinners',
    sourcemap: 'inline',
  },

  plugins: [
    resolve(),

    html({
      template: 'src/index.html',
    }),
  ],
};
