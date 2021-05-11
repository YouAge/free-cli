#!/usr/bin/env node
/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 入口
 */

const { Command } = require('commander');
const program = new Command();
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname,'../.env')});

const index = require('../lib')
const createPage = require('../lib/createPage')
// 定义显示模块的版本号
program.version(require('../package.json').version);

program
    .command('create <app-name>')
    .description('创建一个新的项目')
    .option('-f, --force [path]','强制创建项目')
    .option('-g, --git [path]','git拉取项目模板')
    .option('-p, --path [path]', '本地获取')
    .action(index)

program
    .command('config')
    .description('配置信息修改')

program
  .command('page <bag-name>')
  .description('创建一个新的vue或者react页面,或者组件')
  .option('-v, --vue','创建vue的页面')
  .option('-r, --react','创建react的页面')
  .action(createPage)

program.parse(process.argv)
