import Cookies from "js-cookie";
import config from "../config";

/** 设置token */
export function setToken(
  value,
  option = { expires: config.cookieExpires || 3 }
) {
  return Cookies.set(config.TOKEN_NAME, value, { ...option });
}
export function getToken() {
  return Cookies.get(config.TOKEN_NAME) || "";
}

/** 设置cookies { expires: cookieExpires || 3 } */
export function setCookies(name, value = "", optiont = {}) {
  return Cookies.set(name, value, {
    ...optiont,
    domain: "10.128.19.168",
    path: "/",
    expires: config.cookieExpires || 3,
  });
}
/**获取cookies */
export function getCookes(name) {
  return Cookies.get(name) || "";
}

/** 删除token */
export function delCookies(name = "all") {
  const key = Cookies.get();
  if (name === "all") {
    Object.keys(key).forEach((item) => Cookies.remove(item));
  } else {
    return Cookies.remove(name);
  }
}
