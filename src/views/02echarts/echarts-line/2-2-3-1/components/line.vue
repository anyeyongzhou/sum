<template>
  <div class="time-series-chart">
    <!-- 图表容器 -->
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
    validator: data => {
      return (
        Array.isArray(data.value) &&
        Array.isArray(data.Xdata) &&
        data.value.length === data.Xdata.length
      );
    },
  },
  backgroundColor: {
    type: String,
    default: "rgba(0, 66, 80, 0.4)",
  },
  smooth: {
    type: Boolean,
    default: false,
  },
  symbolSize: {
    type: [Boolean, Number],
    default: 8,
  },
  // 新增：自动轮播间隔(毫秒)
  autoPlayInterval: {
    type: Number,
    default: 2000,
  },
});

const chartRef = ref(null);
let chartInstance = null;
let playTimer = null;
let currentIndex = 0;

// 高亮当前数据点
const highlightPoint = index => {
  if (
    !chartInstance ||
    !props.chartData.Xdata ||
    index >= props.chartData.Xdata.length
  )
    return;

  // 先取消之前的高亮
  chartInstance.dispatchAction({
    type: "downplay",
    seriesIndex: 0,
  });

  // 高亮当前点
  chartInstance.dispatchAction({
    type: "highlight",
    seriesIndex: 0,
    dataIndex: index,
  });

  // 显示tooltip
  chartInstance.dispatchAction({
    type: "showTip",
    seriesIndex: 0,
    dataIndex: index,
  });

  // 添加闪烁动画效果
  const symbolSize = props.symbolSize === true ? 8 : props.symbolSize;
  let size = symbolSize;
  let count = 0;
  const flashInterval = setInterval(() => {
    size = count % 2 === 0 ? symbolSize * 1.5 : symbolSize;
    chartInstance.setOption({
      series: [
        {
          data: props.chartData.value.map((value, i) => ({
            value: value,
            itemStyle: {
              shadowBlur: i === index ? size * 2 : 0,
              shadowColor: i === index ? "#fff" : "transparent",
            },
          })),
        },
      ],
    });
    count++;
    if (count >= 6) clearInterval(flashInterval); // 闪烁3次
  }, 200);
};

// 自动轮播tooltip
const startAutoPlay = () => {
  stopAutoPlay(); // 先停止之前的轮播

  if (!props.chartData.Xdata || props.chartData.Xdata.length === 0) return;

  currentIndex = 0;

  playTimer = setInterval(() => {
    highlightPoint(currentIndex);
    currentIndex = (currentIndex + 1) % props.chartData.Xdata.length;
  }, props.autoPlayInterval);
};

// 停止轮播
const stopAutoPlay = () => {
  if (playTimer) {
    clearInterval(playTimer);
    playTimer = null;
  }
};

const initChart = () => {
  if (!chartRef.value || !props.chartData) return;

  const option = {
    backgroundColor: props.backgroundColor,
    title: {
      text: `{titleText|${props.chartData.titleText || ""}} {titleVal|${
        props.chartData.titleVal || ""
      }} {titleUnit|${props.chartData.titleUnit || ""}}`,
      left: "40%",
      top: "7%",
      textStyle: {
        rich: {
          titleText: {
            fontSize: 14,
            color: "#c5e5f9",
            align: "center",
          },
          titleVal: {
            fontSize: 14,
            color: "#fff",
            align: "center",
            textShadowColor: "rgba(61, 180, 255, 0.6)",
            fontWeight: "bold",
          },
          titleUnit: {
            fontSize: 12,
            color: "#c5e5f9",
            align: "center",
          },
        },
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff",
      borderColor: "#fff",
      formatter: params => {
        const data = params[0];
        return `
          <div style="font-weight:bold;color:#333;">${data.name}</div>
          <div>${data.seriesName}: ${data.value} ${
          props.chartData.unit || ""
        }</div>
        `;
      },
    },
    grid: {
      top: props.chartData.grid?.[0] || "20%",
      right: props.chartData.grid?.[1] || "10%",
      bottom: props.chartData.grid?.[2] || "20%",
      left: props.chartData.grid?.[3] || "10%",
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#427394",
        },
      },
      axisLabel: {
        color: "#C5E5F9",
        padding: [5, 0, 0, 0],
        fontSize: 12,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: props.chartData.Xdata,
    },
    yAxis: {
      name: props.chartData.unit || "",
      nameTextStyle: {
        color: "#C5E5F9",
        fontSize: 12,
        padding: [0, 31, 0, 0],
        opacity: 0.5,
      },
      min: 0,
      splitLine: {
        show: true,
        lineStyle: {
          color: "RGBA(45, 92, 111, 0.4)",
          type: "dashed",
        },
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        color: "#C5E5F9",
        fontSize: 12,
      },
      axisTick: {
        show: false,
      },
    },
    series: {
      name: props.chartData.titleText || "",
      type: "line",
      showAllSymbol: true,
      smooth: props.smooth,
      symbolSize: props.symbolSize === true ? 8 : props.symbolSize,
      lineStyle: {
        width: 2,
        color: "#3CCFDB",
      },
      itemStyle: {
        shadowColor: "#fff",
        shadowBlur: 15,
        color: "#3CCFDB",
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            { offset: 0, color: "rgba(25,163,223,0.2)" },
            { offset: 1, color: "rgba(25,163,223, 0)" },
          ],
          false
        ),
        shadowColor: "rgba(25,163,223, 0.5)",
        shadowBlur: 20,
      },
      data: props.chartData.value.map(Number),
    },
  };

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value);
    // 鼠标移入时停止自动轮播
    chartInstance.on("mouseover", () => {
      stopAutoPlay();
    });
    // 鼠标移出时重新开始轮播
    chartInstance.on("mouseout", () => {
      startAutoPlay();
    });
    // 添加鼠标移动到数据点的事件
    chartInstance.on("mouseover", { seriesIndex: 0 }, () => {
      stopAutoPlay();
    });
    chartInstance.on("mouseout", { seriesIndex: 0 }, () => {
      startAutoPlay();
    });
  }

  chartInstance.setOption(option);
  startAutoPlay(); // 初始化后开始轮播
};

const handleResize = () => {
  chartInstance?.resize();
};

watch(
  () => props.chartData,
  () => {
    initChart();
  },
  { immediate: true }
);

onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  stopAutoPlay();
  chartInstance?.dispose();
});
</script>

<style lang="scss">
.time-series-chart {
  width: 100%;
  height: 100%;

  .chart-container {
    width: 100%;
    height: 100%;
    min-height: 400px;

    @media (max-width: 768px) {
      min-height: 300px;
    }
  }
}
</style>
