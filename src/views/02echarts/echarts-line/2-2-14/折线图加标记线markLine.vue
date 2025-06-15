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
      text: "Beijing AQI",
      left: "1%",
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "5%",
      right: "15%",
      bottom: "10%",
    },
    xAxis: {
      data: [
        2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028,
        2029,
      ],
    },
    yAxis: {},
    toolbox: {
      right: 10,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    visualMap: {
      top: 50,
      right: 10,
      pieces: [
        {
          gt: 0,
          lte: 50,
          color: "#93CE07",
        },
        {
          gt: 50,
          lte: 100,
          color: "#FBDB0F",
        },
        {
          gt: 100,
          lte: 150,
          color: "#FC7D02",
        },
        {
          gt: 150,
          lte: 200,
          color: "#FD0100",
        },
        {
          gt: 200,
          lte: 300,
          color: "#AA069F",
        },
        {
          gt: 300,
          color: "#AC3B2A",
        },
      ],
      outOfRange: {
        color: "#999",
      },
    },
    series: {
      name: "aaa",
      type: "line",
      data: [50, 600, 500, 365, 10, 46, 66, 354, 159, 472, 235, 654, 651],
      // 标记线
      markLine: {
        silent: true,
        lineStyle: {
          color: "#333",
        },
        data: [
          {
            yAxis: 50,
          },
          {
            yAxis: 100,
          },
          {
            yAxis: 150,
          },
          {
            yAxis: 200,
          },
          {
            yAxis: 300,
          },
        ],
      },
    },
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
