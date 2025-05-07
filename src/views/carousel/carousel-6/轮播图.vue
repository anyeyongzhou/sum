<template>
  <div class="container">
    <div class="jumbotron" @click="handleArrowClick">
      <div class="leftArrow arrow" id="leftArrow"></div>
      <div class="rightArrow arrow" id="rightArrow"></div>
      <div class="imageIndexContainer">
        <span class="currentImage">{{ currentIndex + 1 }}</span> /
        <span class="totalImage">{{ images.length }}</span>
      </div>
      <div
        class="jumbotronImage"
        v-for="(image, index) in images"
        :key="index"
        :style="{
          backgroundImage: `url(${image.url})`,
          opacity: currentIndex === index ? 1 : 0,
        }"
      >
        <span>{{ image.title }}</span>
      </div>
    </div>
    <div class="progressBar">
      <div
        class="progressStatus"
        :style="{ width: progressPercent + '%' }"
      ></div>
    </div>
    <div class="thumbnail">
      <ul>
        <li
          v-for="(image, index) in images"
          :key="index"
          :data-id="index"
          :style="{
            backgroundColor:
              currentIndex === index
                ? 'rgb(137, 137, 137)'
                : 'rgb(216, 216, 216)',
          }"
          @click="setCurrentIndex(index)"
        >
          <div :style="{ backgroundImage: `url(${image.url})` }"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import img1 from "./images/1.jpeg";
import img2 from "./images/2.jpeg";
import img3 from "./images/3.jpeg";
import img4 from "./images/4.jpeg";
import img5 from "./images/5.jpeg";
import img6 from "./images/6.jpeg";
import img7 from "./images/7.jpeg";

const images = [
  {
    url: img1,
    title: "《火影》战斗力对比:旗木卡卡西VS宇智波带土!",
  },
  {
    url: img2,
    title: "情人节也是“反诈节”,莫让情人节变成情人“劫”",
  },
  {
    url: img3,
    title: "死神：一分钟带你看完连载了16年之久的死神动漫的精彩片段",
  },
  { url: img4, title: "《龙猫》:龙猫30周年 冬季温暖重映" },
  {
    url: img5,
    title: "夏目友人帐：夏目的生活好恐怖，妖精半夜出现，这大脸吓死了",
  },
  {
    url: img6,
    title: "《超震撼!》让我们一起来感受动漫里绝美的风景吧",
  },
  { url: img7, title: "《刀剑神域：夺命凶弹》速刷等级视频教学" },
];

const currentIndex = ref(0);
const progressPercent = ref(0);
let canBeClick = ref(true);

const setCurrentIndex = index => {
  currentIndex.value = index;
  progressPercent.value = 0;
  updateJumbotron();
};

const handleArrowClick = e => {
  if (!canBeClick.value) return;

  canBeClick.value = false;
  if (e.target.id === "leftArrow") {
    currentIndex.value =
      (currentIndex.value - 1 + images.length) % images.length;
  } else if (e.target.id === "rightArrow") {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }
  updateJumbotron();
};

const updateJumbotron = () => {
  // Update logic to refresh jumbotron and thumbnails
};

const progressMove = () => {
  progressPercent.value += 0.1;
  if (progressPercent.value > 100) {
    progressPercent.value = 0;
    currentIndex.value = (currentIndex.value + 1) % images.length;
    updateJumbotron();
  }
  requestAnimationFrame(progressMove);
};

onMounted(() => {
  updateJumbotron();
  requestAnimationFrame(progressMove);
});
</script>

<style lang="scss" scoped>
.container {
  width: 800px !important;
  height: 505px;
  margin: 100px auto;
}

.jumbotron {
  width: 100%;
  height: 400px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.progressBar {
  width: 100%;
  height: 5px;
  position: relative;
}

.progressStatus {
  width: 0%;
  height: 100%;
  background-color: rgb(197, 59, 31);
  position: absolute;
  top: 0;
  left: 0;
}

.thumbnail {
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.thumbnail > ul {
  width: 1220px;
  height: 100%;
  list-style: none;
  cursor: pointer;
}

.thumbnail > ul > li {
  width: 160px;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}

.thumbnail > ul > li > div {
  width: 90%;
  height: 85%;
}

.imageIndexContainer {
  color: #fff;
  position: absolute;
  right: 20px;
  bottom: 10px;
  font-size: 22px;
  font-style: italic;
}

.jumbotronImage {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: 1s;
}

.jumbotronImage > span {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  letter-spacing: 1px;
  font-style: italic;
  width: 100%;
  height: 45px;
  padding-top: 65px;
  text-indent: 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2) 20%, transparent);
}

.arrow {
  width: 34px;
  height: 47px;
  position: absolute;
  top: calc(50% - 24px);
  background: url(./images/slide-btn.png) no-repeat;
  z-index: 1;
  transition: transform 1s;
}

.leftArrow {
  left: 0;
  border-radius: 0 5px 5px 0;
  transform: translateX(-100%);
}

.rightArrow {
  right: 0;
  border-radius: 5px 0 0 5px;
  background-position: 100% 0;
  transform: translateX(100%);
}

.jumbotron:hover .leftArrow {
  transform: translateX(0);
}

.jumbotron:hover .rightArrow {
  transform: translateX(0);
}

.leftArrow:hover {
  background-position: 0 100%;
}

.rightArrow:hover {
  background-position: 100% 100%;
}
</style>
