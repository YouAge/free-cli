/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

const inquirer = require('inquirer')


/**
 * @inquirer 选着
 * */



class InqSelect {
    constructor({
                    type = 'list', name = 'project',
                    choices = [],
                    message = '请选择下列操作，按回车键确认',
                    filer,
                }) {
        if( !filer && typeof filer !== 'function'){
            filer = this.filter
        }
        this.config = {
            type,
            name,
            choices,
            filer,
            message: '请选择下列操作，按回车键确认',
        }
        /** TODO
         * 处理空值 config
         * */

    }

    async select() {
        return await inquirer.prompt(this.config)
    }

    filter(v){
        return v
    }


}


module.exports = InqSelect
