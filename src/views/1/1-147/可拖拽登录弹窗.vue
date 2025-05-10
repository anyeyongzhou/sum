<template>
  <div>
    <button id="btn" @click="showModal">登录</button>
    <div v-if="isModalVisible" id="mask" @click="closeModal"></div>
    <div v-if="isModalVisible" id="login" ref="loginBox">
      <div class="title" id="title" @mousedown="startDrag">
        登陆百度账号
        <a href="#" class="close" @click.prevent="closeModal">X</a>
      </div>
      <div class="content">
        <div class="user">
          <input type="text" class="pt" placeholder="手机/邮箱/用户名" />
        </div>
        <div class="password">
          <input type="password" class="pt" placeholder="请输入密码" />
        </div>
        <div class="submit">
          <input type="button" class="sm" value="登陆" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isModalVisible = ref(false);
const loginBox = ref(null);

const showModal = () => {
  isModalVisible.value = true;
  centerModal();
  window.addEventListener("resize", centerModal);
};

const closeModal = () => {
  isModalVisible.value = false;
  window.removeEventListener("resize", centerModal);
};

const centerModal = () => {
  if (loginBox.value) {
    const cwidth = window.innerWidth;
    const cheight = window.innerHeight;
    const lwidth = loginBox.value.offsetWidth;
    const lheight = loginBox.value.offsetHeight;

    loginBox.value.style.left = `${(cwidth - lwidth) / 2}px`;
    loginBox.value.style.top = `${(cheight - lheight) / 2}px`;
  }
};

let isDragging = false;
let mouseOffsetX = 0;
let mouseOffsetY = 0;

const startDrag = e => {
  const rect = loginBox.value.getBoundingClientRect();
  mouseOffsetX = e.clientX - rect.left;
  mouseOffsetY = e.clientY - rect.top;
  isDragging = true;

  window.addEventListener("mousemove", dragModal);
  window.addEventListener("mouseup", stopDrag);
};

const dragModal = e => {
  if (isDragging) {
    const loginBoxElement = loginBox.value;
    const newLeft = e.clientX - mouseOffsetX;
    const newTop = e.clientY - mouseOffsetY;

    loginBoxElement.style.left = `${Math.max(
      0,
      Math.min(newLeft, window.innerWidth - loginBoxElement.offsetWidth)
    )}px`;
    loginBoxElement.style.top = `${Math.max(
      0,
      Math.min(newTop, window.innerHeight - loginBoxElement.offsetHeight)
    )}px`;
  }
};

const stopDrag = () => {
  isDragging = false;
  window.removeEventListener("mousemove", dragModal);
  window.removeEventListener("mouseup", stopDrag);
};

onMounted(() => {
  window.addEventListener("resize", centerModal);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", centerModal);
});
</script>

<style scoped>
#btn {
  width: 80px;
  height: 40px;
  background: #3b7ae3;
  margin: 0 auto;
  display: block;
  cursor: pointer;
  border: none;
  color: #fff;
  font-size: 16px;
}
#mask {
  background: #000;
  opacity: 0.75;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
}
#login {
  position: fixed;
  width: 400px;
  z-index: 1001;
}
.title {
  background: #f7f7f7;
  cursor: move;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #333;
  padding-left: 30px;
  position: relative;
}
.close {
  position: absolute;
  top: 0;
  right: 10px;
  color: #ccc;
}
.content {
  background: #fff;
  padding: 15px 20px;
}
.pt {
  display: block;
  height: 38px;
  padding-left: 15px;
  border: 1px solid #ddd;
  transition: 0.3s;
  font-size: 14px;
  color: #666;
  width: 343px;
}
.sm {
  display: block;
  height: 48px;
  border: 1px solid #ddd;
  transition: 0.3s;
  font-size: 16px;
  color: #fff;
  width: 360px;
  background: #3b7ae3;
}
</style>
