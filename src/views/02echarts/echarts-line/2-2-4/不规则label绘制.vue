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

// 定义字体大小变量
const fontSize = 14;

const plantingLogList = [
  { logTime: "2024-01-15", type: "播种", color: "#FF6B6B" },
  { logTime: "2024-02-20", type: "施肥,浇水", color: "#4ECDC4" },
  { logTime: "2024-03-10", type: "浇水,除草", color: "#45B7D1" },
  { logTime: "2024-03-25", type: "除草", color: "#96CEB4" },
  { logTime: "2024-04-12", type: "喷药,追肥", color: "#FFEAA7" },
  { logTime: "2024-05-08", type: "喷药,追肥,追肥", color: "#DDA0DD" },
  { logTime: "2024-06-15", type: "收获", color: "#98D8C8" },
];

// 添加温度数据
const temperatureData = [
  { date: "2024-01-15", value: 5 },
  { date: "2024-02-20", value: 12 },
  { date: "2024-03-10", value: 18 },
  { date: "2024-03-25", value: 12 },
  { date: "2024-04-12", value: 10 },
  { date: "2024-05-08", value: 18 },
  { date: "2024-06-15", value: 9 },
];

const init = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  const xData = plantingLogList.map(item => item.logTime);

  const option = {
    backgroundColor: "black",
    grid: {
      top: "20%",
      bottom: "5%",
      left: "1%",
      right: "2%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
    },
    // dataZoom: [{ type: "inside" }],
    xAxis: {
      type: "category",
      data: xData,
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(56,89,130,0.18)",
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(55,255,191,0.2)",
        },
      },
      axisLabel: {
        color: "#789590",
        align: "center",
        margin: 4,
      },
      // 坐标轴两边不留白
      boundaryGap: false,
    },
    yAxis: [
      // 第一个Y轴（左侧，温度轴）
      {
        type: "value", // 数值轴
        splitLine: {
          show: false, // 不显示分割线
        },
        axisTick: {
          show: false, // 不显示刻度
        },
        axisLabel: {
          color: "#789590", // 标签颜色
        },
        name: "温度(°C)", // 轴名称
        nameLocation: "end", // 名称位置
        nameRotate: 0, // 名称旋转角度
        nameTextStyle: {
          color: "#789590", // 名称颜色
          lineHeight: -10, // 行高
          verticalAlign: "top", // 垂直对齐
          fontSize: 9, // 字体大小
        },
        z: 10, // 层级
        zlevel: 10, // 层级
        minInterval: 1, // 最小间隔
        axisLine: {
          show: true, // 显示轴线
          symbol: ["none", "arrow"], // 末端带箭头
          symbolOffset: [0, 10], // 箭头偏移
          lineStyle: {
            color: "rgba(55,255,191,0.2)", // 轴线颜色
          },
        },
      },
      // 第二个Y轴（隐藏，用于种植日志标记）
      {
        type: "value",
        show: false, // 不显示
        max: 2, // 最大值设为2
      },
    ],
    legend: {
      show: true,
      top: "5%",
      right: "5%",
      icon: "circle",
      itemHeight: 10,
      itemGap: 30,
      textStyle: {
        color: "#789590",
      },
    },
    series: [
      // 第一个系列：温度趋势线
      {
        name: "温度趋势", // 系列名称
        data: temperatureData.map(item => [item.date, item.value]), // 数据格式为[日期, 温度值]
        type: "line", // 折线图
        smooth: true, // 平滑曲线
        symbol: "circle", // 数据点形状
        symbolSize: 6, // 数据点大小
        color: "#2ED372", // 线条颜色
        yAxisIndex: 0, // 使用第一个Y轴
        tooltip: {
          show: true, // 显示提示框
        },
        lineStyle: {
          width: 2, // 线宽
        },
        // 区域填充样式
        areaStyle: {
          color: {
            type: "linear", // 线性渐变
            x: 0,
            y: 0,
            x2: 0,
            y2: 1, // 渐变方向
            colorStops: [
              { offset: 0, color: "rgba(46,211,114,0.3)" }, // 起始颜色
              { offset: 1, color: "rgba(46,211,114,0)" }, // 结束颜色
            ],
          },
        },
      },
      // 第二个系列：种植日志标记（条形图）
      {
        type: "bar", // 条形图
        barWidth: 3, // 条宽
        yAxisIndex: 1, // 使用第二个Y轴
        z: 1, // 层级
        tooltip: {
          show: false, // 不显示提示框
        },
        data: plantingLogList.map(item => ({
          name: item.type, // 日志类型
          value: [item.logTime, 1], // 数据格式为[日期, 1]
          itemStyle: {
            color: {
              type: "linear", // 线性渐变
              x: 0,
              y: 0,
              x2: 0,
              y2: 1, // 渐变方向
              colorStops: [
                { offset: 0, color: item.color }, // 起始颜色
                { offset: 1, color: `${item.color}20` }, // 结束颜色（带透明度）
              ],
            },
          },
        })),
        // 标记点配置
        markPoint: {
          symbol:
            "path://M5,0 L55,0 Q60,0 60,5 L60,18 Q60,23 55,23 L35,23 L30,30 L25,23 L5,23 Q0,23 0,18 L0,5 Q0,0 5,0 Z", // 自定义气泡形状
          symbolSize(value, params) {
            // 根据字体大小和文本长度动态计算大小
            const textWidth = Math.max(45, params.name.length * 12 + 10);
            return [textWidth, 30]; // 返回[宽度, 高度]
          },
          symbolOffset: [0, 0], // 偏移量
          silent: true, // 不响应鼠标事件
          label: {
            show: true, // 显示标签
            formatter: "{b}", // 显示名称
            color: "#CEFFE6", // 标签颜色
            fontSize, // 使用全局字体大小
            offset: [0, -2], // 偏移量
            verticalAlign: "middle", // 垂直居中
          },
          data: plantingLogList.map(item => ({
            name: item.type, // 标记点名称
            coord: [item.logTime, 1], // 坐标位置
            itemStyle: {
              color: "rgba(24, 31, 37, 0.9)", // 背景色
              borderColor: item.color, // 边框颜色
              borderWidth: 1.5, // 边框宽度
            },
          })),
        },
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
