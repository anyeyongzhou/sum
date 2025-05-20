<template>
  <div class="pic-list" ref="containerRef">
    <ul>
      <li v-for="(img, i) in imgList" :key="i" :style="liStyles[i]">
        <img :src="img" />
        <h3>霍思燕旅游杂志写真</h3>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, onBeforeUnmount } from "vue";

const containerRef = ref(null);
const margin = 10;
const imgCount = 15;
// 1. 批量导入图片
const images = import.meta.glob("./images/*.jpg", {
  eager: true,
  import: "default",
});
const imgList = Array.from(
  { length: imgCount },
  (_, i) => images[`./images/${i + 1}.jpg`]
);

const liStyles = reactive([]);

function setPositions() {
  const container = containerRef.value;
  if (!container) return;
  const ul = container.querySelector("ul");
  const liNodes = ul.children;
  const li_W = 210 + margin;
  const containerWidth = container.clientWidth;
  const columns = Math.floor(containerWidth / li_W);
  const h = Array(columns).fill(0);
  for (let i = 0; i < liNodes.length; i++) {
    const li_H = liNodes[i].offsetHeight;
    if (i < columns) {
      liStyles[i] = {
        top: "0px",
        left: li_W * i + "px",
        position: "absolute",
        transition: "all 1s ease",
        width: "210px",
        padding: "10px",
      };
      h[i] = li_H;
    } else {
      const min_H = Math.min(...h);
      const minKey = h.indexOf(min_H);
      liStyles[i] = {
        top: min_H + margin + "px",
        left: minKey * li_W + "px",
        position: "absolute",
        transition: "all 1s ease",
        width: "210px",
        padding: "10px",
      };
      h[minKey] += li_H + margin;
    }
  }
  ul.style.height = Math.max(...h) + "px";
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
.pic-list {
  width: 1200px !important;
  margin: 0 auto;
  position: relative;
  ul {
    position: relative;
    min-height: 400px;
  }
  li {
    background: #fff;
    box-shadow: 0px 0px 5px #666;
    border-radius: 4px;
    list-style: none;
    position: absolute;
    transition: all 1s ease;
    width: 210px;
    padding: 10px;
    img {
      width: 100%;
      display: block;
      border-radius: 4px;
    }
    h3 {
      font-size: 14px;
      color: #666;
      font-weight: 100;
      font-family: 微软雅黑;
      text-align: center;
      height: 35px;
      line-height: 35px;
      margin: 0;
    }
  }
}
</style>
