<template>
  <div class="kuang">
    <div
      v-for="(bubble, index) in bubbles"
      :key="index"
      class="bubble"
      :style="bubble.style"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const bubbles = ref([]);

const createBubbles = () => {
  const bubbleStyles = [
    {
      left: "-10%",
      width: "50px",
      height: "50px",
      duration: "9s",
      delay: "0.1s",
    },
    {
      left: "15%",
      width: "20px",
      height: "20px",
      duration: "6s",
      delay: "1.5s",
    },
    {
      left: "20%",
      width: "60px",
      height: "60px",
      duration: "10s",
      delay: "0s",
    },
    {
      left: "30%",
      width: "30px",
      height: "30px",
      duration: "5.5s",
      delay: "1.5s",
    },
    {
      left: "40%",
      width: "50px",
      height: "50px",
      duration: "12s",
      delay: "0s",
    },
    { left: "50%", width: "20px", height: "20px", duration: "6s", delay: "1s" },
    { left: "60%", width: "40px", height: "40px", duration: "8s", delay: "1s" },
    {
      left: "65%",
      width: "60px",
      height: "60px",
      duration: "15s",
      delay: "0s",
    },
    {
      left: "80%",
      width: "55px",
      height: "55px",
      duration: "9s",
      delay: "0.5s",
    },
    {
      left: "100%",
      width: "40px",
      height: "40px",
      duration: "12s",
      delay: "0s",
    },
  ];

  bubbles.value = bubbleStyles.map((style, index) => ({
    id: index,
    style: {
      left: style.left,
      width: style.width,
      height: style.height,
      animationDuration: style.duration,
      animationDelay: style.delay,
    },
  }));
};

onMounted(createBubbles);
</script>

<style lang="scss" scoped>
.kuang {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    180deg,
    rgb(78, 168, 241),
    rgb(37, 91, 241)
  );
}

.bubble {
  position: absolute;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: inset 0 0 8px #fff;
  animation: flutter 10s infinite;
  opacity: 0;

  &:nth-child(1) {
    left: -10%;
    width: 50px;
    height: 50px;
    animation-duration: 9s;
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    left: 15%;
    width: 20px;
    height: 20px;
    animation-duration: 6s;
    animation-delay: 1.5s;
  }
  &:nth-child(3) {
    left: 20%;
    width: 60px;
    height: 60px;
    animation-duration: 10s;
  }
  &:nth-child(4) {
    left: 30%;
    width: 30px;
    height: 30px;
    animation-duration: 5.5s;
    animation-delay: 1.5s;
  }
  &:nth-child(5) {
    left: 40%;
    width: 50px;
    height: 50px;
    animation-duration: 12s;
  }
  &:nth-child(6) {
    left: 50%;
    width: 20px;
    height: 20px;
    animation-duration: 6s;
    animation-delay: 1s;
  }
  &:nth-child(7) {
    left: 60%;
    width: 40px;
    height: 40px;
    animation-duration: 8s;
    animation-delay: 1s;
  }
  &:nth-child(8) {
    left: 65%;
    width: 60px;
    height: 60px;
    animation-duration: 15s;
  }
  &:nth-child(9) {
    left: 80%;
    width: 55px;
    height: 55px;
    animation-duration: 9s;
    animation-delay: 0.5s;
  }
  &:nth-child(10) {
    left: 100%;
    width: 40px;
    height: 40px;
    animation-duration: 12s;
  }
}

@keyframes flutter {
  0% {
    transform: translateX(0);
    bottom: -100px;
    opacity: 1;
  }
  50% {
    transform: translateX(100px);
    opacity: 0.5;
  }
  100% {
    transform: translateX(0px);
    bottom: 100%;
    opacity: 0;
  }
}
</style>
