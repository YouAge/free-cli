import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import { createRouterFilter } from "./router-filter";
import { defaultRoutes } from "./default-routes.js";
import emplay from "../layouts/emplay.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: defaultRoutes,
});

export function setupRouter(app) {
  // 创建路由守卫
  createRouterFilter(router);
  app.use(router);
}

export default router;
