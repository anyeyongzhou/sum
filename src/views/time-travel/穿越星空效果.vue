<template>
  <canvas ref="canvasRef" class="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  starCount: {
    type: Number,
    default: 800,
  },
  starColor: {
    type: String,
    default: "#B200FF",
  },
  animationSpeed: {
    type: Number,
    default: 50,
  },
  frameRate: {
    type: Number,
    default: 40,
  },
});

const canvasRef = ref(null);
let ctx = null;
let animationFrameId = null;
let stars = [];

class Star {
  constructor(x, y, radius, disX, disY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.disX = disX;
    this.disY = disY;
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.disX / props.animationSpeed;
    this.y += this.disY / props.animationSpeed;

    if (
      this.x < 0 ||
      this.y < 0 ||
      this.x > canvasWidth ||
      this.y > canvasHeight
    ) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.disX = this.x - canvasWidth / 2;
      this.disY = this.y - canvasHeight / 2;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = props.starColor;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

function initCanvas() {
  const canvas = canvasRef.value;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
}

function createStars() {
  stars = [];
  for (let i = 0; i < props.starCount; i++) {
    const x = Math.random() * canvasRef.value.width;
    const y = Math.random() * canvasRef.value.height;
    const radius = Math.random() * 2;
    const disX = x - canvasRef.value.width / 2;
    const disY = y - canvasRef.value.height / 2;
    stars.push(new Star(x, y, radius, disX, disY));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  stars.forEach(star => {
    star.update(canvasRef.value.width, canvasRef.value.height);
    star.draw(ctx);
  });

  animationFrameId = setTimeout(animate, props.frameRate);
}

function handleResize() {
  initCanvas();
  createStars();
}

onMounted(() => {
  initCanvas();
  createStars();
  animate();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  if (animationFrameId) {
    clearTimeout(animationFrameId);
  }
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.canvas {
  width: 100% !important;
  height: 100%;
  background-color: #000;
}
</style>
