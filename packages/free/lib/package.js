/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 获取缓存
 */
const pathExists = require('path-exists')
const fse = require("fs-extra");
const npminstall = require('npminstall');
const path = require('path')
const {isObject,spinner,npm,npmInstall} = require("./util");


class Package{
    constructor(options) {
        if (!options || !isObject(options)) throw new Error('Package类的options 不能为空')
        this.targetPath = options.targetPath // root 路径
        this.storeDir = '' // 存储路径
        this.packageName = options.packageName
        this.packageVersion = options.packageVersion
       this.npmFilePathPrefix = this.packageName.replace('/', '_');
    }

    npmFilePath() {
      return path.resolve(this.storeDir, `_${this.npmFilePathPrefix}@${this.packageVersion}@${this.packageName}`);
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
          root: this.targetPath,
          storeDir: this.storeDir,
          registry: npm.getNpmRegistry(process.env.NPM_ORIGIN),
          pkgs: [{
            name: this.packageName,
            version: this.packageVersion,
          }]
        })
    }

    async downloadTemplate(){
        // 安装模板
        let spinnerStart = spinner('正在处理模板...')
        this.storeDir = path.resolve(this.targetPath,'templates')
        const lateSourcePath = this.npmFilePath()
        if(!await pathExists(this.storeDir) || !await pathExists(lateSourcePath)){
          fse.mkdirpSync(this.storeDir)
          await this.install()
        }
        const templatePath = path.resolve(lateSourcePath, 'template');
        spinnerStart.stop(true)
        return templatePath
    }
    async installTemplate({temp,templatePath,createPath}){
      let spinnerStart = spinner(`正在安装模板...`);
      fse.ensureDirSync(createPath)
      fse.ensureDirSync(templatePath)
      fse.copySync(templatePath,createPath)
      /** 配置*/
      const ejsIgnore =[
        '**/node_modules/**',
        '**/.git/**',
        '**/.vscode/**',
        '**/.DS_Store',
      ]
      if(temp.ignore){
        ejsIgnore.push(...temp.ignore)
      }
      spinnerStart.stop(true);
      await npmInstall(createPath)

    }



}



module.exports = Package
