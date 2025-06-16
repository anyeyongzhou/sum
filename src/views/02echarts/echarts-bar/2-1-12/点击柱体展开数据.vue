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

let dataAxis = [
  "点",
  "击",
  "柱",
  "子",
  "或",
  "者",
  "两",
  "指",
  "在",
  "触",
  "屏",
  "上",
  "滑",
  "动",
  "能",
  "够",
  "自",
  "动",
  "缩",
  "放",
];
let data = [
  220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334,
  198, 123, 125, 220,
];
let yMax = 500;
let dataShadow = [];
for (let i = 0; i < data.length; i++) {
  dataShadow.push(yMax);
}

const init = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  option = {
    title: {
      text: "特性示例：渐变色 阴影 点击缩放",
      subtext: "Feature Sample: Gradient Color, Shadow, Click Zoom",
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: data,
      },
    ],
  };

  const zoomSize = 6;
  // 监听点击事件，触发缩放效果，配置项必须开启dataZoom组件
  chart.on("click", function (params) {
    chart.dispatchAction({
      type: "dataZoom",
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
    });
  });

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
