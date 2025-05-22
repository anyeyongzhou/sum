<template>
  <div class="container">
    <div class="chart-wrapper">
      <!-- 使用极坐标柱状图组件 -->
      <PolarBarChart
        :data-list="chartData.dataList"
        :name-list="chartData.nameList"
        :color-list="chartData.colorList"
        :title-size="30"
        legend-bottom="10%"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import PolarBarChart from "./components/pie.vue";

// 图表数据
const chartData = reactive({
  dataList: [13, 21, 39, 14, 22],
  nameList: ["货船", "杂船", "渔船", "集装箱船", "其他"],
  colorList: ["#7b55d8", "#366ccc", "#46b1ce", "#6fd8c9", "#efc97b"],
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  .chart-wrapper {
    width: 500px;
    aspect-ratio: 1;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 20px;
  }
}
</style>
