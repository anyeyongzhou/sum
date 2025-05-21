<template>
  <div class="container">
    <div class="box">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        alt="3D effect"
      />
      <span></span>
    </div>
  </div>
</template>

<script setup>
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";
import img5 from "/@/assets/beauty/1/1-5.jpg";
const images = [img1, img2, img3, img4, img5];
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  perspective: 2000px;
}

.box {
  position: relative;
  width: 220px;
  height: 360px;
  transition: all 0.5s;
  transform-style: preserve-3d;

  &:hover {
    transform: rotateX(50deg) rotateZ(-50deg);
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 3px rgb(61, 138, 226);
    transition: all 1.5s;
    transform: translateZ(0px);

    &:nth-child(2) {
      &:hover {
        transform: translateX(-10px) translateY(10px) translateZ(-10px);
        opacity: 0.8;
      }
    }

    &:nth-child(3) {
      &:hover {
        transform: translateX(-20px) translateY(20px) translateZ(-20px);
        opacity: 0.6;
      }
    }

    &:nth-child(4) {
      &:hover {
        transform: translateX(-30px) translateY(30px) translateZ(-30px);
        opacity: 0.4;
      }
    }

    &:nth-child(5) {
      &:hover {
        transform: translateX(-40px) translateY(40px) translateZ(-40px);
        opacity: 0.2;
      }
    }
  }

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 1.5s;
    opacity: 0.1;

    &:hover {
      transform: translateX(-50px) translateY(50px) translateZ(-50px);
      box-shadow: 0 0 40px rgb(41, 151, 253);
      background-color: rgb(41, 151, 253);
    }
  }
}
</style>
