/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 渲染组件
 */
import { createVNode, render } from "vue";

export const useCreateModel = (component, option = {}, app = null) => {
  let _instance;
  const container = document.createElement("div");
  //移除组件
  const remove = () => {
    _instance = null;
    render(null, container);
    container.remove();
  };

  //根据组件生成VNode
  _instance = createVNode(component, { remove, ...option });
  // 渲染组件
  render(_instance, container);

  // 再组件上面添加一个remove方法用来销毁
  _instance.component.ctx.remove = remove;
  // 暴露一个 更新组件方法

  return _instance.component.ctx;
};
