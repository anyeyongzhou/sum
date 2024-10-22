<template>
  <div class="echarts-container">
    <div ref="main" class="echarts-container-item"></div>
  </div>
</template>

<script setup>
import echarts from "./components/commonEchart.js";
import { ref, onMounted, defineProps, onBeforeUnmount } from "vue";

const props = defineProps(["title", "chartData", "theme"]);
const main = ref(); // 使用ref创建虚拟DOM引用，使用时用main.value

const init = () => {
  const { chartData, theme } = props;
  const myChart = echarts.init(main.value, theme);

  myChart.setOption(chartData);

  const resizeHandler = () => {
    myChart.resize();
  };

  onMounted(() => {
    window.addEventListener("resize", resizeHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
  });
};

onMounted(() => {
  init();
});
</script>
