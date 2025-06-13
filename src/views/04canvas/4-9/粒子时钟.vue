<template>
  <div class="particle-clock-container">
    <canvas ref="canvas" class="particle-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import DS_Digital from "/@/assets/font/DS-DIGI-1.ttf"; // 请确保字体路径正确

const canvas = ref(null);
const ctx = ref(null);
const particles = ref([]);
const currentText = ref("");
const textWidth = ref(0);
const animationFrameId = ReferenceError(0);

// 初始化画布
const initCanvas = () => {
  if (!canvas.value) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.value.width = window.innerWidth * dpr;
  canvas.value.height = window.innerHeight * dpr;

  const context = canvas.value.getContext("2d", { willReadFrequently: true });
  if (context) {
    ctx.value = context;
    ctx.value.scale(dpr, dpr);
  }
};

// 生成随机数
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// 粒子类
class Particle {
  x;
  y;
  size;

  constructor() {
    const dpr = window.devicePixelRatio || 1;
    const r = Math.min(canvas.value.width, canvas.value.height) / 2;
    const cx = canvas.value.width / 2;
    const cy = canvas.value.height / 2;
    const rad = (getRandom(0, 360) * Math.PI) / 180;
    this.x = cx + r * Math.cos(rad);
    this.y = cy + r * Math.sin(rad);
    this.size = getRandom(2 * dpr, 7 * dpr);
  }

  draw() {
    if (!ctx.value) return;

    ctx.value.beginPath();
    ctx.value.fillStyle = "#5445544d";
    ctx.value.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.value.fill();
  }

  moveTo(tx, ty) {
    const duration = 500;
    const sx = this.x;
    const sy = this.y;
    const xSpeed = (tx - sx) / duration;
    const ySpeed = (ty - sy) / duration;
    const startTime = Date.now();

    const move = () => {
      const t = Date.now() - startTime;
      const x = sx + xSpeed * t;
      const y = sy + ySpeed * t;
      this.x = x;
      this.y = y;

      if (t >= duration) {
        this.x = tx;
        this.y = ty;
        return;
      }

      requestAnimationFrame(move);
    };

    move();
  }
}

// 清空画布
const clearCanvas = () => {
  if (!ctx.value || !canvas.value) return;
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
};

// 获取当前时间文本
const getTimeText = () => {
  return new Date().toTimeString().substring(0, 8);
};

// 绘制时间文本
const drawTimeText = () => {
  if (!ctx.value || !canvas.value) return;

  const text = getTimeText();
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.value.width / dpr;
  const height = canvas.value.height / dpr;

  ctx.value.fillStyle = "#000";
  ctx.value.textBaseline = "middle";
  ctx.value.font = `140px 'DS-Digital', sans-serif`;

  if (!textWidth.value) {
    textWidth.value = ctx.value.measureText(text).width;
  }

  ctx.value.fillText(text, (width - textWidth.value) / 2, height / 2);
};

// 获取文本像素点
const getTextPixels = () => {
  if (!ctx.value || !canvas.value) return [];

  const points = [];
  const gap = 3;
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.value.width;
  const height = canvas.value.height;

  const imageData = ctx.value.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < width; i += gap) {
    for (let j = 0; j < height; j += gap) {
      const index = (i + j * width) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];

      // 寻找黑色的像素点
      if (r === 0 && g === 0 && b === 0 && a === 255) {
        points.push([i, j]);
      }
    }
  }

  return points;
};

// 更新粒子位置
const updateParticles = () => {
  const newText = getTimeText();
  if (newText === currentText.value) {
    return;
  }

  currentText.value = newText;
  clearCanvas();
  drawTimeText();

  const points = getTextPixels();
  clearCanvas();

  // 更新或创建粒子
  for (let i = 0; i < points.length; i++) {
    let p = particles.value[i];
    if (!p) {
      p = new Particle();
      particles.value.push(p);
    }
    const [x, y] = points[i];
    p.moveTo(x, y);
  }

  // 移除多余的粒子
  if (points.length < particles.value.length) {
    particles.value.splice(points.length);
  }
};

// 主绘制循环
const draw = () => {
  clearCanvas();
  updateParticles();
  particles.value.forEach(p => p.draw());
  animationFrameId.value = requestAnimationFrame(draw);
};

// 处理窗口大小变化
const handleResize = () => {
  initCanvas();
};

// 初始化
onMounted(() => {
  initCanvas();
  draw();
  window.addEventListener("resize", handleResize);

  // 加载字体
  const font = new FontFace("DS-Digital", `url(${DS_Digital})`);
  font.load().then(() => {
    document.fonts.add(font);
  });
});

// 清理
onUnmounted(() => {
  cancelAnimationFrame(animationFrameId.value);
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.particle-clock-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .particle-canvas {
    background: radial-gradient(#fff, #8c738c);
    display: block;
    width: 100%;
    height: 100%;
  }
}

@font-face {
  font-family: "DS-Digital";
  src: url("@/assets/font/DS-DIGI-1.ttf") format("truetype");
}
</style>
