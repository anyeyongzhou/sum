<template>
  <div class="game">
    <div class="bg"></div>
    <div class="land" ref="land"></div>
    <div class="tudou" ref="tudou"></div>
    <!-- 蓄力条 -->
    <div class="bar">
      <!-- 蓄力条里面那个黄黄的东西 -->
      <div class="bar-content" ref="barContent"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 游戏配置
const gameConfig = {
  width: 640, // 整个游戏面板的宽度
  minSpeed: 300, // 土豆向上的最小速度
  maxSpeed: 1000, // 土豆向上的最大速度
};

// DOM 引用
const land = ref(null);
const tudou = ref(null);
const barContent = ref(null);

// 游戏状态
const landLeft = ref(0);
const tudouTop = ref(466);
const tudouRotate = ref(0);
const barWidth = ref(0);
const barTimer = ref(null);
const jumpTimer = ref(null);

// 大地移动
const moveLand = (distance, duration) => {
  landLeft.value -= distance;
  if (land.value) {
    land.value.style.transition = `${duration}s linear`;
    land.value.style.marginLeft = `${landLeft.value}px`;
  }
};

// 大地初始化
const initLand = () => {
  if (land.value) {
    land.value.addEventListener("transitionend", () => {
      landLeft.value = landLeft.value % gameConfig.width;
      if (land.value) {
        land.value.style.marginLeft = `${landLeft.value}px`;
        land.value.style.transition = "";
      }
    });
  }
};

// 蓄力条控制
const startBar = () => {
  clearInterval(barTimer.value);
  let dis = 2;
  barTimer.value = setInterval(() => {
    barWidth.value += dis;
    if (barWidth.value >= 100) {
      barWidth.value = 100;
      dis = -dis;
    } else if (barWidth.value <= 0) {
      barWidth.value = 0;
      dis = -dis;
    }
    if (barContent.value) {
      barContent.value.style.width = `${barWidth.value}%`;
    }
  }, 16);
};

const stopBar = () => {
  clearInterval(barTimer.value);
};

const clearBar = () => {
  barWidth.value = 0;
  if (barContent.value) {
    barContent.value.style.width = "0";
  }
};

// 土豆跳跃
const jump = v => {
  if (jumpTimer.value) return;

  const tick = 0.016;
  const g = 2000;
  const hv = -v / 2;
  const duration = (2 * -v) / g;

  // 移动大地
  moveLand(hv * duration, duration);

  // 旋转土豆
  if (tudou.value) {
    tudou.value.style.transition = `transform ${duration}s linear`;
    tudouRotate.value += 90;
    tudou.value.style.transform = `rotate(${tudouRotate.value}deg)`;
  }

  jumpTimer.value = setInterval(() => {
    const dis = v * tick + 0.5 * g * tick * tick;
    v = g * tick + v;
    tudouTop.value += dis;

    if (tudouTop.value >= 466) {
      tudouTop.value = 466;
      clearInterval(jumpTimer.value);
      jumpTimer.value = null;
      clearBar();
    }

    if (tudou.value) {
      tudou.value.style.top = `${tudouTop.value}px`;
    }
  }, tick * 1000);
};

// 事件处理
const handleMouseDown = () => {
  if (jumpTimer.value) return;
  startBar();
};

const handleMouseUp = () => {
  if (jumpTimer.value) return;
  stopBar();
  const v =
    gameConfig.minSpeed +
    ((gameConfig.maxSpeed - gameConfig.minSpeed) * barWidth.value) / 100;
  jump(-v);
};

// 生命周期钩子
onMounted(() => {
  initLand();
  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mouseup", handleMouseUp);
});

onUnmounted(() => {
  window.removeEventListener("mousedown", handleMouseDown);
  window.removeEventListener("mouseup", handleMouseUp);
  clearInterval(barTimer.value);
  clearInterval(jumpTimer.value);
});
</script>

<style scoped>
.game {
  width: 640px !important;
  height: 744px;
  border: 2px solid;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.bg {
  background: url("./images/bg.png") no-repeat left top/100% 100%;
  width: 640px;
  height: 550px;
}

.land {
  background: url("./images/land.png") repeat-x;
  width: 300%;
  height: 194px;
}

.tudou {
  width: 84px;
  height: 84px;
  background: url("./images/tudou.png") no-repeat;
  position: absolute;
  left: 200px;
  bottom: 194px;
}

.bar {
  width: 448px;
  height: 30px;
  border: 2px solid #fff;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 20px;
  background: rgb(165, 101, 42);
  border-radius: 5px;
}

.bar-content {
  height: 100%;
  width: 0;
  background: yellow;
}
</style>
