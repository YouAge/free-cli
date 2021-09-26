/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 未使用
 */
import { reactive } from "vue";
import { delCookies, getToken, setToken } from "../utils/cache.js";
import { ApiGeHot, ApiGetInfoHttp, ApiLoginHttp } from "../apis/user.js";
import router from "../router";
import { message } from "ant-design-vue";
import { E404 } from "../router/default-routes.js";

export const state = reactive({
  token: getToken(),
  userId: "",
  name: "",
  action: ["show"], // 证删改差权限
  homeHot: [], //首页内容
  userMenu: [], // 首页菜单
});

export async function Login(loginForm) {
  return ApiLoginHttp(loginForm).then(async (res) => {
    state.token = res.mesToken;
    setToken(res.mesToken);
    state.userId = res.userId;
    // 请求用户信息数据，和菜单权限
    await getUserInfo();
  });
}

export function getUserInfo() {
  return ApiGetInfoHttp().then((res) => {
    state.userId = res.userId;
    // state.name = res.name;
    state.action = res.action.split("_") || ["show"];
    state.userMenu = res.columns || [];
    getHotContent();
    generateRoutes();
    router.addRoute(E404);
  });
}

// 生成动态路由， 路由注册
function generateRoutes() {
  if (state.userMenu.length > 0) {
    state.userMenu.forEach((item) => {
      /** 路由注册*/
      addHomeRoute(item);
    });
  }
}
//生成路由
export function addHomeRoute(item) {
  router.addRoute({
    path: item.path,
    name: item.name,
    component: () => import("@/views/home/home.vue"),
    meta: { title: item.title, icon: "icon-shouye" },
  });
}

export function getHotContent() {
  return ApiGeHot().then((data) => {
    state.homeHot = data;
    return state.homeHot;
  });
}

/** 退出登入*/
export async function loginOut() {
  localStorage.clear();
  sessionStorage.clear();
  delCookies();
  state.userId = "";
  return location.replace("/");
  // router.replace("/")
}
