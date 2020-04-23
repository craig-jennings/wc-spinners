import copy from 'rollup-plugin-copy-assets';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/docs/index.js',

  output: {
    file: 'docs/index.js',
    format: 'umd',
    name: 'WcSpinners',
  },

  plugins: [
    copy({
      assets: ['src/index.html'],
    }),

    resolve(),
    sass({ output: true }),
    process.env.ROLLUP_WATCH && serve('docs'),
  ],
};
