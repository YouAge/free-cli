/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

import { computed, reactive, ref, toRefs, unref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { delCookies } from "../utils/cache.js";
import { useUserStore } from "../store/modules/user.js";

export const useLogin = () => {
  const store = useUserStore();
  const route = useRoute();
  const getUserToken = computed(() => store.getUserToken);
  const getUserId = computed(() => store.getUserId);
  const getAction = computed(() => store.getAction);
  const getHomeHot = computed(() => store.getHomeHot);
  const getColumns = computed(() => store.getColumns);
  const homeContent = computed(() => store.getHomeContent);

  /** 切换首页内容*/

  // function addHomeRoute(item) {
  //   router.addRoute({
  //     path: item.path,
  //     name: item.name,
  //     component: () => import("@/views/home/home.vue"),
  //     meta: { title: item.title, icon: "icon-shouye" },
  //   });
  // }
  async function loginOut() {
    localStorage.clear();
    sessionStorage.clear();
    delCookies();
    return location.replace("/");
  }

  function setColumns(column, title = "") {
    return store.setColumns(column, title);
  }

  function addColumns(item) {
    store.getColumns.push(item);
  }
  return {
    homeContent: unref(homeContent),
    getUserToken: unref(getUserToken),
    getUserId: unref(getUserId),
    getAction: unref(getAction),
    getHomeHot: unref(getHomeHot),
    getColumns: unref(getColumns),
    addHomeRoute: (item) => store.addHomeRoute(item),
    loginOut,
    setColumns,
    addColumns,
    setHomeHot: (item) => store.setHomeHot(item),
    Login: (loginForm) => store.Login(loginForm),
    getHotContent: store.getHotContent,
    getUserInfo: store.getUserInfo,
    setHomeContent: (item) => store.setHomeContent(item),
  };
};
