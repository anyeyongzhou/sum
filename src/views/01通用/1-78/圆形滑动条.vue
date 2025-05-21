<template>
  <!-- 主容器 -->
  <div class="circle-slider-container">
    <!-- 圆形滑动条容器 -->
    <div class="container">
      <!-- 滑动区域 -->
      <div class="slider" ref="sliderRef">
        <!-- 可拖动的滑块 -->
        <div
          class="slider__ball"
          ref="sliderBallRef"
          @mousedown="handleMouseDown"
        ></div>
        <!-- 显示百分比 -->
        <div class="percent">{{ percent }}%</div>
      </div>
      <!-- 中心覆盖层(白色圆形) -->
      <div class="overlay"></div>
      <!-- 半圆1(固定蓝色) -->
      <div class="half half__1"></div>
      <!-- 半圆2(动态变化部分) -->
      <div class="half half__2" :style="half2Style"></div>
      <!-- 刻度点 -->
      <div
        v-for="(tick, index) in ticks"
        :key="index"
        class="tick"
        :style="tick.style"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 使用ref创建的响应式变量：

// DOM引用
const sliderRef = ref(null); // 滑动区域DOM引用
const sliderBallRef = ref(null); // 滑块DOM引用

// 状态变量
const percent = ref(0); // 当前百分比值(0-100)
const dx = ref(0); // 滑块x坐标
const dy = ref(0); // 滑块y坐标
const radius = ref(0); // 圆形半径
const center = ref(0); // 圆心位置(考虑滑块宽度偏移)
const totalRadian = ref(0); // 当前弧度值(0-1表示0-360度)
const step = ref(10); // 刻度数量
const degreeIncrement = ref(36); // 每个刻度间的角度(360/step)

// 刻度点数组
const ticks = ref([]); // 存储所有刻度点位置信息

// 第二个半圆的样式(动态变化)
const half2Style = ref({
  backgroundColor: "inherit", // 背景色(默认继承)
  transform: "rotate(0deg)", // 旋转角度
});

// 组件挂载后执行
onMounted(() => {
  // 获取滑动区域和滑块的尺寸信息
  const sliderRect = sliderRef.value.getBoundingClientRect();
  const sliderBallRect = sliderBallRef.value.getBoundingClientRect();

  // 计算半径和圆心位置(考虑滑块宽度)
  radius.value = sliderRect.width / 2;
  center.value = radius.value - sliderBallRect.width / 2;

  // 初始化滑块位置(50%)
  init(0.5);

  // 创建刻度点
  createTicks();
});

/**
 * 初始化滑块位置
 * @param {number} initialRadian - 初始弧度值(0-1)
 */
function init(initialRadian = 0) {
  // 将0-1的弧度值转换为实际弧度(-π到π)
  const radian = initialRadian * Math.PI * 2 - Math.PI;

  // 计算滑块坐标(加上半径偏移使坐标从边缘开始)
  dx.value = radius.value * Math.cos(radian) + radius.value;
  dy.value = radius.value * Math.sin(radian) + radius.value;

  // 保存当前弧度值
  totalRadian.value = initialRadian;

  // 更新视图
  updatePageView();
}

/**
 * 处理鼠标按下事件(开始拖动)
 * @param {MouseEvent} e - 鼠标事件对象
 */
