/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 创建page模板
 */


class CreatePage{

  constructor(pageName,otherArg) {

  }

}



function createPage(pageName, otherArg){

  return new CreatePage(pageName,otherArg)
}

module.exports = createPage;
