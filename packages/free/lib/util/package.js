/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 模板远程下列
 */


const {spinner} = require("./pubilc.js");
const npminstall = require('npminstall');
const path = require("path");
const {isObject} = require("./pubilc.js");
const pathExists = require("path-exists");
const fsEx = require('fs-extra')
const { promisify } = require('util');
// 获取 registry 信息
function getNpmRegistry(isOriginal = false) {
  return isOriginal ? 'https://registry.npmjs.org' :
    'https://registry.npm.taobao.org';
}


class Package{
  constructor(storeDir,options) {
    if (!options || !isObject(options)) throw new Error('Package类的options 不能为空')
    this.options = options
    this.storeDir = storeDir// 存储路径
    this.name = options.value
    this.version = options.version
    this.path = options.path
    this.tempPath = path.resolve(this.storeDir,this.name) // 追踪模板存放的路径

  }

  // 检查，是否存在
  async checkTemp(){
    return await pathExists(this.tempPath)
  }

  // 下载
  async npmDownload(){
    await npminstall({
      root:this.storeDir, // 安装路径
      // storeDir: 'cs', // root+storeDir
      registry:getNpmRegistry(true), // 下载源
      pkgs:[
        {name:this.name ,version:this.version} //
      ]
    })
    const p = path.resolve(this.storeDir,'node_modules',this.name,'template')
    await fsEx.copy(p,this.tempPath )
    await fsEx.remove(path.resolve(this.storeDir,'node_modules'))
    return this.tempPath
  }

  // git 拉取
  async gitDownload(){
    await fsEx.remove(this.tempPath )
    // 要确保目录下一样的文件夹，否者会报错
    const download = promisify(require('download-git-repo'));
    await download(`direct:${this.path}`,`${this.storeDir}/${this.name}`,{ clone: true })
    await fsEx.remove(path.resolve(this.storeDir,'.git')) // 删除
    return this.tempPath
  }



  // 路径copy,服务器拉取
  async pathDownload(){


  }


}




// 根据不同的类型，去下载不同地方的数据
async function  downloadTemplate(storeDir,type='npm',option={},update=false,){
  const dp = new Package(storeDir,option)
  const spinnerStart = spinner('开始安装项目模板...')
  try {
    if(update || !await dp.checkTemp()){ // 是否
      return  await dp[type+'Download']()
    }
    return dp.tempPath
  }catch (e) {
    throw new Error(e.message)
  }finally {
    spinnerStart.stop(true) // 定制拉取
  }

}


module.exports = downloadTemplate
