'use strict';



const Command = require("./exec");
const inqSelect = require("./util/inquirer");

class InitCommand extends Command{
    /**
     * @ 后续考虑按配置动态提示是创建模板和项目等，
     * */
   async exec(){

       const {tempName} = await  inqSelect({choices:this.projectSelect,name:'tempName'})
       const tempList = this.projectSelect.find(item=>item.value === tempName)
       const {projectName} = await  inqSelect({choices:tempList.children,name:'projectName'})
        const item  = tempList.children.find(item => item.value === projectName).template
       /**
        * TODO 判断本地是否存在，再去远程拉取（远程拉去，缓存到本地，多任务进行）
        * */
        Object.assign(item,{createName:this.appName})
        this.createTemplate(item)

    }



}




function index(projectName, otherArg){

    return new InitCommand(projectName,otherArg)
}

module.exports = index;
