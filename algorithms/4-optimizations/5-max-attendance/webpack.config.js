const path = require('path');

const publicFolder = path.join(__dirname, 'public');

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: publicFolder,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  devtool: 'source-map'
};
