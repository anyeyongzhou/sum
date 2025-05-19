<template>
  <div class="image-magnifier">
    <div
      class="preview-container"
      ref="previewContainer"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <img :src="imageSrc" alt="预览图片" class="preview-image" />
      <div
        class="magnifier-box"
        ref="magnifierBox"
        :style="{
          display: isActive ? 'block' : 'none',
          top: boxPosition.top + 'px',
          left: boxPosition.left + 'px',
        }"
      ></div>
    </div>
    <div
      class="magnifier-container"
      :style="{ display: isActive ? 'block' : 'none' }"
    >
      <img
        :src="imageSrc"
        alt="放大图片"
        class="magnified-image"
        :style="{
          top: imagePosition.top + 'px',
          left: imagePosition.left + 'px',
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import imageSrc from "./images/风景-1.jpg";

const previewContainer = ref(null);
const magnifierBox = ref(null);

const isActive = ref(false);
const boxPosition = reactive({ top: 0, left: 0 });
const imagePosition = reactive({ top: 0, left: 0 });

// 计算放大镜位置
const calculatePosition = e => {
  if (!previewContainer.value || !magnifierBox.value) return;

  const containerRect = previewContainer.value.getBoundingClientRect();
  const boxWidth = magnifierBox.value.offsetWidth;
  const boxHeight = magnifierBox.value.offsetHeight;

  // 计算鼠标相对于容器中心的位置
  let top = e.clientY - containerRect.top - boxHeight / 2;
  let left = e.clientX - containerRect.left - boxWidth / 2;

  // 边界检查
  const maxTop = containerRect.height - boxHeight;
  const maxLeft = containerRect.width - boxWidth;

  top = Math.max(0, Math.min(top, maxTop));
  left = Math.max(0, Math.min(left, maxLeft));

  // 更新放大镜框位置
  boxPosition.top = top;
  boxPosition.left = left;

  // 计算放大图片位置 (2倍放大)
  imagePosition.top = -top * 2;
  imagePosition.left = -left * 2;
};

// 鼠标移动处理
const handleMouseMove = e => {
  isActive.value = true;
  calculatePosition(e);
};

// 鼠标离开处理
const handleMouseLeave = () => {
  isActive.value = false;
};

// 组件挂载时初始化
onMounted(() => {
  // 可以在这里添加额外的初始化逻辑
});
</script>

<style lang="scss" scoped>
.image-magnifier {
  width: 100% !important;
  height: 600px;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 100px;
  padding: 0 20px;

  .preview-container {
    position: relative;
    width: 350px;
    height: 350px;
    box-shadow: 3px 3px 10px 0 #111;
    cursor: none;

    .preview-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .magnifier-box {
      position: absolute;
      width: 175px;
      height: 175px;
      background-color: rgba(0, 0, 0, 0.3);
      pointer-events: none;
    }
  }

  .magnifier-container {
    width: 350px;
    height: 350px;
    overflow: hidden;
    position: relative;
    box-shadow: 3px 3px 10px 0 #111;

    .magnified-image {
      position: absolute;
      width: 200%;
      height: 200%;
      object-fit: cover;
    }
  }
}
</style>
