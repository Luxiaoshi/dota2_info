var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    players: './public/javascripts/players.js',
    index: './public/javascripts/index.js',

  },
  output: {
    path: path.resolve(__dirname, './public/javascripts'), // 输出文件的保存路径
    filename: '[name].bundle.js' // 输出文件的名称
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};