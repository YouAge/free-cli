/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 创建page模板
 */

const pathExists = require('path-exists')
const fse = require('fs-extra')
const path = require("path");
const inqSelect = require("./util/inquirer");
const {ejsCompile,writeFile,mkdirSync} = require('./util')

class CreatePage{

  constructor(pageName,otherArg) {
    this.pageName = pageName
    this.otherArg = otherArg
    this.localPath =''
    let runner = new Promise((resolve, reject) => {
      let chain = Promise.resolve()
      chain = chain.then(()=>this.checkProjectName()) // 参数严重
      chain = chain.then(()=>this.initArgs()) // 参数严重
      chain = chain.then(()=>this.init()) // 初始化配置
      chain.catch(err=>{console.log(err.message)})
    })
  }

  initArgs(){
    /** 检查有没有带参数，有直接跳过， 没过默认选这*/
    console.log('参数',this.otherArg)
  }
  async init(){
    const projectSelect = [
      {name:'vue2模板',value:'vue2'},
      {name:'vue3模板',value:'vue3-ts'}
      // {name:'react模板',value:'react'}
    ]
    const {tempName} = await  inqSelect({choices:projectSelect,name:'tempName'})
    this.handleEjsFile(tempName)
  }

  async handleEjsFile(temName){
    // 获取模板
    const templatePath = path.resolve( path.resolve(__dirname,'./template'),`${temName}.ejs`)
    // todo 需要对 app_name 的名字转成 appName 的处理
    const result = await ejsCompile(templatePath, {name:this.pageName, lowerName: this.pageName.toLowerCase()});
    // 2.写入文件中
    // 判断文件不存在,那么就创建文件
    writeFile(path.resolve(this.localPath,'index.vue'),result)
    console.log('创建完成')

  }

  /** 检查但前目录下是*/
  async checkProjectName(){
    this.localPath = path.resolve(process.cwd(),this.pageName)
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
          const {pageName} = await inqSelect({
            type:'input',
            name:'pageName',
            message:'请输入新的名字'
          })
          /** TODO 验证项目名*/
          this.pageName = pageName
          this.localPath = path.resolve(process.cwd(),this.pageName)
        }
      }
    }
    /** 创建文件*/
    fse.mkdirpSync(this.localPath)
  }

}



function createPage(pageName, otherArg){

  return new CreatePage(pageName,otherArg)
}

module.exports = createPage;
