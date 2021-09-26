'use strict';


const Command = require("./exec");
const inqSelect = require("./util/inquirer.js");
const downloadTemplate = require("./util/package.js");
const {spawn} = require("./util/pubilc.js");
const fsEx = require('fs-extra')
const colors = require('colors')
class InitCommand extends Command{
  // 运行
  async start(){
     // 选择对应模板
    const {project} = await inqSelect({
      type:'list',
      message:'选择需要创建项目类型',
      choices: this.config.classify
    })
    if(this.config[project]){
      const {value} = await inqSelect({message:'请选择项目模板', name:'value',choices: this.config[project].options})
      console.log(value)
      // 获取到项目模板信息
      const createTemp = this.config[project].options.find(item=>item.value === value)
      // const spinnerStart = spinner('开始安装项目模板...')
      //本地模板查看，存在，直接下载， 不存在，
      const tempPath = await downloadTemplate(this.configPath,createTemp['type'],createTemp,true)
      await fsEx.copy(tempPath, this.localPath)
      // TODO 安装，显示和返回， 需要修改
      const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
      // const npm = process.platform === 'win32' ? 'yarn.cmd' : 'yarn';
      await spawn(npm, ['install'], { cwd: `${this.localPath}` });
      colors.dim(`================项目初始化完成===================\t \n\n  cd ${this.appName} `)
    }else {
      throw new Error('您为配置该类型的项目模板，请先配置， --具体配置规则请参考xxxxx')
    }

  }




  // 验证参数
  checkArgs(){
    if(this.argv.template){
      // 获取当前存在的模板项目名， 判断是否存在
      this.config
      console.log('子')
    }
  }


  // 模板下载

}


function index(projectName,otherArg) {
    // TODO
  return new InitCommand(projectName,otherArg)
}








module.exports = index;
