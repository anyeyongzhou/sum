<template>
  <div class="clock">
    <div
      class="hour"
      :style="{
        transform: `translate(-50%, -50%) rotateZ(${hourRotation}deg)`,
      }"
    ></div>
    <div
      class="min"
      :style="{ transform: `translate(-50%, -50%) rotateZ(${minRotation}deg)` }"
    ></div>
    <div
      class="sec"
      :style="{ transform: `translate(-50%, -50%) rotateZ(${secRotation}deg)` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const hourRotation = ref(0);
const minRotation = ref(0);
const secRotation = ref(0);

const updateClock = () => {
  const now = new Date();
  const hours = now.getHours() * 30 + now.getMinutes() * 0.5; // 30 degrees per hour
  const minutes = now.getMinutes() * 6; // 6 degrees per minute
  const seconds = now.getSeconds() * 6; // 6 degrees per second

  hourRotation.value = hours;
  minRotation.value = minutes;
  secRotation.value = seconds;
};

onMounted(() => {
  updateClock();
  setInterval(updateClock, 1000);
});
</script>

<style scoped>
.clock {
  width: 400px !important;
  height: 400px;
  background-image: url(clock.png);
  background-size: 100% 100%;
  box-shadow: inset 0 0px 10px 6px rgba(255, 255, 255, 0.5),
    0 0px 25px rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background-color: rgba(255, 255, 255, 0.2);
  position: relative;
}
.clock::before {
  content: "";
  position: absolute;
  top: -30px;
  left: -30px;
  bottom: -30px;
  right: -30px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0px 25px rgba(53, 52, 52, 0.5),
    0 0px 10px rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}
.clock::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  z-index: 3;
  border: 2px solid rgb(79, 146, 96);
}
.hour,
.min,
.sec {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.hour {
  width: 16px;
  height: 170px;
  background-image: linear-gradient(
    360deg,
    transparent 50%,
    rgb(255, 153, 0) 50%
  );
  transform-origin: center;
}
.min {
  width: 10px;
  height: 250px;
  background-image: linear-gradient(
    360deg,
    transparent 50%,
    rgb(0, 183, 255) 50%
  );
  transform-origin: center;
  z-index: 1;
}
.sec {
  width: 6px;
  height: 300px;
  background-image: linear-gradient(
    360deg,
    transparent 30%,
    rgb(237, 243, 235) 30%
  );
  transform-origin: center;
  z-index: 2;
}
</style>
