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

  let data = [120, 200, 150, 80, 70, 110, 130];
  let bgarr = new Array();
  bgarr.length = data.length;
  bgarr.fill(1);
  let color = "red";
  let labelColor = "gold";

  const option = {
    backgroundColor: "#fff",
    grid: [
      {
        bottom: "20%",
      },
      {
        bottom: "15%",
      },
    ],
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLabel: {
          color: color,
          fontSize: 14,
          fontWeight: 600,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        gridIndex: 0,
      },
      {
        type: "category",
        show: false,
        gridIndex: 1,
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: color,
          fontSize: 14,
          fontWeight: 600,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: "#9999994a",
          },
        },
        gridIndex: 0,
      },
      {
        type: "value",
        max: 1,
        show: false,
        gridIndex: 1,
      },
    ],
    color: [
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#007BFF",
          },
          {
            offset: 1,
            color: "#4297FE",
          },
        ],
        global: false, // 缺省为 false
      },
    ],
    series: [
      {
        data: data,
        type: "line",
        z: 199,
        barWidth: 30,
        label: {
          position: "top",
        },
      },
      {
        data: bgarr,
        xAxisIndex: 1,
        yAxisIndex: 1,
        z: 99,
        itemStyle: {
          color: "#cccccc2a",
        },
        barWidth: 60,
        type: "bar",
        id: "bar_background",
      },
    ],
  };

  chart.setOption(option);

  chart.on("mouseout", v => {
    bgarr.length = 0;
    bgarr.length = data.length;
    bgarr.fill(1);
    chart.setOption({
      series: {
        id: "bar_background",
        data: bgarr,
      },
    });
  });
  chart.on("mouseover", v => {
    let dataIndex = v.dataIndex;
    bgarr[dataIndex] = {
      value: 1,
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#4297FE3a",
            },
            {
              offset: 1,
              color: "#cccccc2a",
            },
          ],
          global: false, // 缺省为 false
        },
      },
    };
    chart.setOption({
      series: {
        id: "bar_background",
        data: bgarr,
      },
    });
  });
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
    background-color: #7f8de0;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
