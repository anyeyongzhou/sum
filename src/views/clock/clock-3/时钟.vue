<template>
  <div class="clock">
    <div class="board">
      <div
        v-for="i in 60"
        :key="i"
        :class="{ bold: i % 5 === 0 }"
        :style="getBoardStyle(i)"
      ></div>
    </div>
    <div class="number">
      <div v-for="i in 12" :key="i" :style="getNumberStyle(i)">{{ i }}</div>
    </div>
    <div class="pointers">
      <div class="h" :style="hourStyle"></div>
      <div class="m" :style="minStyle"></div>
      <div class="s" :style="secStyle"></div>
    </div>
    <div class="dot"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const hourStyle = ref({});
const minStyle = ref({});
const secStyle = ref({});

const updateClock = () => {
  const now = new Date();
  const seconds = now.getSeconds() * 6 - 90;
  const minutes = now.getMinutes() * 6 + now.getSeconds() * 0.1 - 90;
  const hours = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5 - 90;

  secStyle.value = { transform: `rotate(${seconds}deg)` };
  minStyle.value = { transform: `rotate(${minutes}deg)` };
  hourStyle.value = { transform: `rotate(${hours}deg)` };
};

const getBoardStyle = i => {
  return {
    transform: `translateY(250px) rotate(${i * 6}deg)`,
  };
};

const getNumberStyle = i => {
  const R = 220;
  const rad = (i - 3) * 30 * (Math.PI / 180);
  return {
    left: `${Math.cos(rad) * R + 250}px`,
    top: `${Math.sin(rad) * R + 250}px`,
  };
};

onMounted(() => {
  updateClock();
  setInterval(updateClock, 1000);
});
</script>

<style scoped>
.clock {
  width: 500px !important;
  height: 500px !important;
  margin: 30px auto;
  position: relative;
  color: #fff;
}

.board div {
  background: #fff;
  width: 6px;
  height: 2px;
  box-shadow: 0 0 10px #ffeab0;
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: 250px 0;
}

.board div.bold {
  width: 8px;
  height: 4px;
}

.number {
  font-size: 20px;
  position: absolute;
  left: 3=20px;
  top: 0px;
  width: 24px;
  height: 24px;
}

.number div {
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-shadow: 0 0 10px #ffeab0;
  font-weight: bold;
  position: absolute;
  transform: translate(-12px, -12px);
  text-align: center;
}

.pointers {
  position: absolute;
  left: 250px;
  top: 250px;
}

.pointers div {
  box-shadow: 2px 2px 5px #ffeab0;
  position: absolute;
  background: #fff;
}

.h {
  width: 140px;
  height: 6px;
  left: -40px;
  top: -3px;
  transform-origin: 40px center;
}

.m {
  width: 190px;
  height: 4px;
  left: -50px;
  top: -2px;
  transform-origin: 50px center;
}

.s {
  width: 250px;
  height: 2px;
  left: -60px;
  top: -1px;
  transform-origin: 60px center;
}

.dot {
  width: 8px;
  height: 8px;
  position: absolute;
  left: 250px;
  top: 250px;
  transform: translate(-4px, -4px);
  background: #f40;
  border-radius: 50%;
}
</style>
