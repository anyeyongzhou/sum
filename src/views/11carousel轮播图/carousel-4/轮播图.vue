<template>
  <div class="banner">
    <div class="imgs" :style="{ marginLeft: `${marginLeft}px` }">
      <a v-for="(img, index) in images" :key="index" :href="img.link">
        <img :src="img.src" alt="" />
      </a>
    </div>
    <div class="dots">
      <span
        v-for="(img, index) in images"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="switchTo(index)"
      ></span>
    </div>
    <div class="arrow" @click="handleArrowClick">
      <div class="item left">&lt;</div>
      <div class="item right">&gt;</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";
import img5 from "/@/assets/beauty/1/1-5.jpg";
import img6 from "/@/assets/beauty/1/1-6.jpg";

const images = [
  { src: img1, link: "#" },
  { src: img2, link: "#" },
  { src: img3, link: "#" },
  { src: img4, link: "#" },
  { src: img5, link: "#" },
  { src: img6, link: "#" },
];

const imgWidth = 520;
const currentIndex = ref(0);
const marginLeft = ref(0);
const totalImages = images.length;

const switchTo = index => {
  if (index !== currentIndex.value) {
    currentIndex.value = index;
    updateMargin();
  }
};

const updateMargin = () => {
  marginLeft.value = -((currentIndex.value + 1) * imgWidth);
};

const handleArrowClick = event => {
  if (event.target.classList.contains("left")) {
    currentIndex.value = (currentIndex.value - 1 + totalImages) % totalImages;
  } else if (event.target.classList.contains("right")) {
    currentIndex.value = (currentIndex.value + 1) % totalImages;
  }
  updateMargin();
};

// Initialize margin on mount
watch(currentIndex, updateMargin);
</script>

<style lang="scss" scoped>
.banner {
  width: 520px !important;
  height: 280px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;

  .imgs {
    display: flex;
    transition: margin-left 0.3s ease;
  }

  .imgs img {
    width: 520px;
    height: 280px;
    display: block;
  }

  .dots {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 12px;
    padding: 2px 4px;
    border-radius: 8px;

    span {
      width: 8px;
      height: 8px;
      margin: 2px;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;

      &.active {
        background: #f40;
      }
    }
  }

  .arrow {
    display: none;

    .item {
      position: absolute;
      top: 100px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      width: 20px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.5);
      }
    }

    .left {
      left: 0;
      border-radius: 0 17px 17px 0;
    }

    .right {
      right: 0;
      border-radius: 17px 0 0 17px;
      padding-left: 7px;
      box-sizing: border-box;
    }
  }

  &:hover .arrow {
    display: block;
  }
}
</style>
