<template>
  <div class="vibration-container">
    <div class="control-panel">
      <h2>网页震动效果</h2>
      <div class="controls">
        <div class="control-group">
          <label>震动强度</label>
          <input type="range" v-model="intensity" min="1" max="10" step="1" />
          <span class="value">{{ intensity }}</span>
        </div>

        <div class="control-group">
          <label>震动时长(ms)</label>
          <input
            type="range"
            v-model="duration"
            min="100"
            max="2000"
            step="100"
          />
          <span class="value">{{ duration }}ms</span>
        </div>

        <div class="control-group">
          <label>震动频率(Hz)</label>
          <input type="range" v-model="frequency" min="1" max="20" step="1" />
          <span class="value">{{ frequency }}Hz</span>
        </div>
      </div>

      <div class="buttons">
        <button
          class="vibrate-btn"
          :class="{ active: isVibrating }"
          @click="startVibration"
          :disabled="isVibrating"
        >
          {{ isVibrating ? "震动中..." : "开始震动" }}
        </button>

        <button
          class="stop-btn"
          @click="stopVibration"
          :disabled="!isVibrating"
        >
          停止震动
        </button>
      </div>

      <div class="presets">
        <h3>预设效果</h3>
        <div class="preset-buttons">
          <button
            v-for="preset in presets"
            :key="preset.name"
            class="preset-btn"
            @click="applyPreset(preset)"
          >
            {{ preset.name }}
          </button>
        </div>
      </div>
    </div>

    <div
      class="content-area"
      :class="{ vibrating: isVibrating }"
      :style="vibrationStyle"
    >
      <div class="demo-content">
        <h3>震动效果演示区域</h3>
        <p>
          这是一个演示区域，当点击"开始震动"按钮时，整个区域会产生震动效果。
        </p>
        <div class="demo-image">
          <img :src="imgUrl" alt="演示图片" />
        </div>
        <div class="demo-text">
          <p>震动效果可以用于：</p>
          <ul>
            <li>错误提示</li>
            <li>警告提醒</li>
            <li>操作反馈</li>
            <li>游戏效果</li>
            <li>交互增强</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";
import imgUrl from "./images/bg1.jpg";

const intensity = ref(5);
const duration = ref(500);
const frequency = ref(10);
const isVibrating = ref(false);
let vibrationInterval = null;

// 预设效果
const presets = [
  { name: "轻微震动", intensity: 3, duration: 300, frequency: 8 },
  { name: "中等震动", intensity: 5, duration: 500, frequency: 10 },
  { name: "强烈震动", intensity: 8, duration: 800, frequency: 15 },
  { name: "地震效果", intensity: 10, duration: 2000, frequency: 20 },
];

// 计算震动样式
const vibrationStyle = computed(() => {
  if (!isVibrating.value) return {};

  return {
    "--intensity": intensity.value,
    "--frequency": frequency.value,
    "--duration": `${duration.value}ms`,
  };
});

// 开始震动
function startVibration() {
  if (isVibrating.value) return;

  isVibrating.value = true;

  // 设置震动定时器
  vibrationInterval = setInterval(() => {
    const x = (Math.random() - 0.5) * intensity.value;
    const y = (Math.random() - 0.5) * intensity.value;

    document.body.style.transform = `translate(${x}px, ${y}px)`;
  }, 1000 / frequency.value);

  // 设置停止定时器
  setTimeout(() => {
    stopVibration();
  }, duration.value);
}

// 停止震动
function stopVibration() {
  if (!isVibrating.value) return;

  isVibrating.value = false;
  clearInterval(vibrationInterval);
  document.body.style.transform = "translate(0, 0)";
}

// 应用预设
function applyPreset(preset) {
  intensity.value = preset.intensity;
  duration.value = preset.duration;
  frequency.value = preset.frequency;
}

// 清理
onUnmounted(() => {
  stopVibration();
});
</script>

<style lang="scss" scoped>
.vibration-container {
  width: 100% !important;
  height: 90%;
  max-width: 1200px;
  margin: 0 auto;
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

  .buttons {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;

    button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .vibrate-btn {
      background-color: #4caf50;
      color: white;

      &:hover:not(:disabled) {
        background-color: #45a049;
      }

      &.active {
        background-color: #388e3c;
      }
    }

    .stop-btn {
      background-color: #f44336;
      color: white;

      &:hover:not(:disabled) {
        background-color: #e53935;
      }
    }
  }

  .presets {
    h3 {
      margin: 0 0 12px;
      font-size: 16px;
      color: #333;
    }

    .preset-buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    .preset-btn {
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
    }
  }
}

.content-area {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.1s;

  &.vibrating {
    animation: vibrate var(--duration) linear;
  }
}

.demo-content {
  h3 {
    margin: 0 0 16px;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 0 0 16px;
    color: #666;
    line-height: 1.5;
  }

  .demo-image {
    margin-bottom: 20px;

    img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
  }

  .demo-text {
    ul {
      margin: 0;
      padding-left: 20px;
      color: #666;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

@keyframes vibrate {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(
      calc(var(--intensity) * 1px),
      calc(var(--intensity) * -1px)
    );
  }
  50% {
    transform: translate(
      calc(var(--intensity) * -1px),
      calc(var(--intensity) * 1px)
    );
  }
  75% {
    transform: translate(
      calc(var(--intensity) * -1px),
      calc(var(--intensity) * -1px)
    );
  }
  100% {
    transform: translate(0, 0);
  }
}

@media (max-width: 768px) {
  .vibration-container {
    grid-template-columns: 1fr;
  }

  .control-panel {
    order: 2;
  }

  .content-area {
    order: 1;
  }
}
</style>
