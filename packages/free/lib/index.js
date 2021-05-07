'use strict';



const Command = require("./exec");
const InqSelect = require("./util/inquirer");

class InitCommand extends Command{
    /**
     * @ 后续考虑按配置动态提示是创建模板和项目等，
     * */
   async exec(){

       const {project} = await new InqSelect({choices:this.projectSelect}).select()
       const temp = this.projectSelect.find(item=>item.value === project)
       console.log(temp)
       const data = await new InqSelect({choices:temp.template}).select()
       console.log(data)
       /**
        * TODO 根据包 去下载对应的模板
        * */
    }



}




function index(projectName, otherArg){

    return new InitCommand(projectName,otherArg)
}

module.exports = index;
