<template>
  <div class="kuang">
    <div
      class="droplet"
      v-for="(drop, index) in droplets"
      :key="index"
      :style="{ animationDelay: `${index * 0.5}s` }"
    ></div>
    <div class="quan"></div>
    <span>{{ humidity }}%</span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const droplets = ref([1, 2, 3]);
const humidity = ref(99);
</script>

<style lang="scss" scoped>
.kuang {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(5, 5, 5);
  filter: contrast(30);
}

.droplet {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgb(61, 233, 99);
  filter: blur(20px);
  animation: fall 3s linear infinite;
  opacity: 0;
}

@keyframes fall {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-500%);
  }
  50% {
    opacity: 1;
    transform: scale(0.5) translateY(-100%);
  }
  100% {
    transform: scale(0.3) translateY(0px);
  }
}

.quan {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgb(61, 233, 99);
  filter: blur(20px);
  animation: zhuan 3s infinite;
}

@keyframes zhuan {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(180deg);
    height: 90px;
    border-top-left-radius: 45%;
    border-bottom-left-radius: 48%;
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}

span {
  position: absolute;
  color: rgb(184, 182, 182);
  font-size: 26px;
  font-family: "fangsong";
  font-weight: bold;
}
</style>
