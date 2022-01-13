import webpack from 'webpack'
import path from 'path'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
const ENV = process.env.NODE_ENV || 'development'

module.exports = {
  context: path.resolve(__dirname, 'src'),

  optimization: {
    minimize: ENV === 'production',
    minimizer: [new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        compress: {
          negate_iife: false,
          properties: false,
          ie8: true
        },
        mangle: {
          ie8: true
        },
        output: {
          comments: false,
          ie8: true
        }
      }
    })],
    noEmitOnErrors: true
  },

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'location-autocomplete.min.js',
    library: 'openregisterLocationPicker',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'src'),
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: ([
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]),

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },

  mode: ENV === 'production' ? 'production' : 'development',
  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    devMiddleware: {
      publicPath: '/dist/'
    },
    static: [
      './examples',
      './' // So that ../dist/location-autocomplete-graph.json maps to the same file both with dev server and without.
    ],
    historyApiFallback: true,
    open: true,
    allowedHosts: 'all'
  }
}
