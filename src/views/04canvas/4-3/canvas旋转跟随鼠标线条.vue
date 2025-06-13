<template>
  <div class="canvas-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let ctx = null;
let kuan = 0;
let gao = 0;
const num = 25;
let arr = [];
const colors = [
  "#2196F3",
  "#1976D2",
  "#00BCD4",
  "#4CAF50",
  "#FF5252",
  "#E040FB",
];
let mouseX = 0;
let mouseY = 0;

const resizeCanvas = () => {
  if (canvas.value) {
    kuan = canvas.value.width = window.innerWidth;
    gao = canvas.value.height = window.innerHeight;
    mouseX = kuan / 2;
    mouseY = gao / 2;
    initialize();
  }
};

const initialize = () => {
  arr = [];
  for (let i = 0; i < num; i++) {
    arr.push({
      r: Math.random() * (5 - 3) + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 2 * Math.PI,
      distance: Math.random() * (75 - 40) + 40,
      lastMouse: { x: kuan / 2, y: gao / 2 },
    });
  }
};

const draw = last => {
  const yuan = arr[last.i];
  ctx.beginPath();
  ctx.strokeStyle = yuan.color;
  ctx.lineWidth = yuan.r;
  ctx.moveTo(last.x, last.y);
  ctx.lineTo(yuan.x, yuan.y);
  ctx.stroke();
  ctx.closePath();
};

const update = () => {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, kuan, gao);
  for (let i = 0; i < num; i++) {
    const last = { x: arr[i].x, y: arr[i].y, i: i };
    arr[i].lastMouse.x += (mouseX - arr[i].lastMouse.x) * 0.05;
    arr[i].lastMouse.y += (mouseY - arr[i].lastMouse.y) * 0.05;
    arr[i].rot += 0.1;
    arr[i].x = arr[i].lastMouse.x + Math.cos(arr[i].rot) * arr[i].distance;
    arr[i].y = arr[i].lastMouse.y + Math.sin(arr[i].rot) * arr[i].distance;
    draw(last);
  }
};

onMounted(() => {
  ctx = canvas.value.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animationLoop = () => {
    update();
    requestAnimationFrame(animationLoop);
  };
  animationLoop();
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
});
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  position: relative;
}

canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
