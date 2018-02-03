const path = require('path')

module.exports = {
  entry: [
    './src/javascripts/index.js'
  ],
  output: {
    path: __dirname,
    filename: './dist/javascripts/bundle.js'
  },
  resolve: {
    alias: {
      'ScrollMagic': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    }
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js?$/,
        exclude: /(node_modules)/
      }
    ]
  }
}
