<template>
  <div class="typewriting-container">
    <div class="typewriting-content">
      <div class="text" ref="textRef">
        <span
          v-for="(char, index) in displayText"
          :key="index"
          :class="{ cursor: index === displayText.length - 1 }"
          :style="{ animationDelay: `${index * typingSpeed}ms` }"
          >{{ char }}</span
        >
      </div>
      <div class="cursor" v-if="!isTyping"></div>
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
          placeholder="请输入要显示的文本..."
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

      <div class="buttons">
        <button @click="startTyping" :disabled="isTyping">开始打字</button>
        <button @click="resetTyping" :disabled="!isTyping">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const text = ref("欢迎使用打字机效果！这是一个简单的演示。");
const typingSpeed = ref(100);
const cursorStyle = ref("block");
const displayText = ref("");
const isTyping = ref(false);
const textRef = ref(null);

// 监听文本变化
watch(text, () => {
  resetTyping();
});

// 开始打字效果
function startTyping() {
  if (isTyping.value) return;

  isTyping.value = true;
  displayText.value = "";

  let currentIndex = 0;
  const interval = setInterval(() => {
    if (currentIndex < text.value.length) {
      displayText.value += text.value[currentIndex];
      currentIndex++;
    } else {
      clearInterval(interval);
      isTyping.value = false;
    }
  }, typingSpeed.value);
}

// 重置打字效果
function resetTyping() {
  displayText.value = "";
  isTyping.value = false;
}
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

  span {
    display: inline-block;
    opacity: 0;
    animation: fadeIn 0.1s forwards;
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
</style>
