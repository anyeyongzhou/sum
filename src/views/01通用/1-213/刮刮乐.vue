<template>
  <div class="scratch-ticket">
    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      @mousedown="handleMouseDown"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 画布尺寸
const width = 300;
const height = 185;

// 画布引用
const canvasRef = ref(null);
// 画布上下文
let ctx = null;
// 是否正在刮奖
let isScratching = false;

// 初始化画布
const initCanvas = () => {
  const canvas = canvasRef.value;
  ctx = canvas.getContext("2d");

  // 设置画布背景
  canvas.style.background =
    "url(./images/yidengjiang.png) no-repeat center / cover";

  // 填充灰色遮罩
  ctx.fillStyle = "#b5b5b5";
  ctx.fillRect(0, 0, width, height);
};

// 处理刮奖
const handleScratch = (x, y) => {
  if (!ctx) return;

  // 保存当前状态
  ctx.save();

  // 创建圆形路径
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);

  // 限制后续操作在圆形区域内
  ctx.clip();

  // 清除该区域
  ctx.clearRect(0, 0, width, height);

  // 恢复状态
  ctx.restore();
};

// 获取鼠标在画布上的坐标
const getCanvasPosition = e => {
  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
};

// 处理鼠标按下事件
const handleMouseDown = e => {
  isScratching = true;
  const pos = getCanvasPosition(e);
  handleScratch(pos.x, pos.y);

  // 添加移动和松开事件监听
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};

// 处理鼠标移动事件
const handleMouseMove = e => {
  if (!isScratching) return;
  const pos = getCanvasPosition(e);
  handleScratch(pos.x, pos.y);
};

// 处理鼠标松开事件
const handleMouseUp = () => {
  isScratching = false;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};

// 组件挂载时初始化
onMounted(() => {
  initCanvas();
});

// 组件卸载时清理事件监听
onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});
</script>

<style scoped>
.scratch-ticket {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

canvas {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
