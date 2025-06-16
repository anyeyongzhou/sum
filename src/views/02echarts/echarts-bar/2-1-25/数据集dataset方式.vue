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
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: ["product", "2015", "2016", "2017"],
      source: [
        { product: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
        { product: "Milk Tea", 2015: 83.1, 2016: 73.4, 2017: 55.1 },
        { product: "Cheese Cocoa", 2015: 86.4, 2016: 65.2, 2017: 82.5 },
        { product: "Walnut Brownie", 2015: 72.4, 2016: 53.9, 2017: 39.1 },
      ],
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
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
