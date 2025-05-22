<template>
  <div ref="chartRef" class="bar-chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  data: {
    type: Array,
    default: () => [
      { name: "Mon", value: 120 },
      { name: "Tue", value: 200 },
      { name: "Wed", value: 150 },
      { name: "Thu", value: 80 },
      { name: "Fri", value: 70 },
      { name: "Sat", value: 110 },
      { name: "Sun", value: 130 },
    ],
  },
  interval: {
    type: Number,
    default: 2000, // 切换间隔时间(毫秒)
  },
  highlightColor: {
    type: String,
    default: "#5470c6", // 高亮颜色
  },
  normalColor: {
    type: String,
    default: "#91cc75", // 普通颜色
  },
});

const chartRef = ref(null);
let chart = null;
let highlightInterval = null;
let currentIndex = 0;

const initChart = () => {
  if (!chartRef.value) return;

  chart = echarts.init(chartRef.value);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: props.data.map(item => item.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "数据",
        type: "bar",
        data: props.data.map(item => item.value),
        itemStyle: {
          color: params => {
            return params.dataIndex === currentIndex
              ? props.highlightColor
              : props.normalColor;
          },
        },
        emphasis: {
          itemStyle: {
            color: props.highlightColor,
          },
        },
      },
    ],
  };

  chart.setOption(option);

  // 鼠标移入时暂停自动轮播
  chart.on("mouseover", () => {
    clearInterval(highlightInterval);
  });

  // 鼠标移出时恢复自动轮播
  chart.on("mouseout", () => {
    startHighlightInterval();
  });
};

const startHighlightInterval = () => {
  clearInterval(highlightInterval);

  highlightInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % props.data.length;
    highlightBar(currentIndex);
  }, props.interval);
};

const highlightBar = index => {
  if (!chart) return;

  // 更新颜色
  chart.setOption({
    series: [
      {
        itemStyle: {
          color: params => {
            return params.dataIndex === index
              ? props.highlightColor
              : props.normalColor;
          },
        },
      },
    ],
  });

  // 显示tooltip
  chart.dispatchAction({
    type: "showTip",
    seriesIndex: 0,
    dataIndex: index,
  });
};

onMounted(() => {
  initChart();
  startHighlightInterval();
});

onBeforeUnmount(() => {
  if (chart) {
    chart.dispose();
    chart = null;
  }
  clearInterval(highlightInterval);
});

watch(
  () => props.data,
  () => {
    if (chart) {
      chart.setOption({
        xAxis: {
          data: props.data.map(item => item.name),
        },
        series: [
          {
            data: props.data.map(item => item.value),
          },
        ],
      });
      currentIndex = 0;
      highlightBar(currentIndex);
    }
  },
  { deep: true }
);
</script>

<style scoped>
.bar-chart-container {
  width: 100%;
  height: 100%;
}
</style>
