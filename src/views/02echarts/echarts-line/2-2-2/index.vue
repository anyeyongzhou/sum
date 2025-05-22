<template>
  <div class="chart-content">
    <EchartBox
      class="chart-content-main"
      :option="option"
      @moveLeft="moveLeft"
      @moveRight="moveRight"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EchartBox from "./components/echaetBox.vue";

const chartData = ref([]);
const option = ref({});
const startInd = ref(-1);
const len = ref(10);

// Initialize chart data
const initChartData = (startDate, endDate) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const dateArray = [];

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const randomValue = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    const randomValue1 = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
    const dateString = date.toISOString().slice(0, 10);
    dateArray.push({
      date: dateString,
      value: randomValue,
      value1: randomValue1,
    });
    date = new Date(date); // Fix date object modification
  }
  return dateArray;
};

// Initialize chart options
const initOption = (start = 0) => {
  if (start > chartData.value.length - len.value)
    start = chartData.value.length - len.value;
  if (start < 0) start = 0;
  if (startInd.value === start) return;

  startInd.value = start;
  const end = start + len.value;
  const currentData = chartData.value.slice(start, end);

  option.value = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: currentData.map(item => item.date),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "数据1",
        data: currentData.map(item => item.value),
        type: "line",
        smooth: true,
      },
      {
        name: "数据2",
        data: currentData.map(item => item.value1),
        type: "line",
        smooth: true,
      },
    ],
  };
};

// Navigation methods
const moveLeft = () => {
  if (startInd.value === 0) {
    console.log("前面没有更多数据了");
    return;
  }
  initOption(startInd.value - len.value);
};

const moveRight = () => {
  if (startInd.value >= chartData.value.length - len.value) {
    console.log("后面没有更多数据了");
    return;
  }
  initOption(startInd.value + len.value);
};

// Initialize component
onMounted(() => {
  chartData.value = initChartData("2023-11-01", "2023-12-31");
  initOption();
});
</script>

<style scoped>
.chart-content {
  height: 50vh;
  width: 100% !important;
}

.chart-content-main {
  width: 100%;
  height: 100%;
  background: #ff0;
}
</style>
