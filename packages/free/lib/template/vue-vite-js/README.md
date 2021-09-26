
# MES-驾驶舱

2021-08-19 
--

1. 项目采用vite + vue3 + and Design组件 重构了前端

**推介三款组件库**
> [and Design组件库](https://2x.antdv.com/components/tooltip-cn/#API) 阿里系的组件库非常好用
> [element-plus](https://element-plus.org/) 注意版本 vue3：element-plus  vue2：element //非常有学习价值的组件库
> [vxe-table](https://xuliangzhan_admin.gitee.io/vxe-table/v4/) 非常强大的表格组件库， 推介使用 
> [iconfont](https://www.iconfont.cn/) 阿里系 图标库， 使用非常方便，参考项目中使用


## 启动使用

**本地必须配置 `node.js`环境， 且 `node.js` >= `12.0.0`**

> 1. 项目环境安装  `npm i`  
> 2. 启动 `npm run dev` || `npm run mock`
> 3. 打包编译 `npm run build`


## 部署

```shell
$1. 直接采用 iis 部署， 将打包后的文件放入发布网站的路径下
$2. 采用 后端集成方式部署
   -- 1.将打包后的文件放入后端的静态文件目录下
   -- 2.后端渲染的模板中添加， manifest.json 文件中的 静态资源  
    例如：
<link rel="stylesheet" href="/assets/{{ manifest['main.js'].css }}" />
<script type="module" src="/assets/{{ manifest['main.js'].file }}"></script>

    "index.html": {
    "file": "assets/index.6f3655f7.js",
    "src": "index.html",
    "isEntry": true,
    "imports": [
      "_vendor.bab2d22b.js"
    ],
#    "dynamicImports": [
#      "src/views/error-page/Error404.vue",
#      "src/views/home/home.vue",
#      "src/views/login/index.vue",
#      "src/views/test/index.vue"
#    ],
    "css": [
      "assets/index.88b9e973.css"
    ]
  }

```


## 项目介绍，

> 项目使用的是最新的 vue推广的 vite打包工具，相比webpack更加的快速启动

1.项目接口采用了vue常用的目录 src主业务文件views是页面 components是公共组件 utils是公共方法 
hook是vue3的新特性（类似公共的方法封装， 多个页面是直接使用）


## router 路由文件
> `default-routes.js` 初始话的路由菜单， 
> `index.js` 路由入口接口，再main中引入注册
>  `router-filter.js` 路由权限管控， 比如需要登入或者身份验证的权限的页面，可以再这里配置好权限
```javascript
// 路由的全局钩子方法， 具体的可以查看 vue-router4 的文档， 只要了学习几个路由的构造函数就可以了，非常简单
beforeEach(){} //== >访问路由前
afterEach(){} // 访问成功后

// 权限管控， 需要使用到动态路由的注册， 这类方法有2中， 
/**
 * 1. 前端自己分配好每个权限角色， 一般是在路由 meta中添加一个权限字段， 通过后端给的角色来判定是否具备该路由， 目前kappa中是这样使用的
 * 2. 路由菜单放到后端数据库，通过请求后，或者路由， 对比前端的菜单，拿到相同的，注册路由、、 目前物料管理系统中是这样的使用的
 * */
```

## 配置文件

> .env .env.development .env.mock .env.production  ... 这是 vite自带了.env配置环境
**使用**
再package.json 中配置启动命令， 可以启动对应的配置环境
```json
  "scripts": {
  "dev": "vite", // 默认使用的是  .env.development 开发环境
    "mock": "vite --mode mock", // 启动 自定义的 .env.mock 环境
    "build": "vite build", //默认使用的是 .env.production  开发环境
    "serve": "vite preview"
}
```
> 不管在什么环境下， .env都会被加载，输入公共环境配置， 可以通过 `process.env` 查看
>根据这个例子，就可以看出， `--mode mock` 后面就是对应的配置名， .env.mock 同理 大家可以配置多个不同环境下的配置，
> `env.d.ts` 文件中主要是配置提示配置的变量，方便再使用 `import.meta.env.` 的时候有提示





