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
    tooltip: {
      trigger: "axis",
    },
    xAxis: [
      {
        type: "category",
        data: [
          "2023-01",
          "2023-02",
          "2023-03",
          "2023-04",
          "2023-05",
          "2023-06",
        ],
        axisLine: {
          lineStyle: {
            color: "#999",
          },
        },
        axisLabel: {
          interval: 4,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitNumber: 4,
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#DDD",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#333",
          },
        },
        nameTextStyle: {
          color: "#999",
        },
        splitArea: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "价格",
        type: "line",
        data: [23, 60, 20, 36, 23, 85],
        lineStyle: {
          normal: {
            width: 8,
            color: {
              type: "linear",

              colorStops: [
                {
                  offset: 0,
                  color: "#A9F387", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#48D8BF", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
            shadowColor: "rgba(72,216,191, 0.3)",
            shadowBlur: 10,
            shadowOffsetY: 20,
          },
        },
        itemStyle: {
          normal: {
            color: "#fff",
            borderWidth: 10,
            /*shadowColor: 'rgba(72,216,191, 0.3)',
                shadowBlur: 100,*/
            borderColor: "#A9F387",
          },
        },
        smooth: true,
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
    background-color: #7f8de0;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
