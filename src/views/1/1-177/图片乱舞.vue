<template>
  <div class="image-gallery">
    <ul class="photos" ref="photosUl">
      <li
        v-for="(image, index) in images"
        :key="index"
        :style="getPhotoStyle(index)"
        @click="changeIndex(index)"
        @transitionend="handleTransitionEnd(index)"
      >
        <img :src="image" :alt="'Image ' + (index + 1)" />
      </li>
    </ul>
    <ul class="list">
      <li
        v-for="(image, index) in images"
        :key="'thumb-' + index"
        :style="getThumbnailStyle(index)"
        @click="changeIndex(index)"
      ></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 动态导入图片
const images = ref([]);
for (let i = 1; i <= 10; i++) {
  images.value.push(new URL(`./images/${i}.jpg`, import.meta.url).href);
}

const nowIndex = ref(0);
const photosUl = ref(null);

const getRandomValue = max => Math.floor(Math.random() * max);
const getRandomDirection = () => (Math.random() > 0.5 ? 1 : -1);

const getPhotoStyle = index => {
  if (index === nowIndex.value) {
    return {
      transform: "rotateZ(0deg) translateZ(10px)",
      zIndex: 1000,
      top: "0px",
      left: "0px",
    };
  }

  const d = index % 2 === 0 ? 1 : -1;
  const deg = getRandomValue(360);
  const z = getRandomValue(100);

  return {
    transform: `rotateZ(${d * (360 - deg)}deg) translateZ(-${z}px)`,
    zIndex: 0,
  };
};

const getThumbnailStyle = index => {
  return {
    transform: `scale(${index === nowIndex.value ? 2 : 1})`,
  };
};

const handleTransitionEnd = index => {
  if (index !== nowIndex.value) {
    const p = getRandomDirection();
    const h = getRandomValue(400);
    const w = getRandomValue(600);

    const photo = photosUl.value.children[index];
    photo.style.top = `${(p * h) / 1.2}px`;
    photo.style.left = `${(p * w) / 1.2}px`;
  }
};

const changeIndex = index => {
  if (nowIndex.value !== index) {
    nowIndex.value = index;
  }
};

onMounted(() => {
  // 初始化第一个图片的位置
  changeIndex(0);
});
</script>

<style lang="scss" scoped>
.image-gallery {
  height: 100%;
  width: 100%;
  background-color: #333;
  position: relative;

  .photos {
    width: 220px;
    height: 300px;
    padding: 40px;
    margin: 100px auto;
    position: relative;
    perspective: 500px;
    transform-style: preserve-3d;
    border: 1px solid red;

    li {
      width: 220px;
      height: 300px;
      position: absolute;
      top: 0;
      left: 0;
      padding: 40px;
      background-color: #fff;
      transform: rotateZ(0deg);
      transition: all 0.3s ease-in;

      img {
        width: 220px;
        height: 260px;
        object-fit: cover;
      }
    }
  }

  .list {
    width: 320px;
    height: 50px;
    padding: 10px;
    position: relative;
    margin: -20px auto;
    display: flex;
    justify-content: space-between;

    li {
      display: inline-block;
      width: 14px;
      height: 14px;
      background-color: #00807a;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease-in;
    }
  }
}
</style>
