<template>
  <div class="particle-container" ref="container" @click="regenerateParticles">
    <h1 class="title">暗夜永昼</h1>
    <div
      v-for="(particle, index) in particles"
      :key="index"
      class="particle"
      :style="{
        '--color': particle.color,
        left: `${particle.x}px`,
        top: `${particle.y}px`,
      }"
      @mouseenter="activateParticle(index)"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const container = ref(null);
const particles = ref([]);

const colors = [
  "#BBFF00",
  "#FF3333",
  "#FFFF77",
  "#0044BB",
  "#FF77FF",
  "#99FFFF",
  "#DDDDDD",
  "#FF44AA",
];

const generateParticles = () => {
  if (!container.value) return;

  const containerWidth = container.value.offsetWidth;
  const containerHeight = container.value.offsetHeight;

  const particleSize = 20;
  const cols = Math.floor(containerWidth / particleSize);
  const rows = Math.floor(containerHeight / particleSize);
  const totalParticles = cols * rows;

  particles.value = Array.from({ length: totalParticles }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    return {
      x: col * particleSize,
      y: row * particleSize,
      color: colors[Math.floor(Math.random() * colors.length)],
      active: false,
    };
  });
};

const activateParticle = index => {
  particles.value[index].active = true;
  setTimeout(() => {
    particles.value[index].active = false;
  }, 1000);
};

const regenerateParticles = () => {
  generateParticles();
};

onMounted(() => {
  generateParticles();
  window.addEventListener("resize", generateParticles);
});
</script>

<style scoped>
.particle-container {
  position: relative;
  width: 90%;
  height: 90%;
  background-color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: flex-start;
  cursor: pointer;
  overflow: hidden;
}

.title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: "fangsong";
  font-size: 80px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 10px;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 20px;
  height: 20px;
}

.particle::before {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  right: 1px;
  background-color: rgba(65, 64, 64, 0.5);
  border-radius: 50%;
  transition: all 120s ease-out;
}

.particle:hover::before {
  background-color: var(--color);
  box-shadow: 0 0 2px var(--color), 0 0 4px var(--color), 0 0 6px var(--color),
    0 0 8px var(--color);
  transition: all 0s ease-out;
}
</style>
