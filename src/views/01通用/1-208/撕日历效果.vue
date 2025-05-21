<template>
  <div class="calendar">
    <div class="pages" ref="pages">
      <div class="page" :class="{ tear: isTearing }">
        <p class="month">{{ monthName }}</p>
        <p class="day">{{ dayNum }}</p>
        <p class="day-name">{{ dayName }}</p>
        <p class="year">{{ year }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const pages = ref(null);
const isTearing = ref(false);
const dayNum = ref(new Date().getDate());
const month = ref(new Date().getMonth());
const year = ref(new Date().getFullYear());
const dayName = ref(new Date().toLocaleString("en-us", { weekday: "long" }));
const monthName = ref(new Date().toLocaleString("en-us", { month: "long" }));

function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getNewDate() {
  if (dayNum.value < daysInMonth(month.value, year.value)) {
    dayNum.value++;
  } else {
    dayNum.value = 1;
  }
  if (dayNum.value === 1 && month.value < 11) {
    month.value++;
  } else if (dayNum.value === 1 && month.value === 11) {
    month.value = 0;
  }
  if (dayNum.value === 1 && month.value === 0) {
    year.value++;
  }
  const newDate = new Date(year.value, month.value, dayNum.value);
  dayName.value = newDate.toLocaleString("en-us", { weekday: "long" });
  monthName.value = newDate.toLocaleString("en-us", { month: "long" });
}

function handleClick(e) {
  if (e.target.classList.contains("page")) {
    isTearing.value = true;
    getNewDate();
    setTimeout(() => {
      isTearing.value = false;
    }, 800);
  }
}

onMounted(() => {
  pages.value.addEventListener("click", handleClick);
});

onUnmounted(() => {
  pages.value?.removeEventListener("click", handleClick);
});
</script>

<style lang="scss" scoped>
.calendar {
  position: relative;
  width: 352px !important;
  cursor: default;
  user-select: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: -28px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: #ddd;
    z-index: 3;
  }

  &::before {
    left: 40px;
  }

  &::after {
    right: 40px;
  }
}

.pages {
  position: relative;
  text-align: center;
  background: #eee;
  box-shadow: 0 10px 0 0px #a5a4a4;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 45px;
    background: indianred;
    bottom: 100%;
    left: 0;
    z-index: 2;
  }
}

.page {
  position: relative;
  padding: 20px 30px 15px;
  background: #eee;

  &::before {
    content: "";
    position: absolute;
    bottom: 99%;
    left: 0;
    display: block;
    background: linear-gradient(
        -45deg,
        #eee 10px,
        #eee 10px,
        #eee 10px,
        transparent 0
      ),
      linear-gradient(45deg, #eee 10px, transparent 0);
    background-position: left top;
    background-repeat: repeat-x;
    background-size: 10px 18px;
    height: 10px;
    width: 100%;
  }

  &.tear {
    animation: tear-animation 0.8s linear forwards;
  }
}

.month,
.day-name {
  text-transform: uppercase;
  font-weight: 600;
  margin: 0 0 3px;
  line-height: 1;
  letter-spacing: 1px;
  pointer-events: none;
}

.day {
  font-size: 180px;
  font-weight: 700;
  margin: 0 0 15px;
  line-height: 1;
  letter-spacing: 1px;
  pointer-events: none;
}

.year {
  font-size: 18px;
  margin: 0 0 3px;
  line-height: 1;
  letter-spacing: 1px;
  pointer-events: none;
}

@keyframes tear-animation {
  0% {
    transform: rotate(0deg);
    top: 0;
    opacity: 1;
  }
  20% {
    transform: rotate(9deg);
    top: 0;
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    top: 200px;
    opacity: 0;
  }
}
</style>
