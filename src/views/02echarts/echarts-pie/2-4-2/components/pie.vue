<template>
  <div class="polar-bar-chart">
    <!-- ECharts图表容器 -->
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as echarts from "echarts";

// 定义组件接收的属性
const props = defineProps({
  // 数据值数组，每个元素代表一个类别的数值
  dataList: {
    type: Array,
    required: true,
    validator: value => value.every(item => typeof item === "number"),
  },
  // 类别名称数组
  nameList: {
    type: Array,
    required: true,
    validator: value => value.every(item => typeof item === "string"),
  },
  // 颜色数组，对应每个类别的颜色
  colorList: {
    type: Array,
    required: true,
    validator: value => value.every(item => typeof item === "string"),
  },
  // 标题字体大小（可选）
  titleSize: {
    type: Number,
    default: 28,
  },
  // 图例距离底部距离（可选）
  legendBottom: {
    type: String,
    default: "8%",
  },
});

const chartRef = ref(null); // 图表DOM元素引用
let chartInstance = null; // ECharts实例

/**
 * 初始化或更新图表
 */
const initChart = () => {
  if (!chartRef.value) return;

  // 准备图例数据
  const lengthList = props.nameList.map(item => ({
    name: item,
    icon: "circle",
  }));

  // 计算总数
  const totalNum = props.dataList.reduce((prev, curr) => prev + curr, 0);
  const seriesList = []; // 系列数据
  const valList = []; // 百分比值列表

  // 处理每个数据项
  props.dataList.forEach((item, index) => {
    // 计算百分比
    const percentage = (item / totalNum) * 100;
    const obj = {
      // 如果是最后一项，用100减去前面各项的百分比和
      value:
        index === props.dataList.length - 1
          ? Number(
              (100 - valList.reduce((prev, curr) => prev + curr, 0)).toFixed(2)
            )
          : Number(percentage.toFixed(2)),
      value2: item, // 原始值
    };

    // 如果不是最后一项，将百分比加入列表
    if (index !== props.dataList.length - 1) {
      valList.push(obj.value);
    }

    // 配置每个系列的样式
    seriesList.push({
      name: props.nameList[index], // 系列名称
      type: "bar", // 柱状图
      data: [obj], // 数据
      stack: "one", // 数据堆叠
      coordinateSystem: "polar", // 极坐标系
      roundCap: true, // 圆角
      zlevel: 20, // 层级
      itemStyle: {
        // 渐变色
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: props.colorList[index] }, // 起始颜色
            { offset: 1, color: "#ffffff" }, // 结束颜色
          ],
        },
      },
      // 高亮样式
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    });
  });

  // 添加背景系列（圆环底部的白色背景）
  seriesList.push({
    name: "外层背景",
    type: "pie",
    radius: ["0%", "38%"], // 内半径和外半径
    silent: true, // 不响应鼠标事件
    center: ["50%", "36%"], // 中心位置
    itemStyle: {
      color: "#ffffff", // 白色背景
      opacity: 1,
    },
    label: { show: false }, // 不显示标签
    data: [{ value: 0, name: "外层背景" }],
  });

  // ECharts配置项
  const option = {
    // 提示框配置
    tooltip: {
      trigger: "item",
      formatter: params =>
        `${params.seriesName}<br/>${params.marker}${params.data.value2}<br/>${params.data.value}%`,
    },
    // 标题配置（中间显示总数）
    title: [
      {
        text: `{num|${totalNum}}`,
        x: "48%",
        y: "30%",
        textAlign: "center",
        textStyle: {
          rich: {
            num: {
              fontSize: props.titleSize,
              fontWeight: "bold",
              lineHeight: 40,
              color: "#000000",
            },
          },
        },
      },
    ],
    // 图例配置
    legend: {
      width: "240",
      x: "center", // 水平居中
      bottom: props.legendBottom, // 距离底部距离
      data: lengthList, // 图例数据
      itemHeight: 10, // 图例标记高度
      itemWidth: 10, // 图例标记宽度
      textStyle: {
        color: "#000000",
        fontSize: 14,
        lineHeight: 14,
      },
      // 图例提示框
      tooltip: {
        show: true,
        formatter: params => {
          const i = props.nameList.indexOf(params.name);
          const marker = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${props.colorList[i]};"></span>`;
          return `${params.name}<br/>${marker}${props.dataList[i]}<br/>${valList[i]}%`;
        },
      },
    },
    // 角度轴配置
    angleAxis: {
      max: 100, // 最大值100%
      clockwise: true, // 顺时针
      show: false, // 不显示
    },
    // 半径轴配置
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: { show: false }, // 不显示标签
      axisLine: { show: false }, // 不显示轴线
      axisTick: { show: false }, // 不显示刻度
    },
    // 极坐标系配置
    polar: {
      center: ["50%", "36%"], // 中心位置
      radius: ["44%", "70%"], // 内半径和外半径
    },
    series: seriesList, // 系列数据
  };

  // 初始化或更新图表
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value);
  }
  chartInstance.setOption(option);
};

/**
 * 处理窗口大小变化
 */
const handleResize = () => {
  chartInstance?.resize();
};

// 监听属性变化，自动更新图表
watch(
  () => [props.dataList, props.nameList, props.colorList],
  () => {
    initChart();
  },
  { deep: true }
);

// 组件挂载时初始化图表
onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

// 组件卸载前清理资源
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  chartInstance?.dispose();
});
</script>

<style lang="scss">
.polar-bar-chart {
  width: 100%;
  height: 100%;
  background: #c0c0c0;

  .chart-container {
    width: 100%;
    height: 100%;
    min-height: 400px; // 最小高度保证图表正常显示

    // 移动端适配
    @media (max-width: 768px) {
      min-height: 300px;
    }
  }
}
</style>
