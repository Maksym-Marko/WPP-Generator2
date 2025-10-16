const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(defaultConfig, {
  entry: {
    blocks: './src/gutenberg/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build/blocks'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: 'asset/source',
        issuer: /\.[jt]sx?$/,
      },
    ],
  },
}); 