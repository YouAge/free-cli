/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 基类 版本检查
 */


const semver = require('semver')
const colors = require('colors')
const path = require("path");
const pathExists = require("path-exists");
const fse = require("fs-extra");
const inqSelect = require("./util/inquirer.js");
const config = require('./config/temp.cofnig.js')
const userHOME = require('user-home')
class Command{

  constructor(appName,argv) {
    this.appName = appName
    this.argv = argv
    this.localPath = null // 项目路径
    this.config = config
    this.configPath = null
    let runner = new Promise((resolve, reject) => {
      let chain = Promise.resolve()
      chain = chain.then(()=>this.checkNodeVersion()) //版本严重
      chain = chain.then(()=>this.checkPath()) // 检查当前路径下是否重名
      chain = chain.then(()=>this.checkArgs()) // 验证参数
      chain = chain.then(()=>this.loadConfig()) // 加载配置文件
      chain = chain.then(()=> this.start()) // 运行
      chain.catch(err=>colors.red(err.message))
    })

  }

  start(){}

  async loadConfig(){
     //读取配置文件
    this.configPath = path.resolve(userHOME,process.env.CLI_CACHE_DIR) // 用户首页下
    if(await pathExists(this.configPath)){
      // 存在，检索内部配置文件，temp.config.js // temp.config.json //
    }else {
      fse.mkdirpSync(this.configPath)
    }

  }

  /**
   * 检查环境
   * */
  checkNodeVersion(){
    const currVersion = process.version
    const  lowestVersion = process.env.LOWEST_NODE_VERSION
    if(!semver.gte(currVersion,lowestVersion)){
      throw new Error(colors.red(`free-cli 需要安装 v${lowestVersion} 以上版本的 node.js`))
    }
  }


  // 验证参数
  checkArgs(){}

  // checkPath
  async checkPath(){
    // 获取当前指向命令的路径
    this.localPath = path.resolve(process.cwd(),this.appName) // 项目路径
    if(await pathExists(this.localPath)){
      // 已存在的文件项目
      const {project} = await inqSelect({
        type:'list',
        message:'项目吗已经存在了，选择下列操作',
        choices:[
          { name: 'Overwrite（重新命名）', value: 'overwrite' },
          { name: 'Merge（忽略，合并）', value: 'merge' },
          { name: 'Cancel（取消，退出）', value: false }
        ]
      })
      if(!project){
        throw new Error('您取消了操场')
      }else {
        if(project === 'overwrite'){
          await this.overwrite()
        }
      }
    }
  }


  async  overwrite(){
    // 重写
    const {appName} = await inqSelect({
      type:'input',
      name:'appName',
      message:'请输入新的名字'
    })
    this.appName = appName
    await this.checkPath()
    // 创建项目
    fse.mkdirpSync(this.localPath)
  }


}




module.exports = Command
