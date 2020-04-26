const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')

const devConfig = {
  devServer: {
    contentBase: './dist',
    stats: 'errors-only',
    hot: true,
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports = merge(base, devConfig)
