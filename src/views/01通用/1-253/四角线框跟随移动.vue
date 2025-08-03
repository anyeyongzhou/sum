<template>
  <div class="container">
    <div class="pointer" ref="pointerRef"></div>
    <div class="item" v-for="(item, index) in imgList" :key="index">
      <el-image
        :src="item"
        :ref="imgListRef[index]"
        lazy
        loading="lazy"
        fit="fill"
        class="img"
      ></el-image>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import img1 from "/@/assets/beauty/8/8-1.jpg";
import img2 from "/@/assets/beauty/8/8-2.jpg";
import img3 from "/@/assets/beauty/8/8-3.jpg";
import img4 from "/@/assets/beauty/8/8-4.jpg";
import img5 from "/@/assets/beauty/8/8-5.jpg";
import img6 from "/@/assets/beauty/8/8-6.jpg";
import img7 from "/@/assets/beauty/8/8-7.jpg";
import img8 from "/@/assets/beauty/8/8-8.jpg";
import img9 from "/@/assets/beauty/8/8-9.jpg";

const imgList = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
const pointerRef = ref(null);
const imgRef1 = ref(null);
const imgRef2 = ref(null);
const imgRef3 = ref(null);
const imgRef4 = ref(null);
const imgRef5 = ref(null);
const imgRef6 = ref(null);
const imgRef7 = ref(null);
const imgRef8 = ref(null);
const imgRef9 = ref(null);
const imgListRef = ref([
  imgRef1,
  imgRef2,
  imgRef3,
  imgRef4,
  imgRef5,
  imgRef6,
  imgRef7,
  imgRef8,
  imgRef9,
]);

const mouseEnterEvent = () => {
  const imgs = document.querySelectorAll(".container .img");

  for (const img of imgs) {
    img.onmouseenter = e => {
      pointerRef.value.style.setProperty("--x", img.offsetLeft + "px");
      pointerRef.value.style.setProperty("--y", img.offsetTop + "px");
      pointerRef.value.style.setProperty("--s", img.offsetWidth + "px");
    };
  }
};

onMounted(() => {
  mouseEnterEvent();
});
</script>

<style lang="scss" scoped>
.container {
  width: 600px !important;
  height: 600px;
  background-color: #000;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  .pointer {
    position: absolute;
    --l: 30px; /* 边框长度 */
    --g: 15px; /* 边框和图片的间隔 */
    --t: 3px; /* 边框的粗细 */
    --s: 200px; /* 图片的大小 */
    --x: 0px;
    --y: 0px;
    width: calc(var(--s) + var(--g) * 2);
    height: calc(var(--s) + var(--g) * 2);
    border: var(--t) solid #fff;
    left: calc(var(--x) - var(--g));
    top: calc(var(--y) - var(--g));
    transition: 0.5s;
    --mask: conic-gradient(at var(--l) var(--l), transparent 75%, red 75%) 0 0 /
      calc(100% - var(--l)) calc(100% - var(--l));
    mask: var(--mask);
    -webkit-mask: var(--mask);
  }
  .item {
    width: 30%;
    height: 30%;

    .img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
