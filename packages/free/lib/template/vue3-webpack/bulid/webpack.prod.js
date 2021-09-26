/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 打包配置
 */

const WebpackMerge  = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const CssMinimizerPlugin  = require('css-minimizer-webpack-plugin')

module.exports = WebpackMerge.merge(common,{
  mode: "production",  // 通过启动命令 webpack --mode=development 来自定义配置环境名字，默认 production
  optimization: {
    emitOnErrors: true, //  在编译时每当有错误时，就会 emit asset
    // 分离chunks
    splitChunks: {
      chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial', // 只打包初始时依赖的第三方
        },
      },
    },
    minimize: false, // 是否压缩
    usedExports: true,      //未被使用的exports不会被导出到bundle中
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          level: {
            1: {
              roundingPrecision: "all=3,px=5",
            },
          },
        },
        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
    ]
  },
  plugins:[

  ]
})
