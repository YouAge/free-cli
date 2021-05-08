
/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

const cp = require("child_process");

function isObject(obj){
    return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * @ 清除空值，
 *  saf: { safg: { safdsag: {dsfds:''} } }, 无法清除
 * */

function delPropertyOfNull (obj){
    const copObj = {...obj}
    Object.keys(copObj).forEach(item=>{
        if(isObject(copObj[item])){
            copObj[item] = delPropertyOfNull(copObj[item])
        }
        if(!copObj[item] || (Array.isArray(copObj[item]) && copObj[item].length === 0) ) delete copObj[item]
    })
    return copObj
}



function spawn(command,args,options){
    const win32 = process.platform === 'win32'
    const cmd = win32?'cmd':command
    const cmdArgs =win32?['/c'].concat(command,args):args
    return new Promise((resolve, reject) => {
        const child  =  cp.spawn(cmd,cmdArgs,options ||{})
        child.on('error',e => {
            process.exit(1)
            reject(e)
        })
        child.on('exit',e=>{
            process.exit(e)
            resolve(e)
        })
    })

}




module.exports ={
    isObject,
    delPropertyOfNull
}
