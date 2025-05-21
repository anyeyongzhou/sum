<template>
  <div class="container" ref="containerRef">
    <img
      v-for="(src, i) in imgList"
      :key="i"
      :src="src"
      class="waterfall-img"
      :style="imgStyles[i]"
      @load="onImgLoad"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, onBeforeUnmount } from "vue";

const containerRef = ref(null);
const imgWidth = 220;
const imgCount = 41;
// 1. 批量导入图片
const images = import.meta.glob("./img/*.jpg", {
  eager: true,
  import: "default",
});
const imgList = Array.from(
  { length: imgCount + 1 },
  (_, i) => images[`./img/${i}.jpg`]
);

const imgHeights = ref([]); // 记录每张图片的高度
const imgStyles = reactive([]);
let loadedCount = 0;

function onImgLoad(e) {
  // 记录每张图片的高度
  const idx = Array.from(containerRef.value.children).indexOf(e.target);
  imgHeights.value[idx] =
    e.target.naturalHeight * (imgWidth / e.target.naturalWidth);
  loadedCount++;
  if (loadedCount === imgList.length) {
    nextTick(() => setPositions());
  }
}

function setPositions() {
  const container = containerRef.value;
  if (!container) return;
  const containerWidth = container.clientWidth;
  const columns = Math.floor(containerWidth / imgWidth);
  const spaceNumber = columns + 1;
  const leftSpace = containerWidth - columns * imgWidth;
  const space = leftSpace / spaceNumber;
  const nextTops = Array(columns).fill(0);
  for (let i = 0; i < imgList.length; i++) {
    const minTop = Math.min(...nextTops);
    const colIdx = nextTops.indexOf(minTop);
    const left = (colIdx + 1) * space + colIdx * imgWidth;
    imgStyles[i] = {
      position: "absolute",
      width: imgWidth + "px",
      top: minTop + "px",
      left: left + "px",
      transition: "0.3s",
    };
    nextTops[colIdx] += (imgHeights.value[i] || 0) + space;
  }
  container.style.height = Math.max(...nextTops) + "px";
}

function handleResize() {
  nextTick(() => setPositions());
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.container {
  width: 90% !important;
  margin: 0 auto;
  border: 2px solid;
  position: relative;
  min-height: 400px;
}
.waterfall-img {
  position: absolute;
  transition: 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  background: #fff;
}
</style>
