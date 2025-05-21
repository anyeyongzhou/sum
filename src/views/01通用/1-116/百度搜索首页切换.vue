<template>
  <div class="wrapper">
    <div class="nav">
      <ul>
        <li
          v-for="(item, index) in navItems"
          :key="index"
          :class="{ on: activeIndex === index }"
          @click="switchContent(index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="content-container">
      <div class="slider-container">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="content-item"
          :style="{ display: activeIndex === index ? 'block' : 'none' }"
        >
          <img :src="image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import img0 from "./images/6.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";

const navItems = ["导航", "新闻", "音乐", "星座", "彩票", "视频"];
const images = [img1, img2, img3, img4, img5, img0];
const activeIndex = ref(0);

const switchContent = index => {
  activeIndex.value = index;
};
</script>

<style lang="scss" scoped>
$primary-color: rgba(0, 0, 0, 0.5);
$active-color: rgba(0, 0, 0, 0.3);
$background-image: url(./images/bg.jpg);

.wrapper {
  width: 920px;
  height: 320px;
  // margin: 150px auto 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nav {
  width: 80px;
  height: 320px;
  text-align: center;
  background-color: $primary-color;

  ul {
    list-style: none;

    li {
      line-height: 36px;
      height: 36px;
      cursor: pointer;
      color: #fff;

      &.on {
        background: url(./images/nav1.png);
      }

      &:hover {
        background: $active-color;
      }
    }
  }
}

.content-container {
  width: 810px;
  height: 320px;
  overflow: hidden;
}

.slider-container {
  transition: all 0.2s linear;
}

.content-item {
  width: 810px;
  height: 320px;
  color: #252525;
  text-align: center;
  // position: absolute;
  // top: 0;
  // left: 0;
  transition: opacity 0.5s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
