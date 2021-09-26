import axios from "axios";
import { getToken } from "../cache";
import vconfig from "@/config";
import { message as Mes } from "ant-design-vue";
const succeedCode = new Set([200, "200", "1", 1, "205"]);
import { ErrorCode } from "./expectedErrors.js";
const api = axios.create({
  baseURL: vconfig.BASE_URL,
  timeout: 50000,
});

/**
 * 使用createApi.js
 * **/

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

api.interceptors.response.use(
  async (response) => {
    const { data, config } = response;
    const code = data.code; // 后端自定义状态
    const message = data.message || data.msg; // 请求消息
    if (succeedCode.has(code) || code.includes("20")) {
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

export default api;
