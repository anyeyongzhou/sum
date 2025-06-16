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

  // 原始数据 - 每个数组代表一个系列，包含7天的数据
  const rawData = [
    [100, 302, 301, 334, 390, 330, 320], // Direct
    [320, 132, 101, 134, 90, 230, 210], // Mail Ad
    [220, 182, 191, 234, 290, 330, 310], // Affiliate Ad
    [150, 212, 201, 154, 190, 330, 410], // Video Ad
    [820, 832, 901, 934, 1290, 1330, 1320], // Search Engine
  ];

  // 计算每天的数据总和
  const totalData = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }

  // 网格布局配置
  const grid = {
    left: 100, // 左侧留白
    right: 100, // 右侧留白
    top: 50, // 顶部留白
    bottom: 50, // 底部留白
  };

  // 计算实际绘图区域尺寸
  const gridWidth = chart.getWidth() - grid.left - grid.right;
  const gridHeight = chart.getHeight() - grid.top - grid.bottom;

  // 计算每个类目(天)的宽度
  const categoryWidth = gridWidth / rawData[0].length;
  // 设置柱状图宽度(占类目宽度的60%)
  const barWidth = categoryWidth * 0.6;
  // 计算柱状图两侧的留白
  const barPadding = (categoryWidth - barWidth) / 2;

  // 创建系列数据 - 堆叠百分比柱状图
  const series = [
    "Direct",
    "Mail Ad",
    "Affiliate Ad",
    "Video Ad",
    "Search Engine",
  ].map((name, sid) => {
    return {
      name, // 系列名称
      type: "bar", // 柱状图类型
      stack: "total", // 堆叠组
      barWidth: "60%", // 柱条宽度
      label: {
        show: true,
        // 显示百分比(保留一位小数)
        formatter: params => Math.round(params.value * 1000) / 10 + "%",
      },
      // 计算每个数据点的百分比
      data: rawData[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : d / totalData[did]
      ),
    };
  });

  // 定义颜色方案
  const color = ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de"];

  // 创建流图元素(连接相邻柱条的带状多边形)
  const elements = [];
  // 遍历每一天(从第二天开始，与前一天连接)
  for (let j = 1, jlen = rawData[0].length; j < jlen; ++j) {
    // 计算左右柱条的x坐标
    const leftX = grid.left + categoryWidth * j - barPadding;
    const rightX = leftX + barPadding * 2;

    // 初始化y坐标(从底部开始)
    let leftY = grid.top + gridHeight;
    let rightY = leftY;

    // 遍历每个系列
    for (let i = 0, len = series.length; i < len; ++i) {
      const points = [];

      // 计算左侧柱条高度(基于百分比)
      const leftBarHeight = (rawData[i][j - 1] / totalData[j - 1]) * gridHeight;
      // 计算右侧柱条高度(基于百分比)
      const rightBarHeight = (rawData[i][j] / totalData[j]) * gridHeight;

      // 构建多边形点集(顺时针方向)
      points.push([leftX, leftY]); // 左下角
      points.push([leftX, leftY - leftBarHeight]); // 左上角
      points.push([rightX, rightY - rightBarHeight]); // 右上角
      points.push([rightX, rightY]); // 右下角
      points.push([leftX, leftY]); // 回到左下角(闭合多边形)

      // 更新y坐标(为下一个系列准备)
      leftY -= leftBarHeight;
      rightY -= rightBarHeight;

      // 添加多边形元素
      elements.push({
        type: "polygon",
        shape: {
          points,
        },
        style: {
          fill: color[i], // 使用系列颜色
          opacity: 0.25, // 半透明效果
        },
      });
    }
  }

  // 完整的图表配置
  option = {
    // 图例配置
    legend: {
      selectedMode: false, // 禁用图例选择功能
    },
    // 网格布局
    grid,
    // Y轴配置
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: value => value * 100 + "%", // 显示百分比
      },
    },
    // X轴配置
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    // 系列数据
    series,
    // 自定义图形元素(流图连接带)
    graphic: {
      elements,
    },
    // 提示框配置
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        let result = params[0].name + "<br/>";
        params.forEach(param => {
          // 显示原始值和百分比
          const rawValue = rawData[param.seriesIndex][param.dataIndex];
          const percent = Math.round(param.value * 1000) / 10;
          result += `${param.marker} ${param.seriesName}: ${rawValue} (${percent}%)<br/>`;
        });
        // 显示总计
        const total = totalData[params[0].dataIndex];
        result += `<strong>Total: ${total}</strong>`;
        return result;
      },
    },
  };

  // 应用配置
  chart.setOption(option);
};

// 组件挂载时初始化图表
onMounted(() => {
  init();
});

// 建议：添加窗口resize事件监听
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
