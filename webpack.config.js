const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    bundle: __dirname + '/src/app/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
   },
   plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
   ],
	  devServer: {
	      contentBase: './src/public'
	  },
   devtool: 'source-map',
   module: {
     rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'eslint-loader'
    }, { 
        test: /\.js$/,
        exclude: /node_modules/,
       use: 'babel-loader'
    }, {
        test: /(\.css|\.scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }]
   }  
};
