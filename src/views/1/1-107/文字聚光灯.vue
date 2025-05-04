<template>
  <h1 class="gradient-text">暗夜永昼</h1>
</template>

<script setup>
// Vue 3 setup 语法，这里没有需要声明的逻辑，所以可以为空
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #070707;
}

.gradient-text {
  position: relative;
  color: #6b6868;
  font-size: 120px;

  &::after {
    content: "暗夜永昼";
    top: 0;
    left: 0;
    position: absolute;
    color: transparent;
    background-image: linear-gradient(
      to left,
      rgb(0, 174, 255),
      rgb(0, 255, 85),
      rgb(212, 0, 255),
      rgb(0, 204, 255),
      rgb(238, 255, 0)
    );
    background-clip: text;
    -webkit-background-clip: text;
    clip-path: circle(80px at 0% 50%);
    animation: move 3s linear alternate infinite;
  }
}

@keyframes move {
  0% {
    clip-path: circle(80px at 0% 50%);
  }
  100% {
    clip-path: circle(80px at 100% 50%);
  }
}
</style>
