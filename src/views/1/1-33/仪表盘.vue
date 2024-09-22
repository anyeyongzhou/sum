<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <!-- 仪表盘组件 start -->
        <div class="ui-dash-box">
          <!-- value start -->
          <h1>78</h1>
          <h3>100</h3>
          <!-- value end -->
          <!-- bg start -->
          <div class="ui-dash-bg"><i /><i /><i /><i /><i /></div>
          <!-- bg end -->
        </div>
        <!-- 仪表盘组件 end -->
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
    // 仪表盘组件css集 ----------------
    .ui-dash-box {
      $boxSize: 180px; //仪表盘宽高大小
      $boxBg: #090f1f; //仪表盘背景色

      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: $boxSize;
      height: $boxSize;
      h1,
      h3 {
        font-weight: normal;
        z-index: 100;
        margin-bottom: 60px;
      }
      // 仪表盘值css
      h1 {
        font-size: 36px;
        color: #fff;
        margin-left: 60px;
      }
      h3 {
        font-size: 14px;
        color: #b9b9b9;
        padding-top: 14px;
        &::before {
          content: "/";
          font-size: 14px;
          padding: 0px 3px 0px 5px;
        }
      }
      // 仪表盘底座css
      .ui-dash-bg {
        position: absolute;
        width: $boxSize;
        height: $boxSize;
        background: $boxBg;
        transform: rotateX(37deg) rotateY(25deg) rotateZ(15deg);
        // 动画-顺时针旋转
        @keyframes animationRotateZ {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        // 动画-逆时针旋转
        @keyframes animationRotateF {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        // 动画-3D上下移动
        @keyframes animationMove {
          0% {
            top: 20px;
          }
          50% {
            top: -30px;
          }
          100% {
            top: 20px;
          }
        }
        // 动画-透明度变化
        @keyframes animationOpacity {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }
        // 动画-透明度&圆半径变化
        @keyframes animationSize {
          0% {
            opacity: 1;
            width: 90px;
            height: 90px;
          }
          50% {
            opacity: 0.6;
            width: 60px;
            height: 60px;
          }
          100% {
            opacity: 1;
            width: 90px;
            height: 90px;
          }
        }

        i {
          display: block;
          position: absolute;
          border-radius: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;

          &:nth-child(1) {
            width: $boxSize - 40;
            height: $boxSize - 40;
            background: conic-gradient(#f1b434 0%, transparent 120%);
            mask: radial-gradient(
              circle at center,
              transparent 0px 56%,
              #000 58% 90%,
              transparent 91% 100%
            );
            top: -40px;
            z-index: 80;
            animation: animationRotateZ 3s linear infinite;
          }

          &:nth-child(2) {
            width: $boxSize - 10;
            height: $boxSize - 10;
            border: 1px dashed rgba(241, 180, 52, 0.6);
            // box-shadow: inset 1px 1px 5px rgba(241, 180, 52,0.3);
            top: 10px;
            right: 10px;
            z-index: 60;
          }

          &:nth-child(3) {
            width: $boxSize - 80;
            height: $boxSize - 80;
            background-image: radial-gradient(
              rgba(241, 180, 52, 0.7),
              transparent
            );
            filter: blur(9px);
            top: -40px;
            right: -10px;
            z-index: 70;
            box-shadow: -6px 15px 30px rgba(241, 180, 52, 0.4);
            animation: animationOpacity 2s linear infinite;
          }

          &:nth-child(4) {
            width: $boxSize - 50;
            height: $boxSize - 50;
            border: 2px solid rgba(241, 180, 52, 0.4);
            top: 20px;
            right: 10px;
            box-shadow: -6px 15px 30px rgba(241, 180, 52, 0.2);
            z-index: 60;
            animation: animationMove 3s linear infinite;
          }

          &:nth-child(5) {
            width: 90px;
            height: 90px;
            border: 1px solid rgba(241, 180, 52, 0.6);
            top: -50px;
            right: 0px;
            z-index: 10;
            animation: animationSize 2s linear infinite;
          }
        }
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
