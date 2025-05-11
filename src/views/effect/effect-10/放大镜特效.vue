<template>
  <div class="frame" @mousemove="handleMouseMove">
    <img :src="backgroundImage" width="100%" />
    <div
      class="circle"
      :style="{
        left: circlePosition.x + 'px',
        top: circlePosition.y + 'px',
        opacity: isHovered ? 1 : 0,
      }"
    >
      <img :src="magnifiedImage" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import backgroundImage from "/@/assets/beauty/1/1-7.jpg";
import magnifiedImage from "/@/assets/beauty/1/1-7.jpg";

const circlePosition = ref({ x: 0, y: 0 });
const isHovered = ref(false);

const handleMouseMove = e => {
  const frame = e.currentTarget;
  const circle = frame.querySelector(".circle");

  const x = e.clientX - frame.getBoundingClientRect().left;
  const y = e.clientY - frame.getBoundingClientRect().top;

  // Calculate circle position
  let moveX = x - circle.offsetWidth / 2;
  let moveY = y - circle.offsetHeight / 2;

  // Constrain circle within the frame
  if (moveX < 0) moveX = 0;
  if (moveX > frame.offsetWidth - circle.offsetWidth)
    moveX = frame.offsetWidth - circle.offsetWidth;
  if (moveY < 0) moveY = 0;
  if (moveY > frame.offsetHeight - circle.offsetHeight)
    moveY = frame.offsetHeight - circle.offsetHeight;

  circlePosition.value = { x: moveX, y: moveY };

  // Calculate magnified image position
  const picture = circle.querySelector("img");
  const moveLeft =
    ((moveX + circle.offsetWidth / 2) / frame.offsetWidth) *
      picture.offsetWidth -
    circle.offsetWidth / 2;
  const moveTop =
    ((moveY + circle.offsetHeight / 2) / frame.offsetHeight) *
      picture.offsetHeight -
    circle.offsetHeight / 2;

  picture.style.left = `-${moveLeft}px`;
  picture.style.top = `-${moveTop}px`;
  isHovered.value = true;
};
</script>

<style lang="scss" scoped>
.frame {
  width: 800px;
  min-height: 200px;
  position: relative;
}

.circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  border: 5px solid rgb(0, 0, 0);
  box-shadow: 0 0 5px rgb(0, 0, 0);
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.frame:hover .circle {
  opacity: 1;
}

.circle img {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
