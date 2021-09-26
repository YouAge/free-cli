/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

import reSeamlessScroll from "./src/index.vue";

export const ReSeamlessScroll = Object.assign(reSeamlessScroll, {
  install(app) {
    app.component(reSeamlessScroll.name, reSeamlessScroll);
  },
});

export default ReSeamlessScroll;
