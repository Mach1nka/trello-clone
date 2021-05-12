const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new webpack.DefinePlugin({
      SERVER_URL: JSON.stringify(process.env.SERVER_URL || "http://localhost:3003"),
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: [require('autoprefixer')] }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    overlay: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    hot: true,
    historyApiFallback: true
  }
};
