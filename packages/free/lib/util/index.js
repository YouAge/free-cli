/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

const spinner = require('./spinner')
const npm = require('./npm')
const {spawn,npmInstall} = require('./public')

function sleep(timeout) {
    return new Promise((resolve => {
        setTimeout(resolve, timeout);
    }));
}

function isObject(obj){
    return Object.prototype.toString.call(obj) === '[object Object]'
}



module.exports ={
    isObject,
    spinner,
    sleep,
    npm,
    spawn,
    npmInstall
}
