/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

// import { loadEnv } from "../../build/utils.js";
//
// console.log(process.env);
// loadEnv();
// console.log(import.meta.env, JSON.parse(import.meta.env.VITE_SUCCEED_STATUS));

//基本上都是staring
export default {
  TOKEN_NAME: import.meta.env.VITE_TOKEN_NAME,
  cookieExpires: 3,
  succeedStatus: new Set(JSON.parse(import.meta.env.VITE_SUCCEED_STATUS)),

  // api 配置
  BASE_URL: import.meta.env.VITE_BASE_URL,
  BOARDS_URL: import.meta.env.VITE_BOARDS_URL,
};
