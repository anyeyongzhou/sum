<template>
  <div class="container">
    <div class="dna">
      <div v-for="n in 10" :key="n" class="line" :style="{ '--h': n }"></div>
    </div>
  </div>
</template>

<script setup>
// 无需额外的脚本逻辑
</script>

<style lang="scss" scoped>
$background-color: rgb(0, 0, 0);
$line-color: rgb(248, 154, 14);
$circle-color-1: rgb(0, 26, 255);
$circle-color-2: rgb(61, 248, 3);

.container {
  width: 100%;
  height: 100%;
  display: flex;
  // flex-wrap: nowrap;
  // flex-direction: row;
  justify-content: center;
  align-items: center;
}

.dna {
  position: relative;
  width: 200px;
  height: 502px;
  transform: rotate(30deg) skew(-20deg);
}

.line {
  position: absolute;
  left: 0;
  top: calc(var(--h) * 50px);
  height: 2px;
  width: 200px;
  background-color: $line-color;
  box-shadow: 0 0 10px $line-color, 0 0 10px $line-color;
  animation: round 3s linear calc(var(--h) * 0.2s) infinite;
}

@keyframes round {
  100% {
    transform: rotateY(360deg);
  }
}

.line::after,
.line::before {
  content: "";
  position: absolute;
  top: -20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.line::after {
  left: -20px;
  background-color: $circle-color-1;
  box-shadow: 0 0 15px $circle-color-1, 0 0 20px $circle-color-1;
}

.line::before {
  right: -20px;
  background-color: $circle-color-2;
  box-shadow: 0 0 15px $circle-color-2, 0 0 20px $circle-color-2;
}
</style>
