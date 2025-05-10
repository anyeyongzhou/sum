<template>
  <div class="home">
    <div class="containers">
      <BarChart
        :data="chartData"
        :interval="3000"
        highlight-color="#ee6666"
        normal-color="#73c0de"
      />
    </div>
  </div>
</template>

<script setup>
import BarChart from "./components/BarChart.vue";

const chartData = ref([
  { name: "一月", value: 120 },
  { name: "二月", value: 200 },
  { name: "三月", value: 300 },
  { name: "四月", value: 400 },
  { name: "无月", value: 500 },
  { name: "六月", value: 600 },
  { name: "七月", value: 700 },
  { name: "八月", value: 800 },
  { name: "九月", value: 900 },
  { name: "十月", value: 1000 },
  { name: "十一月", value: 1100 },
  { name: "十二月", value: 1200 },
  // ...更多数据
]);
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .containers {
    width: 600px;
    height: 400px;
    padding: 10px;
    background-color: #123edf;
    border: 1px solid black;

    /* 编写CSS begin */

    /* 编写CSS end */
  }
}
</style>
