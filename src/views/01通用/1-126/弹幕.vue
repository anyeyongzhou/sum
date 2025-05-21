<template>
  <div class="danmu-container">
    <div class="background-image">
      <img :src="bgImage" alt="背景图" />
    </div>

    <!-- 弹幕显示区域 -->
    <div class="danmu-display-area">
      <span
        v-for="(danmu, index) in danmus"
        :key="index"
        :style="{
          top: danmu.top + 'px',
          color: danmu.color,
          right: danmu.right + 'px',
        }"
        class="danmu-item"
      >
        {{ danmu.text }}
      </span>
    </div>

    <!-- 输入控制区域 -->
    <div class="control-panel">
      <div class="input-container">
        <p class="title">说点什么:</p>
        <input
          v-model="inputText"
          type="text"
          class="text-input"
          @keyup.enter="sendDanmu"
        />
        <button class="send-btn" @click="sendDanmu">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import bgImage from "/@/assets/images/chart_bg.png";

// 弹幕数据
interface Danmu {
  text: string;
  top: number;
  right: number;
  color: string;
  animation?: number;
}

const inputText = ref("");
const danmus = ref<Danmu[]>([]);
const containerWidth = ref(0);
const containerHeight = ref(0);

// 初始化容器尺寸
const initContainerSize = () => {
  containerWidth.value = window.innerWidth;
  containerHeight.value = window.innerHeight;
};

// 生成随机颜色
const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// 发送弹幕
const sendDanmu = () => {
  if (!inputText.value.trim()) return;

  const newDanmu: Danmu = {
    text: inputText.value,
    top: Math.floor(Math.random() * containerHeight.value),
    right: -400,
    color: getRandomColor(),
  };

  danmus.value.push(newDanmu);
  inputText.value = "";

  // 开始动画
  startAnimation(newDanmu, danmus.value.length - 1);
};

// 弹幕动画
const startAnimation = (danmu: Danmu, index: number) => {
  const animationId = requestAnimationFrame(function animate() {
    danmu.right += 5;

    if (danmu.right < containerWidth.value + 300) {
      danmu.animation = requestAnimationFrame(animate);
    } else {
      // 动画结束，移除弹幕
      danmus.value.splice(index, 1);
    }
  });

  danmu.animation = animationId;
};

// 清理动画
const cleanupAnimations = () => {
  danmus.value.forEach(danmu => {
    if (danmu.animation) {
      cancelAnimationFrame(danmu.animation);
    }
  });
};

// 初始化
onMounted(() => {
  initContainerSize();
  window.addEventListener("resize", initContainerSize);
});

// 组件卸载时清理
onUnmounted(() => {
  cleanupAnimations();
  window.removeEventListener("resize", initContainerSize);
});
</script>

<style lang="scss" scoped>
.danmu-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #ccc;
  font-family: "微软雅黑";

  .background-image {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .danmu-display-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 60px);
    pointer-events: none;
    overflow: hidden;
  }

  .danmu-item {
    position: absolute;
    white-space: nowrap;
    font-size: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    user-select: none;
  }

  .control-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #666;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-container {
    display: flex;
    align-items: center;
    height: 40px;

    .title {
      display: inline-block;
      font-size: 24px;
      color: #ffffff;
      margin-right: 20px;
    }

    .text-input {
      width: 300px;
      height: 30px;
      border: none;
      border-radius: 5px;
      font-size: 20px;
      padding: 0 10px;
      outline: none;
    }

    .send-btn {
      width: 60px;
      height: 30px;
      color: #ffffff;
      background-color: red;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      margin-left: 20px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: darken(red, 10%);
      }
    }
  }
}
</style>
