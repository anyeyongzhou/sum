<template>
  <div class="container">
    <div class="big-ball"></div>
    <div
      v-for="(ball, index) in balls"
      :key="index"
      class="small-ball"
      @mouseenter="highlightBall(index)"
      @mouseleave="resumeRotation"
      @click="handleBallClick(index)"
      :class="{ active: activeBall === index }"
      :style="{
        ...getBallStyle(index),
        backgroundImage: `url(${ball.image})`,
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";
import img5 from "/@/assets/beauty/1/1-5.jpg";
import img6 from "/@/assets/beauty/1/1-1.jpg";
import img7 from "/@/assets/beauty/1/1-1.jpg";
import img8 from "/@/assets/beauty/1/1-1.jpg";
import img9 from "/@/assets/beauty/1/1-1.jpg";
import img10 from "/@/assets/beauty/1/1-1.jpg";
import img11 from "/@/assets/beauty/1/1-1.jpg";
import img12 from "/@/assets/beauty/1/1-1.jpg";
import img13 from "/@/assets/beauty/1/1-1.jpg";

// 图片数组
const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img1, // 重复的图片
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
];

// 示例图片数组，替换为你的实际图片路径
const balls = Array.from({ length: 13 }, (_, index) => ({
  name: `小球 ${index + 1}`,
  image: images[index], // 替换为实际图片路径
}));

const angleIncrement = 30; // 每次旋转的角度
const currentAngle = ref(0); // 当前角度
let rotationInterval = null;
const activeBall = ref(-1); // 当前高亮的小球

const getBallStyle = index => {
  const angle = currentAngle.value + index * (360 / balls.length); // 计算每个小球的角度
  const radians = (angle * Math.PI) / 180;

  // 椭圆路径参数
  const a = 300; // 水平半径
  const b = 200; // 垂直半径

  const x = a * Math.cos(radians); // 椭圆的 X 坐标
  const y = b * Math.sin(radians); // 椭圆的 Y 坐标

  return {
    transform: `translate(${x}px, ${y}px)`, // 使用椭圆路径计算位置
  };
};

const startRotation = () => {
  if (rotationInterval) return;
  rotationInterval = setInterval(() => {
    currentAngle.value = (currentAngle.value + angleIncrement) % 360; // 更新当前角度
  }, 2000); // 每2秒更新一次
};

const highlightBall = index => {
  clearInterval(rotationInterval); // 停止旋转
  rotationInterval = null; // 清除定时器
  activeBall.value = index; // 设置高亮的小球
};

const resumeRotation = () => {
  startRotation(); // 恢复旋转
  activeBall.value = -1; // 清除高亮小球
};

// 点击小球时处理函数
const handleBallClick = index => {
  console.log(`点击了：${balls[index].name}`); // 输出小球的名字
};

onMounted(() => {
  startRotation();
});

onBeforeUnmount(() => {
  clearInterval(rotationInterval); // 清除定时器
});
</script>

<style>
.container {
  position: relative;
  width: 30%; /* 容器的宽度 */
  height: 600px; /* 容器的高度 */
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px; /* 增加透视效果 */
}

.big-ball {
  width: 50px;
  height: 50px;
  background-color: #3498db;
  border-radius: 50%;
  position: absolute;
}

.small-ball {
  width: 50px; /* 设置小球的宽度 */
  height: 50px; /* 设置小球的高度 */
  border-radius: 50%; /* 圆形 */
  position: absolute;
  transition: transform 0.5s; /* 平滑过渡效果 */
  background-size: cover; /* 确保图片覆盖整个小球 */
  background-position: center; /* 图片居中 */
}

.active {
  border: 2px solid #f1c40f; /* 高亮边框颜色 */
}
</style>
