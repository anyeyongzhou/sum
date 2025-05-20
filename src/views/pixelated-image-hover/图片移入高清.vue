<template>
  <div class="pixelated-image-hover-root">
    <div v-for="(item, idx) in imagePairs" :key="idx" class="pixel">
      <img :src="item.highRes" alt="高清图" />
      <img :src="item.lowRes" alt="像素图" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// 批量导入高清和低清图片
const highResImages = import.meta.glob("./img/*_400x400.jpg", {
  eager: true,
  import: "default",
});
const lowResImages = import.meta.glob("./img/*_20x20.jpg", {
  eager: true,
  import: "default",
});

// 生成图片对
const imagePairs = computed(() => {
  // 提取编号，按编号配对
  const pairs = [];
  const highKeys = Object.keys(highResImages);
  highKeys.forEach(hk => {
    const base = hk.match(/img(\d+)_400x400\.jpg$/);
    if (base) {
      const idx = base[1];
      const lowKey = `./img/img${idx}_20x20.jpg`;
      if (lowResImages[lowKey]) {
        pairs.push({
          highRes: highResImages[hk],
          lowRes: lowResImages[lowKey],
        });
      }
    }
  });
  return pairs;
});
</script>

<style lang="scss" scoped>
.pixelated-image-hover-root {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
}
.pixel {
  width: 400px;
  height: 400px;
  margin-right: 70px;
  position: relative;
  &:last-child {
    margin-right: 0;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    object-fit: cover;
    display: block;
  }
  img:last-child {
    transition: opacity 2s;
  }
  &:hover img:last-child {
    opacity: 0;
  }
}
</style>
