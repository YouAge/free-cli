import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
// import { store } from "./store";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import { setupStore } from "./store";
/** 导入bootstrap 如果出现错误， npm i --save popper.js 需要安装一下这个 */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// css 动画框架
import "animate.css";

/** 导入自定义样式*/
import "./style/index.less";
import { customSetup, customTitle } from "./utils/instruction.js";

import "./utils/flexible.js";
const app = createApp(App);

setupRouter(app);
// setupAntd(app) // 挂载 ant-design 组件库
app.use(Antd);
customSetup(app); // 挂载自定义指令
customTitle(app);
// app.use(store);
setupStore(app);
// console.log(store);
// 挂载全局vue实例上
// app.config.globalProperties.$store = store;
app.mount("#app");
