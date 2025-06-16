<template>
  <div class="home">
    <div class="containers">
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onUnmounted } from "vue";

// 图表实例和DOM引用
const chartRef = ref(null);
let chart = null;
let updateInterval = null; // 存储定时器引用，便于清除

/**
 * 生成时间类别数据
 * @param {number} count - 需要生成的时间点数量
 * @param {number} interval - 时间间隔(毫秒)
 * @returns {Array} 时间字符串数组
 */
const generateTimeCategories = (count, interval) => {
  let now = new Date();
  const res = [];
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - (count - 1 - i) * interval);
    res.push(time.toLocaleTimeString().replace(/^\D*/, ""));
  }
  return res;
};

/**
 * 生成序列类别数据
 * @param {number} count - 需要生成的序列数量
 * @returns {Array} 序列数字数组
 */
const generateSequenceCategories = count => {
  return Array.from({ length: count }, (_, i) => i);
};

/**
 * 生成随机数据
 * @param {number} count - 数据点数量
 * @param {number} max - 最大值
 * @param {number} min - 最小值
 * @returns {Array} 随机数数组
 */
const generateRandomData = (count, max, min = 0) => {
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
};

/**
 * 生成带小数的随机数据
 * @param {number} count - 数据点数量
 * @param {number} max - 最大值
 * @param {number} min - 最小值
 * @param {number} decimal - 小数位数
 * @returns {Array} 带小数的随机数数组
 */
const generateRandomFloatData = (count, max, min = 0, decimal = 1) => {
  return Array.from({ length: count }, () =>
    parseFloat((Math.random() * (max - min) + min).toFixed(decimal))
  );
};

// 初始化图表
const initChart = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  // 初始化数据
  const dataPoints = 10; // 显示的数据点数量
  const updateIntervalMs = 2000; // 更新间隔(毫秒)

  // 生成初始数据
  let categories = generateTimeCategories(dataPoints, updateIntervalMs);
  let categories2 = generateSequenceCategories(dataPoints);
  let barData = generateRandomData(dataPoints, 1000);
  let lineData = generateRandomFloatData(dataPoints, 15, 5);

  // 图表配置
  const option = {
    title: {
      text: "实时动态数据监控",
      left: "center",
      textStyle: {
        color: "#333",
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#283b56",
          color: "#fff",
        },
        lineStyle: {
          color: "#57617B",
        },
      },
      formatter: params => {
        const time = params[0].axisValue;
        const barValue = params[0].data;
        const lineValue = params[1].data;
        return `
          <div style="font-weight:bold">时间: ${time}</div>
          <div>${params[0].marker} ${params[0].seriesName}: ${barValue}</div>
          <div>${params[1].marker} ${params[1].seriesName}: ${lineValue}</div>
        `;
      },
    },
    legend: {
      data: ["动态柱状图", "动态折线图"],
      right: 20,
      top: 20,
      textStyle: {
        color: "#666",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        axisLine: {
          lineStyle: {
            color: "#57617B",
          },
        },
        axisLabel: {
          color: "#666",
          rotate: 45, // 标签旋转45度防止重叠
        },
        data: categories,
      },
      {
        type: "category",
        boundaryGap: true,
        show: false, // 隐藏第二个x轴
        data: categories2,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "价格",
        nameTextStyle: {
          color: "#666",
        },
        scale: true,
        max: 20,
        min: 0,
        boundaryGap: [0.2, 0.2],
        axisLine: {
          lineStyle: {
            color: "#57617B",
          },
        },
        axisLabel: {
          formatter: "{value} ¥",
          color: "#666",
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#DDD",
          },
        },
      },
      {
        type: "value",
        name: "订单量",
        nameTextStyle: {
          color: "#666",
        },
        scale: true,
        max: 1200,
        min: 0,
        boundaryGap: [0.2, 0.2],
        axisLine: {
          lineStyle: {
            color: "#57617B",
          },
        },
        axisLabel: {
          color: "#666",
        },
        splitLine: {
          show: false, // 不显示分割线
        },
      },
    ],
    series: [
      {
        name: "动态柱状图",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
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
        data: barData,
        animationDuration: updateIntervalMs,
      },
      {
        name: "动态折线图",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          color: "#d14a61",
        },
        lineStyle: {
          color: "#d14a61",
          width: 3,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(209,74,97,0.3)" },
            { offset: 1, color: "rgba(209,74,97,0.1)" },
          ]),
        },
        data: lineData,
        animationDuration: updateIntervalMs,
      },
    ],
    animationEasing: "elasticOut",
  };

  chart.setOption(option);

  // 定时更新数据
  updateInterval = setInterval(() => {
    const now = new Date();
    const axisData = now.toLocaleTimeString().replace(/^\D*/, "");

    // 更新数据 - 移除第一个元素，添加新元素
    categories.shift();
    categories.push(axisData);

    categories2.shift();
    categories2.push(categories2[categories2.length - 1] + 1);

    barData.shift();
    barData.push(Math.round(Math.random() * 1000));

    lineData.shift();
    lineData.push(parseFloat((Math.random() * 10 + 5).toFixed(1)));

    // 更新图表
    chart.setOption({
      xAxis: [{ data: categories }, { data: categories2 }],
      series: [{ data: barData }, { data: lineData }],
    });
  }, updateIntervalMs);
};

// 组件挂载时初始化图表
onMounted(() => {
  initChart();
});

// 组件卸载时清除定时器和图表实例
onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  if (chart) {
    chart.dispose();
  }
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: #f5f7fa;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .containers {
    width: 800px;
    height: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
