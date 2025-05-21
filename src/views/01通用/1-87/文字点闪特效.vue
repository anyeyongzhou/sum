<template>
  <h1>
    <span>暗</span>
    <span>夜</span>
    <span>永</span>
    <span>昼</span>
    <span>神</span>
  </h1>
</template>

<script setup>
// Vue 3 setup 语法，这里没有需要声明的逻辑，所以可以为空
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0);
}

h1 {
  font-family: "fangsong";
  font-size: 6em;
  color: rgba(19, 18, 18, 0.8);

  span {
    display: table-cell;
    animation: san 1.5s linear infinite;

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.3s;
    }
    &:nth-child(3) {
      animation-delay: 0.6s;
    }
    &:nth-child(4) {
      animation-delay: 0.9s;
    }
    &:nth-child(5) {
      animation-delay: 1.2s;
    }
  }
}

@keyframes san {
  0% {
    color: rgb(255, 255, 255);
    text-shadow: 0 0 5px rgb(1, 210, 247), 0 0 15px rgb(1, 210, 247),
      0 0 25px rgb(1, 210, 247), 0 0 50px rgb(1, 210, 247),
      0 0 80px rgb(1, 210, 247), 0 0 120px rgb(1, 210, 247),
      0 0 160px rgb(1, 210, 247), 0 0 200px rgb(1, 210, 247);
  }
  5%,
  100% {
    color: rgba(0, 0, 0, 0.8);
    text-shadow: none;
  }
}
</style>
