<template>
  <div class="snow-container">
    <h1 class="snow-title">暗夜永昼。</h1>
    <div class="background"></div>
    <canvas ref="canvas" class="snow-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import snowImage from "/@/assets/beauty/2/2-1.jpg"; // 请确保路径正确

interface Snowflake {
  x: number;
  y: number;
  r: number;
  color: string;
}

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const snowflakes = ref<Snowflake[]>([]);
const snowImg = ref<HTMLImageElement>(new Image());
const animationFrame = ref<number>(0);
const numSnowflakes = 600;
const canvasSize = ref({ width: 0, height: 0 });

// 初始化画布
const initCanvas = () => {
  if (!canvas.value) return;

  canvasSize.value = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  canvas.value.width = canvasSize.value.width;
  canvas.value.height = canvasSize.value.height;
  ctx.value = canvas.value.getContext("2d");
};

// 创建雪花
const createSnowflakes = () => {
  snowflakes.value = Array.from({ length: numSnowflakes }, () => ({
    x: Math.random() * canvasSize.value.width,
    y: Math.random() * canvasSize.value.height,
    r: Math.random() * 5,
    color: `rgba(255,255,255,${Math.random()})`,
  }));
};

// 绘制雪花
const drawSnowflakes = () => {
  if (!ctx.value) return;

  ctx.value.clearRect(0, 0, canvasSize.value.width, canvasSize.value.height);

  snowflakes.value.forEach((flake, index) => {
    ctx.value!.beginPath();
    ctx.value!.fillStyle = flake.color;
    ctx.value!.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
    ctx.value!.fill();

    // 每30个雪花中绘制一个雪花图片
    if (index % 30 === 0 && snowImg.value.complete) {
      const size = flake.r * 10;
      ctx.value!.drawImage(snowImg.value, flake.x, flake.y, size, size);
    }
  });
};

// 更新雪花位置
const updateSnowflakes = () => {
  snowflakes.value.forEach((flake, index) => {
    flake.x += 0.1;
    flake.y += flake.r / 2;

    // 如果雪花超出底部边界，重置到顶部
    if (flake.y > canvasSize.value.height) {
      snowflakes.value[index] = {
        x: Math.random() * canvasSize.value.width,
        y: -10,
        r: Math.random() * 5,
        color: `rgba(255,255,255,${Math.random()})`,
      };
    }
  });
};

// 动画循环
const animate = () => {
  drawSnowflakes();
  updateSnowflakes();
  animationFrame.value = requestAnimationFrame(animate);
};

// 处理窗口大小变化
const handleResize = () => {
  initCanvas();
};

// 初始化
onMounted(() => {
  snowImg.value.src = snowImage;
  initCanvas();
  createSnowflakes();
  animate();
  window.addEventListener("resize", handleResize);
});

// 清理
onUnmounted(() => {
  cancelAnimationFrame(animationFrame.value);
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.snow-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .snow-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-42%, -50%);
    font-family: "fangsong";
    font-size: 6em;
    color: rgba(255, 255, 255, 0.5);
    text-shadow: 0 0 10px rgb(255, 255, 255);
    z-index: 1;
  }

  .background {
    width: 100%;
    height: 100%;
    background-image: url("./snow.png");
    background-size: cover;
  }

  .snow-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
