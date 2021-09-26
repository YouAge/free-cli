/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

const inquirer = require('inquirer')
const {delPropertyOfNull} = require("./pubilc.js");



/**
 * @inquirer 选着
 * */
async function inqSelect ({
                            type = 'list', name = 'project',
                            choices = [],
                            message = '请选择下列操作，按回车键确认',
                            filer,
                          }) {
  const config =   delPropertyOfNull({
    type,
    name,
    choices,
    filer,
    message,
  })
  return await inquirer.prompt(config)
}


module.exports = inqSelect
