'use strict';



const Command = require("../exec");

class InitCommand extends Command{


}




function index(projectName, otherArg){

    return new InitCommand(projectName,otherArg)
}

module.exports = index;
