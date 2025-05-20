<template>
  <canvas ref="canvasRef" class="rain-canvas">
    您的浏览器不支持 canvas 绘图，请您更换浏览器!!
  </canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvasRef = ref(null);
const ctx = ref(null);
const w = ref(0);
const h = ref(0);
const count = 30; // 雨滴的个数
const drops = ref([]); // 保存雨滴的数组
let animationFrameId = null;

// 雨滴类
class Drop {
  constructor() {
    this.init();
  }

  init() {
    this.x = random(0, w.value);
    this.y = 0;
    this.r = 1; // 初始半径
    this.vy = random(4, 5); // 竖直方向的加速度
    this.vr = 1; // 半径的加速度
    this.a = 1; // 初始透明度
    this.va = 0.96; // 透明度的变化系数
    this.l = random(h.value * 0.8, h.value * 0.9); // 雨滴下落的高度
  }

  draw() {
    if (this.y > this.l) {
      ctx.value.beginPath();
      ctx.value.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      ctx.value.strokeStyle = `rgba(0,255,255,${this.a})`;
      ctx.value.stroke();
    } else {
      ctx.value.fillStyle = color(this.a);
      ctx.value.fillRect(this.x, this.y, 2, 10);
    }
    this.update();
  }

  update() {
    if (this.y < this.l) {
      this.y += this.vy;
    } else {
      if (this.a > 0.03) {
        this.r += this.vr;
        if (this.r > 50) {
          this.a *= this.va;
        }
      } else {
        this.init();
      }
    }
  }
}

// 生成随机数
const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

// 生成随机颜色
const color = a => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r},${g},${b},${a})`;
};

// 动画循环
const move = () => {
  ctx.value.fillStyle = "rgba(0,0,0,.1)";
  ctx.value.fillRect(0, 0, w.value, h.value);

  drops.value.forEach(drop => drop.draw());
  animationFrameId = requestAnimationFrame(move);
};

// 初始化雨滴
const setup = () => {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const drop = new Drop();
      drops.value.push(drop);
    }, i * 200);
  }
};

// 处理窗口大小变化
const handleResize = () => {
  if (canvasRef.value) {
    w.value = canvasRef.value.width = window.innerWidth;
    h.value = canvasRef.value.height = window.innerHeight;
  }
};

onMounted(() => {
  const canvas = canvasRef.value;
  ctx.value = canvas.getContext("2d");
  w.value = canvas.width = window.innerWidth;
  h.value = canvas.height = window.innerHeight;

  window.addEventListener("resize", handleResize);
  setup();
  move();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.rain-canvas {
  background: #000;
  display: block;
  width: 100% !important;
  height: 100%;
}
</style>
