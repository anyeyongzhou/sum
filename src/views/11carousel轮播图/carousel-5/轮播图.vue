<template>
  <div class="swiper">
    <input id="switchButton" type="checkbox" class="switch" v-model="isAuto" />
    <div class="switch-box">
      <label for="switchButton"></label>
    </div>
    <input type="radio" name="btn" id="btn1" v-model="currentIndex" value="0" />
    <input type="radio" name="btn" id="btn2" v-model="currentIndex" value="1" />
    <input type="radio" name="btn" id="btn3" v-model="currentIndex" value="2" />
    <input type="radio" name="btn" id="btn4" v-model="currentIndex" value="3" />
    <input type="radio" name="btn" id="btn5" v-model="currentIndex" value="4" />
    <input type="radio" name="btn" id="btn6" v-model="currentIndex" value="5" />
    <input type="radio" name="btn" id="btn7" v-model="currentIndex" value="6" />
    <label class="swiperBtn" for="btn1"></label>
    <label class="swiperBtn" for="btn2"></label>
    <label class="swiperBtn" for="btn3"></label>
    <label class="swiperBtn" for="btn4"></label>
    <label class="swiperBtn" for="btn5"></label>
    <label class="swiperBtn" for="btn6"></label>
    <label class="swiperBtn" for="btn7"></label>

    <ul :style="{ marginLeft: `${-currentIndex * imgWidth}px` }">
      <li v-for="(img, index) in images" :key="index">
        <img :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";
import img5 from "/@/assets/beauty/1/1-5.jpg";
import img6 from "/@/assets/beauty/1/1-6.jpg";
import img7 from "/@/assets/beauty/1/1-7.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7];

const imgWidth = 857; // 每张图片的宽度
const currentIndex = ref(0);
const isAuto = ref(false);

// 自动播放效果
watch(isAuto, newVal => {
  if (newVal) {
    const interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % images.length;
    }, 3000);
    return () => clearInterval(interval);
  }
});
</script>

<style lang="scss" scoped>
input {
  display: none;
}

.swiper {
  width: 857px !important;
  height: 441px;
  position: relative;
  overflow: hidden;
}

.switch-box {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 50px;
}

.switch {
  display: none;
}

.switch-box label {
  position: relative;
  display: block;
  margin: 1px;
  height: 26px;
  cursor: pointer;
}

.switch-box label::after {
  content: "";
  display: block;
  border-radius: 30px;
  height: 26px;
  background-color: #dcdfe6;
  transition: all 0.3s ease;
}

.switch-box label::before {
  content: "";
  position: absolute;
  top: calc(50% - 13px);
  left: calc(50% - 13px);
  width: 26px;
  height: 26px;
  border-radius: 100%;
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.switch:checked ~ .switch-box > label::before {
  transform: translateX(24px);
}

.switch:checked ~ .switch-box > label::after {
  background-color: #00a1d6;
}

.swiperBtn {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid #fff;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  bottom: 30px;
}

label[for="btn1"] {
  left: 35%;
}
label[for="btn2"] {
  left: 40%;
}
label[for="btn3"] {
  left: 45%;
}
label[for="btn4"] {
  left: 50%;
}
label[for="btn5"] {
  left: 55%;
}
label[for="btn6"] {
  left: 60%;
}
label[for="btn7"] {
  left: 65%;
}

ul {
  display: flex;
  transition: 0.5s;
}

li {
  width: 857px;
  height: 441px;
  list-style-type: none;
}

input[type="radio"]:checked ~ ul {
  margin-left: calc(-857px * var(--index));
}

input[type="radio"]:checked ~ label {
  background-color: #f00;
}
</style>
