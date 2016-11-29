
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './demo/index.js',
  output: {
    path: './build',
    publicPath: 'build/',
    filename: 'build.js'
  },
  resolve:{
      extensions: ['', '.js', '.vue'],
      fallback: [path.join(__dirname, 'node_modules')],
      alias:{
          'vue$': 'vue/dist/vue.js'
      }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=[name].[ext]?[hash]'
      }
    ]
  },
  plugins:[
      new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV':'"development"'
          }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
  ],
  devtool : 'cheap-source-map'
}
