
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'vuefileupload':'./src/vue-file-upload.vue'
  },
  output: {
    path: './production',
    publicPath: 'production/',
    filename: '[name].min.js',
    library: 'vuefileupload',
    libraryTarget: 'umd'
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
            NODE_ENV: '"production"'
          }
        }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}
