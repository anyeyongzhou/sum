<template>
  <div class="chart-demo">
    <TimeSeriesChart :chartData="chartData" :autoPlayInterval="3000" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TimeSeriesChart from "./components/line.vue";

const chartData = ref({
  titleText: "温度",
  titleVal: "26.5",
  titleUnit: "℃",
  unit: "℃",
  Xdata: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  value: [22, 25, 26, 24, 27, 28, 26],
});

// 模拟数据变化
setTimeout(() => {
  chartData.value = {
    ...chartData.value,
    value: [23, 26, 28, 25, 24, 27, 29],
  };
}, 10000);
</script>

<style scoped>
.chart-demo {
  width: 100%;
  height: 500px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #000;
}
</style>
