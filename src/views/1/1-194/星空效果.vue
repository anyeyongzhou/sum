<template>
  <div class="star-sky">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvasRef = ref(null);
let animationFrameId = null;

// 绘制星星函数
const drawStar = (ctx, r, R, x, y, rotate) => {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate((rotate * Math.PI) / 180);

  for (let i = 0; i < 5; i++) {
    ctx.lineTo(
      Math.cos(((18 + i * 72) / 180) * Math.PI) * R + 0,
      -Math.sin(((18 + i * 72) / 180) * Math.PI) * R + 0
    );
    ctx.lineTo(
      Math.cos(((54 + i * 72) / 180) * Math.PI) * r + 0,
      -Math.sin(((54 + i * 72) / 180) * Math.PI) * r + 0
    );
  }

  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 10;
  ctx.strokeStyle = "white";
  ctx.shadowColor = "white";
  ctx.stroke();
  ctx.restore();
};

// 绘制月亮函数
const drawMoon = (ctx, x, y, radius) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "white";
  ctx.stroke();
};

// 初始化画布
const initCanvas = () => {
  const canvas = canvasRef.value;
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  // 创建渐变背景
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0.0, "black");
  gradient.addColorStop(0.2, "black");
  gradient.addColorStop(1.0, "rgb(19,37,86)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 绘制星星
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.7;
    const size = Math.random() * 2.5 + 2.5;
    const rotate = Math.random() * 72;
    drawStar(ctx, size / 2, size, x, y, rotate);
  }

  // 绘制月亮
  drawMoon(ctx, width * 0.8, 100, 70);
};

// 监听窗口大小变化
const handleResize = () => {
  initCanvas();
};

onMounted(() => {
  initCanvas();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style lang="scss" scoped>
.star-sky {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  canvas {
    display: block;
  }
}
</style>
