<template>
  <main>
    <el-image
      :src="img1"
      lazy
      loading="lazy"
      fit="fill"
      style="width: 100%; height: 100%"
    ></el-image>
    <div class="cover">
      <div class="line" style="transform: skew(45deg)"></div>
      <div class="line" style="transform: skew(-45deg)"></div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import img1 from "/@/assets/beauty/1/1-1.jpg";

const scale = ref(20);

const animateCover = () => {
  const interval = setInterval(() => {
    scale.value -= 0.05;
    if (scale.value <= 1) {
      clearInterval(interval);
    }
  }, 20);
};

onMounted(animateCover);
</script>

<style lang="scss" scoped>
main {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover; // 确保图片填充整个容器
}

.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  transform: scale(v-bind(scale));
  mix-blend-mode: multiply;
  display: flex;
  justify-content: center;
  align-items: center;
}

.line {
  position: absolute;
  width: 80px;
  height: 300px;
  background-color: #fff;
  transform-origin: center;
}
</style>
