<template>
  <div class="container">
    <div class="air">
      <img src="./air-conditioning.png" alt="Air Conditioner" class="picture" />
      <img class="pattern" :src="patternSrc" alt="Mode" />
      <span class="font">{{ temperature }}°C</span>
      <span class="logo">☁</span>
      <span class="dot" v-if="isOn"></span>
    </div>
    <div class="wind" v-if="isOn">
      <span class="wind1"></span>
      <span class="wind2"></span>
      <span class="wind3"></span>
    </div>
    <div class="btn">
      <div class="up" @click="increaseTemperature">▲</div>
      <div class="down" @click="decreaseTemperature">▼</div>
      <div class="sun" @click="setSunMode"></div>
      <div class="snow" @click="setSnowMode"></div>
      <div class="open" @click="togglePower"></div>
    </div>
    <audio src="./open.mp3" class="music" loop ref="music"></audio>
    <audio src="./12763.wav" class="ding" ref="ding"></audio>
  </div>
</template>

<script setup>
import { ref } from "vue";

const temperature = ref(17);
const isOn = ref(false);
const patternSrc = ref("./snow.png");

const music = ref(null);
const ding = ref(null);

const togglePower = () => {
  isOn.value = !isOn.value;
  if (isOn.value) {
    patternSrc.value = "./snow.png"; // Default to snow
    music.value.play();
  } else {
    music.value.pause();
  }
};

const increaseTemperature = () => {
  if (temperature.value < 30) {
    temperature.value++;
    ding.value.play();
  }
};

const decreaseTemperature = () => {
  if (temperature.value > 16) {
    temperature.value--;
    ding.value.play();
  }
};

const setSunMode = () => {
  patternSrc.value = "./sun.png";
  music.value.play();
  ding.value.play();
};

const setSnowMode = () => {
  patternSrc.value = "./snow.png";
  music.value.play();
  ding.value.play();
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 400px !important;
  height: 500px;
}

.air {
  position: relative;
  margin: 0 auto;
  width: 300px;
  height: 120px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px 10px 0 0;
  filter: drop-shadow(0 2px 4px rgb(145, 145, 145));
}

.air::after {
  content: "";
  position: absolute;
  bottom: -21px;
  left: 0;
  height: 20px;
  width: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 0 0 20px 20px;
}

.picture {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 65px;
  border-radius: 5px;
}

.pattern {
  position: absolute;
  top: 25px;
  right: 35px;
  width: 20px;
  height: 20px;
  opacity: 0;
  transition: all 0.3s;
}

.font {
  font-family: "led regular";
  position: absolute;
  right: 30px;
  top: 45px;
  width: 50px;
  height: 30px;
  line-height: 30px;
  font-size: 25px;
  color: rgb(184, 184, 184);
  opacity: 0;
  transition: all 0.3s;
}

.logo {
  position: absolute;
  left: 50%;
  bottom: 3px;
  transform: translateX(-50%);
  font-size: 10px;
  color: rgb(139, 139, 139);
}

.dot {
  position: absolute;
  bottom: -8px;
  right: 12px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgb(19, 221, 53);
  z-index: 1;
}

.wind {
  position: relative;
  top: 30px;
  width: 250px;
  height: 60px;
  margin: 0 auto;
  opacity: 0;
  transition: all 1.2s;
  animation: move 1.5s ease-in-out infinite;
}

@keyframes move {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(5px);
  }
}

.wind > span {
  position: absolute;
  width: 5px;
  height: 40px;
  background-color: rgb(206, 206, 206);
}

.wind1 {
  left: 20%;
  transform: rotate(20deg);
}

.wind2 {
  left: 50%;
}

.wind3 {
  left: 80%;
  transform: rotate(-20deg);
}

.btn {
  position: relative;
  top: 50px;
  margin: 0 auto;
  width: 100px;
  height: 150px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}

.btn > div {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 12px;
  line-height: 35px;
  text-align: center;
  background-color: rgb(204, 204, 204);
  box-shadow: 0 2px 4px rgb(151, 151, 151);
  cursor: pointer;
  user-select: none;
}

.btn > div:active {
  background-color: rgb(240, 240, 240);
}

.sun,
.snow,
.open {
  background-size: 50% 50%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.btn .sun {
  background-image: url(./sun.png);
  background-color: rgb(255, 130, 13);
}

.btn .snow {
  background-image: url(./snow.png);
  background-color: rgb(13, 138, 255);
}

.btn .open {
  background-image: url(./open.png);
  background-color: rgb(33, 255, 13);
}
</style>
