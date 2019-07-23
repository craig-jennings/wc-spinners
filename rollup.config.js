import html from 'rollup-plugin-fill-html';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';

export default {
  input: 'src/docs/index.js',

  output: {
    file: 'docs/index.js',
    format: 'umd',
    name: 'WcSpinners',
    sourcemap: 'inline',
  },

  plugins: [
    html({ template: 'src/docs/index.html' }),
    resolve(),
    sass({ output: true }),
  ],
};
