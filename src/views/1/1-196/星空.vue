<template>
  <div class="starry-sky">
    <div class="moon-wrapper">
      <div class="moon"></div>
    </div>
    <div
      v-for="(star, index) in stars"
      :key="index"
      class="star"
      :style="{
        left: star.x + 'px',
        top: star.y + 'px',
        transform: 'scale(' + star.scale + ', ' + star.scale + ')',
        animationDelay: star.delay + 's',
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const stars = ref([]);

// 初始化星星
const initStars = () => {
  const screenW = document.documentElement.clientWidth;
  const screenH = document.documentElement.clientHeight;
  const newStars = [];

  for (let i = 0; i < 150; i++) {
    newStars.push({
      x: Math.floor(Math.random() * screenW),
      y: Math.floor(Math.random() * screenH),
      scale: Math.random() * 1.5,
      delay: Math.random() * 1.5,
    });
  }

  stars.value = newStars;
};

onMounted(() => {
  initStars();
});
</script>

<style lang="scss" scoped>
.starry-sky {
  width: 100%;
  height: 100vh;
  background-color: #000;
  position: relative;
  overflow: hidden;

  .star {
    width: 30px;
    height: 30px;
    background: url("./images/star.png") no-repeat;
    position: absolute;
    background-size: 100% 100%;
    animation: flash 1s alternate infinite;
    z-index: 0;

    &:hover {
      transform: scale(3, 3) rotate(180deg) !important;
      transition: all 1s;
    }
  }

  .moon-wrapper {
    position: absolute;
    top: 50px;
    left: 80%;
    width: 200px;
    height: 200px;
    margin-left: -100px;
    animation: moonline 30s linear;
    z-index: 999;

    .moon {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 200px;
      background-color: #efefef;
      box-shadow: 0 0 40px #ffffff;
      border-radius: 100px;
      animation: moonright 30s linear;
    }
  }
}

@keyframes flash {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes moonline {
  0% {
    top: 250px;
    left: 0%;
    opacity: 0;
  }
  30% {
    top: 150px;
    left: 40%;
    opacity: 0.5;
  }
  80% {
    top: 50px;
    left: 80%;
    opacity: 1;
  }
}

@keyframes moonright {
  0% {
    box-shadow: 0 0 10px #ffffff;
  }
  30% {
    box-shadow: 0 0 15px #ffffff;
  }
  40% {
    box-shadow: 0 0 20px #ffffff;
  }
  50% {
    box-shadow: 0 0 25px #ffffff;
  }
  100% {
    box-shadow: 0 0 30px #ffffff;
  }
}
</style>
