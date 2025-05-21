<template>
  <div class="container">
    <div class="left">
      <!-- 圆盘 -->
      <div ref="roundRef" class="round" @click="handleRoundClick">
        <!-- 圆盘开始时，中间的图案 -->
        <img ref="centerImgRef" class="center" src="./img/round.png" alt="" />
        <!-- 圆盘转动结束后，显示的结果图案 -->
        <img
          ref="resultImgRef"
          class="result"
          :style="{ display: showResult ? 'block' : 'none' }"
          :src="resultImgSrc"
          alt=""
        />
      </div>
      <p>
        在心中任意选择一个两位数（或者说，从10~99之间任意选择一个数），把这个数字分别减去其十位数和个位数（例如你选择的是71,那就：71-7-1=63）。
      </p>
      <p>
        在右边图表中找出与最后得出的数所相应的图形，并把这个图形牢记心中，然后点击上方的阵型。你会发现，阵型所显示出来的图形就是你刚刚心里记下的那个图形。
      </p>
    </div>
    <div class="right">
      <div class="table">
        <div v-for="i in 100" :key="i" class="item">
          <span>{{ i }}</span>
          <img :src="getItemImageSrc(i)" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const roundRef = ref(null);
const centerImgRef = ref(null);
const resultImgRef = ref(null);
const showResult = ref(false);

// 为9的倍数位置，找到一个随机的图片
const resultIndex = getRandom(0, 16);
const resultImgSrc = `img/values/${resultIndex}.png`;

// 获取随机数
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// 获取表格项的图片源
function getItemImageSrc(index) {
  if (index % 9 === 0) {
    return `img/values/${resultIndex}.png`;
  }
  return `img/values/${getRandom(0, 16)}.png`;
}

// 处理圆盘点击
const handleRoundClick = () => {
  if (!roundRef.value) return;

  // 移除点击事件
  roundRef.value.onclick = null;

  // 添加旋转动画
  roundRef.value.style.transform = "rotate(1800deg)";

  // 监听过渡结束事件
  roundRef.value.addEventListener("transitionend", () => {
    showResult.value = true;
  });
};
</script>

<style scoped>
.container {
  text-align: center;
  width: 100% !important;
  height: 100%;
  background: #fff;
}

.left {
  display: inline-block;
  width: 300px;
  vertical-align: top;
}

.right {
  display: inline-block;
  width: 500px;
}

.round {
  width: 300px;
  height: 300px;
  background: url("./img/bg.gif");
  position: relative;
  cursor: pointer;
  transition: 5s;
}

.center {
  width: 156px;
  height: 156px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.result {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.item {
  margin: 5px 0;
}

.item img {
  width: 16px;
  height: 16px;
}

.item span {
  vertical-align: 2px;
  margin-right: 5px;
}

.table {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>
