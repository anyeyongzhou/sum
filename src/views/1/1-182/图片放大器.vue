<template>
  <div class="container">
    <!-- 左上正常显示的中图 -->
    <div
      class="middleImg"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <!-- 遮罩层 -->
      <div class="enrottle" :style="enlargeStyle"></div>
      <img :src="middleImgSrc" alt="Middle Image" class="middleImg__image" />
    </div>

    <!-- 右侧的大图 -->
    <div class="largeImg" :style="largeImgStyle"></div>

    <!-- 下面的缩略图 -->
    <ul class="smallImg">
      <li
        v-for="(img, index) in smallImgs"
        :key="index"
        :class="{ active: activeIndex === index }"
        @click="handleThumbnailClick(index)"
      >
        <img :src="img" alt="Thumbnail" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 动态导入图片资源
import imgA1 from "./images/imgA_1.jpg";
import imgB1 from "./images/imgB_1.jpg";
import imgC1 from "./images/imgC_1.jpg";
import imgA2 from "./images/imgA_2.jpg";
import imgB2 from "./images/imgB_2.jpg";
import imgC2 from "./images/imgC_2.jpg";
import imgA3 from "./images/imgA_3.jpg";
import imgB3 from "./images/imgB_3.jpg";
import imgC3 from "./images/imgC_3.jpg";
import bg from "./images/bg.png";

// 图片资源
const smallImgs = ref([imgA1, imgB1, imgC1]);
const middleImgs = ref([imgA2, imgB2, imgC2]);
const largeImgs = ref([imgA3, imgB3, imgC3]);

// 当前激活的缩略图索引
const activeIndex = ref(0);

// 中图和大图的图片路径
const middleImgSrc = ref(middleImgs.value[activeIndex.value]);
const largeImgSrc = ref(largeImgs.value[activeIndex.value]);

// 遮罩层和大图的样式
const enlargeStyle = ref({
  opacity: 0,
  left: 0,
  top: 0,
  backgroundImage: `url(${bg})`,
});
const largeImgStyle = ref({
  opacity: 0,
  background: `url(${largeImgSrc.value}) no-repeat center/cover`,
});

// 缩略图点击事件
const handleThumbnailClick = index => {
  activeIndex.value = index;
  middleImgSrc.value = middleImgs.value[index];
  largeImgSrc.value = largeImgs.value[index];
  largeImgStyle.value.background = `url(${largeImgSrc.value}) no-repeat center/cover`;
};

// 中图鼠标移动事件
const handleMouseMove = e => {
  const middleImg = e.target;
  const rect = middleImg.getBoundingClientRect();
  const left = e.clientX - rect.left - 115; // 115 是遮罩层宽度的一半
  const top = e.clientY - rect.top - 115; // 115 是遮罩层高度的一半

  // 边界判断
  const maxLeft = rect.width - 230; // 230 是遮罩层宽度
  const maxTop = rect.height - 230; // 230 是遮罩层高度

  const clampedLeft = Math.max(0, Math.min(left, maxLeft));
  const clampedTop = Math.max(0, Math.min(top, maxTop));

  enlargeStyle.value = {
    opacity: 1,
    left: `${clampedLeft}px`,
    top: `${clampedTop}px`,
  };

  // 更新大图的背景位置
  largeImgStyle.value = {
    opacity: 1,
    background: `url(${largeImgSrc.value}) no-repeat`,
    backgroundPosition: `${-clampedLeft}px ${-clampedTop}px`,
  };
};

// 中图鼠标移出事件
const handleMouseLeave = () => {
  enlargeStyle.value.opacity = 0;
  largeImgStyle.value.opacity = 0;
};
</script>

<style scoped>
/* 整体容器的样式 */
.container {
  width: 1000px !important;
  height: 600px;
  margin: 50px auto;
  display: grid;
  grid-template-columns: 49% 49%;
  grid-template-rows: 85% 15%;
  justify-content: space-between;
}

.container > div {
  border: 1px solid #eee;
}

/* 左边的中图样式 */
.middleImg {
  position: relative;
  cursor: pointer;
}

.middleImg__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.enlarge {
  width: 230px;
  height: 230px;
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.3s;
}

/* 右边大图样式 */
.largeImg {
  width: 100%;
  height: 100%;
  background-size: 300% 300%; /* 确保背景图片可以放大 */
  background-position: center;
  transition: opacity 0.3s, background-position 0.1s ease-out;
}

/* 下面的缩略图 */
.smallImg {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.smallImg li {
  width: 60px;
  height: 60px;
  border: 1px solid #eee;
  margin: 0 5px;
  cursor: pointer;
}

.smallImg li img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.smallImg li.active {
  border: 2px solid black;
}
</style>
