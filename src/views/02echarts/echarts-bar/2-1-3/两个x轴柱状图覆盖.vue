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
      axisPointer: { type: "shadow" },
      // 自定义tooltip内容
      formatter: function (params) {
        const firstVal = params[0].value;
        const secondVal = params[1].value;
        const thirdVal = params[2].value;

        return `
        <div style="font-weight:bold;margin-bottom:5px">${
          params[0].axisValue
        }</div>
        <div style="display:flex;align-items:center">
          <span style="display:inline-block;width:10px;height:10px;background:${
            params[0].color
          };margin-right:5px"></span>
          第一列：${firstVal} (占比 ${((firstVal / thirdVal) * 100).toFixed(
          1
        )}%)
        </div>
        <div style="display:flex;align-items:center">
          <span style="display:inline-block;width:10px;height:10px;background:${
            params[1].color
          };margin-right:5px"></span>
          第二列：${secondVal} (占比 ${((secondVal / thirdVal) * 100).toFixed(
          1
        )}%)
        </div>
        <div style="display:flex;align-items:center;margin-top:3px">
          <span style="display:inline-block;width:10px;height:10px;background:${
            params[2].color
          };margin-right:5px;opacity:0.5"></span>
          <strong>总和：${thirdVal}</strong>
        </div>
      `;
      },
    },
    legend: {
      data: ["第一列", "第二列", "第三列（覆盖）"],
    },
    // 关键：使用单个grid确保坐标系完全重叠
    grid: {
      left: "10%",
      right: "10%",
      top: "20%",
      bottom: "20%",
    },
    xAxis: [
      // 主x轴（第一/二列使用，显示标签）
      {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五"],
        axisTick: { alignWithLabel: true },
        axisLabel: { interval: 0 },
      },
      // 副x轴（第三列使用，完全重叠但隐藏）
      {
        type: "category",
        position: "bottom", // 必须与主x轴同位置
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: ["周一", "周二", "周三", "周四", "周五"], // 需与主x轴相同
      },
    ],
    yAxis: {
      type: "value",
    },
    series: [
      // 第一列数据（主x轴）
      {
        name: "第一列",
        type: "bar",
        xAxisIndex: 0,
        barWidth: 30,
        data: [10, 20, 30, 40, 50],
        itemStyle: { color: "#5470c6" },
      },
      // 第二列数据（主x轴）
      {
        name: "第二列",
        type: "bar",
        xAxisIndex: 0,
        barWidth: 30,
        barGap: "-10%",
        data: [20, 30, 40, 50, 60],
        itemStyle: { color: "#91cc75" },
      },
      // 第三列数据（副x轴 - 覆盖层）
      {
        name: "第三列（覆盖）",
        type: "bar",
        xAxisIndex: 1, // 关键：使用副x轴
        barWidth: 60, // 宽度=前两列之和
        data: [30, 50, 70, 90, 110],
        itemStyle: {
          color: "rgba(255, 0, 0, 0.5)",
          borderColor: "#ff0000",
          borderWidth: 1,
        },
        // 关键：通过z-level控制显示层级
        z: 10,
        // 可选：微调位置（像素级调整）
        barCategoryGap: "0%",
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
