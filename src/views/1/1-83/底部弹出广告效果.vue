<template>
  <div id="msg" ref="msgElement" :style="{ bottom: bottomPosition + 'px' }">
    <a href="javascript:void(0)" @click="moveDown">X</a>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 响应式数据
const msgElement = ref(null);
const bottomPosition = ref(-200); // 初始位置在屏幕下方
const animationParams = ref({
  distance: 0, // 保存移动的总距离
  duration: 1000, // 保存动画的总时长(ms)
  steps: 50, // 保存总步数
  stepSize: 0, // 保存每步的步长
  interval: 0, // 保存每步的步频(ms)
  wait: 5000, // 保存下落后，等待上升的时间(ms)
  moved: 0, // 保存当前已移动步数
  direction: 1, // 1表示上移，-1表示下移
  timer: null, // 保存定时器ID
});

// 初始化动画参数
const initAnimation = () => {
  if (!msgElement.value) return;

  // 获取元素高度作为移动总距离
  const elementHeight = parseFloat(getComputedStyle(msgElement.value).height);
  animationParams.value.distance = elementHeight;

  // 计算动画参数
  animationParams.value.interval =
    animationParams.value.duration / animationParams.value.steps;
  animationParams.value.stepSize = elementHeight / animationParams.value.steps;

  // 开始上移动画
  startMove(1);
};

// 执行移动动画
const startMove = direction => {
  // 清除现有定时器
  if (animationParams.value.timer) {
    clearTimeout(animationParams.value.timer);
  }

  // 设置移动方向
  animationParams.value.direction = direction;
  animationParams.value.moved = 0;

  // 开始动画
  moveStep();
};

// 执行单步移动
const moveStep = () => {
  // 更新位置
  bottomPosition.value +=
    animationParams.value.direction * animationParams.value.stepSize;
  animationParams.value.moved++;

  // 判断是否继续移动
  if (animationParams.value.moved < animationParams.value.steps) {
    animationParams.value.timer = setTimeout(
      moveStep,
      animationParams.value.interval
    );
  } else {
    // 动画完成
    animationParams.value.timer = null;

    // 如果是下移，等待后自动上移
    if (animationParams.value.direction === -1) {
      animationParams.value.timer = setTimeout(
        () => startMove(1),
        animationParams.value.wait
      );
    }
  }
};

// 向下移动
const moveDown = () => {
  // 只有当前没有动画在进行时才能触发下移
  if (animationParams.value.timer === null) {
    startMove(-1);
  }
};

// 组件挂载时初始化
onMounted(() => {
  initAnimation();
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#msg {
  width: 200px;
  height: 200px;
  position: fixed;
  right: 30px;
  background-color: LightBlue;
  transition: bottom 0.02s linear; // 添加平滑过渡效果

  > a {
    float: right;
    padding: 5px 10px;
    border: 1px solid black;
    cursor: pointer;

    &:hover {
      background-color: #ddd;
    }
  }
}
</style>
