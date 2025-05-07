<template>
  <div class="countdown-container">
    <div id="time">{{ currentTime }}</div>
    <br />
    <div id="day">{{ daysToNewYear }} 天</div>
    <br />
    <div id="tm">{{ countdownText }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// 当前时间显示
const currentTime = ref("");
// 距离元旦的天数
const daysToNewYear = ref(0);
// 倒计时文本
const countdownText = ref("");

let timeInterval: number;
let countdownInterval: number;

// 格式化时间数字（补零）
const formatTime = (num: number): string => {
  return num < 10 ? `0${num}` : num.toString();
};

// 更新当前时间
const updateCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  const hours = formatTime(now.getHours());
  const minutes = formatTime(now.getMinutes());
  const seconds = formatTime(now.getSeconds());
  const weekDay = "日一二三四五六".charAt(day);

  currentTime.value = `${year}年${month}月${date}日 星期${weekDay} ${hours}:${minutes}:${seconds}`;
};

// 计算距离元旦的天数
const calculateDaysToNewYear = () => {
  const now = new Date();
  const newYear = new Date(now.getFullYear() + 1, 0, 1); // 下一年的1月1日
  const diffTime = newYear.getTime() - now.getTime();
  daysToNewYear.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// 更新倒计时
const updateCountdown = () => {
  const now = new Date();
  const newYear = new Date(now.getFullYear() + 1, 0, 1);
  const diffSeconds = Math.floor((newYear.getTime() - now.getTime()) / 1000);

  if (diffSeconds <= 0) {
    countdownText.value = "元旦快乐！";
    return;
  }

  const days = Math.floor(diffSeconds / (24 * 60 * 60));
  const hours = Math.floor((diffSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((diffSeconds / 60) % 60);
  const seconds = Math.floor(diffSeconds % 60);

  countdownText.value = `距离${
    now.getFullYear() + 1
  }年元旦还有: ${days}天${hours}小时${minutes}分钟${seconds}秒`;
};

// 初始化定时器
onMounted(() => {
  updateCurrentTime();
  calculateDaysToNewYear();
  updateCountdown();

  timeInterval = window.setInterval(updateCurrentTime, 1000);
  countdownInterval = window.setInterval(updateCountdown, 1000);
});

// 清除定时器
onUnmounted(() => {
  clearInterval(timeInterval);
  clearInterval(countdownInterval);
});
</script>

<style scoped>
.countdown-container {
  color: #fff;
  background: #000;
  padding: 20px;
  font-family: Arial, sans-serif;
}

#time,
#day,
#tm {
  margin: 10px 0;
  font-size: 18px;
}
</style>
