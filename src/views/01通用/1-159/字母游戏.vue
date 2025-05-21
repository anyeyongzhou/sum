<template>
  <div class="game-container">
    <div :id="charClass">{{ currentChar }}</div>
    <div id="result">{{ resultMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentChar = ref("A");
const resultMessage = ref("请在按键上按下屏幕上显示的字母");
const okCount = ref(0);
const errorCount = ref(0);
let code;

const showChar = () => {
  const rand = Math.floor(Math.random() * 26);
  code = rand + 65; // 65-90 is A-Z
  currentChar.value = String.fromCharCode(code);
};

const updateResult = () => {
  const rate = (100 * okCount.value) / (okCount.value + errorCount.value);
  resultMessage.value = `正确${okCount.value}个 错误${
    errorCount.value
  }个 正确率${rate.toFixed(2)}%`;
};

const handleKeydown = ev => {
  const key = ev.keyCode;
  if (key === code) {
    okCount.value++;
    showChar();
    charClass.value = "animated zoomIn";
  } else {
    errorCount.value++;
    charClass.value = "animated shake error";
  }
  updateResult();
  setTimeout(clearAnimation, 500);
};

const clearAnimation = () => {
  charClass.value = "";
};

const charClass = ref("");
onMounted(() => {
  showChar();
  window.addEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  background: radial-gradient(circle, #444, #000);
}

#char {
  font-size: 400px;
  color: lightgreen;
  text-shadow: 0 0 50px #666;
}

#error {
  color: red;
}

#result {
  font-size: 20px;
  color: #888;
}

#char.error {
  color: red;
}
</style>
