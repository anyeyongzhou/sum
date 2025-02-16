<template>
  <div class="container">
    <h2>Verify Your Account</h2>
    <p>
      We emailed you the six digit code to cool_guy@email.com <br />
      Enter the code below to confirm your email address.
    </p>
    <div class="code-container">
      <input
        v-for="(code, idx) in codes"
        :key="idx"
        type="number"
        class="code"
        v-model="codes[idx]"
        :placeholder="0"
        min="0"
        max="9"
        required
        @keydown="handleKeyDown($event, idx)"
        ref="codeInputs"
      />
    </div>
    <small class="info">
      This is design only. We didn't actually send you an email as we don't have
      your email, right?
    </small>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

// 代码数组，初始化为6个空字符串（模拟输入框中的内容）
const codes = ref(Array(6).fill(""));

// 引用所有输入框
const codeInputs = ref([]);

// 按键处理函数
const handleKeyDown = (e, idx) => {
  // 如果是数字键（0-9），清空当前输入框并聚焦到下一个输入框
  if (e.key >= "0" && e.key <= "9") {
    codes.value[idx] = "";
    setTimeout(() => {
      if (idx < codes.value.length - 1) {
        codeInputs.value[idx + 1].focus();
      }
    }, 10);
  }
  // 如果是退格键，聚焦到上一个输入框
  else if (e.key === "Backspace") {
    setTimeout(() => {
      if (idx > 0) {
        codeInputs.value[idx - 1].focus();
      }
    }, 10);
  }
};

onMounted(() => {
  // 在组件挂载后，聚焦第一个输入框
  codeInputs.value[0]?.focus();
});
</script>
<style scoped>
.code {
  caret-color: transparent;
  border-radius: 5px;
  font-size: 75px;
  height: 120px;
  width: 100px;
  border: 1px solid #eee;
  margin: 1%;
  text-align: center;
  font-weight: 300;
  -moz-appearance: textfield;
}

.code::-webkit-outer-spin-button,
.code::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.code:valid {
  border-color: #3498db;
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.25);
}
</style>
