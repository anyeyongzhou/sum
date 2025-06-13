<template>
  <div class="canvas-container">
    <canvas
      ref="canvas"
      @mousemove="handleMouseMove"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import img1 from "/@/assets/images/back.png";

const canvas = ref(null);
const ctx = ref(null);
const isDown = ref(false);

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext("2d");
    canvas.value.width = 243;
    canvas.value.height = 528;

    const img = new Image();
    img.src = img1;
    img.onload = () => {
      ctx.value.drawImage(img, 0, 0, 243, 528);
    };
  }
});

const handleMouseMove = event => {
  if (isDown.value) {
    const rect = canvas.value.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.value.beginPath();
    ctx.value.fillStyle = "white";
    ctx.value.arc(x, y, 20, 0, Math.PI * 2);
    ctx.value.fill();
    ctx.value.closePath();
    ctx.value.globalCompositeOperation = "destination-out";
  }
};

const handleMouseDown = () => {
  isDown.value = true;
};

const handleMouseUp = () => {
  isDown.value = false;
};
</script>

<style lang="scss" scoped>
$background-color: #000;

.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  background-image: url("./img/front.png");
  background-size: cover;
}
</style>
