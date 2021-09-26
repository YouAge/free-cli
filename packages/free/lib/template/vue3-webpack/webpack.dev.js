/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */


const WebpackMerge = require('webpack-merge');
const common = require('./bulid/webpack.common.js');
const path = require('path')
module.exports = WebpackMerge.merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  /**
   * 本地启动器配置，
   *
   * 默认情况下，devServer读取打包后的路径，
   * */
  devServer: {
    // contentBase:path.resolve(__dirname,'dist'), // 指定缓存文件路径， 存入内存中
    // compress: true, // 是否压缩
    // writeToDisk: true, // 写入硬盘中，方便查看
    port:7845,
    host:'0.0.0.0',

  },
});
