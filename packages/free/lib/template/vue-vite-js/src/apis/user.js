/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

import api from "../utils/http";

export function ApiLoginHttp(data) {
  return api.post("/Authentication/requestToken", data);
}

/** 请求头中 添加 token，*/
export function ApiGetInfoHttp() {
  return api.post("/Authentication/RequestUserMsg");
}

export function ApiGeHot() {
  return api.post("/Authentication/RequestHotWebMsg");
}

/** 添加个人栏目*/
export function ApiAddColumnHttp(data) {
  return api.post("/Operation/AddColumn", data);
}
/** 删除栏目*/
export function ApiDelColumn(data) {
  return api.post("/Operation/DeleteColumn", data);
}

/**
 * @description 删除hot卡片
 * */
export function ApiDelWebCardHttp(data) {
  return api.post("/Operation/DeleteWebSite", data);
}

/**
 * @description 编辑网站卡片
 * */
export function ApiEditWebCardHttp(data) {
  return api.post("/Operation/EditWebSite", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

/**
 * @description 添加网站卡片, 表单请求
 * @id:
 * @Title: 名字
 * @WebSite: url
 * @file: 图片文件
 * */
export function ApiAddWebCardHttp(data) {
  return api.post("/Operation/AddWebSite", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

/** 复卡片到栏目中*/
export function ApiCopyCard(data) {
  return api.post("/Operation/CopyWebSite", data);
}

/**
 * @description 卡片点击率
 * @id: 卡片id
 * @columnTitle： 栏目title
 * */
export function ApiCardCount(data) {
  return api.post("/Operation/Count", data);
}
