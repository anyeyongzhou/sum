<template>
  <div>
    <button @click="updateImgUrl">修改图片</button>
    <cropper :url="clipImgCfg.url" @clip-img="clipImg" />
  </div>
</template>

<script setup>
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import cropper from "./components/cropperjs.vue";

const clipImgCfg = reactive({
  url: img1,
  rt: 1 / 1,
});

const updateImgUrl = () => {
  clipImgCfg.url = img2;
  clipImgCfg.rt = 16 / 9;
};

// 裁剪后的图片事件
const clipImg = imgData => console.log(imgData);
</script>
