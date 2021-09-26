/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 入口
 */

const {Command} = require('commander')
const program = new Command()
const path = require('path')
const index = require('../lib')

require('dotenv').config({path:path.resolve(__dirname,'../.env')})
program
  .command('create <app-name>')
  .description('创建一个新的项目')
  .option('-t,--template <template-name>','指定创建模板名')
  .option('-u, --update','更新')
  .action(index)



program.parse(process.argv)

