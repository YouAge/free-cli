/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */
import * as echarts from "echarts";

/**
 * map 图的位置条件， 百分 比 或者 px
 * */
function grid({ left = "4%", right = "4%", bottom = "6%" }) {
  return {
    left,
    right,
    bottom,
    containLabel: true,
  };
}

/**
 * 滚动条， 当x轴数据过多时，是否需要使用滚动条来显示
 * */
function dataZoom(show, { start = 0, end = 60 }) {
  if (show) {
    return [
      {
        //滚动条
        start: 0,
        end: 60, // 滑动条的长度，100 表示没有了
        xAxisIndex: [0],
      },
    ];
  }
  return [];
}

/**
 * 卡片， 鼠标放入线体种中， 卡片的显示
 * */
function tooltip({}) {
  return {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
    /**
     * 重写卡片看到信息
     * */
    formatter: function (params) {
      return (
        params[0].name +
        "<br/>" +
        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
        params[0].seriesName +
        " : " +
        params[0].value +
        " %<br/>"
      );
    },
  };
}

/**
 * axisLine, x抽线的颜色
 * */

function axisLine() {
  return {
    lineStyle: {
      color: "rgba(255,255,255,.6)",
    },
  };
}

/**
 * axisLabel， x抽文字颜色，大小条件， 角度倾斜，不省略显示
 * */
function axisLabel() {
  return {
    textStyle: {
      color: "rgba(255,255,255,.6)",
      fontSize: 12,
    },
    interval: 0, // 始终显示， 不自动响应省略显示,
    // rotate:45 , // 字体倾斜显示
  };
}

/**
 * formatter
 * */
function formatter() {
  return function (item) {
    if (item.value > 0) {
      return `${item.value}%`;
    } else {
      return 0;
    }
  };
}

export function ctuMap({ name, data }) {
  return {
    tooltip: {
      trigger: "item",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    color: "#0177FF",
    grid: grid({}),
    dataZoom: dataZoom(name.length > 12, {}),
    xAxis: {
      type: "category",
      data: name || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "1", "6"],
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
        data: data || [120, 200, 150, 80, 70, 110, 130, 232, 57],
        type: "bar",
        barWidth: "24px", // 圆柱宽度
        label: {
          show: false,
          normal: {
            show: true,
            position: "top", // inside ||  top
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
}

export function danCtuMap({ name, data }) {
  return {
    tooltip: {
      trigger: "item",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    color: "#0177FF",
    grid: grid({}),
    dataZoom: dataZoom(name.length > 12, {}),
    xAxis: {
      type: "category",
      data: name || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "1", "6"],
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff", // 字体颜色
        },
      },
    },

    yAxis: {
      type: "value",
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
        data: data || [120, 200, 150, 80, 70, 110, 130, 232, 57],
        type: "bar",
        barWidth: "24px", // 圆柱宽度
        label: {
          show: false,
          normal: {
            show: true,
            position: "top", // inside
            textStyle: {
              color: "#fff", // 柱状图里面数字颜色
            },
            formatter: formatter(),
          },
          // position: 'insideRight'
        },
        itemStyle: {
          normal: {
            /**
             * 柱子的颜色，渐变色
             * */
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
}
