#!/usr/bin/env node
/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 入口
 */

const { Command } = require('commander');
const program = new Command();

const index = require('../lib')
// 定义显示模块的版本号
program.version(require('../package.json').version);

program
    .command('create <app-name>')
    .description('创建一个新的项目')
    .option('-v, --vue','创建vue 的模板')
    .option('-f, --force','强制创建项目')
    .action(index)

program
    .command('config')
    .description('配置信息修改')

program.parse(process.argv)
