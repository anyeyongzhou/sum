<template>
  <canvas ref="myCanvas" width="500" height="500"></canvas>
</template>

<script setup>
import { ref, onMounted } from "vue";

const myCanvas = ref(null);

const renderTime = () => {
  const ctx = myCanvas.value.getContext("2d");
  ctx.clearRect(0, 0, 500, 500); // 清除画布

  // 定义基本颜色值
  ctx.strokeStyle = "#00ffff";
  ctx.lineWidth = 17;
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#00ffff";

  const date = new Date();
  const today = date.toDateString();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const ms = date.getMilliseconds();
  const smoothsec = s + ms / 1000;
  const smoothmin = m + smoothsec / 60;

  // 背景
  const gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 300);
  gradient.addColorStop(0, "#03303a");
  gradient.addColorStop(1, "#000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 500, 500);

  // 小时
  ctx.beginPath();
  ctx.arc(250, 250, 200, degToRad(270), degToRad(h * 30 - 90));
  ctx.stroke();

  // 分钟
  ctx.beginPath();
  ctx.arc(250, 250, 170, degToRad(270), degToRad(smoothmin * 6 - 90));
  ctx.stroke();

  // 秒
  ctx.beginPath();
  ctx.arc(250, 250, 140, degToRad(270), degToRad(smoothsec * 6 - 90));
  ctx.stroke();

  // 日期
  ctx.font = "25px Helvetica";
  ctx.fillStyle = "rgba(0, 255, 255, 1)";
  ctx.fillText(today, 175, 250);

  // 时间
  ctx.font = "25px Helvetica Bold";
  ctx.fillStyle = "rgba(0, 255, 255, 1)";
  const hour = ("0" + h).slice(-2);
  const minute = ("0" + m).slice(-2);
  const second = ("0" + s).slice(-2);
  ctx.fillText(`${hour}:${minute}:${second}:${ms}`, 175, 280);
};

const degToRad = degree => {
  return degree * (Math.PI / 180);
};

onMounted(() => {
  setInterval(renderTime, 40);
});
</script>

<style scoped>
canvas {
  /* position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -250px; */
}
</style>