function handleMouseDown(e) {
  e.preventDefault(); // 防止拖动时选中文本

  // 记录初始位置(考虑当前滑块位置)
  const startPos = {
    x: e.clientX - dx.value,
    y: e.clientY - dy.value,
  };

  /**
   * 处理鼠标移动事件
   * @param {MouseEvent} e - 鼠标事件对象
   */
  function handleMouseMove(e) {
    // 计算当前鼠标位置
    let dxTemp = e.clientX - startPos.x;
    let dyTemp = e.clientY - startPos.y;

    // 转换为相对于圆心的坐标
    const relX = dxTemp - radius.value;
    const relY = dyTemp - radius.value;

    // 计算当前角度(弧度)
    const rawAngleRadians = Math.atan2(relY, relX);
    const radiansTemp = (rawAngleRadians + Math.PI) / (Math.PI * 2);

    // 如果角度为360度则跳过(避免重复)
    if (radiansTemp * 360 === 360) return;

    // 对齐到最近的刻度点
    const roundedAngleRadians = Math.round(
      (rawAngleRadians / (degreeIncrement.value * (Math.PI / 180))) *
        (degreeIncrement.value * (Math.PI / 180))
    );

    // 更新滑块位置
    dx.value = radius.value * Math.cos(roundedAngleRadians) + radius.value;
    dy.value = radius.value * Math.sin(roundedAngleRadians) + radius.value;

    // 计算并保存当前弧度值(0-1)
    totalRadian.value = (roundedAngleRadians + Math.PI) / (Math.PI * 2);

    // 更新视图
    updatePageView();
  }

  /**
   * 处理鼠标释放事件
   */
  function handleMouseUp() {
    // 移除事件监听
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  // 添加事件监听
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

/**
 * 创建刻度点
 */
function createTicks() {
  // 计算每个刻度间的角度
  const angleStep = (2 * Math.PI) / step.value;
  ticks.value = []; // 清空刻度数组

  // 创建每个刻度点
  for (let i = 0; i < step.value; i++) {
    const angle = angleStep * i; // 当前角度

    // 计算刻度点坐标(考虑容器padding)
    const x = radius.value * Math.cos(angle) + radius.value + 8; // 8是容器的padding
    const y = radius.value * Math.sin(angle) + radius.value + 8;

    // 添加到刻度数组
    ticks.value.push({
      style: {
        left: `${x - 3}px`, // 3是tick宽度的一半(居中)
        top: `${y - 3}px`,
      },
    });
  }
}

/**
 * 更新页面视图
 */
function updatePageView() {
  // 更新滑块位置
  if (sliderBallRef.value) {
    sliderBallRef.value.style.transform = `translate3d(${dx.value}px, ${dy.value}px, 0)`;
  }

  // 计算并更新百分比(0-100)
  percent.value = Math.round(totalRadian.value * 100);

  // 更新第二个半圆的样式
  half2Style.value = {
    // 超过180度时变为蓝色，否则透明
    backgroundColor: totalRadian.value > 0.5 ? "#409eff" : "inherit",
    // 旋转角度计算(超过180度时需要减去180度)
    transform: `rotate(${
      totalRadian.value > 0.5
        ? 360 * totalRadian.value - 180
        : 360 * totalRadian.value
    }deg)`,
  };
}
</script>

<style lang="scss">
/* 主容器样式 */
.circle-slider-container {
  padding: 0;
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* 滑动区域样式 */
.slider {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  /* 滑块样式 */
  &__ball {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: #64748b;
    position: absolute;
    top: 0;
    left: 0;
    cursor: move;
    user-select: none;
    transform: translate3d(0, 0, 0); /* 初始位置 */
  }

  /* 百分比显示样式 */
  .percent {
    position: absolute;
    z-index: 20;
    color: #333;
    font-weight: bold;
  }
}

/* 圆形容器样式 */
.container {
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 50%;
  position: relative;
  background-color: #cbd5e1;
  overflow: hidden;
}

/* 中心覆盖层样式(白色圆形) */
.overlay {
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 5;
}

/* 半圆通用样式 */
.half {
  position: absolute;
  top: 0;
  left: 0;
  height: 50%;
  width: 100%;
  transform-origin: 50% 100%; /* 旋转中心点 */
  z-index: 1;

  /* 第一个半圆(固定蓝色) */
  &__1 {
    background: #409eff;
  }

  /* 第二个半圆(动态变化) */
  &__2 {
    background: inherit;
    transform: rotate(0deg);
  }
}

/* 刻度点样式 */
.tick {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  z-index: 8;
}
</style>
