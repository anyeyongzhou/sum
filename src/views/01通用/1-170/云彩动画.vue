<template>
  <div class="sky">
    <div class="clouds_one"></div>
    <div class="clouds_two"></div>
    <div class="clouds_three"></div>
  </div>
</template>

<script setup></script>

<style scoped>
.sky {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #87ceeb;
  overflow: hidden;
}

.clouds_one,
.clouds_two,
.clouds_three {
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: move 20s linear infinite;
}

.clouds_one {
  width: 200px;
  height: 100px;
  top: 10%;
  left: -20%;
  animation-duration: 25s;
}

.clouds_two {
  width: 250px;
  height: 120px;
  top: 20%;
  left: -30%;
  animation-duration: 20s;
}

.clouds_three {
  width: 300px;
  height: 150px;
  top: 30%;
  left: -40%;
  animation-duration: 15s;
}

@keyframes move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100vw);
  }
}
</style>
