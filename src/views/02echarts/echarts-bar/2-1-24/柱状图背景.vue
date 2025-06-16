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
import imgUrl from "/@/assets/beauty/1/1-4.jpg";

const init = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }
  // 使用 canvas 绘制水印
  const waterMarkText = "ECHARTS";
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.height = 100;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.globalAlpha = 0.08;
  ctx.font = "20px Microsoft Yahei";
  ctx.translate(50, 50);
  ctx.rotate(-Math.PI / 4);
  ctx.fillText(waterMarkText, 0, 0);

  const option = {
    // 使用backgroundColor的image属性设置背景
    backgroundColor: {
      type: "pattern",
      // image: canvas,
      image: imgUrl, //使用图片的话控制不了图片填充的方式
      repeat: "repeat",
    },
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
        type: "bar",
        data: [23, 60, 20, 36, 23, 85],
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
