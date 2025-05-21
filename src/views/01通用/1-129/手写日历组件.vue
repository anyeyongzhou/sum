<template>
  <div class="calendar-container">
    <input
      type="text"
      id="txt_calendar"
      class="calendar-input"
      readonly
      @focus="showDate"
      :value="selectedDate"
    />
    <div class="date-outer" :style="dateOuterStyle" v-show="showCalendar">
      <div class="header">
        <p @click="setToday">{{ todayDate }}</p>
        <span @click="hideDate" class="close">×</span>
      </div>
      <div class="controls">
        <span @click="lastMonthClick" class="control">〈</span>
        <select v-model="selectedYear" @change="changeYearAndMonth">
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
        年
        <select v-model="selectedMonth" @change="changeYearAndMonth">
          <option
            v-for="(month, index) in months"
            :key="index"
            :value="index + 1"
          >
            {{ month }}
          </option>
        </select>
        月
        <span @click="nextMonthClick" class="control">〉</span>
      </div>
      <div class="weekdays">
        <span
          v-for="(day, index) in weekDays"
          :key="index"
          :class="{ weekend: day === '日' || day === '六' }"
        >
          {{ day }}
        </span>
      </div>
      <div class="days">
        <div
          v-for="day in days"
          :key="day.date"
          class="day"
          :class="{ today: isToday(day), weekend: isWeekend(day) }"
          @click="selectDay(day)"
        >
          {{ day.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import dayjs from "dayjs";

const selectedYear = ref(dayjs().year());
const selectedMonth = ref(dayjs().month() + 1);
const selectedDate = ref("");
const showCalendar = ref(false);

const years = Array.from({ length: 200 }, (_, i) => 1900 + i);
const months = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

const todayDate = computed(() => {
  const today = dayjs();
  return `${today.year()}年${today.month() + 1}月${today.date()}号`;
});

const days = computed(() => {
  const firstDay = dayjs(`${selectedYear.value}-${selectedMonth.value}-1`);
  const lastDay = firstDay.add(1, "month").subtract(1, "day");
  const daysInMonth = lastDay.date();
  const startDay = firstDay.day();

  const daysArray = [];
  for (let i = 0; i < startDay; i++) {
    daysArray.push({ date: "", isPreviousMonth: true });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({ date: i, isCurrentMonth: true });
  }
  return daysArray;
});

const isToday = day => {
  const today = dayjs();
  return (
    day.date === today.date() &&
    selectedMonth.value === today.month() + 1 &&
    selectedYear.value === today.year()
  );
};

const isWeekend = day => {
  const date = dayjs(
    `${selectedYear.value}-${selectedMonth.value}-${day.date}`
  );
  return date.day() === 0 || date.day() === 6;
};

const selectDay = day => {
  if (day.isCurrentMonth) {
    selectedDate.value = `${selectedYear.value}-${String(
      selectedMonth.value
    ).padStart(2, "0")}-${String(day.date).padStart(2, "0")}`;
    hideDate();
  }
};

const setToday = () => {
  const today = dayjs();
  selectedYear.value = today.year();
  selectedMonth.value = today.month() + 1;
  selectedDate.value = today.format("YYYY-MM-DD");
  hideDate();
};

const hideDate = () => {
  showCalendar.value = false;
};

const showDate = () => {
  showCalendar.value = true;
};

const lastMonthClick = () => {
  if (selectedMonth.value === 1) {
    selectedYear.value -= 1;
    selectedMonth.value = 12;
  } else {
    selectedMonth.value -= 1;
  }
};

const nextMonthClick = () => {
  if (selectedMonth.value === 12) {
    selectedYear.value += 1;
    selectedMonth.value = 1;
  } else {
    selectedMonth.value += 1;
  }
};

const changeYearAndMonth = () => {
  // Update calendar based on selected year and month
};

onMounted(() => {
  setToday();
});
</script>

<style lang="scss" scoped>
.calendar-container {
  position: relative;
  width: 100%;
}

.calendar-input {
  margin-left: 20px;
  margin-top: 20px;
  background-color: #cfcfcf;
  border: none;
  border-radius: 5px;
  height: 25px;
  padding-left: 10px;
  outline: none;
}

.date-outer {
  position: absolute;
  width: 314px;
  margin-top: 10px;
  border: 1px solid #f7f7f7;
  border-radius: 5px;
  background-color: #f7f7f7;
  color: #4eccc4;
  padding-bottom: 20px;
}

.header {
  height: 30px;
  text-align: center;
  color: #999;
}

.close {
  float: right;
  font-size: 25px;
  margin: -20px 3px 0 0;
  cursor: pointer;
}

.controls {
  margin-bottom: 8px;
}

.control {
  margin: 0 20px 0 25px;
  cursor: pointer;
}

.selectStyle {
  padding-left: 10px;
  border: none;
  border-radius: 3px;
  outline: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  margin: 0 10px;
  width: 60px;
  border-color: #0fb9ef;
  color: #0fb9ef;
}

.weekdays {
  display: flex;
  justify-content: center;
}

.weekdays span {
  display: inline-block;
  margin: 5px 0 0 20px;
  text-align: center;
  width: 20px;
  border: 1px solid #f7f7f7;
  cursor: pointer;
}

.weekdays .weekend {
  color: red;
}

.days {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.days .day {
  display: inline-block;
  margin: 5px 0 0 20px;
  text-align: center;
  width: 20px;
  border: 1px solid #f7f7f7;
  cursor: pointer;
}

.days .day.today {
  background-color: #4eccc4;
  color: #ffffff;
}

.days .day.weekend {
  color: red;
}
</style>
