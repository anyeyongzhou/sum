<template>
  <div class="container">
    <div class="night">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      night
    </div>
  </div>
</template>

<script setup>
// 无需额外的脚本逻辑
</script>

<style lang="scss" scoped>
$background-color: rgb(4, 4, 19);
$primary-color: rgb(18, 190, 243);
$gradient-color-1: rgb(40, 62, 161);
$gradient-color-2: rgb(31, 49, 133);
$hover-gradient-color-1: rgb(25, 38, 99);
$hover-gradient-color-2: rgb(13, 22, 58);
$shadow-color: rgb(14, 20, 105);
$text-shadow-color: rgb(9, 208, 235);

.container {
  width: 100%;
  height: 100%;
  display: flex;
  // flex-wrap: nowrap;
  // flex-direction: row;
  justify-content: center;
  align-items: center;
}

.night {
  position: relative;
  width: 300px;
  height: 100px;
  color: $primary-color;
  letter-spacing: 12px;
  font-size: 50px;
  line-height: 100px;
  text-align: center;
  background-image: linear-gradient(
    90deg,
    $gradient-color-1 50%,
    $gradient-color-2 50%
  );
  text-transform: uppercase;
  user-select: none;
  text-decoration: none;
  overflow: hidden;
  box-shadow: inset 0 0 10px $shadow-color, 0 0 5px $text-shadow-color;
  transition: all 0.5s;

  &:hover {
    text-shadow: 0 0 5px $primary-color, 0 0 8px $primary-color,
      0 0 10px $primary-color;
    background-image: linear-gradient(
      90deg,
      $hover-gradient-color-1 50%,
      $hover-gradient-color-2 50%
    );
    box-shadow: inset 0 0 10px $shadow-color, 0 0 5px $text-shadow-color,
      0 0 10px $text-shadow-color;
  }

  span {
    position: absolute;
  }

  span:nth-child(1) {
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-image: linear-gradient(to right, transparent, $primary-color);
    animation: move1 2s linear infinite;
  }

  span:nth-child(2) {
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    transform: translateY(-100%);
    background-image: linear-gradient(to bottom, transparent, $primary-color);
    animation: move2 2s linear infinite;
    animation-delay: 1s;
  }

  span:nth-child(3) {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-image: linear-gradient(to left, transparent, $primary-color);
    animation: move3 2s linear infinite;
  }

  span:nth-child(4) {
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    transform: translateY(100%);
    background-image: linear-gradient(to top, transparent, $primary-color);
    animation: move4 2s linear infinite;
    animation-delay: 1s;
  }
}

@keyframes move1 {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes move2 {
  100% {
    transform: translateY(100%);
  }
}

@keyframes move3 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes move4 {
  100% {
    transform: translateY(-100%);
  }
}
</style>
