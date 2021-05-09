/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: ejs 模板编译
 */

const ejs = require('ejs');


const ejsCompile = (templatePath, data={}, options = {}) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {data}, options, (err, str) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(str);
    })
  })
}



module.exports ={
  ejsCompile
}