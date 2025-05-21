<template>
  <div class="word-spotlight-container">
    <div class="control-panel">
      <h2>文字聚光灯效果</h2>
      <div class="controls">
        <div class="control-group">
          <label>文字内容</label>
          <textarea
            v-model="text"
            placeholder="请输入文字内容"
            rows="3"
          ></textarea>
        </div>

        <div class="control-group">
          <label>字体大小</label>
          <input type="range" v-model="fontSize" min="20" max="100" step="5" />
          <span class="value">{{ fontSize }}px</span>
        </div>

        <div class="control-group">
          <label>光斑大小</label>
          <input type="range" v-model="spotSize" min="50" max="200" step="10" />
          <span class="value">{{ spotSize }}px</span>
        </div>

        <div class="control-group">
          <label>光斑颜色</label>
          <div class="color-picker">
            <input type="color" v-model="spotColor" />
            <span class="color-value">{{ spotColor }}</span>
          </div>
        </div>

        <div class="control-group">
          <label>动画速度</label>
          <input
            type="range"
            v-model="animationSpeed"
            min="1"
            max="10"
            step="1"
          />
          <span class="value">{{ animationSpeed }}</span>
        </div>

        <div class="control-group">
          <label>动画模式</label>
          <div class="mode-buttons">
            <button
              v-for="mode in modes"
              :key="mode.value"
              class="mode-btn"
              :class="{ active: currentMode === mode.value }"
              @click="currentMode = mode.value"
            >
              {{ mode.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="buttons">
        <button
          class="start-btn"
          :class="{ active: isAnimating }"
          @click="toggleAnimation"
        >
          {{ isAnimating ? "停止" : "开始" }}
        </button>

        <button class="reset-btn" @click="resetAnimation">重置</button>
      </div>
    </div>

    <div
      class="spotlight-area"
      :class="{ 'is-animating': isAnimating }"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div
        class="spotlight-text"
        :style="{
          '--font-size': `${fontSize}px`,
          '--spot-size': `${spotSize}px`,
          '--spot-color': spotColor,
          '--animation-speed': `${animationSpeed}s`,
        }"
      >
        {{ text || "请输入文字内容" }}
      </div>
      <div
        v-if="isAnimating"
        class="spotlight"
        :class="currentMode"
        :style="{
          '--spot-size': `${spotSize}px`,
          '--spot-color': spotColor,
          '--animation-speed': `${animationSpeed}s`,
          '--mouse-x': `${mouseX}px`,
          '--mouse-y': `${mouseY}px`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const text = ref("聚光灯效果");
const fontSize = ref(50);
const spotSize = ref(100);
const spotColor = ref("#ffffff");
const animationSpeed = ref(5);
const isAnimating = ref(false);
const currentMode = ref("follow");
const mouseX = ref(0);
const mouseY = ref(0);

// 动画模式
const modes = [
  { label: "跟随", value: "follow" },
  { label: "扫描", value: "scan" },
  { label: "脉冲", value: "pulse" },
  { label: "闪烁", value: "blink" },
];

// 开始/停止动画
function toggleAnimation() {
  isAnimating.value = !isAnimating.value;
}

// 重置动画
function resetAnimation() {
  isAnimating.value = false;
  text.value = "聚光灯效果";
  fontSize.value = 50;
  spotSize.value = 100;
  spotColor.value = "#ffffff";
  animationSpeed.value = 5;
  currentMode.value = "follow";
}

// 处理鼠标移动
function handleMouseMove(event) {
  if (currentMode.value === "follow") {
    const rect = event.target.getBoundingClientRect();
    mouseX.value = event.clientX - rect.left;
    mouseY.value = event.clientY - rect.top;
  }
}

// 处理鼠标离开
function handleMouseLeave() {
  if (currentMode.value === "follow") {
    mouseX.value = 0;
    mouseY.value = 0;
  }
}
</script>

<style lang="scss" scoped>
.word-spotlight-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
}

.control-panel {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;

  h2 {
    margin: 0 0 20px;
    font-size: 20px;
    color: #333;
  }

  .controls {
    margin-bottom: 20px;
  }

  .control-group {
    margin-bottom: 16px;

    label {
      display: block;
      margin-bottom: 8px;
      color: #666;
    }

    textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: vertical;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: #2196f3;
      }
    }

    input[type="range"] {
      width: 100%;
      margin-bottom: 4px;
    }

    .value {
      font-size: 14px;
      color: #999;
    }
  }

  .color-picker {
    display: flex;
    align-items: center;
    gap: 8px;

    input[type="color"] {
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .color-value {
      font-size: 14px;
      color: #666;
    }
  }

  .mode-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    .mode-btn {
      padding: 8px;
      border: none;
      border-radius: 4px;
      background-color: #e0e0e0;
      color: #333;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: #d0d0d0;
      }

      &.active {
        background-color: #2196f3;
        color: white;

        &:hover {
          background-color: #1e88e5;
        }
      }
    }
  }

  .buttons {
    display: flex;
    gap: 12px;

    button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .start-btn {
      background-color: #4caf50;
      color: white;

      &:hover {
        background-color: #45a049;
      }

      &.active {
        background-color: #f44336;

        &:hover {
          background-color: #e53935;
        }
      }
    }

    .reset-btn {
      background-color: #2196f3;
      color: white;

      &:hover {
        background-color: #1e88e5;
      }
    }
  }
}

.spotlight-area {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #333;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.spotlight-text {
  font-size: var(--font-size);
  color: #666;
  text-align: center;
  user-select: none;
  position: relative;
  z-index: 1;
}

.spotlight {
  position: absolute;
  width: var(--spot-size);
  height: var(--spot-size);
  background: radial-gradient(
    circle at center,
    var(--spot-color) 0%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: screen;

  &.follow {
    left: calc(var(--mouse-x) - var(--spot-size) / 2);
    top: calc(var(--mouse-y) - var(--spot-size) / 2);
    transition: all 0.1s ease-out;
  }

  &.scan {
    animation: scan var(--animation-speed) linear infinite;
  }

  &.pulse {
    animation: pulse var(--animation-speed) ease-in-out infinite;
  }

  &.blink {
    animation: blink var(--animation-speed) ease-in-out infinite;
  }
}

@keyframes scan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.4;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.2;
  }
}

@media (max-width: 768px) {
  .word-spotlight-container {
    grid-template-columns: 1fr;
  }

  .control-panel {
    order: 2;
  }

  .spotlight-area {
    order: 1;
    height: 400px;
  }
}
</style>
