<template>
  <div class="cube-loader-container">
    <div
      v-for="(box, index) in boxes"
      :key="index"
      class="box"
      :style="{
        transform: box.transform,
        animation: box.animation,
      }"
    >
      <div
        v-for="(face, faceIndex) in faces"
        :key="faceIndex"
        :style="face.style"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const faces = ref([
  { style: { backgroundColor: "#5c8df6", transform: "translateZ(50px)" } },
  {
    style: {
      backgroundColor: "#145af2",
      transform: "rotateY(90deg) translateZ(50px)",
    },
  },
  {
    style: {
      backgroundColor: "#447cf5",
      transform: "rotateX(-90deg) translateZ(50px)",
    },
  },
  {
    style: {
      backgroundColor: "#dbe3f4",
      transform: "translateZ(-200px) scale(1.2)",
    },
  },
]);

const boxes = ref([
  { transform: "translate(100%, 0%)", animation: "box1 1s linear infinite" },
  { transform: "translate(0, 100%)", animation: "box2 1s linear infinite" },
  { transform: "translate(100%, 100%)", animation: "box3 1s linear infinite" },
  { transform: "translate(200%, 0%)", animation: "box4 1s linear infinite" },
]);
</script>

<style lang="scss" scoped>
.cube-loader-container {
  width: 300px !important;
  height: 200px;
  margin: 100px auto;
  position: relative;
  transform: rotateX(60deg) rotateZ(45deg);
  transform-style: preserve-3d;
}

.box {
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  position: absolute;
  top: 0;
  left: 0;

  & > div {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>

<style lang="scss">
/* 全局动画定义 */
@keyframes box1 {
  0%,
  50% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(200%, 0);
  }
}
@keyframes box2 {
  0% {
    transform: translate(0, 100%);
  }
  50% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}
@keyframes box3 {
  0%,
  50% {
    transform: translate(100%, 100%);
  }
  100% {
    transform: translate(0, 100%);
  }
}
@keyframes box4 {
  0% {
    transform: translate(200%, 0);
  }
  50% {
    transform: translate(200%, 100%);
  }
  100% {
    transform: translate(100%, 100%);
  }
}
</style>
