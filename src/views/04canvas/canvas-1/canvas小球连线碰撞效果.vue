<template>
  <div class="canvas-container">
    <h1>暗夜永昼</h1>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let ctx = null;
let arr = [];
const num = 60;
let xZou, yZou, temp;

const resizeCanvas = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    arr = [];
    initialize();
  }
};

const initialize = () => {
  for (let i = 0; i < num; i++) {
    arr.push({
      x: 10 + Math.random() * (canvas.value.width - 20),
      y: 10 + Math.random() * (canvas.value.height - 20),
      r: 10,
      dx: 10 * Math.random() - 5,
      dy: 10 * Math.random() - 5,
      color: "rgba(7, 156, 255,1)",
    });
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  for (let i = 0; i < num; i++) {
    const yuan = arr[i];
    ctx.beginPath();
    ctx.arc(yuan.x, yuan.y, yuan.r, 0, Math.PI * 2, false);
    ctx.fillStyle = yuan.color;
    ctx.fill();

    for (let j = i; j < num; j++) {
      if (
        Math.abs(yuan.x - arr[j].x) < 150 &&
        Math.abs(yuan.y - arr[j].y) < 150
      ) {
        ctx.beginPath();
        if (
          Math.abs(yuan.x - xZou) < 150 &&
          Math.abs(yuan.y - yZou) < 150 &&
          temp
        ) {
          ctx.moveTo(yuan.x, yuan.y);
          ctx.lineTo(xZou, yZou);
        }
        ctx.lineTo(arr[j].x, arr[j].y);
        ctx.closePath();
        const tm =
          Math.sqrt(
            Math.abs(yuan.x - arr[j].x) ** 2 + Math.abs(yuan.y - arr[j].y) ** 2
          ) / 212;
        ctx.strokeStyle = `rgba(7, 156, 255,${1 - tm})`;
        ctx.stroke();
      }
    }
  }
};

const updates = () => {
  for (let i = 0; i < num; i++) {
    if (
      Math.abs(arr[i].x - xZou) < 150 &&
      Math.abs(arr[i].y - yZou) < 150 &&
      temp
    ) {
      arr[i].x += -(arr[i].x - xZou) / (10 * Math.random() + 20);
      arr[i].y += -(arr[i].y - yZou) / (10 * Math.random() + 20);
    } else {
      arr[i].x += arr[i].dx;
      arr[i].y += arr[i].dy;
    }

    if (arr[i].x <= arr[i].r || arr[i].x >= canvas.value.width - arr[i].r) {
      arr[i].dx = -arr[i].dx;
    }
    if (arr[i].y <= arr[i].r || arr[i].y >= canvas.value.height - arr[i].r) {
      arr[i].dy = -arr[i].dy;
    }
  }
};

onMounted(() => {
  ctx = canvas.value.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  canvas.value.addEventListener("mousemove", e => {
    xZou = e.clientX;
    yZou = e.clientY;
    temp = 1;
  });
  canvas.value.addEventListener("mouseout", () => {
    temp = 0;
  });

  const animationLoop = () => {
    draw();
    updates();
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(11, 10, 46);
  position: relative;
}

h1 {
  font-family: "fangsong";
  position: absolute;
  font-size: 5em;
  color: rgb(17, 167, 226);
  transform: translateX(40px);
  text-shadow: 0 0 10px rgb(38, 17, 226), 0 0 20px rgb(38, 17, 226),
    0 0 30px rgb(38, 17, 226);
  user-select: none;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
