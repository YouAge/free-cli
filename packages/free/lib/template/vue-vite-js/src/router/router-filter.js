import NProgress from "nprogress";
import { getToken } from "../utils/cache.js";
import { useUserStoreWithOut } from "../store/modules/user.js";
import { ErrorCode } from "../utils/http/expectedErrors.js";
/** 路由进度条配置*/
NProgress.inc(0.5);
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 700, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

/** 白名单，不需要登入*/
const PUBLIC_PATH = new Set(["/login", "/401", "/404", "/", "/test"]);

export function createRouterFilter(router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start(); // start
    // 根据是否有token 来判断是否登入
    let token = getToken();
    // 如果未登录且要访问不在公共路径集合里的路径时，跳转到登录页面并记录之前的页面用于重新访问
    if (!token && !PUBLIC_PATH.has(to.path) && to.meta.power) {
      return next({ path: "/login", query: { redirect: to.fullPath } });
    }
    if (token) {
      const appStore = useUserStoreWithOut();
      if (!appStore.getUserId) {
        await appStore.getUserInfo().catch((e) => {
          return ErrorCode["406"]("406");
        });
        // window.router = router; // 外挂到window上面 方便命令查看
        next({ ...to, replace: true }); // 防止刷新 页面不存在
      }
    }
    next();
  });

  router.afterEach((to, from, failure) => {
    NProgress.done();
  });

  router.onError((error) => {
    NProgress.done();

    console.log("路由错误");
  });
}
