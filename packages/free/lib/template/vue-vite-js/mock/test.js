/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

function timeClock() {
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
   *  8+30, 20+30
   * */
  let item = {
    year,
    mouth: nMouth,
    date: nDate,
    hour: nHour,
    minuter: nMinuter,
    seconds: nSeconds,
  };

  const t = hour + minuter;
  if (t >= 38 && t <= 50) {
    // 白班
    item.classes = "D";
  }
  item.classes = "F";
  return item;
}

// const t = timeClock();
// console.log(t);
const data = [
  // {
  //   site: "ctu_op4",
  //   factory: "assy3",
  //   project: null,
  //   line: null,
  // },
  {
    site: "ctu_op3",
    factory: "assy3",
    project: "v313",
    line: "b2_f02_l13333",
  },
  {
    site: "ctu_op3",
    factory: "assy3",
    project: "v313",
    line: "b2_f02_l133",
  },
  {
    site: "ctu_op3",
    factory: "assy2",
    project: "v311",
    line: "b2_f02_l2",
  },
  {
    site: "ctu_op3",
    factory: "assy1",
    project: "v311",
    line: "b2_f02_l2",
  },
  {
    site: "ctu_op3",
    factory: "assy",
    project: "v312",
    line: "b2_f02_l11",
  },
  {
    site: "ctu_op3",
    factory: "assy3",
    project: "v313",
    line: "b2_f02_l1333",
  },
  {
    site: "ctu_op3",
    factory: "assy2",
    project: "v313",
    line: "b2_f02_l122222",
  },
  {
    site: "ctu_op2",
    factory: "assy",
    project: "v310",
    line: "b2_f02_l1",
  },
  {
    site: "ctu_op3",
    factory: "assy1",
    project: "v313",
    line: "b2_f02_l1",
  },
  {
    site: "ctu_op3",
    factory: "assy3",
    project: "v313",
    line: "b2_f02_l133333",
  },
  {
    site: "ctu_op3",
    factory: "assy2",
    project: "v313",
    line: "b2_f02_l1222",
  },
  {
    site: "ctu_op3",
    factory: "assy2",
    project: "v312",
    line: "b2_f02_l1",
  },
  {
    site: "ctu_op3",
    factory: "assy1",
    project: "v312",
    line: "b2_f02_l1",
  },
  {
    site: "ctu_op3",
    factory: "assy",
    project: "v311",
    line: "b2_f02_l1",
  },
  {
    site: "ctu_op3",
    factory: "assy3",
    project: "v313",
    line: "b2_f02_l13",
  },
  {
    site: "ctu_op3",
    factory: "assy",
    project: "v310",
    line: "b2_f02_l1",
  },
  {
    site: "ctu_op3",
    factory: "assy3",
    project: "v312",
    line: "b2_f02_l1",
  },
  {
    site: "ctu_op3",
    factory: "assy2",
    project: "v312",
    line: "b2_f02_l3",
  },
  {
    site: "ctu_op3",
    factory: "assy3",
    project: "v312",
    line: "b2_f02_l2",
  },
  {
    site: "ctu_op3",
    factory: "assy1",
    project: "v313",
    line: "b2_f02_l111",
  },
  {
    site: "ctu_op3",
    factory: "assy1",
    project: "v312",
    line: "b2_f02_l2",
  },
  {
    site: "ctu_op3",
    factory: "assy2",
    project: "v312",
    line: "b2_f02_l2",
  },
  {
    site: "ctu_op3",
    factory: "assy3",
    project: "v312",
    line: "b2_f02_l3",
  },
  {
    site: "ctu_op3",
    factory: "assy2",
    project: "v313",
    line: "b2_f02_l122",
  },
  {
    site: "ctu_op3",
    factory: "assy1",
    project: "v312",
    line: "b2_f02_l3",
  },
  {
    site: "ctu_op3",
    factory: "assy1",
    project: "v313",
    line: "b2_f02_l11",
  },
  {
    site: "ctu_op3",
    factory: "assy3",
    project: "v311",
    line: "b2_f02_l1",
  },
  {
    site: "ctu_op3",
    factory: "assy1",
    project: "v311",
    line: "b2_f02_l1",
  },
  {
    site: "ctu_op3",
    factory: "assy",
    project: "v312",
    line: "b2_f02_l1",
  },
  {
    site: "ctu_op3",
    factory: "assy2",
    project: "v311",
    line: "b2_f02_l1",
  },
  {
    site: "ctu_op3",
    factory: "assy1",
    project: "v313",
    line: "b2_f02_l11111",
  },
  {
    site: "ctu_op3",
    factory: "assy2",
    project: "v313",
    line: "b2_f02_l12",
  },
];

function objkey(t, key) {
  if (t && Object.keys(t).length > 0) {
    return { ...t, [key]: {} };
  }
  return { [key]: {} };
}

function top(arry = []) {
  let y = {};
  for (let item of arry) {
    y = y[item.site] ? y : { ...y, [item.site]: {} };
    y[item.site] = y[item.site][item.factory]
      ? y[item.site]
      : {
          ...y[item.site],
          [item.factory]: {},
        };
    y[item.site][item.factory] = y[item.site][item.factory][item.project]
      ? y[item.site][item.factory]
      : {
          ...y[item.site][item.factory],
          [item.project]: {},
        };
    y[item.site][item.factory][item.project] = y[item.site][item.factory][
      item.project
    ][item.line]
      ? y[item.site][item.factory][item.project]
      : {
          ...y[item.site][item.factory][item.project],
          [item.line]: {},
        };
  }
  console.log(y);
}
// top(data);

function treeDop(array = []) {
  let y = {};
  if (array.length) {
    array.forEach((obj) => {
      const keyList = Object.keys(obj);

      for (let index in keyList) {
        let t = [];
        for (let i = 0; i <= index; i++) {
          t.push(keyList[i]);
        }

        y = obj[keyList[index]] ? y : { ...obj, [keyList[index]]: {} };
      }
    });
  }
}

function to(obj, item, key, index) {
  let t = [];
  for (let i = 0; i <= index; i++) {
    t.push(item[i]);
  }
  if (index === 0) {
    obj = obj[item[key]] ? obj : { ...obj, [t]: {} };
  }
}

// timeClock();
