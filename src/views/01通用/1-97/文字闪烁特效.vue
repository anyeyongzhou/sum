<template>
  <div class="container">
    <h1>
      <span v-for="(char, index) in text" :key="index">{{ char }}</span>
    </h1>
  </div>
</template>

<script setup>
import { ref } from "vue";

const text = ref("佛主保佑，考试全过！");
</script>

<style lang="scss" scoped>
$primary-color: rgb(1, 231, 247);
$animation-duration: 3s;

.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0);
}

h1 {
  font-family: "fangsong";
  font-size: 6em;
  color: transparent;

  span {
    display: inline-block;
    animation: san $animation-duration linear infinite;
  }

  span:nth-child(1) {
    animation-delay: 0s;
  }

  span:nth-child(2) {
    animation-delay: 0.1s;
  }

  span:nth-child(3) {
    animation-delay: 0.2s;
  }

  span:nth-child(4) {
    animation-delay: 0.3s;
  }

  span:nth-child(5) {
    animation-delay: 0.4s;
  }

  span:nth-child(6) {
    animation-delay: 0.5s;
  }

  span:nth-child(7) {
    animation-delay: 0.6s;
  }

  span:nth-child(8) {
    animation-delay: 0.7s;
  }

  span:nth-child(9) {
    animation-delay: 0.8s;
  }

  span:nth-child(10) {
    animation-delay: 0.9s;
  }
}

@keyframes san {
  0%,
  100% {
    color: rgb(255, 255, 255);
    text-shadow: 0 0 5px $primary-color, 0 0 15px $primary-color,
      0 0 25px $primary-color, 0 0 50px $primary-color, 0 0 80px $primary-color,
      0 0 120px $primary-color, 0 0 160px $primary-color,
      0 0 200px $primary-color, 0 0 300px $primary-color,
      0 0 400px $primary-color, 0 0 500px $primary-color;
  }

  20%,
  80% {
    color: transparent;
    text-shadow: none;
  }
}
</style>
