<template>
  <div class="container">
    <div class="user-select">
      <select v-model="selectedYear">
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      年
      <select v-model="selectedMonth">
        <option v-for="month in months" :key="month" :value="month">
          {{ month }}
        </option>
      </select>
      月
      <button @click="chooseToday">今天</button>
    </div>
    <div class="calendar-title">
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span>六</span>
      <span>日</span>
    </div>
    <div class="calendar-content">
      <span v-for="day in days" :key="day" :class="{ today: isToday(day) }">{{
        day
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getDaysInMonth, getDayOfWeek } from "./utils";

const today = new Date();
const years = Array.from({ length: 2119 - 1919 + 1 }, (_, i) => 1919 + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

const selectedYear = ref(today.getFullYear());
const selectedMonth = ref(today.getMonth() + 1);

const days = ref([]);

const chooseToday = () => {
  selectedYear.value = today.getFullYear();
  selectedMonth.value = today.getMonth() + 1;
};

const setContent = () => {
  const year = selectedYear.value;
  const month = selectedMonth.value;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getDayOfWeek(year, month);

  days.value = Array(firstDayOfWeek - 1).fill(""); // 空白天数
  for (let i = 1; i <= daysInMonth; i++) {
    days.value.push(i);
  }
};

const isToday = day => {
  return (
    today.getFullYear() === selectedYear.value &&
    today.getMonth() + 1 === selectedMonth.value &&
    today.getDate() === day
  );
};

watch([selectedYear, selectedMonth], setContent);

onMounted(() => {
  setContent();
});
</script>

<style lang="scss" scoped>
$background-color: #008c8c;
$font-color: #ffffff;
$today-color: #008c8c;

.container {
  width: 300px;
  margin: 0 auto;
  background: $background-color;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  color: $font-color;
}

.user-select {
  margin-bottom: 15px;
}

.calendar-title {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 15px 0;
}

.calendar-content {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 10px;
}

.calendar-content span {
  display: inline-block;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  margin: 0 auto;
}

.calendar-content .today {
  background: $font-color;
  color: $background-color;
}
</style>
