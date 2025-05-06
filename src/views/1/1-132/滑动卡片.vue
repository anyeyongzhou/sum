<template>
  <div class="carousel-wrapper">
    <div class="carousel-box" :style="{ left: currentPosition + 'px' }">
      <ul>
        <li
          v-for="(image, index) in images"
          :key="index"
          @mouseenter="hoverActive = index"
          @mouseleave="hoverActive = null"
        >
          <img :src="image.src" :alt="image.alt" />
          <div
            class="shadow"
            :class="{ 'shadow-active': hoverActive === index }"
          >
            <h4>{{ image.title }}</h4>
          </div>
        </li>
      </ul>
    </div>
    <div class="carousel-controls">
      <button class="control-btn left" @click="moveLeft"></button>
      <button class="control-btn right" @click="moveRight"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import img1 from "./images/a1.png";
import img2 from "./images/a2.png";
import img3 from "./images/a3.png";
import img4 from "./images/a4.png";

const images = [
  { src: img1, alt: "Image 1", title: "Picture1" },
  { src: img2, alt: "Image 2", title: "Picture2" },
  { src: img3, alt: "Image 3", title: "Picture3" },
  { src: img4, alt: "Image 4", title: "Picture4" },
  { src: img1, alt: "Image 5", title: "Picture5" },
  { src: img2, alt: "Image 6", title: "Picture6" },
  { src: img3, alt: "Image 7", title: "Picture7" },
  { src: img4, alt: "Image 8", title: "Picture8" },
];

const itemWidth = 270; // 250px width + 20px margin
const visibleItems = 4;
const currentIndex = ref(0);
const hoverActive = ref(null);

const maxIndex = computed(() => images.length - visibleItems);
const currentPosition = computed(() => -currentIndex.value * itemWidth);

const moveLeft = () => {
  currentIndex.value = Math.max(0, currentIndex.value - 1);
};

const moveRight = () => {
  currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1);
};
</script>

<style lang="scss" scoped>
.carousel-wrapper {
  position: relative;
  width: 1080px;
  height: 350px;
  margin: 80px auto;
  overflow: hidden;

  .carousel-box {
    position: absolute;
    left: 0;
    top: 0;
    width: max-content;
    height: 100%;
    transition: left 0.3s ease;

    ul {
      display: flex;
      height: 100%;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    li {
      position: relative;
      width: 250px;
      height: 250px;
      margin: 10px;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .shadow {
        position: absolute;
        top: 90%;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #0057c4;
        opacity: 0.7;
        transition: all 0.3s ease-in;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        h4 {
          margin: 0;
          color: white;
          font-size: 1.2rem;
        }

        &-active {
          top: 0;
        }
      }

      &:hover .shadow {
        top: 0;
      }
    }
  }

  .carousel-controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    gap: 20px;

    .control-btn {
      width: 40px;
      height: 40px;
      background-color: #ddd;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0057c4;
      }

      &.left {
        background-image: url("./images/jt_l.png");
        background-repeat: no-repeat;
        background-position: center;
      }

      &.right {
        background-image: url("./images/jt_r.png");
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}
</style>
