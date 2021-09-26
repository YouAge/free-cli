import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import { svgBuilder } from "./src/plugins/svg-builder.js";
import vueJsx from "@vitejs/plugin-vue-jsx";
// 首次运行错误可输入: node .\node_modules\vite-plugin-mock\node_modules\esbuild\install.js
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  //command： build、serve  2中启动模式,  mode 启动的环境配置
  return {
    /** 服务端设置*/
    server: {
      https: false,
      host: "0.0.0.0",
      port: 9983,
      open: false,
      //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      // 设置本地代理

      proxy:
        mode === "mock"
          ? {
              "/api": {
                target: "http://10.128.212.75:9983",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
              },
            }
          : {},
    },

    /** 别名配置*/
    base: "./",
    resolve: {
      alias: {
        "@": path.resolve("src"),
        comps: path.resolve("src/components"),
        api: path.resolve("src/apis"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    /***css 全局配置 */
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve(
              "src/style/index.less"
            )}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
    build: {
      cssCodeSplit: true, // 启用 禁用css拆分
      sourcemap: true, // 构建后是否生成source map 文件
      chunkSizeWarningLimit: 800, // 打包大小警告限制
      // 后端集成使用编译后的 https://cn.vitejs.dev/guide/backend-integration.html
      manifest: true, // 开启后，支持后端渲染部署，生成对应的 manifest.json
      // rollupOptions: {
      //   // 覆盖默认的 .html 入口
      //   input: "/src/main.js",
      // },
    },
    plugins: [
      vue(),
      vueJsx(),
      svgBuilder("./src/assets/icons/"),
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve" && mode === "mock", //设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
        prodEnabled: false, // command !== "serve" && true, //设置打包是否启用 mock 功能
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内  默认注入为项目根目录下src/main.{ts,js}
        injectCode: `
          import { setupProdMockServer } from './mock';
          setupProdMockServer();
        `,
        logger: true,
      }),
    ],
  };
});
