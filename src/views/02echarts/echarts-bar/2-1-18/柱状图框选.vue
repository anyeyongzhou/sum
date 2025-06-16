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

  let xAxisData = [];
  let data1 = [];
  let data2 = [];
  let data3 = [];
  let data4 = [];
  for (let i = 0; i < 10; i++) {
    xAxisData.push("Class" + i);
    data1.push(+(Math.random() * 2).toFixed(2));
    data2.push(+(Math.random() * 5).toFixed(2));
    data3.push(+(Math.random() + 0.3).toFixed(2));
    data4.push(+Math.random().toFixed(2));
  }
  var emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.3)",
    },
  };
  option = {
    legend: {
      data: ["bar", "bar2", "bar3", "bar4"],
      left: "10%",
    },
    brush: {
      toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
      xAxisIndex: 0,
    },
    toolbox: {
      feature: {
        magicType: {
          type: ["stack"],
        },
        dataView: {},
      },
    },
    tooltip: {},
    xAxis: {
      data: xAxisData,
      name: "X Axis",
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false },
    },
    yAxis: {},
    grid: {
      bottom: 100,
    },
    series: [
      {
        name: "bar",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        data: data1,
      },
      {
        name: "bar2",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        data: data2,
      },
      {
        name: "bar3",
        type: "bar",
        stack: "two",
        emphasis: emphasisStyle,
        data: data3,
      },
      {
        name: "bar4",
        type: "bar",
        stack: "two",
        emphasis: emphasisStyle,
        data: data4,
      },
    ],
  };
  chart.on("brushSelected", function (params) {
    var brushed = [];
    var brushComponent = params.batch[0];
    for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
      var rawIndices = brushComponent.selected[sIdx].dataIndex;
      brushed.push("[Series " + sIdx + "] " + rawIndices.join(", "));
    }
    chart.setOption({
      title: {
        backgroundColor: "#333",
        text: "SELECTED DATA INDICES: \n" + brushed.join("\n"),
        bottom: 0,
        right: "10%",
        width: 100,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
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
