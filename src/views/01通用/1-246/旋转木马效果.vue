<template>
  <div class="whirligig-picture-container">
    <div class="control-panel">
      <h2>图片旋转木马</h2>
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

        <div class="control-group">
          <label>图片大小</label>
          <input
            type="range"
            v-model="imageSize"
            min="50"
            max="150"
            step="10"
          />
          <span class="value">{{ imageSize }}px</span>
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

      <div class="upload-section">
        <h3>上传图片</h3>
        <div
          class="upload-area"
          @click="triggerUpload"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <input
            type="file"
            ref="fileInput"
            accept="image/*"
            multiple
            @change="handleFileChange"
            style="display: none"
          />
          <div class="upload-content">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>点击或拖拽图片到此处</p>
          </div>
        </div>
      </div>
    </div>

    <div class="whirligig-area">
      <div
        class="whirligig"
        :class="{ rotating: isRotating }"
        :style="whirligigStyle"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-item"
          :style="getItemStyle(index)"
          @click="showPreview(image)"
        >
          <div class="image-content">
            <img :src="image.url" :alt="image.name" />
            <div class="image-overlay">
              <span class="image-name">{{ image.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览 -->
    <div class="preview-modal" v-if="previewImage" @click="closePreview">
      <div class="preview-content" @click.stop>
        <img :src="previewImage.url" :alt="previewImage.name" />
        <div class="preview-info">
          <h3>{{ previewImage.name }}</h3>
          <button class="close-btn" @click="closePreview">关闭</button>
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
const imageSize = ref(100);
const isRotating = ref(false);
const images = ref([]);
const previewImage = ref(null);
const fileInput = ref(null);

// 计算旋转木马样式
const whirligigStyle = computed(() => ({
  "--speed": `${speed.value}s`,
  "--direction": direction.value === "clockwise" ? "normal" : "reverse",
  "--radius": `${radius.value}px`,
  "--image-size": `${imageSize.value}px`,
}));

// 获取项目样式
function getItemStyle(index) {
  const angle = (360 / images.value.length) * index;
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
  imageSize.value = 100;
}

// 触发文件上传
function triggerUpload() {
  fileInput.value.click();
}

// 处理文件选择
function handleFileChange(event) {
  const files = event.target.files;
  handleFiles(files);
}

// 处理拖放
function handleDrop(event) {
  const files = event.dataTransfer.files;
  handleFiles(files);
}

// 处理文件
function handleFiles(files) {
  Array.from(files).forEach(file => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = e => {
        images.value.push({
          name: file.name,
          url: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  });
}

// 显示预览
function showPreview(image) {
  previewImage.value = image;
}

// 关闭预览
function closePreview() {
  previewImage.value = null;
}
</script>

<style lang="scss" scoped>
.whirligig-picture-container {
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
    margin-bottom: 20px;

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

  .upload-section {
    h3 {
      margin: 0 0 12px;
      font-size: 16px;
      color: #333;
    }

    .upload-area {
      border: 2px dashed #ccc;
      border-radius: 4px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border-color: #2196f3;
        background-color: rgba(33, 150, 243, 0.1);
      }

      .upload-content {
        i {
          font-size: 32px;
          color: #666;
          margin-bottom: 8px;
        }

        p {
          margin: 0;
          color: #666;
        }
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
  width: var(--image-size);
  height: var(--image-size);
  margin: calc(var(--image-size) / -2) 0 0 calc(var(--image-size) / -2);
  animation: rotate var(--speed) linear infinite;
  animation-direction: var(--direction);
  animation-play-state: paused;

  &.rotating {
    animation-play-state: running;
  }
}

.image-item {
  position: absolute;
  width: var(--image-size);
  height: var(--image-size);
  margin: calc(var(--image-size) / -2) 0 0 calc(var(--image-size) / -2);
  transition: all 0.3s;
  cursor: pointer;

  .image-content {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

      .image-overlay {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 8px;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      opacity: 0;
      transition: opacity 0.3s;

      .image-name {
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .preview-content {
    max-width: 90%;
    max-height: 90%;

    img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
    }

    .preview-info {
      margin-top: 16px;
      text-align: center;

      h3 {
        margin: 0 0 12px;
        color: white;
      }

      .close-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: #f44336;
        color: white;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background-color: #e53935;
        }
      }
    }
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
  .whirligig-picture-container {
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
