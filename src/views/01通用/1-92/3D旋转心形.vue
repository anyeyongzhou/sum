<template>
  <div class="container">
    <div id="heart-container">
      <div id="cube">
        <div
          v-for="(face, index) in cubeFaces"
          :key="index"
          :class="face.class"
        >
          <el-image
            :src="imgList[index]"
            lazy
            loading="lazy"
            :fit="contain"
          ></el-image>
        </div>
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
import img6 from "/@/assets/beauty/1/1-6.jpg";

const imgList = [img1, img2, img3, img4, img5, img6];

const cubeFaces = [
  { class: "out-front" },
  { class: "out-back" },
  { class: "out-left" },
  { class: "out-right" },
  { class: "out-top" },
  { class: "out-bottom" },
];

onMounted(() => {
  const heartContainer = document.getElementById("heart-container");

  // Create heart lines
  for (let i = 0; i < 36; i++) {
    const heartLine = document.createElement("div");
    heartLine.className = "heart-line";
    heartLine.style.border = "2px solid #e4393c";
    heartLine.style.borderLeft = "0";
    heartLine.style.borderBottom = "0";
    heartLine.style.transform = `rotateY(${
      i * 10
    }deg) rotateZ(45deg) translateX(150px)`;
    heartContainer.appendChild(heartLine);
  }
});
</script>

<style lang="scss">
.container {
  #heart-container {
    position: relative;
    width: 300px;
    height: 600px;
    margin: 100px auto;
    transform-style: preserve-3d;
    transform: rotateX(20deg) rotateY(0deg) rotateZ(50deg);
    animation: rot 10s infinite linear;

    .heart-line {
      position: absolute;
      left: 0;
      top: 0;
      width: 300px;
      height: 600px;
      border-radius: 50% 50% 0 /40% 50% 0;
    }
  }

  #cube {
    position: relative;
    left: 0;
    top: 0;
    width: 200px;
    height: 200px;
    transform-origin: 50% 50% -100px;
    transform-style: preserve-3d;
    transition: transform 2s;
    transform: translateX(60px) translateY(300px) translateZ(60px);

    & > div {
      width: 100%;
      height: 100%;
      border: 1px solid #000;
      position: absolute;
      background: rgba(51, 51, 51, 0.3);
      transition: transform 0.3s ease-in;

      img {
        width: 200px;
        height: 200px;
      }
    }

    .out-front {
      transform: translateZ(100px);
    }

    .out-back {
      transform: translateZ(-100px) rotateY(180deg);
    }

    .out-left {
      transform: translateX(-100px) rotateY(-90deg);
    }

    .out-right {
      transform: translateX(100px) rotateY(90deg);
    }

    .out-top {
      transform: translateY(-100px) rotateX(90deg);
    }

    .out-bottom {
      transform: translateY(100px) rotateX(-90deg);
    }
  }

  @keyframes rot {
    0% {
      transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg);
    }
    100% {
      transform: rotateY(720deg) rotateX(360deg) rotate(360deg);
    }
  }
}
</style>
