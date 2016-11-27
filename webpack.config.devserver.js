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
        filename: 'dist/[name].js'
   },

   resolve: {
       extensions: ['', '.js'],
       modulesDirectories: ['node_modules'],
   },

   devtool: 'source-map',

   module: {
       loaders: [{
               test: /\.scss$/,
               loader: "style!css!postcss!sass"
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

   postcss: function () {
        return [
            require('postcss-autoreset')({
                reset: 'sizes' 
            }), 
            require('autoprefixer')
        ];
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
