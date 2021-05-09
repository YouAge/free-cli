/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 获取缓存
 */
const pathExists = require('path-exists')
const fse = require("fs-extra");
const npminstall = require('npminstall');

const {isObject,spinner,npm} = require("./util");


class Package{
    constructor(options) {
        if (!options || !isObject(options)) throw new Error('Package类的options 不能为空')
        this.storeDir = options.storeDir // 存储路径
        this.packageName = options.packageName
        this.packageVersion = options.packageVersion
    }

    async prepare(){
        // 获取最新版本
        if(!pathExists(this.storeDir) ){
            fse.mkdirpSync(this.storeDir)
        }
        const latestVersion = await npm.getNpmLatestSemverVersion(this.packageName,this.packageVersion)
        if(latestVersion){
            this.packageVersion = latestVersion
        }

    }

    async install(){
        await this.prepare() // 获取最新的版本号
        // 安装
        return npminstall({

        })
    }

    async installTemplate(){
        // 安装模板
        let spinnerStart = spinner('正在安装模板...')
    }

}



module.exports = Package
