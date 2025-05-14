<template>
  <div class="game">
    <div class="container" v-show="isGameActive">
      <div class="time">
        <span>{{ currentTime }}s</span>
      </div>
      <div
        class="item"
        v-for="(card, index) in imgArr"
        :key="index"
        @click="setActive(card)"
      >
        <img :src="getImageUrl('role' + card.index + '.jpg')" />
      </div>
    </div>
    <div id="divWin" class="game-result" v-show="isWinVisible">
      <span>胜利</span>
    </div>
    <div id="divLose" class="game-result" v-show="isLoseVisible">
      <span>失败</span>
    </div>
    <div class="begin" v-show="!isGameActive">
      <button @click="begin">开始游戏</button>
    </div>
    <audio ref="audRight" :src="rightMaps"></audio>
    <audio ref="audLose" :src="loseMaps"></audio>
    <audio ref="audWin" :src="winMaps"></audio>
    <audio ref="audBg" :src="bgMaps" loop></audio>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import rightMaps from "./audio/right.mp3";
import loseMaps from "./audio/lose.mp3";
import winMaps from "./audio/win.mp3";
import bgMaps from "./audio/bgmusic.mp3";

const images = import.meta.glob("./images/*.jpg", {
  eager: true,
  import: "default",
});

const audRight = ref(null);
const audWin = ref(null);
const audLose = ref(null);
const audBg = ref(null);

const imgNumber = 24;
const maxImgIndex = 12;
const minImgIndex = 1;
const initialTime = 30;

const imgArr = ref([]);
const currentTime = ref(initialTime);
const isGameActive = ref(false);
const isWinVisible = ref(false);
const isLoseVisible = ref(false);
const timer = ref(null);

function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getImageUrl(relativePath) {
  const path = `./images/${relativePath}`;
  return images[path];
}

function initImgs() {
  imgArr.value = [];
  for (let i = 0; i < imgNumber; i += 2) {
    const index = getRandom(minImgIndex, maxImgIndex);
    imgArr.value.push({ index, active: false, valished: false });
    imgArr.value.push({ index, active: false, valished: false });
  }
  imgArr.value.sort(() => Math.random() - 0.5);
}

function setActive(card) {
  if (card.valished) return;
  card.active = true;

  const curActiveCard = imgArr.value.find(it => it.active && !it.valished);
  if (curActiveCard) {
    if (curActiveCard.index === card.index) {
      valish(curActiveCard, card);
    } else {
      curActiveCard.active = false;
    }
  }
}

function valish(card1, card2) {
  card1.valished = card2.valished = true;
  card1.active = card2.active = false;
  audRight.value.currentTime = 0;
  audRight.value.play();
  checkWin();
}

function checkWin() {
  if (!imgArr.value.find(it => !it.valished)) {
    isGameActive.value = false;
    isWinVisible.value = true;
    clearInterval(timer.value);
    audBg.value.pause();
    audWin.value.play();
  }
}

function startTimer() {
  timer.value = setInterval(() => {
    currentTime.value--;
    if (currentTime.value === 0) {
      clearInterval(timer.value);
      isGameActive.value = false;
      isLoseVisible.value = true;
      audBg.value.pause();
      audLose.value.play();
    }
  }, 1000);
}

function begin() {
  audBg.value.play();
  isGameActive.value = true;
  isWinVisible.value = false;
  isLoseVisible.value = false;
  currentTime.value = initialTime;
  initImgs();
  startTimer();
}
onMounted(() => {
  initImgs();
});
</script>

<style lang="scss">
.game {
  width: 100%;
  height: 100%;
  background: url("./img/header_bg.jpg") no-repeat center top/cover;
}

.container {
  background: #555392;
  padding: 20px;
  box-sizing: border-box;
  width: 1100px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  box-shadow: 0 0 10px 10px #eee;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
}

.container .item {
  cursor: pointer;
  border: 4px solid #fff;
  border-radius: 5px;
  transition: 0.1s;

  &:hover {
    box-shadow: 0 0 5px 5px #fff;
  }

  &.active {
    box-shadow: 0 0 5px 5px #72ff85;
    border-color: #72ff85;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.time {
  color: #fff;
  font-size: 2em;
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
}

.game-result {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  font-size: 4em;
  color: #fff;
  background: #555392;
  padding: 20px 100px;
  border-radius: 30px;
  box-shadow: 0 0 10px 10px #eee;
  transition: 0.5s;
}

.begin button {
  position: absolute;
  padding: 20px 50px;
  font-size: 3em;
  cursor: pointer;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #555392;
  color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 10px 10px #eee;
}
</style>
