/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: vite 配置信息，变量代码提示
 */

declare interface ImportMetaEnv {
  VITE_BASE_URL: string; // 默认首页api
  VITE_TITLE_NAME: string;
  VITE_TOKEN_NAME: string;
  VITE_BOARDS_URL: string; // 看板api
  VITE_SUCCEED_STATUS: any[]; // 成功状态码
  // 更多环境变量...
}
