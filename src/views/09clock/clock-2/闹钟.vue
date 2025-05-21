<template>
  <div>
    现在是北京时间：<span id="yanshi_time">{{ currentTime }}</span><br />
    <audio ref="music" src="http://f2.htqyy.com/play7/1666/mp3/11" preload="auto"></audio>
    请设定你的闹铃时间：
    <input type="number" v-model="hour" size="1" min="0" max="23" />
    <input type="number" v-model="minute" size="1" min="0" max="59" />
    <input type="number" v-model="second" size="1" min="0" max="59" />
    <input type="button" value="关闭闹钟" @click="stopAlarm" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const hour = ref(8);
const minute = ref(30);
const second = ref(0);
const currentTime = ref('');

const music = ref(null);

const updateTime = () => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  
  currentTime.value = `${addLeadingZero(h)} : ${addLeadingZero(m)} : ${addLeadingZero(s)}`;

  if (shouldRingAlarm(h, m, s)) {
    if (music.value) {
      music.value.play();
    }
    // Change color or other effects
  } else {
    if (music.value) {
      music.value.pause();
    }
  }
};

const addLeadingZero = (num) => (num < 10 ? '0' + num : num);

const shouldRingAlarm = (h, m, s) => {
  return (h > hour.value) || (h === hour.value && m > minute.value) || (h === hour.value && m === minute.value && s >= second.value);
};

const stopAlarm = () => {
  hour.value = 24; // Invalid hour to stop alarm
};

onMounted(() => {
  music.value = document.querySelector('audio');
  setInterval(updateTime, 1000);
});
</script>

<style scoped>
/* Your styles here */
</style>
