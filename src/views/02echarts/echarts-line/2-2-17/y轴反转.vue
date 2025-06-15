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

let timeData = ["2009/6/12 2:00", "2009/6/12 3:00", "2009/6/12 4:00"];
timeData = timeData.map(function (str) {
  return str.replace("2009/", "");
});

const init = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  const option = {
    title: {
      text: "Rainfall vs Evaporation",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        animation: false,
      },
    },
    legend: {
      data: ["Evaporation", "Rainfall"],
      left: 10,
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: "all",
        },
      ],
    },
    grid: [
      {
        left: 60,
        right: 50,
        height: "35%",
      },
      {
        left: 60,
        right: 50,
        top: "55%",
        height: "35%",
      },
    ],
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLine: { onZero: true },
        data: timeData,
      },
      {
        gridIndex: 1,
        type: "category",
        boundaryGap: false,
        axisLine: { onZero: true },
        data: timeData,
        position: "top",
      },
    ],
    yAxis: [
      {
        name: "Evaporation(m³/s)",
        type: "value",
        max: 500,
      },
      {
        gridIndex: 1,
        name: "Rainfall(mm)",
        type: "value",
        // 是否是反向坐标轴
        inverse: true,
      },
    ],
    series: [
      {
        name: "Evaporation",
        type: "line",
        symbolSize: 8,
        // prettier-ignore
        data: [
                0.97, 0.96, 0.96
            ],
      },
      {
        name: "Rainfall",
        type: "line",
        xAxisIndex: 1,
        yAxisIndex: 1,
        symbolSize: 8,
        // prettier-ignore
        data: [10, 20, 5, ],
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
