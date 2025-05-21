<template>
  <div class="yongqi">
    <div class="quan">
      <div
        class="dian"
        v-for="n in 5"
        :key="n"
        :style="{ animationDelay: `${(n - 1) * 0.1}s` }"
      ></div>
    </div>
    <p>Windows 正在加载</p>
    <p style="margin-top: 10px; text-align: center">--暗夜永昼--</p>
  </div>
</template>

<script setup>
// 无需额外的脚本逻辑
</script>

<style lang="scss" scoped>
$primary-color: rgb(15, 125, 199);
$dot-color: rgb(255, 255, 255);

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary-color;
  color: $dot-color;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.yongqi {
  text-align: center;
}

.quan {
  position: relative;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 60px;
  height: 60px;
}

.dian {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: zhuan 3.5s linear infinite;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background-color: $dot-color;
    border-radius: 50%;
  }
}

@keyframes zhuan {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  70% {
    transform: rotate(540deg);
  }
  79% {
    opacity: 1;
  }
  80% {
    transform: rotate(720deg);
    opacity: 0;
  }
  100% {
    transform: rotate(810deg);
    opacity: 0;
  }
}
</style>
