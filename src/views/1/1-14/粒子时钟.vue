<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Title
          :orderNum="1"
          context="粒子时钟"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <canvas ref="canvasRef"></canvas>
      </template>
      <template v-else>
        <div class="code">
          <pre><code>{{ indexFile }}</code></pre>
        </div>
      </template>
    </div>
    <!-- <div class="tip" v-marked:hl="markdownContent"></div> -->
    <div class="button">
      <el-button type="primary" @click="handleClick">{{
        buttonContent
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const flag = ref(true);
const buttonContent = ref("查看代码");
const indexFile = ref("");

const handleClick = async () => {
  flag.value = !flag.value;
  buttonContent.value = flag.value ? "查看代码" : "返回";

  if (!flag.value) {
    const filePath = `./${route.meta.title}.vue?raw`;
    try {
      const module = await import(filePath);
      indexFile.value = module.default;
    } catch (error) {
      console.error("加载文件错误:", error);
    }
  }
};

const canvasRef = ref(null);
let ctx = null;

onMounted(() => {
  ctx = canvasRef.value.getContext("2d", {
    willReadFrequently: true,
  });

  initCanvasSize();
  draw();
});

function initCanvasSize() {
  canvasRef.value.width = window.innerWidth * devicePixelRatio;
  canvasRef.value.height = window.innerHeight * devicePixelRatio;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min));
}

class Particle {
  constructor() {
    const r = Math.min(canvasRef.value.width, canvasRef.value.height) / 2;
    const cx = canvasRef.value.width / 2,
      cy = canvasRef.value.height / 2;
    const rad = (getRandom(0, 360) * Math.PI) / 180;
    this.x = cx + r * Math.cos(rad);
    this.y = cy + r * Math.sin(rad);
    this.size = getRandom(2 * devicePixelRatio, 7 * devicePixelRatio);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "#5445544d";
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  moveTo(tx, ty) {
    const duration = 500;
    const sx = this.x;
    const sy = this.y;
    const xSpeed = (tx - sx) / duration;
    const ySpeed = (ty - sy) / duration;
    const startTime = Date.now();
    const _move = () => {
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
      requestAnimationFrame(_move);
    };

    _move();
  }
}

const particles = [];

function clear() {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
}

let text = null;
let textWidth = null;

function draw() {
  clear();
  update();
  particles.forEach(p => p.draw());
  requestAnimationFrame(draw);
}

function getText() {
  return new Date().toTimeString().substring(0, 8);
}

function update() {
  const newText = getText();
  if (newText === text) {
    return;
  }
  clear();
  text = newText;
  //画文本
  const { width, height } = canvasRef.value;
  ctx.fillStyle = "#000";
  ctx.textBaseline = "middle";
  ctx.font = `${140 * devicePixelRatio}px 'DS-Digital', sans-serif`;
  if (!textWidth) {
    textWidth = ctx.measureText(text).width;
  }
  ctx.fillText(text, (width - textWidth) / 2, height / 2);
  const points = getPoints();
  clear();
  for (let i = 0; i < points.length; i++) {
    let p = particles[i];
    if (!p) {
      p = new Particle();
      particles.push(p);
    }
    const [x, y] = points[i];
    p.moveTo(x, y);
  }
  if (points.length < particles.length) {
    particles.splice(points.length);
  }
}

function getPoints() {
  const { width, height, data } = ctx.getImageData(
    0,
    0,
    canvasRef.value.width,
    canvasRef.value.height
  );

  const points = [];
  const gap = 3;

  for (let i = 0; i < width; i += gap) {
    for (let j = 0; j < height; j += gap) {
      const index = (i + j * width) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];
      //寻找黑色的像素点
      if (r === 0 && g === 0 && b === 0 && a === 255) {
        points.push([i, j]);
      }
    }
  }

  return points;
}
</script>

<style lang="scss" scoped>
.home {
  height: 110%;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow-y: scroll;

  .container {
    width: 100%;
    height: 100%;
    padding: 10px;

    canvas {
      background: radial-gradient(#fff, #8c738c);
      display: block;
      width: 500px;
      height: 250px;
    }

    .code {
      padding: 20px;
      border: 1px solid gray;
      font-size: 20px;
    }
  }

  .tip {
    width: 30%;
    min-height: 100px;
    max-height: 600px;
    position: fixed;
    right: 50px;
    top: 200px;
    overflow-y: scroll;
    padding: 10px;
    background-color: #e0e0e0;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }

  .button {
    position: fixed;
    right: 50px;
    top: 130px;
  }
}
</style>
