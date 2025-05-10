<template>
  <div class="home">
    <div class="containers">
      <PieChart
        :chartData="investList"
        :showOuter="true"
        :unit="'企业总数'"
        :total="investTotal"
        :colorList="colorList"
      />
    </div>
  </div>
</template>

<script setup>
import PieChart from "./components/PieChart.vue";

const colorList = ["#28b3fb", "#00d784", "#ffc73c", "#ff606f", "#7986cc"];

const investList = [
  {
    name: "发",
    value: "216",
    // rate: "0.16",
    output: 1486.1,
    yoy: 8.74,
  },
  {
    name: "储",
    value: "85",
    // rate: "6.69",
    output: 1613.7,
    yoy: -1.47,
  },
  {
    name: "送",
    value: "223",
    // rate: "6.77",
    output: 786.1,
    yoy: 10.86,
  },
  {
    name: "用",
    value: "749",
    // rate: "17.75",
    output: 2856.4,
    yoy: 27.73,
  },
];

const investTotal = 10;
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
    width: 300px;
    height: 200px;
    padding: 10px;
    background-color: #7f8de0;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
