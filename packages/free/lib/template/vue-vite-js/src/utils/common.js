/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

export function isObject(val) {
  return val !== null && is(val, "Object");
}

export function deepMerge(src = {}, target = {}) {
  let key;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}

/**
 * @description:  是否为字符串
 */
export function isString(val) {
  return is(val, "String");
}

/** 深拷贝*/
export function deepCopy(obj = {}) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * @ 判断是否是外连接
 * */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|http)/.test(path);
}

/** 图片转 base64
 * @file: 图片文件
 * */
export function base64Image(file) {
  return new Promise((resolve, reject) => {
    let imgObj = new Image();
    let url = window.URL || window.webkitURL;
    // 手动创建一个Image对象
    imgObj.src = url.createObjectURL(file); // 这里传的是File对象
    // img.onload 实现图片预加载方法
    imgObj.onload = function () {
      // 进行转码
      resolve(getBase64Image(imgObj));
    };
  });
}

function getBase64Image(img) {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  return canvas.toDataURL("image/" + ext);
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  return (
    document.isFullScreen ||
    document.mozIsFullScreen ||
    document.webkitIsFullScreen
  );
};
/** treat
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};

/**
 * 时间钟
 * */
export function timeClock() {
  let now = new Date();
  const year = now.getFullYear(); // 年
  let mouth = now.getMonth() + 1; // 月
  const nMouth = mouth >= 10 ? mouth : `0${mouth}`;
  let date = now.getDate(); // 号
  const nDate = date >= 10 ? date : `0${date}`;

  let hour = now.getHours(); // 小时
  const nHour = hour >= 10 ? hour : `0${hour}`;
  let minuter = now.getMinutes();
  const nMinuter = minuter >= 10 ? minuter : `0${minuter}`;
  let seconds = now.getSeconds();
  const nSeconds = seconds >= 10 ? seconds : `0${seconds}`;
  /**
   * @时间，判定白班或者晚班, 8：30 =》 20：30 白班
   *  8*10+30, 20*10+30
   * */
  let item = {
    year,
    mouth: nMouth,
    date: nDate,
    hour: nHour,
    minuter: nMinuter,
    seconds: nSeconds,
    classes: "D",
  };

  const t = hour * 100 + minuter;
  // console.log(t, hour, minuter);
  if (t >= 830 && t <= 2030) {
    // 白班
    item.classes = "D";
  } else {
    item.classes = "F";
  }

  return item;
}

/**
 * 时间格式转换
 * */
export function transformTimestamp(timestamp, host = false) {
  let a = new Date(timestamp).getTime();
  const date = new Date(a);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  if (host) {
    const h =
      "  " +
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
      ":";
    const m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    const s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // const s = date.getSeconds(); // 秒
    return Y + M + D + h + m + s;
  }

  // console.log('dateString', dateString); // > dateString 2021-07-06 14:23
  return M + D;
}
