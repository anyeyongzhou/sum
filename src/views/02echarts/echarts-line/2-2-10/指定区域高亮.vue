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
    xAxis: {
      type: "category",
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "30%"],
    },
    visualMap: {
      // 分段类型
      type: "piecewise",
      show: false,
      // 指定用数据的『哪个维度』，映射到视觉元素上。『数据』即 series.data
      dimension: 0,
      // 指定取哪个系列的数据，即哪个系列的 series.data
      seriesIndex: 0,
      // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
      pieces: [
        {
          gt: 1,
          lt: 3,
          color: "rgba(0, 0, 180, 0.4)",
        },
        {
          gt: 5,
          lt: 7,
          color: "rgba(0, 0, 180, 0.4)",
        },
      ],
    },
    series: [
      {
        type: "line",
        smooth: 0.6,
        symbol: "none",
        lineStyle: {
          color: "#5470C6",
          width: 5,
        },
        // 标记线(竖向的虚线)
        markLine: {
          symbol: ["none", "none"],
          label: { show: false },
          data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
        },
        areaStyle: {},
        data: [
          ["2019-10-10", 200],
          ["2019-10-11", 560],
          ["2019-10-12", 750],
          ["2019-10-13", 580],
          ["2019-10-14", 250],
          ["2019-10-15", 300],
          ["2019-10-16", 450],
          ["2019-10-17", 300],
          ["2019-10-18", 100],
        ],
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
    background-color: #7f8de0;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
