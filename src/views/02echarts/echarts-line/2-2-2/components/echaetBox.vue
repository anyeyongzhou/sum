<template>
  <div :id="id" ref="chartRef" class="echart-box"></div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  id: {
    type: String,
    default: `echartBox${Math.floor(Math.random() * 100000)}`,
  },
  option: {
    type: Object,
    default: () => ({}),
  },
  distance: {
    type: Number,
    default: 5,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["moveRight", "moveLeft"]);

const chartRef = ref(null);
let chart = null;
const lastX = ref(0);
const isTouch = ref(false);

const debounce = (func, delay = 100) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const mousemove = e => {
  if (isTouch.value && !props.loading) {
    const currentX = e.offsetX || e.event.zrX;
    const distance = currentX - lastX.value;
    if (Math.abs(distance) > props.distance) {
      if (distance > 0) {
        emit("moveRight");
      } else {
        emit("moveLeft");
      }
      lastX.value = currentX;
    }
  }
};

const initListener = chartInstance => {
  const zr = chartInstance.getZr();

  const mousedownHandler = e => {
    lastX.value = e.offsetX || e.event.zrX;
    isTouch.value = true;
  };

  const touchstartHandler = e => {
    lastX.value = e.offsetX || e.event.zrX;
    isTouch.value = true;
  };

  const debouncedMousemove = debounce(mousemove);

  zr.on("mousedown", mousedownHandler);
  zr.on("touchstart", touchstartHandler);
  zr.on("mousemove", debouncedMousemove);
  zr.on("touchmove", debouncedMousemove);
  zr.on("mouseup", () => (isTouch.value = false));
  zr.on("touchend", () => (isTouch.value = false));

  return () => {
    zr.off("mousedown", mousedownHandler);
    zr.off("touchstart", touchstartHandler);
    zr.off("mousemove", debouncedMousemove);
    zr.off("touchmove", debouncedMousemove);
    zr.off("mouseup");
    zr.off("touchend");
  };
};

const initChart = () => {
  try {
    if (!chartRef.value) return;

    if (!chart) {
      chart = echarts.init(chartRef.value);
    }

    chart.clear();
    chart.setOption(props.option);

    const cleanup = initListener(chart);

    return cleanup;
  } catch (err) {
    console.error("ECharts initialization error:", err);
  }
};

const hideTooltip = () => {
  chart?.dispatchAction({
    type: "hideTip",
  });
};

watch(() => props.option, initChart, { deep: true });

onMounted(() => {
  const cleanup = initChart();

  onBeforeUnmount(() => {
    cleanup?.();
    chart?.dispose();
  });
});

defineExpose({
  hideTooltip,
});
</script>

<style scoped>
.echart-box {
  height: 100%;
  width: 100%;
}
</style>
