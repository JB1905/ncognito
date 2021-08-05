const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const { VueLoaderPlugin } = require('vue-loader');
const platform = require('platform');

const { version } = require('./package.json');

// let mode;

// if (env === 'build') mode = 'production';
// else mode = 'development';

// // TODO update
// const config = {
//   mode,
//   context: `${__dirname}/src`,
//   entry: {
//     index: './content/index.ts',
//     background: './background/index.ts',
//     'popup/popup': './popup/index.ts',
//     'options/options': './options/index.ts',
//   },
//   output: {
//     path: `${__dirname}/dist`,
//     filename: '[name].js',
//   },
//   resolve: {
//     extensions: ['.ts', '.js', '.vue'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader',
//       },
//       {
//         test: /\.ts$/,
//         loader: 'ts-loader',
//         options: {
//           appendTsSuffixTo: [/\.vue$/],
//         },
//       },
//       {
//         test: /\.scss$/,
//         use: ['style-loader', 'css-loader', 'sass-loader'],
//       },
//     ],
//   },
//   plugins: [
//     new VueLoaderPlugin(),
//     new CopyWebpackPlugin([
//       { from: 'icons', to: 'icons' },
//       {
//         from: 'popup/index.html',
//         to: 'popup/index.html',
//       },
//       {
//         from: 'options/index.html',
//         to: 'options/index.html',
//       },
//       {
//         from: '_locales',
//         to: '_locales',
//       },
//       {
//         from: 'manifest.json',
//         to: 'manifest.json',
//         transform: (content) => {
//           const jsonContent = JSON.parse(content);
//           jsonContent.version = version;

//           if (config.mode === 'development') {
//             jsonContent['content_security_policy'] =
//               "script-src 'self' 'unsafe-eval'; object-src 'self'";
//           }

//           return JSON.stringify(jsonContent, null, 2);
//         },
//       },
//     ]),
//   ],
// };

// if (config.mode === 'development' && platform.name === 'Chrome') {
//   config.plugins = (config.plugins || []).concat([
//     new ChromeExtensionReloader(),
//   ]);
// }

module.exports = (_env, argv) => ({
  mode: argv.mode || 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: {
    content: './content/index.ts',
    background: './background/index.ts',
    'popup/popup': './popup/index.ts',
    'options/options': './options/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        'src/manifest.json',
        'src/popup/index.html',
        'src/options/index.html',
        // "src/_locales"
        // 'src/icons',
      ],
    }),
  ],
});
