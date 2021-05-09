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
const inqSelect = require("./util/inquirer");
const fs = require("fs");
const {getFileName} = require("./util/fsFile");
const {readFileJson} = require("./util/fsFile");

class Command{
    constructor(appName,argv) {
        this.projectSelect = []
        this.appName = appName
        this.localPath = ''
        this.targetPath = path.resolve(userHOME,process.env.CLI_CACHE_DIR||'.free_cli')
        if(process.env.READ_DEFAULT){
            this.showDefault()
        }
        let runner = new Promise((resolve, reject) => {
            let chain = Promise.resolve()
            chain = chain.then(()=>this.checkNodeVersion()) //版本严重
            chain = chain.then(()=>this.initArgs()) // 参数严重
            chain = chain.then(()=>this.init()) // 初始化配置
            chain = chain.then(()=>this.exec())
            chain.catch(err=>{console.log(err.message)})
        })


    }
    async init(){
        const configPath = path.resolve(this.targetPath,'config')
        if(await pathExists(configPath)){
            /** 读取配置 项目配置和 组件配置*/
            this.projectSelect =[...await readFileJson(configPath),...this.projectSelect]
        }

        fse.mkdirpSync(configPath)
        /** 初始化配置*/
    }
    exec(){
        throw new Error('exec 必须实现')
    }

    async initArgs(){
        if(!this.argv.force){
            await this.checkProjectName()
        }
    }

    /** 检查但前目录下是*/
    async checkProjectName(){
        this.localPath = path.resolve(process.cwd(),this.appName)
        if(await pathExists( this.localPath )){
            const {project} = await  inqSelect({
                type:'list',
                message:"创建的项目名已存在，选择下列操作",
                choices:[
                    { name: 'Overwrite', value: 'overwrite' },
                    { name: 'Merge', value: 'merge' },
                    { name: 'Cancel', value: false }
                ]
            })
            if(!project){
                throw new Error('您取消了操作')
            }else {
                if(project === 'overwrite'){
                    const {appName} = await inqSelect({
                        type:'input',
                        name:'appName',
                        message:'请输入新的名字'
                    })
                    /** TODO 验证项目名*/
                    this.appName = appName
                }
            }
        }
        /** 创建文件*/
        fse.mkdirpSync(this.localPath)
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

    /**
     * @读取本地配置
     * */
     showDefault(){
         const defaultPath = path.resolve(__dirname,'config')
           this.projectSelect =  readFileJson(defaultPath)

    }
}






module.exports = Command;
