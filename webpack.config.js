const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const development = NODE_ENV === 'development';

module.exports = {
    context: __dirname,

    entry: {
        main: [
            './scripts'
        ],
    },

   output: {
        path: __dirname + '/dist',
        publicPath: './dist/',
        filename: '[name].js'
   },

   resolve: {
       extensions: ['', '.js'],
       modulesDirectories: ['node_modules'],
   },

   devtool: development ? 'source-map' : null,

   module: {
       loaders: [{
               test: /\.scss$/,
               loader: "style!css!postcss!sass"
           }, {
               test: /\.js$/,
               loader: "babel",
               exclude: /node_modules/
           }, {
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

   watch: development,

   watchOptions: {
       aggregateTimeout: 100
   },

   plugins: [
     new webpack.DefinePlugin({
         NODE_ENV: JSON.stringify(NODE_ENV)
     }),
     new webpack.optimize.OccurrenceOrderPlugin(),
     new webpack.NoErrorsPlugin(),
     new webpack.optimize.UglifyJsPlugin({
         compress: {
             warnings: false
         }
    })
  ],

}
