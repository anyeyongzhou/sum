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

  const rawData = [
    [100, 302, 301, 334, 390, 330, 320],
    [320, 132, 101, 134, 90, 230, 210],
    [220, 182, 191, 234, 290, 330, 310],
    [150, 212, 201, 154, 190, 330, 410],
    [820, 832, 901, 934, 1290, 1330, 1320],
  ];
  const totalData = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }
  const grid = {
    left: 100,
    right: 100,
    top: 50,
    bottom: 50,
  };
  const series = [
    "Direct",
    "Mail Ad",
    "Affiliate Ad",
    "Video Ad",
    "Search Engine",
  ].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "60%",
      label: {
        show: true,
        formatter: params => Math.round(params.value * 1000) / 10 + "%",
      },
      data: rawData[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : d / totalData[did]
      ),
    };
  });

  option = {
    legend: {
      selectedMode: false,
    },
    grid,
    yAxis: {
      type: "value",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    series,
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
