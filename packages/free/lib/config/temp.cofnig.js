/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

module.exports = {


  // 自定义类型
  classify:[
    { name: 'temp-cli默认模板', value: 'default' },
    { name: '个人模板', value: 'user' },
    { name: 'node模板', value: 'node' }
  ],
  // 对应模板类型值
  default:{
    options:[
      {
        name:'vue-ts', // 别名
        value:'free-vue2-admin-template', // vue
        version:'^1.0.0', // 版本
        type:'npm', // git,npm file
        path:'' ,// 地址， 路径 npm 没有
        install: false, // 自动安装环境，
      },{
        name:'vite-模板',
        value:'vite-template',
        version: '1.1.1',
        type: 'git',
        path:'https://github.com/YouAge/free-vue-admin.git',
        install:{
          tool:'yarn',
          status:true
        }
      },
      {
        name:"vue3-平台首页",
        value:'vue3-and',
        version: '1.1.1',
        type:'git',
        path: 'http://10.128.212.160/mes_develope/meshome.git'
      }
    ]
  },

  node:{
    options:[]
  }
}
