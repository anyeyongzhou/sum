<template>
  <div class="box" ref="boxRef">
    <div class="text" ref="textRef">
      <div ref="textContentRef">
        {{ content }}
      </div>
    </div>
    <div class="bar" ref="barRef">
      <span @mousedown="handleUpArrow"></span>
      <div ref="slideWrapRef">
        <div class="slide" ref="slideRef" @mousedown="handleSlideDown"></div>
      </div>
      <span @mousedown="handleDownArrow"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 内容文本
const content = `成长是一种必然的经历，也是一种必受的折磨。青春~张扬喜欢青春肆意挥霍的激情，喜欢青春无拘无束的浪漫心境，喜欢青春洁白无瑕的美丽面容，喜欢青春孩子般阳光灿烂的笑脸，喜欢青春想哭就哭想笑就笑的疯狂岁月，喜欢青春拼搏无惧的年轻的心……青春的一切都那么美好，像清泉潺潺划过心底，清净了渐渐烦乱的心，像几十年的佳酿，芳香甘醇地醉人~也许青春中不止有阳光，还有阴霾。月有阴晴圆缺，人有悲欢离合，细想一下，不完美或许更完美。成长是一种必然的经历，也是一种必受的折磨。青春~张扬喜欢青春肆意挥霍的激情，喜欢青春无拘无束的浪漫心境成长是一种必然的经历，也是一种必受的折磨。青春~张扬喜欢青春肆意挥霍的激情，喜欢青春无拘无束的浪漫心境，喜欢青春洁白无瑕的美丽面容，喜欢青春孩子般阳光灿烂的笑脸，喜欢青春想哭就哭想笑就笑的疯狂岁月，喜欢青春拼搏无惧的年轻的心……青春的一切都那么美好，像清泉潺潺划过心底，清净了渐渐烦乱的心，像几十年的佳酿，芳香甘醇地醉人~也许青春中不止有阳光，还有阴霾。月有阴晴圆缺，人有悲欢离合，细想一下，不完美或许更完美。成长是一种必然的经历，也是一种必受的折磨。青春~张扬喜欢青春肆意挥霍的激情，喜欢青春无拘无束的浪漫心境成长是一种必然的经历，也是一种必受的折磨。青春~张扬喜欢青春肆意挥霍的激情，喜欢青春无拘无束的浪漫心境，喜欢青春洁白无瑕的美丽面容，喜欢青春孩子般阳光灿烂的笑脸，喜欢青春想哭就哭想笑就笑的疯狂岁月，喜欢青春拼搏无惧的年轻的心……青春的一切都那么美好，像清泉潺潺划过心底，清净了渐渐烦乱的心，像几十年的佳酿，芳香甘醇地醉人~也许青春中不止有阳光，还有阴霾。月有阴晴圆缺，人有悲欢离合，细想一下，不完美或许更完美。成长是一种必然的经历，也是一种必受的折磨。青春~张扬喜欢青春肆意挥霍的激情，喜欢青春无拘无束的浪漫心境`;

// DOM 引用
const boxRef = ref(null);
const textRef = ref(null);
const textContentRef = ref(null);
const barRef = ref(null);
const slideRef = ref(null);
const slideWrapRef = ref(null);

// 滚动相关变量
let scrollTop = 0;
let maxHeight = 0;
let timer = null;
let isDragging = false;

// 初始化滚动条
const initScrollBar = () => {
  maxHeight = slideWrapRef.value.offsetHeight - slideRef.value.offsetHeight;
};

// 处理滚动
const handleScroll = () => {
  // 限制滚动范围
  if (scrollTop < 0) {
    scrollTop = 0;
  } else if (scrollTop > maxHeight) {
    scrollTop = maxHeight;
  }

  // 计算滚动比例
  const scaleY = scrollTop / maxHeight;

  // 更新滑块位置
  slideRef.value.style.top = scrollTop + "px";

  // 更新内容位置
  textContentRef.value.style.top =
    scaleY * (textRef.value.offsetHeight - textContentRef.value.offsetHeight) +
    "px";
};

// 处理滑块按下
const handleSlideDown = e => {
  isDragging = true;
  const disY = e.clientY - slideRef.value.offsetTop;

  const handleMouseMove = e => {
    scrollTop = e.clientY - disY;
    handleScroll();
  };

  const handleMouseUp = () => {
    isDragging = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  e.stopPropagation();
  e.preventDefault();
};

// 处理上箭头点击
const handleUpArrow = () => {
  timer = setInterval(() => {
    scrollTop -= 5;
    handleScroll();
  }, 16);

  const handleMouseUp = () => {
    clearInterval(timer);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mouseup", handleMouseUp);
};

// 处理下箭头点击
const handleDownArrow = () => {
  timer = setInterval(() => {
    scrollTop += 5;
    handleScroll();
  }, 16);

  const handleMouseUp = () => {
    clearInterval(timer);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mouseup", handleMouseUp);
};

// 处理滑块区域点击
const handleSlideWrapClick = e => {
  timer = setInterval(() => {
    const slideTop =
      slideRef.value.getBoundingClientRect().top +
      slideRef.value.offsetHeight / 2;

    if (e.clientY < slideTop) {
      scrollTop -= 5;
    } else {
      scrollTop += 5;
    }

    if (Math.abs(e.clientY - slideTop) <= 5) {
      clearInterval(timer);
    }

    handleScroll();
  }, 16);

  const handleMouseUp = () => {
    clearInterval(timer);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mouseup", handleMouseUp);
};

// 处理鼠标滚轮
const handleWheel = e => {
  if (e.deltaY > 0) {
    scrollTop += 10;
  } else {
    scrollTop -= 10;
  }

  clearInterval(timer);
  handleScroll();
};

// 组件挂载时初始化
onMounted(() => {
  initScrollBar();
  slideWrapRef.value.addEventListener("mousedown", handleSlideWrapClick);
  boxRef.value.addEventListener("wheel", handleWheel);
});

// 组件卸载时清理事件监听
onUnmounted(() => {
  clearInterval(timer);
  slideWrapRef.value?.removeEventListener("mousedown", handleSlideWrapClick);
  boxRef.value?.removeEventListener("wheel", handleWheel);
});
</script>

<style scoped>
.box {
  width: 400px !important;
  height: 400px;
  margin: 50px auto;
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden;
}

.text {
  width: 380px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}

.text > div {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  line-height: 1.5;
  text-indent: 2em;
}

.bar {
  width: 20px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #f5f5f5;
}

.bar span {
  display: block;
  width: 20px;
  height: 20px;
  background-color: #ccc;
  cursor: pointer;
}

.bar span:first-child {
  background: url("./images/up.png") no-repeat center;
}

.bar span:last-child {
  background: url("./images/down.png") no-repeat center;
}

.bar > div {
  width: 20px;
  height: calc(100% - 40px);
  position: relative;
}

.slide {
  width: 20px;
  height: 50px;
  background-color: #999;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
}

.slide:hover {
  background-color: #666;
}
</style>
