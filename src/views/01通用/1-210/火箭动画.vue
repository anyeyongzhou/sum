<template>
  <div class="rocket-container">
    <div class="spaceship" :class="{ launch: isLaunching, land: isLanding }">
      <div class="spaceshipBody">
        <div class="spaceshipTop"></div>
      </div>
      <div class="spaceshipWindows">
        <span></span>
        <span></span>
      </div>
      <div class="spaceshipBottom">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="fire" :class="{ burn: isLaunching }">
        <span></span>
        <span></span>
        <span></span>
        <div class="glow"></div>
      </div>
    </div>

    <div class="shadow" :class="{ hide: isLaunching }"></div>

    <div class="buttons">
      <button
        class="btnStart"
        :class="{ active: isStarted }"
        @click="handleStart"
        :disabled="isStarted"
      >
        <span>开始</span>
      </button>
      <button
        class="btnLaunch"
        :class="{ active: isStarted && !isLaunching && !isLanding }"
        @click="handleLaunch"
        :disabled="!isStarted || isLaunching || isLanding"
      >
        <span>发射</span>
      </button>
      <button
        class="btnLand"
        :class="{ active: isLaunching, disable: !isLaunching }"
        @click="handleLand"
        :disabled="!isLaunching"
      >
        <span>着陆</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 状态管理
const isStarted = ref(false);
const isLaunching = ref(false);
const isLanding = ref(false);

// 开始按钮处理
const handleStart = () => {
  isStarted.value = true;
};

// 发射按钮处理
const handleLaunch = () => {
  if (!isStarted.value || isLaunching.value || isLanding.value) return;

  isLaunching.value = true;
  isLanding.value = false;

  // 发射动画结束后重置状态
  setTimeout(() => {
    isLaunching.value = false;
  }, 3000);
};

// 着陆按钮处理
const handleLand = () => {
  if (!isLaunching.value) return;

  isLanding.value = true;
  isLaunching.value = false;

  // 着陆动画结束后重置状态
  setTimeout(() => {
    isLanding.value = false;
    isStarted.value = false;
  }, 3000);
};
</script>

<style scoped>
.rocket-container {
  width: 100% !important;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f1b31;
  position: relative;
}

.spaceship {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transition: all 2s ease;
  bottom: 130px;
  animation: float 2s ease infinite alternate;
}

@keyframes float {
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.spaceship.launch {
  bottom: 120%;
  animation: launch 3s ease;
}

@keyframes launch {
  0% {
    bottom: 130px;
    transform: translatex(2px);
  }
  10% {
    transform: translatex(-2px);
  }
  20% {
    transform: translatex(2px);
  }
  30% {
    transform: translatex(-2px);
  }
  60% {
    transform: translatex(0px);
    bottom: 150px;
  }
  100% {
    bottom: 120%;
  }
}

.spaceship.land {
  bottom: 130px;
  animation: land 3s ease;
}

@keyframes land {
  0% {
    bottom: 120%;
  }
  50% {
    bottom: 180px;
  }
  100% {
    bottom: 130px;
  }
}

.spaceshipBody {
  width: 35%;
  height: 80%;
  background-color: white;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  box-shadow: inset 0px -173px 0px -80px white,
    inset 0px -213px 0px -60px #e4e4e4;
}

.spaceshipBody:before {
  content: "";
  position: absolute;
  width: calc(100% - 36px);
  height: 42%;
  background-color: inherit;
  bottom: -30px;
  transform: perspective(10em) rotateX(-50deg);
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  box-shadow: inset 0px -33px 0px 0px rgba(0, 0, 0, 0.1);
}

.spaceshipBody:after {
  content: "";
  position: absolute;
  width: 45%;
  height: 40px;
  background-color: #f95959;
  bottom: -20px;
  transform: perspective(10em) rotateX(-50deg);
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  z-index: -1;
}

.spaceshipWindows {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  position: absolute;
}

.spaceshipWindows span {
  background-color: #ace7ef;
  box-shadow: inset -4px 4px 0px 0px rgba(0, 0, 0, 0.3),
    inset 0px 0px 0px 2px white;
  border: 4px solid #f95959;
  z-index: 2;
  position: absolute;
  border-radius: 100%;
  overflow: hidden;
}

.spaceshipWindows span:before {
  position: absolute;
  content: "";
  background-color: white;
  width: 200%;
  height: 100%;
  transform: rotate(45deg);
  opacity: 0.4;
}

.spaceshipWindows span:nth-child(1) {
  width: 30px;
  height: 30px;
  top: 23%;
}

.spaceshipWindows span:nth-child(2) {
  width: 45px;
  height: 45px;
  top: 40%;
}

.spaceshipBottom {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  position: absolute;
}

.spaceshipBottom span {
  background-color: #f95959;
  position: absolute;
  border-radius: 100%;
  overflow: hidden;
}

.spaceshipBottom span:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ff7676;
  transform: rotate(45deg);
}

