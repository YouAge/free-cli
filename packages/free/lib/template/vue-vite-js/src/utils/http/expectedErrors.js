/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 错误状态码处理
 */
import { Mart } from "../message.js";
import { delCookies } from "../cache.js";
import { message } from "ant-design-vue";
import router from "@/router";
export const ErrorCode = {
  400: ERROR400 /** 登入错误*/,
  401: ERROR404 /** 请求错误*/,
  405: ERROR405 /** 参数错误*/,
  404: ERROR404 /** 请求错误*/,
  406: ERROR406, // 身份验证错误
};

// class ExpectedErrors {
//   constructor() {}
// }
//
// class ERROR404 extends ExpectedErrors {
//   static DEAL() {}
// }
/** 请求错误*/
async function ERROR404(code, msg = "") {
  return message.error(`请求服务器错误：${msg}`);
}

/** 身份验证错误*/
async function ERROR406(
  code,
  msg = "身份验证",
  content = "身份验证失败,是否重新登入"
) {
  const status = await Mart({
    title: `${msg}${code}`,
    content,
  });
  // 清除本地token
  delCookies();
  if (status) {
    return router.push("/login");
  } else {
    return router.push("/");
  }
}

async function ERROR405(code, msg = "请求参数错误") {
  return await Mart({
    title: `参数错误${code}`,
    content: `按规范请求：${msg}`,
  });
}

/** 登入错误*/
async function ERROR400(code, msg = "") {
  return await Mart({
    title: `登入错误`,
    content: `账号或者密码错误`,
  });
}
