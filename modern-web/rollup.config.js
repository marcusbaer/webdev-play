import html from '@web/rollup-plugin-html';

export default {
  input: 'pages/index.html',
  output: { dir: 'dist' },
  plugins: [html()],
};