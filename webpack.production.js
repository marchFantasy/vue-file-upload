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
  // example: if you wish to apply custom babel options
  // instead of using vue-loader's default:
  babel: {
    presets: ['es2015','stage-0'],
    plugins: ['transform-runtime']
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
