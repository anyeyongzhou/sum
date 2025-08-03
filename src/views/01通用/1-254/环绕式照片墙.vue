<template>
  <div
    class="container"
    ref="containerRef"
    @mouseenter="begin"
    @mouseleave="stop"
  >
    <div class="item" v-for="(item, index) in imgList" :key="index">
      <el-image
        :src="item"
        lazy
        loading="lazy"
        fit="fill"
        class="img"
      ></el-image>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import img1 from "/@/assets/beauty/8/8-1.jpg";
import img2 from "/@/assets/beauty/8/8-2.jpg";
import img3 from "/@/assets/beauty/8/8-3.jpg";
import img4 from "/@/assets/beauty/8/8-4.jpg";
import img5 from "/@/assets/beauty/8/8-5.jpg";
import img6 from "/@/assets/beauty/8/8-6.jpg";
import img7 from "/@/assets/beauty/8/8-7.jpg";
import img8 from "/@/assets/beauty/8/8-8.jpg";
import img9 from "/@/assets/beauty/8/8-9.jpg";
import img10 from "/@/assets/beauty/8/8-10.jpg";

const imgList = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const containerRef = ref(null);
const isRotating = ref(false);
const rotationAngle = ref(0);
let animationId = null;

// 开始旋转
const begin = () => {
  if (!isRotating.value) {
    isRotating.value = true;
    rotate();
  }
};

// 停止旋转
const stop = () => {
  isRotating.value = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
};

// 旋转动画
const rotate = () => {
  if (!isRotating.value || !containerRef.value) return;

  rotationAngle.value += 0.5; // 旋转速度
  containerRef.value.style.transform = `rotateY(${rotationAngle.value}deg)`;

  animationId = requestAnimationFrame(rotate);
};

// 组件卸载时清理动画
onUnmounted(() => {
  stop();
});
</script>

<style lang="scss" scoped>
@use "sass:math";
body {
  perspective: 2000px;
  background-color: #000 !important;
}
.container {
  width: 100% !important;
  height: 600px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;

  .item {
    position: absolute;
    $imgWidth: 300px;
    $imgHeight: 400px;
    width: $imgWidth;
    height: $imgHeight;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -200px;
    $n: 10; /* 圆的个数 */
    $pDeg: calc(360deg / $n); /* 圆的角度 */
    $r: 500px; /* 圆的半径 */
    backface-visibility: hidden; /* 图片背面不可见 */
    opacity: 0.5;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 1;
    }
    @for $i from 1 through $n {
      &:nth-child(#{$i}) {
        $deg: $pDeg * ($i - 1);
        $x: math.sin($deg) * $r;
        $z: math.cos($deg) * $r;
        transform: translate3d($x, 0, $z) rotateY(180deg + $deg);
      }
    }

    .img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
