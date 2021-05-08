/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 获取缓存
 */
const pathExists = require('path-exists')
const fse = require("fs-extra");
const path = require("path");
const {isObject} = require("./util");

class Package{
    constructor(options) {
        if (!options || !isObject(options)) throw new Error('Package类的options 不能为空')
        this.storeDir = options.storeDir // 存储路径
        this.packageName = options.packageName
        this.packageVersion = options.packageVersion
        // 安装包名
        this.npmName = options.npmName
        this.versions = options.versions

    }

    async prepare(){
        // 传教 缓存路径
        if(this.storeDir && !pathExists(this.storeDir) ){
            fse.mkdirpSync(this.storeDir)
        }
    }

    async downloadProject(){
        if(!pathExists(path.resolve(this.storeDir,`__${this.npmName}_${this.versions}`))){
            /** 安装temp*/
        }
    }


    async downloadTemplate(){

    }


}



module.exports = Package
