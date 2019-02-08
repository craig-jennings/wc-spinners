import filesize from 'rollup-plugin-filesize';
import fs from 'fs';
import minify from 'rollup-plugin-babel-minify';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';

const filenames = fs.readdirSync('src/components/');

const plugins = [
  filesize(),
  minify({ comments: false }),
  resolve(),
];

const configs = [
  {
    input: pkg.main,

    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'WcEpicSpinners',
    },

    plugins,
  },
];

filenames.forEach((filename) => {
  configs.push({
    input: `src/components/${filename}`,

    output: {
      file: `dist/${filename}`,
      format: 'umd',
      name: filename.substring(0, filename.length - 3), // Remove '.js' from the filename
    },

    plugins,
  });
});

export default [...configs];
