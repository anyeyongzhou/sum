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

let option = null;

const init = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  const labelRight = {
    position: "right",
  };

  option = {
    title: {
      text: "Bar Chart with Negative Value",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      top: 80,
      bottom: 30,
    },
    xAxis: {
      type: "value",
      position: "top",
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    yAxis: {
      type: "category",
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      data: [
        "ten",
        "nine",
        "eight",
        "seven",
        "six",
        "five",
        "four",
        "three",
        "two",
        "one",
      ],
    },
    series: [
      {
        name: "Cost",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          formatter: "{b}",
        },
        data: [
          { value: -0.07, label: labelRight },
          { value: -0.09, label: labelRight },
          0.2,
          0.44,
          { value: -0.23, label: labelRight },
          0.08,
          { value: -0.17, label: labelRight },
          0.47,
          { value: -0.36, label: labelRight },
          0.18,
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
    border: 1px solid #7f8de0;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
