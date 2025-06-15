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
    legend: {
      data: ["Altitude (km) vs. temperature (°C)"],
    },
    tooltip: {
      trigger: "axis",
      formatter: "Temperature : <br/>{b}km : {c}°C",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} °C",
      },
    },
    yAxis: {
      type: "category",
      axisLine: { onZero: false },
      axisLabel: {
        formatter: "{value} km",
      },
      boundaryGap: false,
      data: ["0", "10", "20", "30", "40", "50", "60", "70", "80"],
    },
    series: [
      {
        name: "Altitude (km) vs. temperature (°C)",
        type: "line",
        symbolSize: 10,
        symbol: "circle",
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: "rgba(0,0,0,0.3)",
          shadowBlur: 10,
          shadowOffsetY: 8,
        },
        data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5],
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
