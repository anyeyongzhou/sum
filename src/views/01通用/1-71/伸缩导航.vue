<template>
  <nav :class="{ active: isActive }">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Works</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <button class="icon" @click="toggleNav">
      <div class="line line1"></div>
      <div class="line line2"></div>
    </button>
  </nav>
</template>

<script setup>
import { ref } from "vue";

// 定义响应式状态来控制导航栏是否激活
const isActive = ref(false);

// 切换导航栏的激活状态
const toggleNav = () => {
  isActive.value = !isActive.value;
};
</script>

<style scoped>
/* 容器样式：为导航栏容器设置样式 */
nav {
  background-color: #fff;
  padding: 20px;
  width: 80px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: width 0.6s linear;
  overflow-x: hidden;
}

/* 激活状态容器样式：导航栏在激活状态下的宽度 */
nav.active {
  width: 350px !important;
}

/* 导航栏菜单列表样式：设置导航栏菜单的样式 */
nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 0;
  transition: width 0.6s linear;
}

/* 激活状态导航栏菜单列表样式：在激活状态下展开菜单 */
nav.active ul {
  width: 100%;
}

/* 导航栏菜单项样式：设置导航栏每个菜单项的样式 */
nav ul li {
  transform: rotateY(0deg);
  opacity: 0;
  transition: transform 0.6s linear, opacity 0.6s linear;
}

/* 激活状态导航栏菜单项样式：在激活状态下显示菜单项 */
nav.active ul li {
  opacity: 1;
  transform: rotateY(360deg);
}

/* 导航栏链接样式：设置导航栏链接的样式 */
nav ul a {
  position: relative;
  color: #000;
  text-decoration: none;
  margin: 0 10px;
}

/* 导航栏图标按钮样式 */
.icon {
  background-color: #fff;
  border: 0;
  cursor: pointer;
  padding: 0;
  position: relative;
  height: 30px;
  width: 30px;
}

/* 导航栏图标按钮聚焦样式 */
.icon:focus {
  outline: 0;
}

/* 导航栏图标按钮线条样式 */
.icon .line {
  background-color: #5290f9;
  height: 2px;
  width: 20px;
  position: absolute;
  top: 10px;
  left: 5px;
  transition: transform 0.6s linear;
}

/* 导航栏图标按钮第二条线条样式 */
.icon .line2 {
  top: auto;
  bottom: 10px;
}

/* 激活状态导航栏图标按钮第一条线条旋转样式 */
nav.active .icon .line1 {
  transform: rotate(-765deg) translateY(5.5px);
}

/* 激活状态导航栏图标按钮第二条线条旋转样式 */
nav.active .icon .line2 {
  transform: rotate(765deg) translateY(-5.5px);
}
</style>