.spaceshipBottom span:nth-child(1) {
  width: 20px;
  height: 20px;
  bottom: 0;
  left: 35%;
}

.spaceshipBottom span:nth-child(2) {
  width: 30px;
  height: 30px;
  bottom: -10px;
}

.spaceshipBottom span:nth-child(3) {
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 35%;
}

.fire {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  position: absolute;
  bottom: -100px;
}

.fire span {
  background-color: #f95959;
  position: absolute;
  border-radius: 100%;
  overflow: hidden;
  opacity: 0;
}

.fire.burn span {
  opacity: 1;
  animation: fire 0.2s ease infinite alternate;
}

.fire.burn span:nth-child(1) {
  width: 30px;
  height: 30px;
  bottom: 0;
  left: 35%;
}

.fire.burn span:nth-child(2) {
  width: 40px;
  height: 40px;
  bottom: -10px;
}

.fire.burn span:nth-child(3) {
  width: 30px;
  height: 30px;
  bottom: 0;
  right: 35%;
}

@keyframes fire {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.fire.burn .glow {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #f95959;
  border-radius: 100%;
  filter: blur(20px);
  opacity: 0;
  animation: glow 0.2s ease infinite alternate;
}

@keyframes glow {
  0% {
    opacity: 0.3;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

.shadow {
  position: absolute;
  width: 100px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  bottom: 30px;
  filter: blur(10px);
  animation: shadow 2s ease infinite alternate;
}

.shadow.hide {
  opacity: 0;
}

@keyframes shadow {
  0% {
    transform: scale(1);
    opacity: 0.2;
  }
  100% {
    transform: scale(1.2);
    opacity: 0.4;
  }
}

.buttons {
  position: absolute;
  bottom: 50px;
  display: flex;
  gap: 20px;
}

.buttons button {
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.buttons button.active {
  color: #46b7a7;
}

.buttons button.active:hover {
  color: #fff;
}

.buttons button.active:hover:before,
.buttons button.active:hover:after {
  width: 100%;
  height: 100%;
}

.buttons button.active:hover span:before,
.buttons button.active:hover span:after {
  width: 100%;
  height: 100%;
}

.buttons button:before {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #46b7a7;
  bottom: 0;
  left: 0;
  transition: all 0.3s ease;
}

.buttons button:after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #46b7a7;
  top: 0;
  right: 0;
  transition: all 0.3s ease;
}

.buttons button span {
  position: relative;
  display: block;
  padding: 5px 0;
}

.buttons button span:before {
  content: "";
  position: absolute;
  width: 2px;
  height: 0;
  background-color: #46b7a7;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
}

.buttons button span:after {
  content: "";
  position: absolute;
  width: 2px;
  height: 0;
  background-color: #46b7a7;
  bottom: 0;
  right: 0;
  transition: all 0.3s ease;
}

.buttons button:hover:before,
.buttons button:hover:after {
  width: 100%;
}

.buttons button:hover span:before,
.buttons button:hover span:after {
  height: 100%;
}
</style>
