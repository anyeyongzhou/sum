<template>
  <div class="canvas-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let ctx = null;
let arr = [];
const colours = ["#ffff00", "#66ffff", "#3399ff", "#99ff00", "#ff9900"];

const resizeCanvas = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
  }
};

const star = (x, y, r, l, rot) => {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(
      Math.cos(((18 + i * 72 - rot) * Math.PI) / 180) * r + x,
      -Math.sin(((18 + i * 72 - rot) * Math.PI) / 180) * r + y
    );
    ctx.lineTo(
      Math.cos(((54 + i * 72 - rot) * Math.PI) / 180) * l + x,
      -Math.sin(((54 + i * 72 - rot) * Math.PI) / 180) * l + y
    );
  }
  ctx.closePath();
};

const draw = () => {
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i];
    star(temp.x, temp.y, temp.r, temp.r * 3, temp.rot);
    ctx.fillStyle = temp.color;
    ctx.strokeStyle = temp.color;
    ctx.lineWidth = 0.1;
    ctx.lineJoin = "round";
    ctx.fill();
    ctx.stroke();
  }
};

const update = () => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].x += arr[i].dx;
    arr[i].y += arr[i].dy;
    arr[i].rot += arr[i].td;
    arr[i].r -= 0.015;
    if (arr[i].r < 0) {
      arr.splice(i, 1);
    }
  }
};

onMounted(() => {
  ctx = canvas.value.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  canvas.value.addEventListener("mousemove", e => {
    arr.push({
      x: e.clientX,
      y: e.clientY,
      r: Math.random() * 0.5 + 1.5,
      td: Math.random() * 4 - 2,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 1 + 1,
      rot: Math.random() * 90 + 90,
      color: colours[Math.floor(Math.random() * colours.length)],
    });
  });

  const animationLoop = () => {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    draw();
    update();
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
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
