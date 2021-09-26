/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

const path = require('path')
const  HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin  = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const {VueLoaderPlugin} = require('vue-loader/dist/index.js')

const resolve = (p) => path.resolve(__dirname, p);
module.exports = {
    mode: 'development',
    entry: resolve('src/main.js'),
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname,'dist')
    },
    resolve: {
      extensions: ['.js','.jsx', '.vue', '.ts', '.tsx'],
      alias: {
        '@': resolve('src'),
      },
    },
    /**
     * 本地启动器配置
     * */
    devServer: {
      port:7845,
      host:'0.0.0.0',
    },
    optimization: {
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
    plugins: [
      new CleanWebpackPlugin(), //清除打包
      new VueLoaderPlugin(), // 解析vue3 模板

      // 压缩css配置
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:7].css',
        chunkFilename: 'css/[name].[hash:7].css',
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html", // 模板入口
        filename: "index.html",
        title: "Webpack App", // 在模板中动态配置 <%= htmlWebpackPlugin.options.title %>
        minify:{
          collapseWhitespace: true, // 取掉空格
          removeComments:  true, // 取掉注释
        }
      }),
    ],
    module: {
      rules: [
        {test: /\.vue$/, use: ['vue-loader']}, // 配置vue模板解析
        {test: /\.m?(js|jsx)$/, use:{
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets:['@babel/preset-env']
            }
          },
          exclude: /node_modules/,
        },
        // css 配置
        {test: /\.css$/, use: [MiniCssExtractPlugin.loader,  'css-loader',{
            loader: "postcss-loader",
            options: {
              sourceMap:true,
              postcssOptions:[
                'postcss-preset-env' // 在package.json 中配置了browserslist{}
              ]
            }
          }]}, // 'style-loader',
        {test: /\.less$/, use: [ MiniCssExtractPlugin.loader,'css-loader',  'postcss-loader', 'less-loader']}, //'style-loader',
        {test: /\.(jpg|png|jpeg|gif|bmp)$/,use: {
            loader: 'url-loader',
            options: {
              limit: 1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  // name: '[name].[ext]'
                  name: '[name].[hash:7].[ext]',
                }
              }
            }
          }
        },
        // {test: /\.(mp4|ogg|mp3|wav)$/, use: {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 1024,
        //       fallback: {
        //         loader: 'file-loader',
        //         options: {
        //           name: '[name].[ext]'
        //         }
        //       }
        //     }
        //   }},
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 10000,
            name: 'media/[name].[hash:7].[ext]',
          },
          exclude: /(node_modules|bower_components)/,
        },
        // 字体处理
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 10000,
            name: 'font/[name].[hash:7].[ext]',
          },
          exclude: /(node_modules|bower_components)/,
        },
      ]
    }


}
