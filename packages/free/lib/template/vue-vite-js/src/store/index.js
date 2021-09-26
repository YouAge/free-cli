/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */
/// 再vue3中， 可以不使用vuex，通过hooks管理

// vuex 的使用，
/*
import { createStore } from "vuex";
import getters from "./getters.js";
// glob 动态导入，
// 直接引入 globEager
// 自动解析
const modules = {};
const moduleFile = import.meta.globEager("./modules/**.js");

Object.keys(moduleFile).forEach((fileName) => {
  modules[fileName.slice(10, -3)] = moduleFile[fileName].default;
});
Object.keys(modules).forEach((key) => {
  modules[key]["namespaced"] = true;
});

export const store = createStore({
  getters,
  modules: {
    ...modules,
  },
  // strict: process.env.NODE_ENV !== 'production'
});
*/
// import { state as useState } from "./userStatus.js";
// import getters from "./getters.js";
//
// export default {
//   getters,
//   state: {
//     user: useState,
//     getter: {},
//   },
// };

import { createPinia } from "pinia";
const store = createPinia();
export function setupStore(app) {
  app.use(store);
}

export { store };
