<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <div class="pictures">
          <div v-for="(item, index) in imgList" :key="index" class="picture">
            <!-- <el-image
              :src="item"
              lazy
              loading="lazy"
              fit="contain"
              class="img"
            ></el-image> -->
            <img :src="item" class="img" alt="" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="code">
          <pre><code>{{ indexFile }}</code></pre>
        </div>
      </template>
    </div>
    <!-- <div class="tip" v-marked:hl="markdownContent"></div> -->
    <div class="button">
      <el-button type="primary" @click="handleClick">{{
        buttonContent
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import img1 from "./san.jpg";
import img2 from "./star.jpg";
import img3 from "./candy.jpg";
import img4 from "./heart.jpg";
import img5 from "/@/assets/beauty/8/8-9.jpg";
import { useRoute } from "vue-router";
import { marked } from "marked";
import "highlight.js/styles/monokai-sublime.css";

const route = useRoute();
const flag = ref(true);
const buttonContent = ref("查看代码");
const indexFile = ref("");

const handleClick = async () => {
  flag.value = !flag.value;
  buttonContent.value = flag.value ? "查看代码" : "返回";

  if (!flag.value) {
    const filePath = `./${route.meta.title}.vue?raw`;
    try {
      const module = await import(filePath);
      indexFile.value = module.default;
    } catch (error) {
      console.error("加载文件错误:", error);
    }
  }
};

const imgList = ref([img1, img2, img3, img4, img5]);
</script>

<style lang="scss" scoped>
.home {
  height: 110%;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow-y: scroll;

  .container {
    width: 60%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;

    .pictures {
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
        "TL TL TR"
        "BL CE TR"
        "BL BR BR";
      gap: 10px;
      width: 500px;
      height: 500px;
      margin: auto;
      transform-origin: center;
      animation: rotation 10s linear infinite;
      .picture {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-content: center;
        border: 5px solid #696969;
        .img {
          width: 500%;
          animation: rotation 10s linear infinite reverse;
        }
      }

      .picture:nth-child(1) {
        grid-area: TL;
      }
      .picture:nth-child(2) {
        grid-area: TR;
      }
      .picture:nth-child(3) {
        grid-area: BL;
      }
      .picture:nth-child(4) {
        grid-area: CE;
      }
      .picture:nth-child(5) {
        grid-area: BR;
      }

      @keyframes rotation {
        to {
          transform: rotate(360deg);
        }
      }
      /* 鼠标悬停停止旋转 */
      // &:hover {
      //   animation-play-state: paused;
      // }
    }

    .code {
      padding: 20px;
      border: 1px solid gray;
      font-size: 20px;
    }
  }

  .tip {
    width: 30%;
    min-height: 100px;
    max-height: 600px;
    position: fixed;
    right: 50px;
    top: 200px;
    overflow-y: scroll;
    padding: 10px;
    background-color: #e0e0e0;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }

  .button {
    position: fixed;
    right: 50px;
    top: 130px;
  }
}
</style>
