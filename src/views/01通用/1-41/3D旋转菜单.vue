<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <div class="menu">
          <div
            v-for="(item, index) in MENU_LIST"
            :key="index"
            class="menu-item"
            @click="linkTo(xxx)"
          >
            <el-image
              :src="item.icon"
              lazy
              loading="lazy"
              fit="contain"
              class="img"
            ></el-image>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="code">
          <pre><code>{{ indexFile }}</code></pre>
        </div>
      </template>
    </div>
    <div class="tip" v-marked:hl="markdownContent"></div>
    <div class="button">
      <el-button type="primary" @click="handleClick">{{
        buttonContent
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import img1 from "/@/assets/beauty/1/1-22.jpg";
import img2 from "/@/assets/beauty/2/2-22.jpg";
import img3 from "/@/assets/beauty/3/3-21.jpg";
/* 不改的代码 begin */
import { useRoute } from "vue-router";
import { marked } from "marked";
import "highlight.js/styles/monokai-sublime.css";

const route = useRoute();
const flag = ref(true);
const buttonContent = ref("查看代码");
const indexFile = ref(""); // 用于存储动态加载的内容

const handleClick = async () => {
  flag.value = !flag.value;
  buttonContent.value = flag.value ? "查看代码" : "返回";

  if (!flag.value) {
    // 动态加载 .vue 文件的原始内容
    const filePath = `./${route.meta.title}.vue?raw`; // 根据实际路径设置
    try {
      const module = await import(filePath);
      indexFile.value = module.default; // 读取原始代码
    } catch (error) {
      console.error("加载文件错误:", error);
    }
  }
};

const markdownContent = ref(null);
onMounted(async () => {
  const mdFileContent = await import("./code.md?raw");
  const replaceUrl = `../src/views/${route.name.split("-").at(0)}/${
    route.fullPath
  }`;
  const markdownText = marked(mdFileContent.default);
  markdownContent.value = markdownText
    .replace(/src="(images\/code\/\d+\.png)"/, `src="${replaceUrl}/$1"`)
    .replace(/(<img[^>]*)(>)/, '$1 style="width:100%;height:100%;"$2');
});
/* 不改的代码 end */

const MENU_LIST = [
  {
    icon: img1,
    name: "菜单1",
  },
  {
    icon: img2,
    name: "菜单2",
  },
  {
    icon: img3,
    name: "菜单3",
  },
];
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
    /* 编写CSS begin */
    .menu {
      position: relative;
      width: 100%;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: url("/@/assets/beauty/4/4-1.jpg") 100% 100% no-repeat;
      .menu-item {
        width: 376px;
        height: 436px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 33px 0;
        position: absolute;
        cursor: pointer;

        .img {
          width: 100px;
          height: 150px;
        }
        //3个卡片,x和y轴动画加起来是20s , 20s/3 约等于 6.667s
        //每个球y轴动画延迟 从0递减2.857s,x轴与y相差动画时长的一半（10s/2）
        &:nth-child(1) {
          animation: animateX 10s cubic-bezier(0.36, 0, 0.64, 1) -5s infinite alternate,
            animateY 10s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
            scaleAnimate 20s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite
              alternate;
        }
        &:nth-child(2) {
          animation: animateX 10s cubic-bezier(0.36, 0, 0.64, 1) -11.667s infinite
              alternate,
            animateY 10s cubic-bezier(0.36, 0, 0.64, 1) -6.667s infinite alternate,
            scaleAnimate 20s cubic-bezier(0.36, 0, 0.64, 1) -6.667s infinite alternate;
        }

        &:nth-child(3) {
          animation: animateX 10s cubic-bezier(0.36, 0, 0.64, 1) -18.334s infinite
              alternate,
            animateY 10s cubic-bezier(0.36, 0, 0.64, 1) -13.334s infinite alternate,
            scaleAnimate 20s cubic-bezier(0.36, 0, 0.64, 1) -13.334s infinite alternate;
        }
      }
    }
    @keyframes animateX {
      0% {
        left: -50px;
      }
      100% {
        left: 75%;
      }
    }

    @keyframes animateY {
      0% {
        top: -100px;
      }
      100% {
        top: 400px;
      }
    }

    @keyframes scaleAnimate {
      0% {
        transform: scale(0.6);
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.6);
      }
    }

    /* 编写CSS end */

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
