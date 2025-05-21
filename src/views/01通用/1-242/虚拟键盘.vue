<template>
  <div class="keyboard-container">
    <div class="input-area">
      <input
        ref="inputRef"
        type="text"
        v-model="inputValue"
        placeholder="点击输入..."
        readonly
        @focus="showKeyboard = true"
      />
      <div class="keyboard-toggle" @click="toggleKeyboard">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM7 8h2v2H7V8zm0 3h2v2H7v-2zm-2-3h2v2H5V8zm0 3h2v2H5v-2zm15 5H4v-2h16v2zm0-4h-3v-2h3v2zm0-4h-3V8h3v2z"
          />
        </svg>
      </div>
    </div>

    <div class="keyboard" v-show="showKeyboard">
      <div class="keyboard-header">
        <div class="keyboard-title">虚拟键盘</div>
        <button class="close-button" @click="hideKeyboard">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>

      <div class="keyboard-body">
        <div
          class="keyboard-row"
          v-for="(row, rowIndex) in keyboardLayout"
          :key="rowIndex"
        >
          <button
            v-for="key in row"
            :key="key"
            class="key"
            :class="{
              'key-space': key === ' ',
              'key-backspace': key === 'Backspace',
              'key-enter': key === 'Enter',
              'key-shift': key === 'Shift',
              'key-caps': key === 'Caps',
              'key-symbol': key === 'Symbol',
            }"
            @click="handleKeyPress(key)"
          >
            <span v-if="key === 'Backspace'">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                />
              </svg>
            </span>
            <span v-else-if="key === 'Enter'">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"
                />
              </svg>
            </span>
            <span v-else>{{ key }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const inputRef = ref(null);
const inputValue = ref("");
const showKeyboard = ref(false);
const isCapsLock = ref(false);
const isSymbol = ref(false);

// 默认键盘布局
const defaultLayout = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
  ["Symbol", " ", "Caps"],
];

// 符号键盘布局
const symbolLayout = [
  ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "Backspace"],
  ["-", "_", "+", "=", "{", "}", "[", "]", "|", "\\"],
  [";", ":", '"', "'", "<", ">", ",", ".", "?", "Enter"],
  ["Shift", "~", "`", "|", "•", "√", "π", "÷", "×", "¶", "£"],
  ["Symbol", " ", "Caps"],
];

const keyboardLayout = ref(defaultLayout);

// 处理按键点击
function handleKeyPress(key) {
  switch (key) {
    case "Backspace":
      inputValue.value = inputValue.value.slice(0, -1);
      break;
    case "Enter":
      hideKeyboard();
      break;
    case "Shift":
      isCapsLock.value = !isCapsLock.value;
      break;
    case "Caps":
      isCapsLock.value = !isCapsLock.value;
      break;
    case "Symbol":
      isSymbol.value = !isSymbol.value;
      keyboardLayout.value = isSymbol.value ? symbolLayout : defaultLayout;
      break;
    case " ":
      inputValue.value += " ";
      break;
    default:
      if (isCapsLock.value) {
        inputValue.value += key.toUpperCase();
      } else {
        inputValue.value += key;
      }
  }
}

// 切换键盘
function toggleKeyboard() {
  showKeyboard.value = !showKeyboard.value;
}

// 隐藏键盘
function hideKeyboard() {
  showKeyboard.value = false;
  if (inputRef.value) {
    inputRef.value.blur();
  }
}

// 处理点击外部关闭
function handleClickOutside(event) {
  const keyboard = document.querySelector(".keyboard");
  const input = document.querySelector(".input-area");
  if (
    keyboard &&
    !keyboard.contains(event.target) &&
    !input.contains(event.target)
  ) {
    hideKeyboard();
  }
}

// 初始化
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// 清理
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped>
.keyboard-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.input-area {
  position: relative;
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #4caf50;
    }
  }

  .keyboard-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #666;
    transition: color 0.3s;

    &:hover {
      color: #4caf50;
    }
  }
}

.keyboard {
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.keyboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #e0e0e0;

  .keyboard-title {
    font-weight: 500;
    color: #333;
  }

  .close-button {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: #666;
    transition: color 0.3s;

    &:hover {
      color: #333;
    }
  }
}

.keyboard-body {
  padding: 16px;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
}

.key {
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border: none;
  border-radius: 4px;
  background-color: white;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e8f5e9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  &.key-space {
    min-width: 200px;
  }

  &.key-backspace,
  &.key-enter {
    min-width: 60px;
  }

  &.key-shift,
  &.key-caps,
  &.key-symbol {
    min-width: 80px;
    background-color: #e0e0e0;

    &:hover {
      background-color: #d0d0d0;
    }
  }

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
}
</style>
