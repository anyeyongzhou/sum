<template>
  <div class="aurora-container">
    <svg width="500" height="200">
      <text x="30" y="120" class="txt">北极光之夜。</text>
    </svg>
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Drop {
  pagex: number;
  pagey: number;
  dx: number;
  dy: number;
  r: number;
  color: string;
}

interface Water {
  add: number;
  x: number;
  y: number;
  len: number;
  speed: number;
  color: string;
  dropNum: number;
}

const canvas = ref<HTMLCanvasElement | null>(null);
const rain = ref<CanvasRenderingContext2D | null>(null);
const drop = ref<Drop[]>([]);
const water = ref<Water[]>([]);
const waterNum = 100;
const gravity = 1;
const mouseX = ref(-36);
const mouseY = ref(-36);
const direction = ref(0);
const mouseDelay = ref(0);
const animationFrame = ref<number>();

// 初始化画布大小
const resizeCanvas = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
  }
};

// 创建雨滴
const creatWater = () => {
  water.value.push({
    add: 1,
    x:
      Math.random() * 3 * (canvas.value?.width || 0) -
      (canvas.value?.width || 0),
    y: Math.random() * 500 - 500,
    len: Math.random() * 20 + 50,
    speed: Math.random() * 10 + 35,
    color: `rgb(255,255,255,${Math.random() * 0.5})`,
    dropNum: Math.random() * 6 + 6,
  });
};

// 初始化雨
const chushi = () => {
  for (let i = 0; i < waterNum; i++) {
    creatWater();
  }
};

// 创建散开水滴
const creatDrop = (x: number, y: number, dropNum: number) => {
  for (let j = 0; j < dropNum; j++) {
    drop.value.push({
      pagex: x,
      pagey: y,
      dx: Math.random() * 12 - 6,
      dy: Math.random() * 10 - 20,
      r: Math.random() + 2,
      color: `rgb(255,255,255,${Math.random() * 0.5 + 0.5})`,
    });
  }
};

// 绘制雨
const drawWater = () => {
  if (!rain.value) return;

  for (let i = 0; i < water.value.length; i++) {
    const temp = water.value[i];
    rain.value.strokeStyle = temp.color;
    rain.value.beginPath();
    rain.value.moveTo(temp.x, temp.y);
    rain.value.lineTo(temp.x + temp.len * direction.value, temp.y + temp.len);
    rain.value.lineWidth = 3;
    rain.value.stroke();
  }
};

// 绘制雨滴
const drawDrop = () => {
  if (!rain.value) return;

  for (let i = 0; i < drop.value.length; i++) {
    const temp = drop.value[i];
    rain.value.lineWidth = 2;
    rain.value.strokeStyle = temp.color;
    rain.value.beginPath();
    rain.value.arc(
      temp.pagex,
      temp.pagey,
      temp.r,
      Math.PI,
      Math.random() * 2 * Math.PI
    );
    rain.value.stroke();
    rain.value.closePath();
  }
};

// 更新雨状态
const updateWater = () => {
  for (let i = 0; i < water.value.length; i++) {
    if (
      Math.abs(mouseX.value - water.value[i].x) < 35 &&
      Math.abs(mouseY.value - water.value[i].y - water.value[i].len) < 35
    ) {
      creatDrop(
        water.value[i].x,
        water.value[i].y + water.value[i].len,
        water.value[i].dropNum
      );
      water.value.splice(i, 1);
      creatWater();
    }

    if (
      water.value[i].y + water.value[i].len >= (canvas.value?.height || 0) &&
      water.value[i].add == 1
    ) {
      water.value[i].add = 0;
      creatDrop(
        water.value[i].x,
        canvas.value?.height || 0,
        water.value[i].dropNum
      );
    }

    if (water.value[i].y > (canvas.value?.height || 0)) {
      water.value.splice(i, 1);
      creatWater();
    }

    direction.value += (mouseDelay.value - direction.value) * 0.0002;
    water.value[i].x += water.value[i].speed * direction.value;
    water.value[i].y += water.value[i].speed;
  }
};

// 更新雨滴状态
const updateDrop = () => {
  for (let i = 0; i < drop.value.length; i++) {
    drop.value[i].dy += gravity;
    drop.value[i].pagex += drop.value[i].dx + direction.value * 10;
    drop.value[i].pagey += drop.value[i].dy;

    if (drop.value[i].pagey > (canvas.value?.height || 0)) {
      drop.value.splice(i, 1);
    }
  }
};

// 动画循环
const animate = () => {
  if (!rain.value || !canvas.value) return;

  rain.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  updateWater();
  updateDrop();
  drawWater();
  drawDrop();
  animationFrame.value = requestAnimationFrame(animate);
};

// 鼠标移动事件
const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
  mouseDelay.value =
    (e.clientX - (canvas.value?.offsetWidth || 0) / 2) /
    ((canvas.value?.offsetWidth || 0) / 2);
};

// 鼠标离开事件
const handleMouseOut = () => {
  mouseY.value = (canvas.value?.height || 0) + 40;
};

onMounted(() => {
  if (canvas.value) {
    rain.value = canvas.value.getContext("2d");
    resizeCanvas();
    chushi();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
  }
});

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
  window.removeEventListener("resize", resizeCanvas);
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseout", handleMouseOut);
});
</script>

<style lang="scss" scoped>
.aurora-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  #canvas {
    position: fixed;
    background-color: rgb(0, 0, 0);
    z-index: -10;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .txt {
    font-family: "fangsong";
    font-weight: 900;
    font-size: 80px;
    letter-spacing: 3px;
    fill: transparent;
    stroke: rgb(30, 134, 252);
    stroke-width: 1.5px;
    stroke-dasharray: 625;
    stroke-dashoffset: 625;
    animation: draw 2s linear infinite;
    text-shadow: 0 0 10px rgb(30, 134, 252), 0 0 20px rgb(30, 134, 252),
      0 0 40px rgb(30, 134, 252), 0 0 60px rgb(30, 134, 252);
  }

  @keyframes draw {
    0%,
    100% {
      stroke-dasharray: 625;
      stroke-dashoffset: 625;
    }
    45%,
    55% {
      stroke-dasharray: 652;
      stroke-dashoffset: 0;
    }
  }
}
</style>
