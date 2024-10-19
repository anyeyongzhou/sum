<template>
  <div class="container" @click="makeAnimate($event)"></div>
</template>
<script setup>
const buttonRef = ref();

// 制作动画  这样每次点击按钮 就会生成动画，动画结束便销毁动画元素
const makeAnimate = e => {
  const dom = e.target;
  const rect = dom.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const size = 100;

  const ripple = document.createElement("div");
  ripple.classList.add("ripple-class");
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${x - size / 2}px`;
  ripple.style.top = `${y - size / 2}px`;
  dom.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
};
</script>
<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: #fff;
}
// 涟漪动画定义
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }

  100% {
    transform: scale(4);
    opacity: 0;
  }
}

// 图层动画 css
.ripple-class {
  position: absolute;
  border-radius: 50%;
  background: #000;
  pointer-events: none;
  animation: ripple 0.6s linear;
}
</style>
