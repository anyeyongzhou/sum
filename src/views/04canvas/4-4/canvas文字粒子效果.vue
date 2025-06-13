<template>
  <div class="canvas-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let ctx = null;
let pix = null;
let cx = 0;
let cy = 0;

class Particle {
  constructor() {
    this.arr = [];
  }

  init() {
    for (let i = 0; i < pix.data.length / 4; i++) {
      this.arr.push({
        x: i % 180,
        y: Math.floor(i / 180),
        alpha: pix.data[i * 4 + 3],
        mx: Math.random() * canvas.value.width,
        my: Math.random() * canvas.value.height,
        radius: Math.random() * 3,
        speed: Math.random() * 40 + 40,
        color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        }, ${pix.data[i * 4 + 3] / 255})`,
      });
    }
  }

  draw() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
    this.arr.forEach(item => {
      ctx.beginPath();
      ctx.fillStyle = item.color;
      ctx.arc(item.mx, item.my, item.radius, 0, Math.PI * 2, false);
      ctx.fill();
    });
  }

  update() {
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i].mx +=
        (this.arr[i].x * 5 + cx - this.arr[i].mx) / this.arr[i].speed;
      this.arr[i].my +=
        (this.arr[i].y * 5 + cy - this.arr[i].my) / this.arr[i].speed;
    }
  }
}

const resizeCanvas = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    cx = canvas.value.width / 2 - 900 / 2;
    cy = canvas.value.height / 2 - 175 / 2;
  }
};

onMounted(() => {
  ctx = canvas.value.getContext("2d");
  ctx.font = "30px fangsong";
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillText("暗夜永昼。", 0, 30, 180);
  pix = ctx.getImageData(0, 0, 180, 35);

  resizeCanvas();
  const particle = new Particle();
  particle.init();

  window.addEventListener("resize", () => {
    resizeCanvas();
    particle.arr = [];
    particle.init();
  });

  const animationLoop = () => {
    particle.draw();
    particle.update();
    requestAnimationFrame(animationLoop);
  };
  requestAnimationFrame(animationLoop);
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
