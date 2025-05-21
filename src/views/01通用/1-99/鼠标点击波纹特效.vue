<template>
  <div class="card" @click="handleClick">
    <el-image
      :src="img1"
      lazy
      loading="lazy"
      fit="fill"
      style="width: 100%; height: 100%"
    ></el-image>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <transition-group name="circle" tag="div" class="circle-container">
      <div
        v-for="circle in circles"
        :key="circle.id"
        class="circle"
        :style="{ left: circle.x + 'px', top: circle.y + 'px' }"
      ></div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from "vue";
import img1 from "/@/assets/beauty/1/1-1.jpg";

const title = "暗夜永昼";
const description =
  "生活下去，错误下去，堕落下去，为胜利而欢呼，从生命中重新创造生命！";

const circles = ref([]);

const handleClick = e => {
  const card = e.target.closest(".card");
  const x = e.clientX - card.getBoundingClientRect().left;
  const y = e.clientY - card.getBoundingClientRect().top;

  const newCircle = {
    id: Date.now(),
    x,
    y,
  };

  circles.value.push(newCircle);

  setTimeout(() => {
    circles.value = circles.value.filter(circle => circle.id !== newCircle.id);
  }, 1000);
};
</script>

<style lang="scss" scoped>
.card {
  width: 600px;
  height: 900px;
  box-shadow: 1px 1px 5px #555;
  cursor: pointer;
  background-color: rgb(243, 243, 243);
  position: relative;
  overflow: hidden;

  h3,
  p {
    padding: 5px;
    text-align: center;
    font-family: "fangsong";
    font-weight: bold;
    user-select: none;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  .circle-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .circle {
    position: absolute;
    transform: translate(-50%, -50%);
    background-color: rgb(255, 254, 254);
    border-radius: 50%;
    width: 0;
    height: 0;
    opacity: 1;
    animation: big 1s forwards;
  }
}

@keyframes big {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 400px;
    height: 400px;
    opacity: 0;
  }
}
</style>
