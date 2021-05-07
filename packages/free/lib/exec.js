/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 版本，环境验证
 */

/**
 * 1. 参数检查，
 * 2. 获取缓存配置信息|| 默认配置
 * 3.{}
 * 更新命令创建模板
 * */
const semver = require('semver')
const colors = require('colors')
const userHOME = require('user-home')
const fse = require("fs-extra");

const Package = require("./package");
const path = require("path");
const pathExists = require("path-exists");
const {readFileJson} = require("./util/fsFile");

class Command{
    constructor(appName,argv) {
        let projectSelect = []
        this.appName = appName
        this.targetPath = path.resolve(userHOME,process.env.CLI_CACHE_DIR||'.free_cli')
        let runner = new Promise((resolve, reject) => {
            let chain = Promise.resolve()
            chain = chain.then(()=>this.checkNodeVersion()) //版本严重
            chain = chain.then(()=>this.initArgs()) // 参数严重
            chain = chain.then(()=>this.init()) // 初始化
            chain = chain.then(()=>this.exec())
            chain.catch(err=>{console.log(err.message)})
        })
    }
    async init(){
        const configPath = path.resolve(this.targetPath,'config')
        // console.log(configPath)
        if(await pathExists(configPath)){
            /** 读取配置 项目配置和 组件配置*/
            // const confTempPath = require(configPath)
            this.projectSelect = await readFileJson(configPath)
            // console.log(projectSelect)
        }
        fse.mkdirpSync(configPath)
        /** 初始化配置*/
    }
    exec(){
        throw new Error('exec 必须实现')
    }

    initArgs(){

    }

    checkNodeVersion(){
        const currenrVersion = process.version
        const  lowestVersion = process.env.LOWEST_NODE_VERSION
        if(!semver.gte(currenrVersion,lowestVersion)){
            throw new Error(colors.red(`free-cli 需要安装 v${lowestVersion} 以上版本的 node.js`))
        }
    }

    /***/
    createTemplate(project){
        const storeDir = path.resolve(this.targetPath,'template',project.npmName)
       if(!pathExists(storeDir)){
           console.log('存在')
       }
       // 获取远端temp
        console.log(project.versions)
    }

}






module.exports = Command;
