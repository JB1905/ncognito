const webpack = require('webpack');
const ejs = require('ejs');
const env = require('yargs').argv.env;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const { VueLoaderPlugin } = require('vue-loader');
const platform = require('platform');
const { version } = require('./package.json');

let mode;

if (env === 'build') mode = 'production';
else mode = 'development';

const config = {
  mode,
  context: `${__dirname}/src`,
  entry: {
    index: './index.js',
    background: './background.js',
    'popup/popup': './popup/popup.js',
    'options/options': './options/options.js'
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      { from: 'icons', to: 'icons', ignore: ['icon.xcf', '.DS_Store'] },
      {
        from: 'popup/popup.html',
        to: 'popup/popup.html'
      },
      {
        from: 'options/options.html',
        to: 'options/options.html'
      },
      {
        from: 'manifest.json',
        to: 'manifest.json',
        transform: content => {
          const jsonContent = JSON.parse(content);
          jsonContent.version = version;

          if (config.mode === 'development') {
            jsonContent['content_security_policy'] =
              "script-src 'self' 'unsafe-eval'; object-src 'self'";
          }

          return JSON.stringify(jsonContent, null, 2);
        }
      }
    ])
  ]
};

if (config.mode === 'development' && platform.name === 'Chrome') {
  config.plugins = (config.plugins || []).concat([
    new ChromeExtensionReloader()
  ]);
}

module.exports = config;
