<template>
  <div class="container">
    <div class="water"></div>
    <div class="shadow"></div>
  </div>
</template>

<script setup>
// No script needed for this animation component
</script>

<style scoped>
.container {
  position: relative;
  width: 200px !important;
  height: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(255, 255, 255);
}

.container::after {
  content: "";
  position: absolute;
  top: -20px;
  left: 50%;
  width: 40px;
  height: 20px;
  transform: translateX(-50%);
  background-color: rgb(255, 255, 255);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: 0 0 10px rgb(255, 255, 255);
}

.water {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-image: linear-gradient(0deg, rgb(9, 198, 245), rgb(44, 243, 120));
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  animation: rise 12s linear forwards;
  overflow: hidden;
}

@keyframes rise {
  0% {
    height: 50px;
  }
  100% {
    height: 80%;
    filter: hue-rotate(360deg);
  }
}

.water::after {
  content: "";
  position: absolute;
  top: -370px;
  left: -100px;
  width: 400px;
  height: 400px;
  border-radius: 40%;
  background-color: rgb(255, 255, 255);
  animation: move 5s linear infinite;
}

@keyframes move {
  100% {
    transform: rotate(360deg);
  }
}

.water::before {
  content: "";
  position: absolute;
  top: -360px;
  left: -100px;
  width: 400px;
  height: 400px;
  border-radius: 45%;
  background-color: rgba(255, 255, 255, 0.5);
  animation: move2 7s linear infinite;
}

@keyframes move2 {
  100% {
    transform: rotate(360deg);
  }
}

.shadow {
  position: absolute;
  bottom: -8px;
  left: -3%;
  width: 106%;
  background-image: linear-gradient(0deg, rgb(9, 198, 245), rgb(44, 243, 120));
  z-index: -1;
  animation: bianse 12s linear forwards;
}

@keyframes bianse {
  0% {
    height: 50px;
    filter: hue-rotate(0deg) blur(10px);
  }
  100% {
    height: 80%;
    filter: hue-rotate(360deg) blur(10px);
  }
}
</style>
