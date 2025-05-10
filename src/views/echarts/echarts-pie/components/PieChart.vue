<template>
  <div class="chart">
    <div ref="chartRef" class="chartBox"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
  colorList: {
    type: Array,
    default: () => ["#28b3fb", "#00d784"],
  },
  unit: {
    type: String,
    default: "",
  },
  total: {
    type: Number,
    default: 0,
  },
  showOuter: {
    type: Boolean,
    default: false,
  },
});

const angle = ref(0);
const chartRef = ref(null);
const chart = ref(null);
const options = ref({
  color: props.colorList,
  title: {
    text: props.total.toString(),
    textStyle: {
      color: "#EFF1F4",
      align: "center",
      fontSize: 24,
    },
    subtextStyle: {
      color: "#EFF1F4",
      fontSize: 14,
    },
    x: "center",
    y: props.total ? "40%" : "52%",
    subtext: props.unit,
  },
  tooltip: {
    show: true,
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  series: [
    {
      animationDuration: 1000,
      name: "Line1",
      type: "pie",
      radius: [60, 70],
      center: ["50%", "50%"],
      emphasis: {
        scale: false,
      },
      clockwise: false,
      avoidLabelOverlap: true,
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: props.chartData,
    },
    {
      animationDuration: 1000,
      name: "outer",
      type: "pie",
      radius: [70, 80],
      center: ["50%", "50%"],
      emphasis: {
        scale: false,
      },
      clockwise: false,
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: 0,
          name: "",
          itemStyle: {
            color: "rgba(60,86,142,0.3)",
          },
        },
      ],
    },
    {
      animationDuration: 1000,
      name: "inner",
      type: "pie",
      radius: [45, 52],
      center: ["50%", "50%"],
      emphasis: {
        scale: false,
      },
      clockwise: false,
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: 0,
          name: "",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 1,
                color: "#3f5e9b",
              },
              {
                offset: 0,
                color: "#25416d",
              },
            ]),
          },
        },
      ],
    },
  ],
});

let intervalId = null;

const initChart = () => {
  chart.value = echarts.init(chartRef.value);
  updateChart();
  window.addEventListener("resize", handleResize);
};

const updateChart = () => {
  if (chart.value) {
    chart.value.setOption(options.value, true);
  }
};

const handleResize = () => {
  chart.value?.resize();
};

const getCirlPoint = (x0, y0, r, angle) => {
  const x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
  const y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
  return { x: x1, y: y1 };
};

const addOuterEffects = () => {
  const outerSeries = [
    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: (params, api) => {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.88,
            startAngle: ((0 + angle.value) * Math.PI) / 180,
            endAngle: ((90 + angle.value) * Math.PI) / 180,
          },
          style: {
            stroke: "#4386FA",
            fill: "transparent",
            lineWidth: 1.6,
          },
          silent: true,
        };
      },
      data: [0],
    },
    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: (params, api) => {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.88,
            startAngle: ((180 + angle.value) * Math.PI) / 180,
            endAngle: ((270 + angle.value) * Math.PI) / 180,
          },
          style: {
            stroke: "#8383FA",
            fill: "transparent",
            lineWidth: 1.6,
          },
          silent: true,
        };
      },
      data: [0],
    },
    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: (params, api) => {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 1,
            startAngle: ((270 + -angle.value) * Math.PI) / 180,
            endAngle: ((40 + -angle.value) * Math.PI) / 180,
          },
          style: {
            stroke: "#0CD3D8",
            fill: "transparent",
            lineWidth: 1.6,
          },
          silent: true,
        };
      },
      data: [0],
    },
    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: (params, api) => {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 1,
            startAngle: ((90 + -angle.value) * Math.PI) / 180,
            endAngle: ((220 + -angle.value) * Math.PI) / 180,
          },
          style: {
            stroke: "#ffe5a3",
            fill: "transparent",
            lineWidth: 1.6,
          },
          silent: true,
        };
      },
      data: [0],
    },
    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: (params, api) => {
        const point = getCirlPoint(
          api.getWidth() / 2,
          api.getHeight() / 2,
          (Math.min(api.getWidth(), api.getHeight()) / 2) * 1,
          90 + -angle.value
        );
        return {
          type: "circle",
          shape: {
            cx: point.x,
            cy: point.y,
            r: 3,
          },
          style: {
            stroke: "#ffe5a3",
            fill: "#ffe5a3",
          },
          silent: true,
        };
      },
      data: [0],
    },
    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: (params, api) => {
        const point = getCirlPoint(
          api.getWidth() / 2,
          api.getHeight() / 2,
          (Math.min(api.getWidth(), api.getHeight()) / 2) * 1,
          270 + -angle.value
        );
        return {
          type: "circle",
          shape: {
            cx: point.x,
            cy: point.y,
            r: 3,
          },
          style: {
            stroke: "#0CD3D8",
            fill: "#0CD3D8",
          },
          silent: true,
        };
      },
      data: [0],
    },
  ];

  options.value.series = [...options.value.series.slice(0, 3), ...outerSeries];
  updateChart();

  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    angle.value = angle.value + 3;
    chart.value?.setOption(options.value);
  }, 100);
};

watch(
  () => props.showOuter,
  newVal => {
    if (newVal) {
      addOuterEffects();
    } else {
      options.value.series = options.value.series.slice(0, 3);
      updateChart();
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  },
  { immediate: true }
);

watch(
  () => props.chartData,
  newData => {
    options.value.series[0].data = newData;
    updateChart();
  },
  { deep: true }
);

watch(
  () => props.unit,
  newUnit => {
    options.value.title.subtext = newUnit;
    updateChart();
  }
);

watch(
  () => props.total,
  newTotal => {
    options.value.title.text = newTotal.toString();
    options.value.title.y = newTotal ? "40%" : "52%";
    updateChart();
  }
);

watch(
  () => props.colorList,
  newColors => {
    options.value.color = newColors.length ? newColors : ["#28b3fb", "#00d784"];
    updateChart();
  },
  { deep: true }
);

onMounted(() => {
  initChart();
  if (props.showOuter) {
    addOuterEffects();
  }
});

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (chart.value) {
    chart.value.dispose();
    chart.value = null;
  }
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
  .chartBox {
    width: 100%;
    height: 100%;
  }
}
</style>
