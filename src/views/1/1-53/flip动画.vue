<template>
  <div class="home-box">
    <el-button
      type="primary"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      >展开按钮</el-button
    >
    <div class="text-box" ref="textBoxRef">
      <div class="text">
        ‌FLIP动画的原理是通过计算元素在布局变化前后的位置和尺寸差异，然后应用反向变换来模拟元素的移动，最后播放动画，从而实现流畅的过渡效果。
        FLIP技术的优势在于它提供了一种高效的方式来动态改变DOM元素的位置和尺寸，同时赋予动效，从而增强用户体验。通过FLIP技术，开发者可以更专注于布局变化，而无需手动计算和应用变换，简化了动画开发的复杂度，提高了开发效率‌。
      </div>
    </div>
  </div>
</template>

<script setup>
const instance = getCurrentInstance();

const handleMouseEnter = () => {
  const targetNode = instance?.refs.textBoxRef;

  // F：记录初始状态的位置和尺寸 默认就是初始状态 height: 0
  // L: 执行代码让动画进入最终状态，并记录最终状态的位移和大小
  // 不定高，则设置高度为auto，并通过getBoundingClientRect获取最终高度
  targetNode.style.height = "auto";
  const lastInfo = targetNode.getBoundingClientRect();
  // I：计算最终状态和初始状态的位移和尺寸差异，并应用反向变换
  // P：执行动画，先让元素恢复到初始状态，再使用transition让元素从初始状态过渡到最终状态
  targetNode.style.height = "0";
  targetNode.style.transition = "height 0.3s";

  // 过渡到最终状态，下一帧执行，给动画一点缓冲时间
  requestAnimationFrame(() => {
    targetNode.style.height = lastInfo.height + "px";
  });
};

const handleMouseLeave = () => {
  const targetNode = instance?.refs.textBoxRef;

  requestAnimationFrame(() => {
    targetNode.style.height = "0";
  });
};
</script>

<style lang="scss" scoped>
.home-box {
  .text-box {
    width: 300px;
    height: 0;
    overflow: hidden;
    border-radius: 10px;
    margin-top: 10px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    .text {
      padding: 10px;
    }
  }
}
</style>
