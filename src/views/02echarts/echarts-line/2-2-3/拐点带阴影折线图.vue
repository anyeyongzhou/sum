<template>
  <div class="chart-demo">
    <TimeSeriesChart
      :chart-data="resultsData.data"
      :smooth="false"
      :symbol-size="8"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TimeSeriesChart from "./components/line.vue";

const resultsData = ref({
  data: {
    value: [
      "306.00",
      "213.00",
      "179.00",
      "169.00",
      "163.00",
      "153.00",
      "195.00",
      "193.00",
      "212.00",
      "243.00",
      "254.00",
      "280.00",
      "300.00",
      "286.00",
      "258.00",
      "267.00",
      "290.00",
      "284.00",
      "287.00",
      "325.00",
      "367.00",
      "445.00",
      "534.00",
      "496.00",
    ],
    smooth: false,
    symbolSize: true,
    titleText: "今日流量",
    titleVal: "534",
    titleUnit: "峰值",
    unit: "吨",
    Xdata: [
      "00点",
      "01点",
      "02点",
      "03点",
      "04点",
      "05点",
      "06点",
      "07点",
      "08点",
      "09点",
      "10点",
      "11点",
      "12点",
      "13点",
      "14点",
      "15点",
      "16点",
      "17点",
      "18点",
      "19点",
      "20点",
      "21点",
      "22点",
      "23点",
    ],
    grid: ["20%", "10%", "20%", "10%"],
  },
});
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
