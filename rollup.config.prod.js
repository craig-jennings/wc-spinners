import filesize from 'rollup-plugin-filesize';
import fs from 'fs';
import minify from 'rollup-plugin-babel-minify';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';

const filenames = [
  ...fs.readdirSync('src/components/epic-spinners').map(name => ({ dir: 'epic-spinners', name })),
  ...fs.readdirSync('src/components/react-spinners').map(name => ({ dir: 'react-spinners', name })),
];

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
      name: 'WcSpinners',
    },

    plugins,
  },
];

filenames.forEach(({ dir, name }) => {
  configs.push({
    input: `src/components/${dir}/${name}`,

    output: {
      file: `dist/${name}`,
      format: 'umd',
      name: name.substring(0, name.length - 3), // Remove '.js' from the filename
    },

    plugins,
  });
});

export default [...configs];
