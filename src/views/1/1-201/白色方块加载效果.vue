<template>
  <div class="white-block-container">
    <div class="control-panel">
      <h2>白色方块效果</h2>
      <div class="controls">
        <div class="control-group">
          <label>方块数量</label>
          <input type="range" v-model="blockCount" min="4" max="20" step="1" />
          <span class="value">{{ blockCount }}</span>
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
          <label>方块大小</label>
          <input type="range" v-model="blockSize" min="20" max="100" step="5" />
          <span class="value">{{ blockSize }}px</span>
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

    <div class="block-area">
      <div
        v-for="(block, index) in blocks"
        :key="index"
        class="block"
        :class="{
          'block-active': isAnimating,
          [`mode-${currentMode}`]: true,
        }"
        :style="{
          '--block-size': `${blockSize}px`,
          '--animation-speed': `${animationSpeed}s`,
          '--block-index': index,
          '--block-count': blockCount,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const blockCount = ref(8);
const animationSpeed = ref(5);
const blockSize = ref(50);
const isAnimating = ref(false);
const currentMode = ref("wave");

// 动画模式
const modes = [
  { label: "波浪", value: "wave" },
  { label: "旋转", value: "rotate" },
  { label: "缩放", value: "scale" },
  { label: "闪烁", value: "blink" },
];

// 计算方块数组
const blocks = computed(() => {
  return Array(blockCount.value).fill(null);
});

// 开始/停止动画
function toggleAnimation() {
  isAnimating.value = !isAnimating.value;
}

// 重置动画
function resetAnimation() {
  isAnimating.value = false;
  blockCount.value = 8;
  animationSpeed.value = 5;
  blockSize.value = 50;
  currentMode.value = "wave";
}
</script>

<style lang="scss" scoped>
.white-block-container {
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

    input[type="range"] {
      width: 100%;
      margin-bottom: 4px;
    }

    .value {
      font-size: 14px;
      color: #999;
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

.block-area {
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

.block {
  width: var(--block-size);
  height: var(--block-size);
  background-color: white;
  margin: 4px;
  opacity: 0.8;
  transition: all 0.3s;

  &.block-active {
    &.mode-wave {
      animation: wave var(--animation-speed) ease-in-out infinite;
      animation-delay: calc(
        var(--block-index) * var(--animation-speed) / var(--block-count)
      );
    }

    &.mode-rotate {
      animation: rotate var(--animation-speed) linear infinite;
      animation-delay: calc(
        var(--block-index) * var(--animation-speed) / var(--block-count)
      );
    }

    &.mode-scale {
      animation: scale var(--animation-speed) ease-in-out infinite;
      animation-delay: calc(
        var(--block-index) * var(--animation-speed) / var(--block-count)
      );
    }

    &.mode-blink {
      animation: blink var(--animation-speed) ease-in-out infinite;
      animation-delay: calc(
        var(--block-index) * var(--animation-speed) / var(--block-count)
      );
    }
  }
}

@keyframes wave {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes scale {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
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
  .white-block-container {
    grid-template-columns: 1fr;
  }

  .control-panel {
    order: 2;
  }

  .block-area {
    order: 1;
    height: 400px;
  }
}
</style>
