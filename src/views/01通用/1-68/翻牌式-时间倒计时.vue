<template>
  <div class="time text">
    <div class="top block">{{ currentValue }}</div>

    <div class="flod-box">
      <div class="front flod-block">{{ frontValue }}</div>

      <div class="back flod-block">{{ backValue }}</div>
    </div>

    <div class="bottom block">{{ currentValue }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

// 响应式变量

const currentValue = ref(60); // 当前显示的数字，初始为10

const frontValue = ref(60); // 卡片正面显示的数字

const backValue = ref(60); // 卡片背面显示的数字

// 倒计时逻辑

const startCountdown = () => {
  const timer = setInterval(() => {
    if (currentValue.value > 1) {
      currentValue.value -= 1;
    } else {
      currentValue.value = 10; // 倒计时到1后，重置为10
    }
  }, 1000);
};

// 监视 currentValue 变化来触发翻转动画

watch(currentValue, (newValue, oldValue) => {
  // 在翻转前先更新正面数字

  frontValue.value = newValue;

  // 等待翻转开始后再更新背面数字，确保背面数字不比当前值小

  setTimeout(() => {
    backValue.value = newValue - 1 === 0 ? 10 : newValue - 1;
  }, 1000); // 500ms是确保翻转的间隔时间

  // 触发翻转

  triggerFlip();
});

// 触发翻转动画

const triggerFlip = () => {
  const flodBox = document.querySelector(".flod-box");

  if (flodBox) {
    // 快速将卡片恢复到初始状态

    flodBox.style.transition = "transform 0s";

    flodBox.style.transform = "perspective(200px) rotateX(0deg)";

    // 等待0.1秒后触发翻转

    setTimeout(() => {
      flodBox.style.transition = "transform 1s"; // 翻转动画时长

      flodBox.style.transform = "perspective(200px) rotateX(-180deg)";
    }, 100);
  }
};

// 在组件挂载时启动倒计时

onMounted(() => {
  startCountdown();
});
</script>

<style scoped>
.time {
  position: relative;

  height: 100px;

  box-sizing: border-box;
}

.text {
  font-size: 100px;

  color: #ffffff;

  text-align: center;

  line-height: 200px;
}

.time .top {
  position: relative;
}

.time .bottom {
  line-height: 0;

  /* 把数字头顶到上面去 */
}

.block {
  width: 150px;

  height: 100px;

  background-color: black;

  overflow: hidden;
}

.time .flod-box {
  position: absolute;

  top: 0;

  width: 150px;

  height: 100px;

  transform-style: preserve-3d;

  transform-origin: bottom;

  transition: all 1s;
}

.flod-box .flod-block {
  position: absolute;

  width: 100%;

  height: 100%;

  backface-visibility: hidden;

  overflow: hidden;
}

.flod-box .front {
  background-color: rgb(98, 228, 23);
}

.flod-box .back {
  background-color: aquamarine;

  transform: rotateX(0deg) rotateY(-180deg) scale(-1);

  line-height: 0px;

  /* 把数字上移了*/
}

.flod-box:hover {
  transform: perspective(200px) rotateX(-180deg);
}
</style>
