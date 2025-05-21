<template>
  <canvas ref="canvas" style="background: #111"></canvas>
</template>

<script setup>
import { ref, onMounted } from "vue";

const canvas = ref(null);

onMounted(() => {
  const context = canvas.value.getContext("2d");
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.value.width = W;
  canvas.value.height = H;

  const fontSize = 16;
  const columns = Math.floor(W / fontSize);
  const drops = Array(columns).fill(0);
  const str = "JavaScript function(){}";

  function draw() {
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, W, H);
    context.font = `700 ${fontSize}px 微软雅黑`;
    context.fillStyle = "#00cc33";

    for (let i = 0; i < columns; i++) {
      const index = Math.floor(Math.random() * str.length);
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      context.fillText(str[index], x, y);

      if (y >= canvas.value.height && Math.random() > 0.99) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 20);
});
</script>

<style scoped></style>
