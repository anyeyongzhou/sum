<template>
  <div class="wrapper">
    <div class="logo">loading</div>
    <div class="dots" :class="{ animate: animate }" ref="dots">
      <div class="dot" v-for="n in 5" :key="n"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const dots = ref(null);
const animate = ref(true);
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    animate.value = false;
    setTimeout(() => {
      animate.value = true;
    }, 200);
  }, 3750);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="scss">
.wrapper {
  width: 100% !important;
  height: 100%;
  background: linear-gradient(
    45deg,
    #6fc7b5 0%,
    #13bdce 20%,
    #0094d9 40%,
    #5a3694 60%,
    #ee4d74 80%,
    #f58c58 100%
  );
  background-size: 400%;
  background-position: 0% 100%;
  animation: gradient 7.5s ease-in-out infinite;
  position: relative;

  * {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
}

.logo {
  color: #fff;
  font-size: 30px;
  font-weight: bolder;
}

.dots.animate .dot {
  animation: loading-block 2.5s ease-in-out 1;
}

.dots.animate .dot::after {
  animation: loading-dot 2.5s ease-in-out 1;
}

.dot {
  height: 300px;
  width: 300px;

  &::after {
    content: "";
    display: inline-block;
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    transform: scale(0.17);
  }
}

// 每个小球位置和动画延迟
.dot:nth-child(1) {
  top: 129px;
  left: -197px;
  animation-delay: 0s;

  &::after {
    top: 0;
    right: 0;
    transform-origin: top right;
    animation-delay: 0s;
  }
}

.dot:nth-child(2) {
  top: -142px;
  left: -183px;
  animation-delay: 0.25s;

  &::after {
    bottom: 0;
    right: 0;
    transform-origin: bottom right;
    animation-delay: 0.25s;
  }
}

.dot:nth-child(3) {
  top: -156px;
  left: -131px;
  animation-delay: 0.5s;

  &::after {
    bottom: 0;
    right: 0;
    transform-origin: bottom right;
    animation-delay: 0.5s;
  }
}

.dot:nth-child(4) {
  top: 148px;
  left: 191px;
  animation-delay: 0.75s;

  &::after {
    top: 0;
    left: 0;
    transform-origin: top left;
    animation-delay: 0.75s;
  }
}

.dot:nth-child(5) {
  top: -130px;
  left: 180px;
  animation-delay: 1s;

  &::after {
    bottom: 0;
    left: 0;
    transform-origin: bottom left;
    animation-delay: 1s;
  }
}

/* 旋转轨迹动画 */
@keyframes loading-block {
  0% {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}

/* 小球本身的缩放动画 */
@keyframes loading-dot {
  0% {
    transform: scale(0.17);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.17);
  }
}

/* 渐变背景动画 */
@keyframes gradient {
  0% {
    background-position: 0% 100%;
  }
  50% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 100%;
  }
}
</style>
