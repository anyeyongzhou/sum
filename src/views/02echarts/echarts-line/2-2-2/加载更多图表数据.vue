<template>
  <div class="chart-content">
    <div class="chart-container">
      <div
        class="nav-button left-button"
        :class="{ disabled: isLeftDisabled }"
        @click="moveLeft"
      >
        <span class="arrow">←</span>
      </div>
      <EchartBox
        class="chart-content-main"
        :option="option"
        @moveLeft="moveLeft"
        @moveRight="moveRight"
      />
      <div
        class="nav-button right-button"
        :class="{ disabled: isRightDisabled }"
        @click="moveRight"
      >
        <span class="arrow">→</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import EchartBox from "./components/echaetBox.vue";

const chartData = ref([]);
const option = ref({
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "数据1",
      data: [],
      type: "line",
      smooth: true,
    },
    {
      name: "数据2",
      data: [],
      type: "line",
      smooth: true,
    },
  ],
});
const startInd = ref(0);
const len = ref(10);
const minLen = 5; // 最小显示数据量
const maxLen = 30; // 最大显示数据量

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
const initOption = (start = 0, dataLength = len.value) => {
  if (!chartData.value.length) return;

  if (start > chartData.value.length - dataLength)
    start = chartData.value.length - dataLength;
  if (start < 0) start = 0;
  if (startInd.value === start && len.value === dataLength) return;

  startInd.value = start;
  len.value = dataLength;
  const end = start + dataLength;
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
  if (len.value <= minLen) {
    console.log("已经是最小显示范围");
    return;
  }
  const newLen = Math.max(minLen, len.value - 5);
  initOption(startInd.value, newLen);
};

const moveRight = () => {
  if (len.value >= maxLen) {
    console.log("已经是最大显示范围");
    return;
  }
  const newLen = Math.min(maxLen, len.value + 5);
  initOption(startInd.value, newLen);
};

// Initialize component
onMounted(() => {
  // 先生成数据
  chartData.value = initChartData("2023-11-01", "2023-12-31");
  // 立即初始化图表
  initOption(0, 10);
});

// 计算属性：判断是否到达边界
const isLeftDisabled = computed(() => len.value <= minLen);
const isRightDisabled = computed(() => len.value >= maxLen);
</script>

<style scoped>
.chart-content {
  height: 50vh;
  width: 100% !important;
}

.chart-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.chart-content-main {
  flex: 1;
  height: 100%;
  background: #ff0;
}

.nav-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 10px;
  transition: all 0.3s ease;
  background: #4caf50;
  color: white;
  font-size: 20px;
  user-select: none;
}

.nav-button:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.nav-button.disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.arrow {
  line-height: 1;
}
</style>
