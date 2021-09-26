/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 看板api 请求
 */
import { setApiUrl } from "../../utils/http/createApi.js";
import config from "../../config";

const api = setApiUrl({
  baseURL: config.BOARDS_URL,
  timeout: 50000,
});

/**
 * 请求选择信息
 * */

export function getConfigHttp() {
  return api.get("/ConfigChoose/GetConfig");
}

/**
 * 请求某条线的 机台看板信息
 * */
export function postCtuAnalysis(data) {
  return api.post("/MachineStatus/GetStatusData", data);
}

/**
 * 获取用户信息
 * */
export function getUserInfo() {
  return api.get("/ConfigChoose/GetUserInfo");
}

/**
 * 请求机台
 * */
export function postMachineTop10(data) {
  return api.post("/DataAnalysis/GetMachineTop10", data);
}

/**
 * 单机台的异常状态详情列表
 * */
export function postMachineFrequency(id) {
  return api.post(`/SingleMachine/GetMachineFrequency?param=${id}`);
}

/**
 *获取指定机台的时间稼动列表
 * */
export function postTimeVibrationRate(id) {
  return api.post(`/SingleMachine/GetTimeVibrationRate?param=${id}`);
}

/**
 *获取指定机台的责任人信息
 * */
export function postMachineManager(id) {
  return api.post(`/SingleMachine/GetMachineManager?param=${id}`);
}
