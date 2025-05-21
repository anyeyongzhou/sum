<template>
  <div class="home">
    <div class="chart-item">
      <Title
        :orderNum="1"
        context="动态折线图"
        :size="2"
        :color="9"
        :wight="1"
        :backgroundColor="1"
      />
      <div class="chart">
        <lineChart
          :scale="true"
          :xAxisData="data.xAxisData"
          :xAxisData1="data.xAxisData1"
          :yAxisData="data.yAxisData"
          :unitY="data.unitY"
          :unitX="data.unitX"
          :colorGroup="data.colorGroup"
          :legendCot="data.legendCot"
          :gridCot="data.gridCot"
          :isShowSymbol="data.isShowSymbol"
          :legendPosition="data.legendPosition"
          :isShowAreaStyle="data.isShowAreaStyle"
          :intervalValue="data.intervalValue"
          :wrapMaxlength="data.wrapMaxlength"
          :needAreaStyle="true"
          :selectedMode="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import lineChart from "./components/lineChart-plus.vue";
const data = ref({
  xAxisData: ["04-01", "04-02", "04-03", "04-04"],
  xAxisData1: ["04-01", "04-02", "04-03", "04-04"],
  yAxisData: [
    {
      name: "日上网电量",
      data: ["0.2345", "0.7843", "0.2222", "0.6512"],
    },
    {
      name: "日下网电量",
      data: ["0.2222", "0.6512", "0.9876", "0.3476"],
    },
  ],
  unitX: "万kWh",
  unitY: ["万kWh"],
  colorGroup: ["#96f203", "#f59a23"],
  legendCot: [20, 40, 0, 0],
  gridCot: {
    left: "2%",
    right: "0%",
    bottom: "3%",
    top: "20%",
    containLabel: true,
  },
  legendPosition: ["center", "top"],
  isShowAreaStyle: true,
  intervalValue: 0,
});

onMounted(() => {
  setTimeout(() => {
    data.value = {
      xAxisData: ["04-01", "04-02", "04-03", "04-04"],
      xAxisData1: ["04-01", "04-02", "04-03", "04-04"],
      yAxisData: [
        {
          name: "日上网电量",
          data: ["0.5345", "0.1843", "0.2422", "0.6512"],
        },
        {
          name: "日下网电量",
          data: ["0.6222", "0.8512", "0.6676", "0.2476"],
        },
      ],
      unitX: "万kWh",
      unitY: ["万kWh"],
      colorGroup: ["#96f203", "#f59a23"],
      legendCot: [20, 40, 0, 0],
      gridCot: {
        left: "2%",
        right: "0%",
        bottom: "3%",
        top: "20%",
        containLabel: true,
      },
      legendPosition: ["center", "top"],
      isShowAreaStyle: true,
      intervalValue: 0,
    };
  }, 5000);
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .chart-item {
    width: 600px;
    height: 400px;
    padding: 20px;

    .chart {
      width: 100%;
      height: 100%;
      background-color: #123edf;
      border: 1px solid black;
    }
  }
}
</style>
