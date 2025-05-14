<template>
  <div>
    <div class="top">
      <marquee behavior="alternate">露从今夜白，月是故乡明</marquee>
    </div>
    <div class="box">
      <div class="pic">
        <ul>
          <li v-for="(image, index) in images" :key="index">
            <img :src="image.src" :alt="image.alt" />
          </li>
        </ul>
      </div>
    </div>
    <div id="text">{{ displayedText }}</div>
    <audio :src="map3Source" hidden loop autoplay></audio>
    <div
      class="snowflakes xh"
      v-for="snowflake in snowflakes"
      :key="snowflake.id"
      :style="snowflake.style"
    >
      ❉
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import img1 from "./images/ST.png";
import img2 from "./images/jc.png";
import img3 from "./images/lh.png";
import img4 from "./images/mc.png";
import img5 from "./images/wy.png";
import img6 from "./images/hy.png";

import map3Source from "./dyrcj.mp3";

const images = [
  { src: img1, alt: "Image 1" },
  { src: img2, alt: "Image 2" },
  { src: img3, alt: "Image 3" },
  { src: img4, alt: "Image 4" },
  { src: img5, alt: "Image 5" },
  { src: img6, alt: "Image 6" },
];

const displayedText = ref("");
const text =
  "灯光渐渐地暗了下去，月色便又亮了起来，洒满整个天空。城市和天空，在这样的夜色里，彼此相辉映。每一辆车都载着不同的夜归人，有人在这座城市里停留歇息，有人背着行囊远走他乡。";
let index = 0;

const snowflakes = ref([]);

onMounted(() => {
  // Typing effect
  const typingInterval = setInterval(() => {
    if (index < text.length) {
      displayedText.value += text.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }, 100);

  // Snowflake generation
  setInterval(() => {
    const flake = {
      id: Date.now() + Math.random(),
      style: {
        position: "absolute",
        top: "0px",
        left: `${Math.random() * window.innerWidth}px`,
        opacity: Math.random() * 0.3 + 0.7,
        fontSize: `${Math.random() * 45 + 5}px`,
        color: "#fff",
      },
    };
    snowflakes.value.push(flake);

    // Animate snowflake
    setTimeout(() => {
      flake.style.top = `${window.innerHeight - 100}px`;
      flake.style.opacity = "0.1";
    }, 100);

    setTimeout(() => {
      snowflakes.value = snowflakes.value.filter(s => s.id !== flake.id);
    }, 5000);
  }, 100);
});
</script>

<style scoped>
.top {
  width: 400px !important;
  height: 100px;
  margin: 60px auto;
  font-size: 30px;
  font-family: "华文行楷";
  color: #fff;
  background: url("./images/timg.jpg");
  background-size: cover;
  overflow: hidden;
}

.box {
  width: 310px;
  height: 310px;
  margin: auto;
  perspective: 800px;
}

.box .pic {
  position: relative;
  transform-style: preserve-3d;
  animation: play 10s linear infinite;
}

.box ul {
  list-style: none;
  position: absolute;
  top: 0;
  left: 0;
}

@keyframes play {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

#text {
  width: 500px;
  height: 200px;
  color: #6fade1;
  margin: auto;
  font-size: 24px;
}

.xh {
  position: absolute;
  font-size: 20px;
  color: #fff;
  animation: snowflake 15s linear infinite;
}

@keyframes snowflake {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100vh);
  }
}
</style>
