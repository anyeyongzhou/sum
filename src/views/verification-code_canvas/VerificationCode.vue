<template>
  <div class="verification-container">
    <div class="code-display">
      <canvas ref="canvasRef" width="200" height="80"></canvas>
      <div class="refresh" @click="refreshCode">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
          />
        </svg>
      </div>
    </div>

    <div class="input-group">
      <input
        type="text"
        v-model="inputCode"
        placeholder="请输入验证码"
        :class="{ error: showError }"
        @input="validateInput"
      />
      <button @click="verifyCode" :disabled="!inputCode">验证</button>
    </div>

    <div class="controls">
      <div class="control-group">
        <label>验证码长度：</label>
        <input
          type="range"
          v-model="codeLength"
          min="4"
          max="8"
          step="1"
          @change="refreshCode"
        />
        <span>{{ codeLength }}位</span>
      </div>

      <div class="control-group">
        <label>干扰线数量：</label>
        <input
          type="range"
          v-model="lineCount"
          min="0"
          max="10"
          step="1"
          @change="refreshCode"
        />
        <span>{{ lineCount }}条</span>
      </div>

      <div class="control-group">
        <label>干扰点数量：</label>
        <input
          type="range"
          v-model="dotCount"
          min="0"
          max="100"
          step="10"
          @change="refreshCode"
        />
        <span>{{ dotCount }}个</span>
      </div>

      <div class="control-group">
        <label>难度设置：</label>
        <select v-model="difficulty" @change="refreshCode">
          <option value="easy">简单</option>
          <option value="medium">中等</option>
          <option value="hard">困难</option>
        </select>
      </div>
    </div>

    <div class="result" v-if="showResult" :class="{ success: isCorrect }">
      {{ resultMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const canvasRef = ref(null);
const codeLength = ref(4);
const lineCount = ref(5);
const dotCount = ref(50);
const difficulty = ref("medium");
const inputCode = ref("");
const showError = ref(false);
const showResult = ref(false);
const isCorrect = ref(false);
const resultMessage = ref("");
const currentCode = ref("");

// 生成随机颜色
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// 生成随机字符
function getRandomChar() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  return chars[Math.floor(Math.random() * chars.length)];
}

// 绘制验证码
function drawCode() {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // 清空画布
  ctx.clearRect(0, 0, width, height);

  // 设置背景
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, width, height);

  // 生成验证码
  let code = "";
  for (let i = 0; i < codeLength.value; i++) {
    const char = getRandomChar();
    code += char;

    // 设置字体
    const fontSize = 30 + Math.random() * 10;
    ctx.font = `bold ${fontSize}px Arial`;

    // 设置颜色
    ctx.fillStyle = getRandomColor();

    // 设置旋转
    const rotate = (Math.random() - 0.5) * 0.3;
    ctx.translate(40 + i * 30, 50);
    ctx.rotate(rotate);

    // 绘制文字
    ctx.fillText(char, 0, 0);

    // 重置变换
    ctx.rotate(-rotate);
    ctx.translate(-(40 + i * 30), -50);
  }

  // 保存当前验证码
  currentCode.value = code;

  // 绘制干扰线
  for (let i = 0; i < lineCount.value; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.strokeStyle = getRandomColor();
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // 绘制干扰点
  for (let i = 0; i < dotCount.value; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * width, Math.random() * height, 1, 0, 2 * Math.PI);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
  }

  // 根据难度调整
  if (difficulty.value === "hard") {
    // 添加噪点
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = getRandomColor();
      ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    }
  }
}

// 刷新验证码
function refreshCode() {
  drawCode();
  inputCode.value = "";
  showError.value = false;
  showResult.value = false;
}

// 验证输入
function validateInput() {
  showError.value = false;
  showResult.value = false;
}

// 验证验证码
function verifyCode() {
  if (!inputCode.value) return;

  const isMatch =
    inputCode.value.toLowerCase() === currentCode.value.toLowerCase();
  isCorrect.value = isMatch;
  resultMessage.value = isMatch ? "验证成功！" : "验证失败，请重试！";
  showResult.value = true;

  if (!isMatch) {
    showError.value = true;
  }
}

// 监听难度变化
watch(difficulty, newValue => {
  switch (newValue) {
    case "easy":
      lineCount.value = 3;
      dotCount.value = 30;
      break;
    case "medium":
      lineCount.value = 5;
      dotCount.value = 50;
      break;
    case "hard":
      lineCount.value = 8;
      dotCount.value = 80;
      break;
  }
});

// 初始化
onMounted(() => {
  drawCode();
});
</script>

<style lang="scss" scoped>
.verification-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.code-display {
  position: relative;
  display: inline-block;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;

  canvas {
    border-radius: 4px;
  }

  .refresh {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: #666;
    transition: transform 0.3s;

    &:hover {
      transform: rotate(180deg);
      color: #4caf50;
    }
  }
}

.input-group {
  display: flex;
  gap: 10px;
  max-width: 400px;

  input {
    flex: 1;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #4caf50;
    }

    &.error {
      border-color: #f44336;
    }
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover:not(:disabled) {
      background-color: #45a049;
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 200px;

  label {
    font-weight: 500;
    color: #333;
  }

  input[type="range"] {
    width: 100%;
  }

  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
  }
}

.result {
  padding: 15px;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;

  &.success {
    background-color: #e8f5e9;
    color: #2e7d32;
  }

  &:not(.success) {
    background-color: #ffebee;
    color: #c62828;
  }
}
</style>
