<template>
  <!-- 主容器 -->
  <div class="home">
    <!-- 图表容器 -->
    <div class="containers">
      <!-- ECharts DOM元素 -->
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

// 图表实例和DOM引用
let chart = null;
const chartRef = ref(null);

// 图表配置项
let option = null;

// 初始化图表函数
const init = () => {
  // 如果图表未初始化，则创建实例
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  // 定义系列数据
  var series = [
    {
      data: [120, 200, 150, 80, 70, 110, 130], // 系列a的数据
      type: "bar", // 柱状图
      stack: "a", // 堆叠组a
      name: "a", // 系列名称
    },
    {
      data: [10, 46, 64, "-", 0, "-", 0], // 系列b的数据("-"表示无数据)
      type: "bar",
      stack: "a", // 堆叠组a
      name: "b",
    },
    {
      data: [30, "-", 0, 20, 10, "-", 0], // 系列c的数据
      type: "bar",
      stack: "a", // 堆叠组a
      name: "c",
    },
    {
      data: [30, "-", 0, 20, 10, "-", 0], // 系列d的数据
      type: "bar",
      stack: "b", // 堆叠组b
      name: "d",
    },
    {
      data: [10, 20, 150, 0, "-", 50, 10], // 系列e的数据
      type: "bar",
      stack: "b", // 堆叠组b
      name: "e",
    },
  ];

  // 计算每个堆叠组的起始和结束系列索引
  const stackInfo = {};
  for (let i = 0; i < series[0].data.length; ++i) {
    // 遍历每个数据点
    for (let j = 0; j < series.length; ++j) {
      // 遍历每个系列
      const stackName = series[j].stack;
      if (!stackName) {
        continue; // 如果没有堆叠组则跳过
      }

      // 初始化堆叠组信息
      if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
          stackStart: [], // 记录每个数据点的起始系列索引
          stackEnd: [], // 记录每个数据点的结束系列索引
        };
      }

      const info = stackInfo[stackName];
      const data = series[j].data[i];

      // 处理有效数据(不为"-"的数据)
      if (data && data !== "-") {
        if (info.stackStart[i] == null) {
          info.stackStart[i] = j; // 记录起始系列索引
        }
        info.stackEnd[i] = j; // 更新结束系列索引
      }
    }
  }

  // 为每个数据点添加圆角样式(只在堆叠顶部显示圆角)
  for (let i = 0; i < series.length; ++i) {
    const data = series[i].data;
    const info = stackInfo[series[i].stack];

    for (let j = 0; j < series[i].data.length; ++j) {
      const isEnd = info.stackEnd[j] === i; // 判断是否是堆叠顶部
      const topBorder = isEnd ? 20 : 0; // 顶部系列有圆角，其他无
      const bottomBorder = 0; // 底部无圆角

      // 重构数据格式，添加样式配置
      data[j] = {
        value: data[j], // 原始数据值
        itemStyle: {
          // 设置圆角(上右、上左、下右、下左)
          borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder],
        },
      };
    }
  }

  // 完整的图表配置
  option = {
    // X轴配置
    xAxis: {
      type: "category", // 类目轴
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // 星期数据
    },
    // Y轴配置
    yAxis: {
      type: "value", // 数值轴
    },
    // 系列数据
    series: series,
  };

  // 应用配置
  chart.setOption(option);
};

// 组件挂载时初始化图表
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
  justify-content: center;
  align-items: center;

  .containers {
    width: 600px;
    height: 400px;
    padding: 10px;
    border: 1px solid #7f8de0; // 容器边框

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
