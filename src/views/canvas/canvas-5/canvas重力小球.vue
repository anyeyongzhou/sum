<template>
  <div class="canvas-container" @click="handleClick">
    <h1>暗夜永昼。</h1>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const canvas = ref(null);
const ctx = ref(null);
const arr = ref([]);
const num = 66;
const colour = [
  "#00BFFF",
  "#00FFFF",
  "#3CB371",
  "#FFFF00",
  "#FF8C00",
  "#7B68EE",
];

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const chushi = () => {
  arr.value = [];
  for (let i = 0; i < num; i++) {
    arr.value.push({
      x: getRandomArbitrary(15, window.innerWidth - 15),
      y: getRandomArbitrary(-window.innerHeight / 2, window.innerHeight / 2),
      r: getRandomArbitrary(5, 15),
      dx: getRandomArbitrary(-3, 3),
      dy: 0.5,
      color: colour[Math.floor(Math.random() * colour.length)],
    });
  }
};

const draw = () => {
  ctx.value.clearRect(0, 0, window.innerWidth, window.innerHeight);
  arr.value.forEach(circle => {
    ctx.value.beginPath();
    ctx.value.fillStyle = circle.color;
    ctx.value.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, false);
    ctx.value.shadowOffsetX = 0;
    ctx.value.shadowOffsetY = 0;
    ctx.value.shadowBlur = 20;
    ctx.value.shadowColor = circle.color;
    ctx.value.fill();
    ctx.value.closePath();
  });
};

const updates = () => {
  arr.value.forEach(circle => {
    if (circle.y + circle.r + circle.dy + 0.3 >= window.innerHeight) {
      circle.dy = -circle.dy;
      circle.dy *= 0.9;
      circle.dx *= 0.9;
    } else {
      circle.dy += 0.3;
    }
    if (
      circle.x + circle.r + circle.dx > window.innerWidth ||
      circle.x - circle.r <= 0
    ) {
      circle.dx = -circle.dx;
    }
    circle.x += circle.dx;
    circle.y += circle.dy;
  });
};

const resizeCanvas = () => {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  chushi();
};

onMounted(() => {
  ctx.value = canvas.value.getContext("2d");
  resizeCanvas();
  setInterval(() => {
    draw();
    updates();
  }, 10);
});

const handleClick = event => {
  const left = event.clientX;
  const top = event.clientY;
  const yuan = document.createElement("div");
  yuan.classList.add("yuan");
  yuan.style.cssText = `left: ${left}px; top: ${top}px; transform: translate(-50%, -50%);`;
  document.body.appendChild(yuan);
  setTimeout(() => {
    document.body.removeChild(yuan);
  }, 999);

  arr.value.forEach(circle => {
    if (circle.y - circle.r >= 0) {
      circle.dy = getRandomArbitrary(-10, -5);
      circle.dx = getRandomArbitrary(-3, 3);
    }
  });
};
</script>

<style lang="scss" scoped>
$background-color: rgb(5, 7, 24);
$circle-color: rgb(11, 147, 211);

* {
  padding: 0;
  margin: 0;
}

body {
  overflow: hidden;
  background-color: $background-color;
}

.canvas-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-45%, -50%);
  font-size: 8vw;
  color: transparent;
  -webkit-background-clip: text;
  background-image: url("img/star.gif");
  filter: drop-shadow(0 0 60px rgb(0, 132, 255));
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
}

.yuan {
  position: absolute;
  width: 5px;
  height: 5px;
  border: 2px solid $circle-color;
  border-radius: 50%;
  animation: big 1s linear;
  box-shadow: inset 0 0 200px $circle-color;
}

@keyframes big {
  100% {
    width: 1000px;
    height: 1000px;
    box-shadow: inset 0 0 0px $circle-color;
    border: 2px solid transparent;
  }
}
</style>
