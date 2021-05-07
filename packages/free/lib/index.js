'use strict';



const Command = require("./exec");
const InqSelect = require("./util/inquirer");

class InitCommand extends Command{
    /**
     * @ 后续考虑按配置动态提示是创建模板和项目等，
     * */
   async exec(){

       const {project} = await new InqSelect({choices:this.projectSelect}).select()
        console.log(project)
       const temp = this.projectSelect.find(item=>item.value === project)
       const data = await new InqSelect({choices:temp.template}).select()
        const item  = temp.template.find(value => value.value === data.project).template
        console.log(item)
       /**
        * TODO 判断本地是否存在，再去远程拉取（远程拉去，缓存到本地，多任务进行）
        * */
        this.createTemplate(item)

    }



}




function index(projectName, otherArg){

    return new InitCommand(projectName,otherArg)
}

module.exports = index;
