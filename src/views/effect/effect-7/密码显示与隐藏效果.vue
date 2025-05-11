<template>
  <div class="kuang">
    <input
      :type="isVisible ? 'text' : 'password'"
      placeholder="请输入密码......"
      id="password"
    />
    <div
      class="conceal"
      :class="{ yincang: isVisible }"
      @click="toggleVisibility"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isVisible = ref(false);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>

<style lang="scss" scoped>
.kuang {
  position: relative;
  width: 380px !important;
  height: 60px;
  border-radius: 5px;
  box-shadow: inset 5px 5px 10px rgba(204, 197, 197, 0.5),
    inset -5px -5px 8px rgba(204, 197, 197, 0.5);
}

.kuang input {
  position: absolute;
  top: 0;
  left: 20px;
  height: 100%;
  width: 300px;
  font-size: 18px;
  outline: none;
  border: none;
  background-color: transparent;
}

.kuang input::placeholder {
  color: rgba(68, 67, 67, 0.8);
}

.conceal {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  background-image: url(/@/assets/beauty/1/1-2.jpg);
  background-size: 100% 100%;
  cursor: pointer;
}

.conceal.yincang {
  background-image: url(/@/assets/beauty/1/1-3.jpg);
  background-size: 100% 100%;
}
</style>
