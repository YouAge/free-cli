/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

export const E404 = {
  path: "/:catchAll(.*)*", // 捕获所有路由
  name: "NotFound",
  component: () => import("@/views/error-page/Error404.vue"),
  meta: { title: "404", icon: "icon-shouye" },
};

export const defaultRoutes = [
  {
    path: "/",
    name: "Hot",
    component: () => import("@/views/home/home.vue"),
    meta: { title: "热门推介", icon: "icon-shouye" },
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { title: "系统", icon: "icon-shouye" },
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/index.vue"),
    meta: { title: "test", icon: "icon-shouye" },
  },

  {
    path: "/machine-index",
    name: "machineIndex",
    redirect: "cut-machine", // 跳转
    component: () => import("@/views/boards/machineIndex.vue"),
    meta: { title: "看板首页", icon: "icon-shouye", power: false },
    children: [
      {
        path: "/cut-machine",
        name: "cutMachine",
        component: () => import("@/views/boards/cut-machine.vue"),
        meta: { title: "看板选择", icon: "icon-shouye", power: false },
      },
      {
        path: "/machine-config",
        name: "machineConfig",
        component: () => import("@/views/boards/machineConfig.vue"),
        meta: { title: "看板配置", icon: "icon-shouye", power: true },
      },
    ],
  },
  {
    path: "/facility",
    name: "facility",
    component: () => import("@/views/boards/facility.vue"),
    meta: { title: "xx机台看板", icon: "icon-shouye", power: false },
  },
  {
    path: "/one-facility",
    name: "oneFacility",
    component: () => import("@/views/boards/oneFacility.vue"),
    meta: { title: "xx机台看板", icon: "icon-shouye", power: false },
  },
  // E404,//
];
