<template>
  <div class="home">
    <div class="containers">
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
let chart = null;
const chartRef = ref(null);

const data = [
  ["2000-06-05", 116],
  ["2000-06-06", 129],
  ["2000-06-07", 135],
  ["2000-06-08", 86],
  ["2000-06-09", 73],
  ["2000-06-10", 85],
  ["2000-06-11", 73],
  ["2000-06-12", 68],
  ["2000-06-13", 92],
  ["2000-06-14", 130],
  ["2000-06-15", 245],
  ["2000-06-16", 139],
  ["2000-06-17", 115],
  ["2000-06-18", 111],
  ["2000-06-19", 309],
  ["2000-06-20", 206],
  ["2000-06-21", 137],
  ["2000-06-22", 128],
  ["2000-06-23", 85],
  ["2000-06-24", 94],
  ["2000-06-25", 71],
  ["2000-06-26", 106],
  ["2000-06-27", 84],
  ["2000-06-28", 93],
  ["2000-06-29", 85],
  ["2000-06-30", 73],
  ["2000-07-01", 83],
  ["2000-07-02", 125],
  ["2000-07-03", 107],
  ["2000-07-04", 82],
  ["2000-07-05", 44],
  ["2000-07-06", 72],
  ["2000-07-07", 106],
  ["2000-07-08", 107],
  ["2000-07-09", 66],
  ["2000-07-10", 91],
  ["2000-07-11", 92],
  ["2000-07-12", 113],
  ["2000-07-13", 107],
  ["2000-07-14", 131],
  ["2000-07-15", 111],
  ["2000-07-16", 64],
  ["2000-07-17", 69],
  ["2000-07-18", 88],
  ["2000-07-19", 77],
  ["2000-07-20", 83],
  ["2000-07-21", 111],
  ["2000-07-22", 57],
  ["2000-07-23", 55],
  ["2000-07-24", 60],
];
const dateList = data.map(function (item) {
  return item[0];
});
const valueList = data.map(function (item) {
  return item[1];
});

const init = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  // 视觉映射(visualMap)：
  // 第一个visualMap控制Y轴方向的颜色渐变（基于数值大小）
  // 第二个visualMap控制X轴方向的颜色渐变（基于数据索引）
  const option = {
    // 视觉映射组件（用于创建渐变效果）
    visualMap: [
      {
        show: false, // 不显示视觉映射控制器
        type: "continuous", // 连续型视觉映射
        seriesIndex: 0, // 应用于第一个系列
        min: 0, // 最小值
        max: 400, // 最大值
      },
      {
        show: false,
        type: "continuous",
        seriesIndex: 1, // 应用于第二个系列
        dimension: 0, // 指定数据的维度（这里是x轴）
        min: 0, // 数据最小索引
        max: dateList.length - 1, // 数据最大索引
      },
    ],

    // 标题配置
    title: [
      {
        left: "center",
        text: "Gradient along the y axis", // 第一个图表标题
      },
      {
        top: "55%", // 位于下半部分
        left: "center",
        text: "Gradient along the x axis", // 第二个图表标题
      },
    ],

    // 提示框配置
    tooltip: {
      trigger: "axis", // 坐标轴触发提示
    },

    // X轴配置
    xAxis: [
      {
        data: dateList, // 使用日期数据
      },
      {
        data: dateList,
        gridIndex: 1, // 属于第二个grid
      },
    ],

    // Y轴配置
    yAxis: [
      {}, // 第一个Y轴使用默认配置
      {
        gridIndex: 1, // 属于第二个grid
      },
    ],

    // 网格配置（定义两个绘图区域）
    grid: [
      {
        bottom: "60%", // 第一个grid占据上半部分
      },
      {
        top: "60%", // 第二个grid占据下半部分
      },
    ],

    // 系列列表（数据内容）
    series: [
      {
        type: "line", // 折线图
        showSymbol: false, // 不显示数据点符号
        data: valueList, // 使用数值数据
      },
      {
        type: "line",
        showSymbol: false,
        data: valueList,
        xAxisIndex: 1, // 使用第二个x轴
        yAxisIndex: 1, // 使用第二个y轴
      },
    ],
  };

  chart.setOption(option);
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
  display: flex;
  // flex-wrap: nowrap;
  // flex-direction: row;
  justify-content: center;
  align-items: center;

  .containers {
    width: 600px;
    height: 400px;
    padding: 10px;
    border: 1px solid #7f8de0;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
