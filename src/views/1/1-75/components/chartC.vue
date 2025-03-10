<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import "echarts-gl";

let chart = null;
const chartRef = ref(null);

// 定义柱状扇形的高度比例
const heightProportion = 0.2;

const initChart = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }
  let myDate = [1, 3, 4, 2, 6, 5];
  const optionsData = [
    {
      name: "景区",
      value: myDate[0],
      itemStyle: {
        color: "#7652FC",
      },
    },

    {
      name: "购物",
      value: myDate[1],
      itemStyle: {
        color: "#6993FF",
      },
    },
    {
      name: "娱乐",
      value: myDate[2],
      itemStyle: {
        color: "#9BD342",
      },
    },
    {
      name: "交通",
      value: myDate[3],
      itemStyle: {
        //   opacity: 0.5,
        color: "#FFD900",
      },
    },
    {
      name: "住宿",
      value: myDate[4],
      itemStyle: {
        //   opacity: 0.5,
        color: "#AA4CD3",
      },
    },
    {
      name: "餐饮",
      value: myDate[5],
      itemStyle: {
        //   opacity: 0.5,
        color: "#00ADEF",
      },
    },
  ];
  const series = getPie3D(optionsData, 0.6); // 可做为调整内环大小 0为实心圆饼图，大于0 小于1 为圆环
  series.push({
    name: "pie2d",
    type: "pie",
    label: {
      opacity: 1,
      lineHeight: 24,
      textStyle: {
        fontSize: 28,
        color: "#fff",
      },
    },
    labelLine: {
      normal: {
        length: 30,
        length2: 200,
        lineStyle: {
          // color: '#e6e6e6'
          width: 4,
        },
      },
    },
    startAngle: 300, //起始角度，支持范围[0, 360]。
    clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ["36%", "46%"],
    center: ["50%", "50%"],
    data: optionsData,
    itemStyle: {
      opacity: 0,
    },
  });
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  let option = {
    legend: {
      show: false,
      tooltip: {
        show: true,
      },
      orient: "vertical",
      data: ["景区", "购物", "娱乐", "交通", "住宿", "餐饮"],
      top: "center",
      itemGap: 55,
      itemWidth: 24,
      itemHeight: 14,
      itemRadius: 20,
      right: "12%",
      textStyle: {
        color: "#fff",
        fontSize: 12,
        rich: {
          name: {
            // width: '45%',
            fontSize: 28,
            color: "#B0D8DF",
            fontFamily: "Source Han Sans CN",
          },
          value: {
            width: 46,
            fontSize: 28,
            padding: [0, 0, 0, 5],
            color: "#fff",
            fontFamily: "Source Han Sans CN",
          },
          A: {
            fontSize: 24,
            color: "#B0D8DF",
            fontFamily: "Source Han Sans CN",
          },
          rate: {
            width: 60,
            fontSize: 28,
            padding: [0, 5, 0, 10],
            color: "#10DD24",
            fontFamily: "Source Han Sans CN",
          },
          B: {
            fontSize: 24,
            color: "#B0D8DF",
            fontFamily: "Source Han Sans CN",
          },
        },
      },
      // formatter: function (name) {
      //   let res = optionsData.filter((v) => v.name === name);
      //   res = res[0] || {};
      //   const p = res.value;
      //   // const A = res.percent;
      //   return "{name|" + name + "：}" + "{value|" + p + "}亿元";
      // },
      formatter: function (name) {
        let total = 0;
        let target;
        for (let i = 0; i < optionsData.length; i++) {
          total += optionsData[i].value;
          if (optionsData[i].name === name) {
            target = optionsData[i].value;
          }
        }
        let arr = [
          "{name|" + name + "}",
          "{value|" + target + "}{A|亿元}",
          // "{rate|" + ((target / total) * 100).toFixed(1) + "}{B|%}",
        ];
        return arr.join("  ");
      },
    },
    animation: true,
    tooltip: {
      show: true,
      trigger: "item",
      confine: true,
      backgroundColor: "rgba(64, 180, 176, 0.6)",
      borderColor: "rgba(64, 180, 176, 0.6)",
      textStyle: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 24,
      },
      // formatter: "消费<br>{a}：{b}亿元",
      formatter: params => {
        if (
          params.seriesName !== "mouseoutSeries" &&
          params.seriesName !== "pie2d"
        ) {
          return `${
            params.seriesName
          }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
            params.color
          };"></span>${
            option.series[params.seriesIndex].pieData.value + "亿元"
          }`;
        }
      },
    },
    title: {
      x: "center",
      top: "20",
      textStyle: {
        color: "#fff",
        fontSize: 22,
      },
    },
    backgroundColor: "#092B35",
    labelLine: {
      show: true,
      length: 30,
      length2: 140,
      lineStyle: {
        width: 4,
      },
    },
    label: {
      show: true,
      //   position: "outside",
      padding: [30, -180],
      formatter: function (optionsData) {
        console.log("optionsData", optionsData);
        return (
          "{name|" +
          optionsData.name +
          "}" +
          "{vlaueA|" +
          optionsData.value +
          "亿元" +
          "}" +
          " {value|" +
          optionsData.percent.toFixed(0) +
          "%}"
        );
      },
      rich: {
        name: {
          fontSize: 28,
          color: "#ffffff",
          padding: [-40, 0, 0, 0],
        },
        value: {
          fontSize: 28,
          color: "#ffffff",
          padding: [-40, 0, 0, 0],
        },
        vlaueA: {
          fontSize: 28,
          color: "#2CEDCD",
          padding: [-40, 0, 0, 10],
        },
      },
      textStyle: {
        color: "#fff",
        fontSize: 28,
      },
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    grid3D: {
      show: false,
      boxHeight: 26,
      left: "26%",
      top: -40,
      width: "50%",
      // environment: "rgba(255,255,255,0)",
      viewControl: {
        distance: 240,
        alpha: 55,
        beta: 70,
        autoRotate: false, // 自动旋转
        rotateSensitivity: 1,
        zoomSensitivity: 0,
        panSensitivity: 0,
      },
    },
    series: series,
  };
  chart.setOption(option);
};

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(
  startRatio,
  endRatio,
  isSelected,
  isHovered,
  k,
  h
) {
  // 计算
  let midRatio = (startRatio + endRatio) / 2;

  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  // if (startRatio === 0 && endRatio === 1) {
  //     isSelected = false;
  // }
  isSelected = false;
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },

    x: function (u, v) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y: function (u, v) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
}

// 生成模拟 3D 饼图的配置项
function getPie3D(pieData, internalDiameterRatio) {
  let series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData = [];
  let k =
    typeof internalDiameterRatio !== "undefined"
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    let seriesItem = {
      name:
        typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: 1 / 10,
      },
    };

    if (typeof pieData[i].itemStyle != "undefined") {
      let itemStyle = {};

      typeof pieData[i].itemStyle.color != "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      typeof pieData[i].itemStyle.opacity != "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;

      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;

    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );

    startValue = endValue;

    legendData.push(series[i].name);
  }

  return series;
}

onMounted(() => {
  chart = echarts.init(chartRef.value);
  initChart();
});
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  border: 1px solid green;
}
</style>
