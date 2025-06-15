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
    title: {
      text: "Step Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Step Start", "Step Middle", "Step End"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Step Start",
        type: "line",
        // 设置成 'start', 'middle', 'end' 分别配置在当前点，当前点与下个点的中间点，下个点拐弯
        step: "start",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Step Middle",
        type: "line",
        step: "middle",
        data: [220, 282, 201, 234, 290, 430, 410],
      },
      {
        name: "Step End",
        type: "line",
        step: "end",
        data: [450, 432, 401, 454, 590, 530, 510],
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
