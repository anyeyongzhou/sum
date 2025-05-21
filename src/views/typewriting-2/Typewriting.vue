<template>
  <div class="typewriting-container">
    <div class="typewriting-content">
      <div class="text" ref="textRef">
        <div
          v-for="(line, lineIndex) in displayLines"
          :key="lineIndex"
          class="line"
        >
          <span
            v-for="(char, charIndex) in line"
            :key="`${lineIndex}-${charIndex}`"
            :class="{
              cursor: isLastChar(lineIndex, charIndex),
              error: isErrorChar(lineIndex, charIndex),
              deleting: isDeletingChar(lineIndex, charIndex),
            }"
            :style="{
              animationDelay: `${getCharDelay(lineIndex, charIndex)}ms`,
            }"
            >{{ char }}</span
          >
        </div>
        <div class="cursor" v-if="!isTyping" :class="cursorStyle"></div>
      </div>
    </div>

    <div class="controls">
      <div class="control-group">
        <label>打字速度：</label>
        <input
          type="range"
          v-model="typingSpeed"
          min="50"
          max="200"
          step="10"
        />
        <span>{{ typingSpeed }}ms</span>
      </div>

      <div class="control-group">
        <label>文本内容：</label>
        <textarea
          v-model="text"
          rows="4"
          placeholder="请输入要显示的文本，每行用换行符分隔..."
        ></textarea>
      </div>

      <div class="control-group">
        <label>光标样式：</label>
        <select v-model="cursorStyle">
          <option value="block">方块</option>
          <option value="line">线条</option>
          <option value="underline">下划线</option>
        </select>
      </div>

      <div class="control-group">
        <label>效果设置：</label>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="enableSound" />
            启用打字音效
          </label>
          <label>
            <input type="checkbox" v-model="enableError" />
            模拟打字错误
          </label>
          <label>
            <input type="checkbox" v-model="enableDelete" />
            启用删除效果
          </label>
        </div>
      </div>

      <div class="buttons">
        <button @click="startTyping" :disabled="isTyping">开始打字</button>
        <button @click="resetTyping" :disabled="!isTyping">重置</button>
      </div>
    </div>

    <audio ref="typeSound" src="/sounds/type.mp3" preload="auto"></audio>
    <audio ref="deleteSound" src="/sounds/delete.mp3" preload="auto"></audio>
    <audio ref="errorSound" src="/sounds/error.mp3" preload="auto"></audio>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const text = ref(
  "第一行：欢迎使用高级打字机效果！\n第二行：这是一个支持多行文本的演示。\n第三行：还包含了打字音效和错误模拟。"
);
const typingSpeed = ref(100);
const cursorStyle = ref("block");
const displayLines = ref([]);
const isTyping = ref(false);
const textRef = ref(null);
const typeSound = ref(null);
const deleteSound = ref(null);
const errorSound = ref(null);

// 效果设置
const enableSound = ref(true);
const enableError = ref(false);
const enableDelete = ref(false);

// 错误和删除状态
const errorChars = ref(new Set());
const deletingChars = ref(new Set());

// 监听文本变化
watch(text, () => {
  resetTyping();
});

// 开始打字效果
async function startTyping() {
  if (isTyping.value) return;

  isTyping.value = true;
  displayLines.value = [];
  errorChars.value.clear();
  deletingChars.value.clear();

  const lines = text.value.split("\n");
  let currentLine = 0;
  let currentChar = 0;

  while (currentLine < lines.length) {
    if (currentChar === 0) {
      displayLines.value.push([]);
    }

    // 模拟打字错误
    if (enableError.value && Math.random() < 0.1) {
      const errorChar = String.fromCharCode(
        97 + Math.floor(Math.random() * 26)
      );
      displayLines.value[currentLine].push(errorChar);
      errorChars.value.add(`${currentLine}-${currentChar}`);

      if (enableSound.value) {
        errorSound.value.currentTime = 0;
        errorSound.value.play();
      }

      await new Promise(resolve => setTimeout(resolve, typingSpeed.value));

      // 删除错误字符
      if (enableDelete.value) {
        deletingChars.value.add(`${currentLine}-${currentChar}`);
        if (enableSound.value) {
          deleteSound.value.currentTime = 0;
          deleteSound.value.play();
        }
        await new Promise(resolve => setTimeout(resolve, typingSpeed.value));
        displayLines.value[currentLine].pop();
        errorChars.value.delete(`${currentLine}-${currentChar}`);
        deletingChars.value.delete(`${currentLine}-${currentChar}`);
      }
    }

    // 正常打字
    displayLines.value[currentLine].push(lines[currentLine][currentChar]);
    if (enableSound.value) {
      typeSound.value.currentTime = 0;
      typeSound.value.play();
    }

    currentChar++;
    if (currentChar >= lines[currentLine].length) {
      currentLine++;
      currentChar = 0;
    }

    await new Promise(resolve => setTimeout(resolve, typingSpeed.value));
  }

  isTyping.value = false;
}

// 重置打字效果
function resetTyping() {
  displayLines.value = [];
  isTyping.value = false;
  errorChars.value.clear();
  deletingChars.value.clear();
}

// 辅助函数
function isLastChar(lineIndex, charIndex) {
  return (
    lineIndex === displayLines.value.length - 1 &&
    charIndex === displayLines.value[lineIndex].length - 1
  );
}

function isErrorChar(lineIndex, charIndex) {
  return errorChars.value.has(`${lineIndex}-${charIndex}`);
}

function isDeletingChar(lineIndex, charIndex) {
  return deletingChars.value.has(`${lineIndex}-${charIndex}`);
}

function getCharDelay(lineIndex, charIndex) {
  return (lineIndex * 1000 + charIndex) * typingSpeed.value;
}

// 生命周期钩子
onMounted(() => {
  // 预加载音效
  if (typeSound.value) typeSound.value.load();
  if (deleteSound.value) deleteSound.value.load();
  if (errorSound.value) errorSound.value.load();
});

onUnmounted(() => {
  // 清理音效
  if (typeSound.value) typeSound.value.pause();
  if (deleteSound.value) deleteSound.value.pause();
  if (errorSound.value) errorSound.value.pause();
});
</script>

<style lang="scss" scoped>
.typewriting-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.typewriting-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.text {
  font-size: 24px;
  line-height: 1.5;
  color: #333;
  font-family: "Courier New", monospace;

  .line {
    min-height: 36px;
  }

  span {
    display: inline-block;
    opacity: 0;
    animation: fadeIn 0.1s forwards;

    &.error {
      color: #f44336;
      animation: shake 0.5s;
    }

    &.deleting {
      animation: delete 0.3s forwards;
    }
  }
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 24px;
  background-color: #333;
  margin-left: 2px;
  animation: blink 0.8s infinite;

  &-block {
    width: 12px;
  }

  &-line {
    width: 2px;
  }

  &-underline {
    width: 12px;
    height: 2px;
    margin-top: 22px;
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

  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
  }

  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: normal;
    }
  }
}

.buttons {
  display: flex;
  gap: 10px;

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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

@keyframes delete {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>
