<template>
  <div class="container">
    <p class="changeImg" @click="init">图片不好看？换一张吧</p>
    <div class="imgContainer">
      <h3>{{ title }}</h3>
      <div
        class="imgBox"
        ref="imgBoxRef"
        :style="{ backgroundImage: `url(${imgUrl})` }"
      >
        <div
          class="imgBlock"
          :style="{
            left: imgBlockLeft + 'px',
            top: imgGapTop + 'px',
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: `-${imgGapLeft}px -${imgGapTop}px`,
            opacity: imgBlockOpacity,
          }"
        ></div>
        <div
          class="imgGap"
          :style="{ left: imgGapLeft + 'px', top: imgGapTop + 'px' }"
        ></div>
      </div>
      <div class="slider" ref="sliderRef">
        <span>拖动滑块完成拼图</span>
        <button
          type="button"
          @mousedown="onMouseDown"
          :style="{ left: btnLeft + 'px' }"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 动态导入图片
const images = import.meta.glob("./img/*.png");
const imgArr = Object.values(images).map(img =>
  img().then(module => module.default)
);
const imgUrl = ref("");
const imgBlockLeft = ref(0);
const imgGapLeft = ref(0);
const imgGapTop = ref(0);
const btnLeft = ref(0);
const imgBlockOpacity = ref(0);
const title = ref("请完成图片验证");
const sliderRef = ref();
const imgBoxRef = ref();

const init = async () => {
  const randomImg = await Promise.all(imgArr).then(
    arr => arr[Math.floor(Math.random() * arr.length)]
  );
  imgUrl.value = randomImg;
  imgBlockOpacity.value = 0;
  btnLeft.value = 0;
  imgBlockLeft.value = 0;
  title.value = "请完成图片验证";

  await nextTick();

  const imgBox = imgBoxRef.value;
  const boxHeight = imgBox.offsetHeight;
  const boxWidth = imgBox.offsetWidth;
  const blockSize = 50; // 拼图块大小

  // 确保缺口不会太靠近边缘（至少留10px边距）
  const margin = 10;
  const maxLeft = boxWidth - blockSize - margin;
  const maxTop = boxHeight - blockSize - margin;

  // 生成随机位置（确保在范围内）
  imgGapLeft.value = margin + Math.random() * maxLeft;
  imgGapTop.value = margin + Math.random() * maxTop;

  // 设置拼图块初始位置（与缺口相同）
  imgBlockLeft.value = imgGapLeft.value;
};

const onMouseDown = event => {
  imgBlockOpacity.value = 1;
  title.value = "拖动图片完成验证";

  const slider = sliderRef.value;
  const maxLeft = slider.offsetWidth - event.target.offsetWidth;
  const startX = event.clientX;
  const startLeft = btnLeft.value;

  const mouseMoveHandler = e => {
    let moveX = e.clientX - startX;
    let newLeft = startLeft + moveX;

    // 限制滑块移动范围
    newLeft = Math.max(0, Math.min(maxLeft, newLeft));

    btnLeft.value = newLeft;
    imgBlockLeft.value =
      (newLeft * (imgBoxRef.value.offsetWidth - 50)) / maxLeft;
  };

  const mouseUpHandler = () => {
    const tolerance = 5; // 允许的误差范围
    const diffLeft = Math.abs(imgGapLeft.value - imgBlockLeft.value);

    if (diffLeft <= tolerance) {
      title.value = "验证成功";
      imgBlockOpacity.value = 0;
    } else {
      imgBlockLeft.value = imgGapLeft.value;
      btnLeft.value = 0;
      title.value = "验证失败";
      setTimeout(() => {
        imgBlockOpacity.value = 0;
      }, 1000);
    }

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};

onMounted(init);
</script>

<style scoped>
.container {
  width: 280px !important;
  height: 400px;
}
.changeImg {
  text-align: center;
  position: relative;
  font-size: 16px;
  color: rgb(126, 57, 218);
  font-weight: bolder;
  cursor: pointer;
  user-select: none;
}
.changeImg::before {
  content: "";
  display: block;
  position: absolute;
  left: 10%;
  top: calc(50% - 13px);
  width: 26px;
  height: 26px;
  background: url("./img/sx.png") no-repeat;
  background-size: cover;
  background-position: center;
}
.imgContainer {
  height: 320px;
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid #adadad;
  box-shadow: 0px 0px 2px #adadad;
  border-radius: 15px;
}
.imgContainer > h3 {
  text-align: center;
  margin: 0;
  margin-bottom: 10px;
}
.imgBox {
  width: 100%;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
  background-position: center; /* 确保图片居中显示 */
}

.imgBlock {
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 10;
  background-size: cover;
  cursor: move;
  border-radius: 4px; /* 添加圆角 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* 添加阴影 */
}
.imgGap {
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 4px; /* 与拼图块保持一致 */
  border: 1px dashed #ccc; /* 添加虚线边框更明显 */
}
.slider {
  width: 100%;
  height: 30px;
  margin: auto;
  margin-top: 15px;
  background-color: #ddd;
  border-radius: 10px;
  position: relative;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  font-weight: 200;
}
.slider > button {
  position: absolute;
  left: 0;
  top: -5px;
  width: 40px;
  height: 40px;
  z-index: 20;
  cursor: pointer;
  background: white url("./yz.png") no-repeat;
  background-size: 100%;
  border-radius: 50%;
  border: 0;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
.slider > span {
  transition: all 0.5s;
}
</style>
