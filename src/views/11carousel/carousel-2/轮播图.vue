<template>
  <div class="wrapper" ref="wrapper">
    <img
      v-for="(img, index) in images"
      :key="index"
      :src="img"
      alt=""
      :class="{ active: index === curDisplay }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";
import img5 from "/@/assets/beauty/1/1-5.jpg";

const images = [img1, img2, img3, img4, img5];

const curDisplay = ref(0);
const wrapper = ref(null);
let timer = null;

const initCarousel = () => {
  const oImg = wrapper.value.querySelectorAll("img");
  const hLen = Math.floor(oImg.length / 2);

  oImg.forEach((img, index) => {
    img.style.transform = "";
  });

  for (let i = 0; i < hLen; i++) {
    const lNum = curDisplay.value - i - 1;
    const rNum = (curDisplay.value + i + 1) % oImg.length;

    if (lNum >= 0) {
      oImg[lNum].style.transform = `translateX(${
        -150 * (i + 1)
      }px) translateZ(${200 - i * 100}px) rotateY(30deg)`;
    }
    if (rNum < oImg.length) {
      oImg[rNum].style.transform = `translateX(${150 * (i + 1)}px) translateZ(${
        200 - i * 100
      }px) rotateY(-30deg)`;
    }
  }

  oImg[curDisplay.value].style.transform = "translateZ(300px)";
};

const bindEvent = () => {
  const oImg = wrapper.value.querySelectorAll("img");

  oImg.forEach((img, index) => {
    img.addEventListener("click", () => {
      if (index !== curDisplay.value) {
        curDisplay.value = index;
        initCarousel();
      }
    });

    img.addEventListener("mouseenter", () => {
      clearInterval(timer);
    });

    img.addEventListener("mouseleave", () => {
      play();
    });
  });
};

const play = () => {
  timer = setInterval(() => {
    curDisplay.value = (curDisplay.value + 1) % images.length;
    initCarousel();
  }, 2000);
};

onMounted(() => {
  initCarousel();
  bindEvent();
  play();
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  transform-style: preserve-3d;
  perspective: 800px;
  height: 200px;
  margin-top: 200px;
}
.wrapper img {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 200px;
  margin-left: -150px;
  margin-top: -100px;
  border-radius: 8px;
  transition: transform 0.5s ease-in-out;
}
.active {
  transform: translateZ(300px);
}
</style>
