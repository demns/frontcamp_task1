var path = require('path');
var webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:8080/',
            './scripts'
        ],
    },

   output: {
        path: __dirname + '/dist',
        publicPath: './dist/',
        filename: 'dist/bundle.js'
   },

   resolve: {
       extensions: ['', '.js'],
       modulesDirectories: ['node_modules'],
   },

   devtool: 'source-map',

   module: {
       loaders: [{
               test: /\.scss$/,
               loader: "style!css!sass"
           }, {
               test: /\.js$/,
               loader: "babel",
               exclude: /node_modules/
           },{
               test: /\.html$/,
               loader: "raw"
           }
       ]
   },

   devServer: {
       port: 8080,
       inline: true,
       hot: true,
       colors: true,
       stats: {
           colors: true
       }
   },

   plugins: [
     new webpack.DefinePlugin({
         NODE_ENV: JSON.stringify(NODE_ENV)
     }),
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoErrorsPlugin(),
  ],

}
