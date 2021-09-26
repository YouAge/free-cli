/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

import * as echarts from "echarts";
export const img1Map = {
  color: "#0177FF",
  grid: {
    // top: '20px',
    left: "4%",
    right: "4%",
    bottom: "6%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "1", "6"],
    // axisLine: {
    //   show: true,
    //   lineStyle: {
    //     color: "red",
    //   },
    // },
    // splitLine: {
    //   lineStyle: {
    //     color: "#0177FF",
    //   },
    // },
    // axisLine: {
    //   lineStyle: {
    //     color: "#0087ED",
    //     width: 1, //这里是为了突出显示加上的
    //   },
    // },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#fff", // 字体颜色
      },
    },
  },

  yAxis: {
    type: "value",
    // axisLine: {  //坐标线
    //   show: true,
    //   lineStyle: {
    //     color: "#999",
    //   },
    // },
    splitLine: {
      // 图中内部的x线图
      lineStyle: {
        // 使用深浅的间隔色
        color: "#545A7E",
      },
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#fff",
      },
    },
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130, 232, 57],
      type: "bar",
      barWidth: "24px", // 圆柱宽度
      label: {
        show: false,
        normal: {
          show: true,
          position: "inside", // inside
          textStyle: {
            color: "#fff", // 柱状图里面数字颜色
          },
        },
        // position: 'insideRight'
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#0096FF", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(0,77,167,1)", // 100% 处的颜色
              },
            ],
            false
          ),
          barBorderRadius: [30, 30, 30, 30],
          shadowColor: "rgba(0,160,221,1)",
          shadowBlur: 4,
        },
      },
    },
  ],
};

export const MACHINE = {
  material: "192000", // 投入料
  output: "560000", //产出
  tTotal: "84",
  misuse: "80",
  machine: [
    {
      id: 1,
      name: "xx机台",
      status: "off", // 机台状态 off || LDL || ‘’
      info: {
        user: "生产负责人",
        iphone: "1234567987",
        machineUser: "机台负责人",
        machineIphone: "负责人电话",
      },
    },
  ],
};

const userTable = [
  {
    id: 1,
    title: "一段",
    content: {
      describe: "这是第一段 的数据描述",
      users: [
        { id: 1, name: "刘小小", iphone: "12345678901", job: "生成负责人" },
        { id: 2, name: "刘小小", iphone: "12345678901", job: "生成负责人" },
        { id: 3, name: "刘小小", iphone: "12345678901", job: "生成负责人" },
        { id: 3, name: "刘小小", iphone: "12345678901", job: "生成负责人" },
      ],
    },
  },
  {
    id: 2,
    title: "二段",
    content: {
      describe: "这是第二段 的数据描述",
      users: [
        { id: 1, name: "王小二", iphone: "12345678901", job: "生成负责人" },
        { id: 2, name: "王小二", iphone: "12345678901", job: "生成负责人" },
        { id: 3, name: "王小二", iphone: "12345678901", job: "生成负责人" },
        { id: 3, name: "王小二", iphone: "12345678901", job: "生成负责人" },
      ],
    },
  },
  {
    id: 3,
    title: "三段",
    content: {
      describe: "这是第三段 的数据描述",
      users: [
        { id: 1, name: "沈万三", iphone: "12345678901", job: "生成负责人" },
        { id: 2, name: "沈万三", iphone: "12345678901", job: "生成负责人" },
        { id: 3, name: "沈万三", iphone: "12345678901", job: "生成负责人" },
        { id: 3, name: "沈万三", iphone: "12345678901", job: "生成负责人" },
      ],
    },
  },
];
