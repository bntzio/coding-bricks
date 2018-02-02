module.exports = {
  entry: [
    './src/javascripts/index.js'
  ],
  output: {
    path: __dirname,
    filename: './dist/javascripts/bundle.js'
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
