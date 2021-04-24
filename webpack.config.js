const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('regenerator-runtime/runtime');

module.exports = {
  entry: './app/index/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env',
            '@babel/react', { plugins: ['@babel/plugin-proposal-class-properties'] }],
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpe?g|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
      },
    ],
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'app/assets/favicon.png',
      template: 'app/index/index.html',
      options: {
        historyApiFallback: {
          index: 'dist/',
        },
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
  },

};
