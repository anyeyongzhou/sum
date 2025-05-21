<template>
  <div class="whirligig-container">
    <div class="control-panel">
      <h2>旋转木马效果</h2>
      <div class="controls">
        <div class="control-group">
          <label>旋转速度</label>
          <input type="range" v-model="speed" min="1" max="10" step="1" />
          <span class="value">{{ speed }}</span>
        </div>

        <div class="control-group">
          <label>旋转方向</label>
          <div class="direction-buttons">
            <button
              class="direction-btn"
              :class="{ active: direction === 'clockwise' }"
              @click="direction = 'clockwise'"
            >
              顺时针
            </button>
            <button
              class="direction-btn"
              :class="{ active: direction === 'counterclockwise' }"
              @click="direction = 'counterclockwise'"
            >
              逆时针
            </button>
          </div>
        </div>

        <div class="control-group">
          <label>旋转半径</label>
          <input type="range" v-model="radius" min="100" max="300" step="10" />
          <span class="value">{{ radius }}px</span>
        </div>
      </div>

      <div class="buttons">
        <button
          class="start-btn"
          :class="{ active: isRotating }"
          @click="toggleRotation"
        >
          {{ isRotating ? "停止" : "开始" }}
        </button>

        <button class="reset-btn" @click="resetRotation">重置</button>
      </div>
    </div>

    <div class="whirligig-area">
      <div
        class="whirligig"
        :class="{ rotating: isRotating }"
        :style="whirligigStyle"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="item"
          :style="getItemStyle(index)"
        >
          <div class="item-content">
            <div class="item-icon">
              <i :class="item.icon"></i>
            </div>
            <div class="item-text">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const speed = ref(5);
const direction = ref("clockwise");
const radius = ref(200);
const isRotating = ref(false);

// 旋转项目
const items = [
  { icon: "fas fa-star", text: "星星" },
  { icon: "fas fa-heart", text: "爱心" },
  { icon: "fas fa-moon", text: "月亮" },
  { icon: "fas fa-sun", text: "太阳" },
  { icon: "fas fa-cloud", text: "云朵" },
  { icon: "fas fa-bell", text: "铃铛" },
  { icon: "fas fa-gift", text: "礼物" },
  { icon: "fas fa-crown", text: "皇冠" },
];

// 计算旋转木马样式
const whirligigStyle = computed(() => ({
  "--speed": `${speed.value}s`,
  "--direction": direction.value === "clockwise" ? "normal" : "reverse",
  "--radius": `${radius.value}px`,
}));

// 获取项目样式
function getItemStyle(index) {
  const angle = (360 / items.length) * index;
  const x = Math.cos((angle * Math.PI) / 180) * radius.value;
  const y = Math.sin((angle * Math.PI) / 180) * radius.value;

  return {
    transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
  };
}

// 开始/停止旋转
function toggleRotation() {
  isRotating.value = !isRotating.value;
}

// 重置旋转
function resetRotation() {
  isRotating.value = false;
  speed.value = 5;
  direction.value = "clockwise";
  radius.value = 200;
}
</script>

<style lang="scss" scoped>
.whirligig-container {
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

  .direction-buttons {
    display: flex;
    gap: 8px;

    .direction-btn {
      flex: 1;
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

.whirligig-area {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.whirligig {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  animation: rotate var(--speed) linear infinite;
  animation-direction: var(--direction);
  animation-play-state: paused;

  &.rotating {
    animation-play-state: running;
  }
}

.item {
  position: absolute;
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  transition: all 0.3s;

  .item-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  .item-icon {
    font-size: 24px;
    color: #2196f3;
    margin-bottom: 8px;
  }

  .item-text {
    font-size: 14px;
    color: #666;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .whirligig-container {
    grid-template-columns: 1fr;
  }

  .control-panel {
    order: 2;
  }

  .whirligig-area {
    order: 1;
    height: 400px;
  }
}
</style>
