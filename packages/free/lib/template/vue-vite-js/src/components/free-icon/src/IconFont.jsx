/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 阿里云的 图标直接引入 https://www.iconfont.cn/
 */
import { defineComponent, computed, unref } from "vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { isString } from "@/utils/common";

let MyIcon = createFromIconfontCN({
  // scriptUrl: '//at.alicdn.com/t/font_2694519_al1vtfv47i.js'
  // 本地导入，
  scriptUrl: "", //再index.html 中导入
});

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#FFF",
    },
    size: {
      type: [Number, String],
      default: 14,
    },
    scriptUrl: {
      // 阿里图库字体图标路径
      type: String,
      default: "",
    },
  },
  setup(props, { attrs }) {
    // 如果外部传进来字体图标路径，则覆盖默认的
    if (props.scriptUrl) {
      MyIcon = createFromIconfontCN({
        scriptUrl: props.scriptUrl,
      });
    }
    const wrapStyleRef = computed(() => {
      const { color, size } = props;

      const fs = isString(size) ? parseFloat(size) : size;

      return {
        color,
        fontSize: `${fs}px`,
      };
    });
    return () => (
      <MyIcon type={props.type || ""} {...attrs} style={unref(wrapStyleRef)} />
    );
  },
});
