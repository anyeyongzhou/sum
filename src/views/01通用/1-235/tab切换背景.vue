<template>
  <div class="tab-control">
    <!-- 大图片展示区域 -->
    <ul class="banner-container">
      <li
        v-for="(item, index) in items"
        :key="index"
        :id="'tab-' + index"
        class="banner-list"
        :class="{ active: currentIndex === index }"
      >
        <img :src="item.bannerImg" :alt="item.title" />
      </li>
    </ul>
    <!-- 导航区域 -->
    <ul class="nav-container">
      <li
        v-for="(item, index) in items"
        :key="index"
        @click="handleTabClick(index)"
      >
        <img :src="item.navImg" :alt="item.title" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import img1 from "./img/1.jpg";
import img2 from "./img/1-1.png";
import img3 from "./img/2.jpg";
import img4 from "./img/2-2.png";
import img5 from "./img/3.jpg";
import img6 from "./img/3-3.png";
import img7 from "./img/4.jpg";
import img8 from "./img/4-4.png";

const items = ref([
  {
    title: "标签1",
    bannerImg: img1,
    navImg: img2,
  },
  {
    title: "标签2",
    bannerImg: img3,
    navImg: img4,
  },
  {
    title: "标签3",
    bannerImg: img5,
    navImg: img6,
  },
  {
    title: "标签4",
    bannerImg: img7,
    navImg: img8,
  },
]);

const emit = defineEmits(["change"]);

const currentIndex = ref(0);

const handleTabClick = index => {
  currentIndex.value = index;
  emit("change", index);
};
</script>

<style lang="scss" scoped>
.tab-control {
  position: relative;
  width: 100%;
}

.banner-container {
  width: 100%;
  height: 360px;
  overflow: hidden;

  .banner-list {
    height: 360px;
    text-align: center;
    display: none;

    &.active {
      display: block;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:nth-child(1) {
      background-color: #f3b02b;
    }

    &:nth-child(2) {
      background-color: #a2d03a;
    }

    &:nth-child(3) {
      background-color: #6d57a2;
    }

    &:nth-child(4) {
      background-color: #32b1c2;
    }
  }
}

.nav-container {
  position: absolute;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  top: 260px;

  li {
    width: 170px;
    height: 170px;
    margin: 0 30px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
