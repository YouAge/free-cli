import axios from "axios";
import { getToken } from "../cache.js";
import { ErrorCode } from "./expectedErrors.js";
import { message as Mes } from "ant-design-vue/lib/components.js";
import vconfig from "@/config";

/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

function createApiFilter(api) {
  /**
   * 请求前
   * */

  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers[vconfig.TOKEN_NAME] = token; // 获取token
      }
      console.log(config);
      return config;
    },
    (error) => error
  );

  /**
   * 请求后
   *
   * */

  api.interceptors.response.use(
    async (response) => {
      const { data, config } = response;
      const code = data.code; // 后端自定义状态
      const message = data.message || data.msg; // 请求消息
      if (vconfig.succeedStatus.has(code)) {
        return data.data || data; //
      } else {
        const errorCode = Object.keys(ErrorCode);
        if (!errorCode.includes(code)) {
          await ErrorCode["401"](code, message);
        } else {
          await ErrorCode[code](code, message);
        }
        return Promise.reject(message);
      }
    },
    (error) => {
      Mes.error("请求接口错误", error);
      return Promise.reject(error);
    }
  );
}

export function setApiUrl(config = {}) {
  const api = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
  });
  createApiFilter(api);
  return api;
}
