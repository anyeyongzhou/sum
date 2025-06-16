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

  option = {
    tooltip: {},
    angleAxis: [
      {
        type: "category",
        polarIndex: 0,
        startAngle: 90,
        endAngle: 0,
        data: ["S1", "S2", "S3"],
      },
      {
        type: "category",
        polarIndex: 1,
        startAngle: -90,
        endAngle: -180,
        data: ["T1", "T2", "T3"],
      },
    ],
    radiusAxis: [{ polarIndex: 0 }, { polarIndex: 1 }],
    polar: [{}, {}],
    series: [
      {
        type: "bar",
        polarIndex: 0,
        data: [1, 2, 3],
        coordinateSystem: "polar",
      },
      {
        type: "bar",
        polarIndex: 1,
        data: [1, 2, 3],
        coordinateSystem: "polar",
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
