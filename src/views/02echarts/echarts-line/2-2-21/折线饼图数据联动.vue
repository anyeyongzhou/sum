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

const init = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  const option = {
    legend: {},
    tooltip: {
      trigger: "axis",
      showContent: false,
    },
    dataset: {
      source: [
        ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
        ["Milk Tea", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
        ["Matcha Latte", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
        ["Cheese Cocoa", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
        ["Walnut Brownie", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
      ],
    },
    xAxis: { type: "category" },
    yAxis: { gridIndex: 0 },
    grid: { top: "55%" },
    series: [
      {
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
      {
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
      {
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
      {
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
      {
        type: "pie",
        id: "pie",
        radius: "30%",
        center: ["50%", "25%"],
        emphasis: {
          focus: "self",
        },
        label: {
          formatter: "{b}: {@2012} ({d}%)",
        },
        encode: {
          itemName: "product",
          value: "2012",
          tooltip: "2012",
        },
      },
    ],
  };

  // 监听坐标轴更新事件
  chart.on("updateAxisPointer", function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      // 获取当前hover的年份对应的数据维度
      const dimension = xAxisInfo.value + 1;

      // 动态更新饼图
      chart.setOption({
        series: {
          id: "pie",
          label: {
            // 更新标签显示当前年份的数据
            formatter: "{b}: {@[" + dimension + "]} ({d}%)",
          },
          encode: {
            value: dimension, // 使用当前年份的值
            tooltip: dimension, // 提示框显示当前年份的值
          },
        },
      });
    }
  });

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
