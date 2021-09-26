/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 自定义 指令
 */

import { useUserStoreWithOut } from "../store/modules/user.js";

export const customSetup = (app) => {
  /** 自定义操作权限指令*/
  app.directive("permission", {
    mounted(el, binding, vnode) {
      const userStore = useUserStoreWithOut();
      const role = userStore.getAction;
      const action = binding.value.action;
      const effect = binding.value.show;
      const pass = binding.value.pass;
      //判断 当前组件，是否具备对应的权限
      if (!pass) {
        if (!role.includes(action)) {
          if (effect) {
            //没有权限下，禁止按钮
            el.disabled = true;
            el.classList.add("is-disabled");
          } else {
            // 删除元素
            el.parentNode && el.parentNode.removeChild(el);
          }
        }
      }
    },
    beforeUpdate() {},
    beforeUnmount() {},
  });
};

export const customTitle = (app) => {
  app.directive("title", {
    mounted(el, binding) {
      document.title = el.dataset.title;
    },
  });
};
