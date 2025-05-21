<template>
  <div class="window-blind-container">
    <div class="control-panel">
      <h2>百叶窗效果</h2>
      <div class="controls">
        <div class="control-group">
          <label>叶片数量</label>
          <input type="range" v-model="blindCount" min="4" max="20" step="1" />
          <span class="value">{{ blindCount }}</span>
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
          <label>叶片宽度</label>
          <input
            type="range"
            v-model="blindWidth"
            min="20"
            max="100"
            step="5"
          />
          <span class="value">{{ blindWidth }}px</span>
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

        <div class="control-group">
          <label>背景图片</label>
          <div class="image-upload">
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="handleImageUpload"
              style="display: none"
            />
            <button class="upload-btn" @click="triggerFileInput">
              选择图片
            </button>
            <span v-if="backgroundImage" class="image-name">
              {{ imageName }}
            </span>
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

    <div class="blind-area">
      <div class="background-image" :style="backgroundStyle"></div>
      <div
        v-for="(blind, index) in blinds"
        :key="index"
        class="blind"
        :class="{
          'blind-active': isAnimating,
          [`mode-${currentMode}`]: true,
        }"
        :style="{
          '--blind-width': `${blindWidth}px`,
          '--animation-speed': `${animationSpeed}s`,
          '--blind-index': index,
          '--blind-count': blindCount,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const blindCount = ref(8);
const animationSpeed = ref(5);
const blindWidth = ref(50);
const isAnimating = ref(false);
const currentMode = ref("slide");
const backgroundImage = ref("");
const imageName = ref("");
const fileInput = ref(null);

// 动画模式
const modes = [
  { label: "滑动", value: "slide" },
  { label: "旋转", value: "rotate" },
  { label: "折叠", value: "fold" },
  { label: "波浪", value: "wave" },
];

// 计算百叶窗数组
const blinds = computed(() => {
  return Array(blindCount.value).fill(null);
});

// 背景样式
const backgroundStyle = computed(() => ({
  backgroundImage: backgroundImage.value
    ? `url(${backgroundImage.value})`
    : "none",
}));

// 开始/停止动画
function toggleAnimation() {
  isAnimating.value = !isAnimating.value;
}

// 重置动画
function resetAnimation() {
  isAnimating.value = false;
  blindCount.value = 8;
  animationSpeed.value = 5;
  blindWidth.value = 50;
  currentMode.value = "slide";
  backgroundImage.value = "";
  imageName.value = "";
}

// 触发文件选择
function triggerFileInput() {
  fileInput.value.click();
}

// 处理图片上传
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      backgroundImage.value = e.target.result;
      imageName.value = file.name;
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style lang="scss" scoped>
.window-blind-container {
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

  .image-upload {
    display: flex;
    align-items: center;
    gap: 8px;

    .upload-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background-color: #2196f3;
      color: white;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: #1e88e5;
      }
    }

    .image-name {
      font-size: 14px;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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

.blind-area {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #333;
  border-radius: 8px;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.blind {
  position: absolute;
  top: 0;
  width: var(--blind-width);
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  transform-origin: center;
  transition: all 0.3s;

  &.blind-active {
    &.mode-slide {
      animation: slide var(--animation-speed) ease-in-out infinite;
      animation-delay: calc(
        var(--blind-index) * var(--animation-speed) / var(--blind-count)
      );
    }

    &.mode-rotate {
      animation: rotate var(--animation-speed) ease-in-out infinite;
      animation-delay: calc(
        var(--blind-index) * var(--animation-speed) / var(--blind-count)
      );
    }

    &.mode-fold {
      animation: fold var(--animation-speed) ease-in-out infinite;
      animation-delay: calc(
        var(--blind-index) * var(--animation-speed) / var(--blind-count)
      );
    }

    &.mode-wave {
      animation: wave var(--animation-speed) ease-in-out infinite;
      animation-delay: calc(
        var(--blind-index) * var(--animation-speed) / var(--blind-count)
      );
    }
  }
}

@keyframes slide {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100%);
  }
}

@keyframes rotate {
  0%,
  100% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(90deg);
  }
}

@keyframes fold {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0);
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

@media (max-width: 768px) {
  .window-blind-container {
    grid-template-columns: 1fr;
  }

  .control-panel {
    order: 2;
  }

  .blind-area {
    order: 1;
    height: 400px;
  }
}
</style>
