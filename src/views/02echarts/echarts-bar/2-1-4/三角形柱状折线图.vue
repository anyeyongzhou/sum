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
      formatter: function (params) {
        let res = params[0].axisValue + "<br>";
        params.forEach(item => {
          let color = item.seriesName === "人数" ? "#ff0000" : "#000";
          res += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:${item.color};"></span>`;
          res += `${item.seriesName}: `;
          res += `<span style="color:${color}">${item.data}</span><br>`;
        });
        return res;
      },
      axisPointer: { type: "shadow" },
    },
    legend: {
      data: [
        { name: "人数", icon: "rect" }, // 修改为长方形图标
        "薪酬",
      ],
      top: "5%",
    },
    xAxis: {
      data: [
        "202405",
        "202406",
        "202407",
        "202408",
        "202409",
        "202410",
        "202411",
        "202412",
        "202501",
        "202502",
        "202503",
        "202504",
      ],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: "#333" },
      splitLine: { show: true, lineStyle: { type: "dashed" } },
    },
    yAxis: [
      {
        type: "value",
        name: "(人)",
        position: "left",
        axisLabel: {
          color: "#000",
          formatter: "{value}",
        },
        min: 0, // ✅ 强制从0开始
        // max: 25  // ✅ 设置合适最大值
      },
      {
        type: "value",
        name: "(万元)",
        position: "right",
        axisLabel: {
          color: "#000",
          formatter: "{value}",
        },
        min: 0, // ✅ 强制从0开始
        // max: 1.2,  // ✅ 根据数据最大值设置
        offset: 0, // ✅ 对齐右侧
      },
    ],
    color: ["#478af2"],
    series: [
      // 柱状图系列（主Y轴）
      {
        name: "人数",
        type: "pictorialBar",
        yAxisIndex: 0, // ✅ 明确关联左侧Y轴
        barCategoryGap: "-15%", // ✅ 调整柱子间距
        symbol: "triangle",
        itemStyle: {
          normal: { opacity: 0.5 },
          emphasis: { opacity: 1 },
        },
        data: [23, 21, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10],
        z: 10,
        symbolOffset: [0, 0], // ✅ 消除图标偏移
      },
      // 折线图系列（次Y轴）
      {
        type: "line",
        name: "薪酬",
        yAxisIndex: 1, // ✅ 明确关联右侧Y轴
        data: [
          0.15, 0.15, 0.15, 0.25, 0.48, 0.65, 0.82, 0.95, 1.02, 1.05, 1.08,
          1.09,
        ], // ✅ 调整为正数
        itemStyle: {
          color: "transparent",
          borderColor: "#FFD700",
          borderWidth: 2,
        },
        lineStyle: {
          color: "#FFD700",
          width: 2,
        },
        symbol: "circle",
        symbolSize: 8,
        z: 20,
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
