<template>
  <div class="container">
    <div :class="['cube', currentClass]">
      <img
        v-for="(img, i) in images"
        :key="i"
        class="cube-images"
        :class="'img' + (i + 1)"
        :src="img"
        alt=""
      />
    </div>
  </div>
  <h2>点击下面的图片方块</h2>
  <div class="image-buttons">
    <input
      v-for="(img, i) in images"
      :key="i"
      type="image"
      :src="img"
      alt=""
      :class="`show-image-${i + 1}`"
      @click="handleClick(i)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

// 加载图片（使用 Vite 模块方式）
const images = Array.from(
  { length: 6 },
  (_, i) => new URL(`./img/${i + 1}.jpg`, import.meta.url).href
);

const currentClass = ref("noting");

function handleClick(index) {
  currentClass.value = `show-image-${index + 1}`;
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 30rem !important;
  height: 30rem;
  margin: 5rem auto 6rem;
  perspective: 100rem;

  .cube {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    img {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
    }

    .img1 {
      transform: translateZ(15rem);
    }
    .img2 {
      transform: rotateX(-180deg) translateZ(15rem);
    }
    .img3 {
      transform: rotateY(90deg) translateZ(15rem);
    }
    .img4 {
      transform: rotateY(-90deg) translateZ(15rem);
    }
    .img5 {
      transform: rotateX(90deg) translateZ(15rem);
    }
    .img6 {
      transform: rotateX(-90deg) translateZ(15rem);
    }
  }

  .cube.noting {
    transform: translateZ(-15rem) rotateX(-15deg) rotateY(18deg);
  }
  .cube.show-image-1 {
    transform: translateZ(-15rem);
  }
  .cube.show-image-2 {
    transform: translateZ(-15rem) rotateX(180deg);
  }
  .cube.show-image-3 {
    transform: translateZ(-15rem) rotateY(-90deg);
  }
  .cube.show-image-4 {
    transform: translateZ(-15rem) rotateY(90deg);
  }
  .cube.show-image-5 {
    transform: translateZ(-15rem) rotateX(-90deg);
  }
  .cube.show-image-6 {
    transform: translateZ(-15rem) rotateX(90deg);
  }
}

h2 {
  margin-bottom: 50px;
}

.image-buttons {
  display: grid;
  grid-template-columns: 105px 105px 105px;
  grid-template-rows: 85px 85px;
  justify-content: center;
  grid-gap: 1.5rem;

  input {
    width: 105px;
    outline: none;
    border: 2px solid #fafafa;

    &:focus {
      border: 2px solid #e70;
    }
  }
}
</style>
