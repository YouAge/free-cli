/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

const spinner = require('./spinner')
const npm = require('./npm')
const {spawn,npmInstall} = require('./public')
const {ejsCompile} = require('./ejs')
const {writeFile} = require('./fsFile')
const log = require('./log')

function sleep(timeout) {
    return new Promise((resolve => {
        setTimeout(resolve, timeout);
    }));
}

function isObject(obj){
    return Object.prototype.toString.call(obj) === '[object Object]'
}

/** 验证项目明，不能有大写*/
function checkAppName(appName){
   const re = /^([a-z_][a-z0-9_]*)+([.][a-z_][a-z0-9_]*)+$/
    if(re.test(appName)){
        console.log('合格')
    }else {
        console.log('失败')
    }

}


module.exports ={
    isObject,
    spinner,
    sleep,
    npm,
    spawn,
    npmInstall,
    checkAppName,
  ejsCompile,
  writeFile,
  log
}
