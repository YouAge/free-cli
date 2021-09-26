/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */
import { defineStore } from "pinia";
import {
  getToken as getCookieToken,
  setToken as setAutCache,
} from "../../utils/cache.js";
import { ApiGeHot, ApiGetInfoHttp, ApiLoginHttp } from "../../apis/user.js";
import router from "../../router";
import { E404 } from "../../router/default-routes.js";
import { store } from "@/store";
export const useUserStore = defineStore({
  id: "app-user",
  state: () => ({
    token: getCookieToken(),
    userId: "",
    name: "",
    action: "show", // 证删改差权限
    homeHot: [], //首页内容
    columns: [], // 首页菜单 columns
    homeContent: [], // 页面卡片内容显示
    loading: false,
  }),
  getters: {
    getUserToken() {
      return this.token;
    },
    getUserId() {
      return this.userId;
    },
    getAction() {
      return this.action.split("_") || ["show"];
    },
    getHomeHot() {
      return this.homeHot || [];
    },
    getColumns() {
      return this.columns || [];
    },
    getHomeContent() {
      return this.homeContent || this.homeHot;
    },
  },

  actions: {
    setToken(token) {
      this.token = token;
      setAutCache(token);
    },
    setHomeHot(data) {
      this.homeHot = data;
    },
    setHomeContent(data) {
      this.homeContent = data;
    },
    setColumns(column, title = "") {
      if (title) {
        /** 删除栏目下的卡片*/
        for (let item of this.columns) {
          if (item.title === column) {
            item.webSites = item.webSites.filter((t) => t.title !== title);
            break;
          }
        }
      } else {
        this.columns = this.columns.filter((t) => t.path !== column);
      }
      return this.columns;
    },
    setUser(item) {
      const keys = Object.keys(item);
      keys.forEach((j) => {
        this[j] = item[j];
      });
    },
    addHomeRoute(item) {
      router.addRoute({
        path: item.path,
        name: item.name,
        component: () => import("@/views/home/home.vue"),
        meta: { title: item.title, icon: "icon-shouye" },
      });
    },

    /**
     * @description: login
     * */
    async Login(loginForm) {
      const data = await ApiLoginHttp(loginForm);
      this.setToken(data.mesToken);
      // 请求用户信息
      await this.setHomeHot();
      await this.getUserInfo();
    },
    /**
     * @description post user info
     * */
    async getUserInfo() {
      const data = await ApiGetInfoHttp();
      this.setUser(data);

      //设置路由
      if (this.getColumns.length > 0) {
        this.getColumns.forEach((item) => {
          /** 路由注册*/
          this.addHomeRoute(item);
        });
      }
      //
      router.addRoute(E404);
    },
    /**
     * @description hot
     * */
    async getHotContent() {
      this.loading = true;
      const data = await ApiGeHot();
      data.unshift({
        id: 9999,
        webSite: "/machine-index",
        title: "CTU 机台看板",
        imgUrl: "https://img.ivsky.com/img/tupian/t/202102/23/xiangqin-013.jpg",
        theClickCount: 10000,
      });
      console.log("首页", data);
      this.setHomeHot(data);
      this.setHomeContent(data);
      this.loading = false;
      return data;
    },

    /**
     * @description post
     * */
    async getTableContent() {
      const data = await ApiGetInfoHttp();
      this.setUser(data);
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
