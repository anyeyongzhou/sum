<template>
  <main>
    <h1 class="txt">live on.</h1>
    <h1 class="txt2"></h1>
    <h1 class="txt3"></h1>
  </main>
</template>

<script setup>
// 无需额外的脚本逻辑
</script>

<style lang="scss" scoped>
$font-family: "Merienda", cursive;
$background-color: rgb(0, 0, 0);
$text-color: rgb(255, 255, 255);
$gradient-colors: (
  rgb(255, 0, 212),
  rgb(0, 119, 255),
  rgb(255, 187, 0),
  rgb(1, 255, 77)
);

* {
  font-family: $font-family;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  background-color: $background-color;
  display: flex;
  justify-content: center;
  align-items: center;
}

main {
  position: relative;
  overflow: hidden;
}

.txt {
  color: $text-color;
  text-transform: uppercase;
  font-size: 168px;
  background-color: $background-color;
  user-select: none;

  &::before {
    content: "live on.";
    position: absolute;
    filter: blur(3px);
    mix-blend-mode: difference;
  }
}

.txt2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, $gradient-colors);
  mix-blend-mode: multiply;
}

.txt3 {
  position: absolute;
  top: -100%;
  left: -100%;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, white, black 30%);
  background-size: 25% 25%;
  mix-blend-mode: color-dodge;
  animation: shine 3s linear infinite;
}

@keyframes shine {
  100% {
    transform: translate(50%, 50%);
  }
}
</style>
