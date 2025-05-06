<template>
  <div
    class="swiper-wrapper"
    @mouseenter="pauseAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <!-- 轮播滚动区域 -->
    <ul
      class="swiper"
      :style="{ transform: `translateX(${currentPosition}px)` }"
    >
      <li v-for="(item, index) in images" :key="index">
        <el-image
          :src="item"
          lazy
          loading="lazy"
          fit="cover"
          class="img"
        ></el-image>
      </li>
    </ul>

    <!-- 按钮组 -->
    <span class="l-btn iconfont icon-arrow-left-bold" @click="prevSlide"></span>
    <span
      class="r-btn iconfont icon-arrow-right-bold"
      @click="nextSlide"
    ></span>

    <!-- 小白点 -->
    <ul class="dots-list">
      <li
        v-for="(dot, index) in dots"
        :key="index"
        :class="{ active: currentDotIndex === index }"
        @click="goToSlide(index)"
      ></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";
import img5 from "/@/assets/beauty/1/1-5.jpg";

const images = [img1, img2, img3, img4, img5];

const currentIndex = ref(0);
const currentDotIndex = ref(0);
const currentPosition = ref(0);
const isAnimating = ref(false);
const autoPlayInterval = ref<NodeJS.Timeout | null>(null);
const dots = ref(images.length); // 小白点数量

const move = (targetPosition: number, callback?: () => void) => {
  if (isAnimating.value) return;

  isAnimating.value = true;
  const duration = 300;
  const startPosition = currentPosition.value;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    currentPosition.value = startPosition + distance * progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isAnimating.value = false;

      // 无缝滚动处理
      if (currentIndex.value >= images.length - 1) {
        currentIndex.value = 0;
        currentPosition.value = 0;
      } else if (currentIndex.value <= 0) {
        currentIndex.value = images.length - 2;
        currentPosition.value = -(images.length - 1) * 300;
      }

      callback?.();
    }
  };

  requestAnimationFrame(animate);
};

// 更新小白点索引
watch(currentIndex, newVal => {
  currentDotIndex.value = newVal % images.length;
});

// 上一张
const prevSlide = () => {
  if (isAnimating.value) return;

  currentIndex.value--;
  move(currentPosition.value + 300);
};

// 下一张
const nextSlide = () => {
  if (isAnimating.value) return;

  currentIndex.value++;
  move(currentPosition.value - 300);
};

// 跳转到指定幻灯片
const goToSlide = (index: number) => {
  if (isAnimating.value) return;

  const diff = index - currentDotIndex.value;
  currentIndex.value += diff;
  move(currentPosition.value + diff * 300);
};

// 自动播放
const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    nextSlide();
  }, 2000);
};

// 暂停自动播放
const pauseAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
};

// 生命周期钩子
onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  pauseAutoPlay();
});
</script>

<style lang="scss" scoped>
.swiper-wrapper {
  width: 300px !important;
  height: 315px;
  border-radius: 12px;
  margin: 0 auto;
  background-color: #fac;
  font-size: 0;
  overflow: hidden;
  position: relative;
  border: 1px solid red;
}

.swiper {
  display: flex;
  position: absolute;
  left: 0;
  // transition: transform 0.3s ease;

  li {
    flex-shrink: 0;

    .img {
      width: 300px; /* 图片填满容器 */
      height: 315px;
    }
  }
}

.l-btn,
.r-btn {
  display: block;
  height: 30px;
  width: 20px;
  line-height: 30px;
  color: #fff;
  position: absolute;
  top: 50%;
  margin-top: -15px;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  text-align: center;
  z-index: 10;
}

.l-btn {
  left: 0;
  border-radius: 0 15px 15px 0;
}

.r-btn {
  right: 0;
  border-radius: 15px 0 0 15px;
}

.dots-list {
  border-radius: 10px;
  position: absolute;
  bottom: 15px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 10;

  li {
    display: inline-block;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: #fff;
    margin: 0 3px;
    cursor: pointer;

    &.active {
      background-color: #ff5000;
    }
  }
}
</style>
