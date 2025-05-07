<template>
  <div id="app">
    <ul class="banner-list" :style="{ left: `-${curIndex * bannerWidth}px` }">
      <li class="banner" v-for="(item, index) in banners" :key="index">
        <img :src="item.img" :alt="item.title" />
        <div class="mask"></div>
        <span class="title">{{ item.title }}</span>
      </li>
    </ul>
    <ul class="index-list">
      <li
        class="index"
        v-for="(item, index) in banners"
        :key="index"
        :class="{ active: curIndex === index }"
        @click="setIndex(index)"
      ></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";
import img5 from "/@/assets/beauty/1/1-5.jpg";

const banners = [
  { img: img1, title: "点开有彩蛋！" },
  { img: img2, title: "G.E.M.邓紫棋新歌MV上线！" },
  { img: img3, title: "魔法X偶像，育成企划！" },
  { img: img4, title: "一个全程让人不明觉厉的专访！" },
  { img: img5, title: "12月22日上海见" },
];

const curIndex = ref(0);
const bannerWidth = ref(550);
let timer = null;

const startAutoMove = () => {
  timer = setInterval(() => {
    curIndex.value = (curIndex.value + 1) % banners.length;
  }, 3000);
};

const setIndex = index => {
  clearInterval(timer);
  curIndex.value = index;
  startAutoMove();
};

onMounted(() => {
  startAutoMove();
});

watch(curIndex, (newIndex, oldIndex) => {
  if (newIndex === banners.length) {
    curIndex.value = 0;
  }
});
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  width: 550px !important;
  height: 242px;
  margin: 100px auto;
  overflow: hidden;
}

.banner-list {
  position: absolute;
  left: 0;
  width: calc(550px * 6); // 6 banners
  transition: left 0.2s;
}

.banner {
  position: relative;
  float: left;
  width: 550px;
  height: 242px;
}

.banner img {
  width: 100%;
  height: 100%;
}

.banner .title {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #fff;
}

.banner .mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}

.index-list {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 0;
}

.index {
  display: inline-block;
  vertical-align: middle;
  width: 6px;
  height: 6px;
  border: 2px solid transparent;
  background-color: #fff;
  border-radius: 50%;
  margin-left: 10px;
  transition: all 0.2s;
  cursor: pointer;
}

.index:hover {
  border-color: #fff;
  background-color: #73c9e5;
}

.index.active {
  width: 15px;
  height: 15px;
  background-image: url("./img/icon_slide_selected.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
}

.index.active:hover {
  background-color: transparent;
  border-color: transparent;
}
</style>
