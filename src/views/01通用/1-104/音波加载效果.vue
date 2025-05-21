<template>
  <div class="container">
    <div class="item">
      <span v-for="i in 10" :key="i" :style="{ '--i': i }"></span>
    </div>
  </div>
</template>

<script setup>
// 无需额外的脚本逻辑
</script>

<style lang="scss" scoped>
$background-color: rgb(4, 6, 17);
$border-color: rgba(0, 162, 255, 0.8);
$box-shadow-color: rgb(0, 162, 255);

.container {
  width: 100%;
  height: 100%;
  display: flex;
  // flex-wrap: nowrap;
  // flex-direction: row;
  justify-content: center;
  align-items: center;
}

.item {
  position: relative;
  width: 20px;
  height: 20px;
  transform-style: preserve-3d;
  transform: perspective(500px) rotateX(50deg) translateZ(50px);
}

.item span {
  position: absolute;
  top: calc(-9px * var(--i));
  left: calc(-9px * var(--i));
  bottom: calc(-9px * var(--i));
  right: calc(-9px * var(--i));
  border: 5px solid $border-color;
  box-shadow: 0 6px 0 $box-shadow-color, inset 0 6px 0 rgba(0, 162, 255, 0.9);
  border-radius: 50%;
  animation: move 1.5s ease-in-out infinite alternate;
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes move {
  0%,
  100% {
    transform: translateZ(0px);
  }
  50% {
    transform: translateZ(-100px);
  }
}
</style>
