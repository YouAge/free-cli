/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 文件处理
 */

const path = require("path");
const fs = require('fs');
// const userHOME = require('user-home')
/**
 * 获取目录下所以的 json文件名
 * @pathJson: 路径
 * @return：{name}
 * */

function getFileName(storeDir){
   return  fs.readdirSync(storeDir)
}


function getFileJson(pathJson,type='.json') {
    const files = getFileName(pathJson)
    return files.filter(item=>path.extname(item) === type)
}

/**
 * @ 读取数据，
 * */
function readFileJson(pathFile) {
    let jsonData = []
    let fileNames = getFileJson(pathFile)
    fileNames.forEach(file =>{
       const item = JSON.parse(fs.readFileSync(path.resolve(pathFile,file),'utf-8')) ||{}
        if(item.template && item.template.length>0){
            jsonData.push(item)
        }
    })
    return jsonData
}



// const data = path.resolve(userHOME,'.free_cli/config')
// console.log(data)
// console.log(readFileJson(data))

module.exports={
    readFileJson,
    getFileJson,
    getFileName
}
