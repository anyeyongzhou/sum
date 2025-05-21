<template>
  <div class="gallery-container">
    <ul>
      <li v-for="(image, index) in images" :key="index">
        <img :src="image" />
        <div>Night</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";
import img5 from "/@/assets/beauty/1/1-5.jpg";

const images = [img1, img2, img3, img4, img5];
</script>

<style lang="scss" scoped>
.gallery-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(white, black);
}

ul {
  width: 550px !important;
  height: 300px;
  overflow: hidden;
  cursor: pointer;

  li {
    float: left;
    width: 110px;
    height: 300px;
    list-style: none;
    transition: all 1s;
    position: relative;

    &::after {
      content: "Night";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 450px;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      color: rgb(243, 230, 230);
      background-color: rgba(48, 46, 46, 0.5);
    }

    img {
      height: 100%;
      width: 100%;
    }
  }
}

ul:hover li {
  width: 25px;
}

ul li:hover {
  width: 440px;

  height: 1200px;
}
</style>
