# `free-cli`

> TODO: description

## Usage

```
const index = require('index');

// TODO: DEMONSTRATE API
```

配置和维护自己的项目模板版本



## free-cli设计流程图

>

## 使用

>

1. **安装**
```shell
npm install @free-tool/cli -g
```


2. 命令

```shell
# 创建项目模板
free create projectName 
  - -y
  - -v
#添加组件，page页面  
free page appName 
  -v,--vue
  -r,--react
```







3. **自由配置模板选项和功能**

> 用户路径下会有一个 `.free-cli` 文件夹。
> `config` 文件下，创建一个或者多个json文件 配置
> `template` 缓存远端的模板，加速创建时间


配置自定义项目模板，
再用户目录下 `.free_cli\config`没有就创建，
在`config`文件夹下创建任意json文件,模板如下

```json
{
  "default_template": true,
  "classify": [
    {
      "name": "前端模板",
      "value": "html"
    },
    {
      "name": "管理模板",
      "value": "node"
    }
  ],
  "node": {
    "option": [
      {
        "name": "node-koa接口模板-js版本",
        "value": "node-koa-temp",
        "version": "1.0.0",
        "type": "git",
        "path": "https://github.com/YouAge/free-vue-admin.git'",
        "install": {
          "tool": "yarn",
          "status": true
        }
      }
    ]
  },
  "html": {
    "option": [
      {
        "name":"vue2-admin pc管理项目模板", // 别名
        "value":"free-vue2-admin-template", // vue
        "version":"^1.0.0", // 版本
        "type":"npm", // git,npm file
        "install": false, // 自动安装环境，
      }
    ]
  }
}
```



## 自定义项目模板包发布NPM上

```
free-vue2-admin //npmName
  -template //项目模板
    ... 
    -package.json 
  -package.json //版本管理
```




## free-cli使用的插件

- lerna
- semver
- colors
- inquirer
- ejs
- fs-extra
- glob
- npminstall
- semver
- dotenv
