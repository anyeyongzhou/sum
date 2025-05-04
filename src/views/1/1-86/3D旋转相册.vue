<template>
  <div class="container">
    <div class="box">
      <div
        v-for="(item, index) in imgList"
        :key="index"
        :class="['img' + index]"
      >
        <el-image :src="item" lazy loading="lazy" fit="fill"></el-image>
      </div>
    </div>
  </div>
</template>

<script setup>
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";
import img5 from "/@/assets/beauty/1/1-5.jpg";

const imgList = [img1, img2, img3, img4, img5];
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.box {
  position: relative;
  width: 300px !important;
  height: 300px;
  transform-style: preserve-3d;
  animation: zuan 6s linear alternate infinite;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.8;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .img0 {
    transform: translateZ(150px);
  }

  .img1 {
    transform: rotateY(180deg) translateZ(150px);
  }

  .img2 {
    transform: rotateY(-90deg) translateZ(150px);
  }

  .img3 {
    transform: rotateY(90deg) translateZ(150px);
  }

  .img4 {
    transform: rotateX(90deg) translateZ(150px);
  }

  .img5 {
    transform: rotateX(-90deg) translateZ(150px);
  }
}

@keyframes zuan {
  0%,
  5% {
    transform: rotateY(90deg);
  }
  20%,
  25% {
    transform: rotateY(180deg);
  }
  40%,
  45% {
    transform: rotateY(270deg);
  }
  60%,
  65% {
    transform: rotateX(-90deg);
  }
  80%,
  85% {
    transform: rotateX(0deg);
  }
  95%,
  100% {
    transform: rotateX(90deg);
  }
}
</style>
