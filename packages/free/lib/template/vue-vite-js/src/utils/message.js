/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 提示框
 */

import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

/**
 * @description 消息弹框， 确定true， 否false
 * */
export const Mart = ({ title = "提示", content = "确定要这样操作吗" }) => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title,
      icon: createVNode(ExclamationCircleOutlined),
      content,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        resolve(true);
      },
      onCancel: () => {
        resolve(false);
      },
    });
  });
};
