/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: 获取配置文件
 */
import dotenv from "dotenv";
export function loadEnv() {
  const env = process.env.NODE_ENV;
  const envList = [`.env.${env}.local`, `.env.${env}`, ".env.local", ".env"];
  envList.forEach((e) => {
    dotenv.config({
      path: e,
    });
  });
  // console.log(process.env);

  return env;
}
