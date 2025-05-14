<template>
  <div class="container">
    <div class="box" v-for="n in 9" :key="n" :style="getDelay(n)">
      <div class="a1"></div>
      <div class="a2"></div>
      <div class="a3"></div>
    </div>
  </div>
</template>

<script setup>
/**
 * 通过 :style 设置每个 box 的 animation-delay
 */
const getDelay = n => {
  const delay = (n - 1) * 0.05;
  return { animationDelay: `${delay}s` };
};
</script>

<style scoped>
.container {
  width: 300px !important;
  height: 300px;
  margin: 200px auto;
  display: grid;
  grid-template-rows: repeat(3, 100px);
  grid-template-columns: repeat(3, 100px);
  transform: rotateX(45deg) rotateZ(45deg);
  transform-style: preserve-3d;
}

.box {
  position: relative;
  transform-style: preserve-3d;
  animation: move 1s infinite;
}

.a1,
.a2,
.a3 {
  width: 100%;
  height: 100%;
  position: absolute;
}

.a1 {
  background-color: #05afd1;
}

.a2 {
  background-color: #f9c80e;
  transform: translate3d(50px, 0, -50px) rotateY(90deg);
}

.a3 {
  background-color: #b569d3;
  transform: translate3d(0px, 50px, -50px) rotateX(90deg);
}

@keyframes move {
  0% {
    transform: translateZ(0px);
  }

  50% {
    transform: translateZ(200px);
  }

  100% {
    transform: translateZ(0px);
  }
}
</style>
