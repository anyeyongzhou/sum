<template>
  <div class="home">
    <div class="containers">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <Title
          :orderNum="1"
          context="心形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="heart"></div>
        <Title
          :orderNum="2"
          context="八边形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="octagon"></div>
        <Title
          :orderNum="3"
          context="六边形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="hexagon"></div>
        <Title
          :orderNum="3"
          context="五边形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="pentagon"></div>
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
  // border: 1px solid #0f0;

  .containers {
    width: 60%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;

    /* 编写CSS begin */
    .heart {
      position: relative;
      width: 100px;
      height: 90px;

      &::before {
        position: absolute;
        content: "";
        left: 50px;
        top: 0;
        width: 50px;
        height: 80px;
        background: #f00;
        border-radius: 50px 50px 0 0;
        transform: rotate(-45deg);
        transform-origin: 0 100%;
      }

      &::after {
        position: absolute;
        content: "";
        left: 0px;
        top: 0;
        width: 50px;
        height: 80px;
        background: #0f0;
        border-radius: 50px 50px 0 0;
        transform: rotate(45deg);
        transform-origin: 100% 100%;
      }
    }

    .octagon {
      position: relative;
      width: 100px;
      height: 100px;
      background: #f00;

      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        border-left: 29px solid #fff;
        border-right: 29px solid #fff;
        // border-top: 29px solid #00f;
        border-bottom: 29px solid #0f0;
        width: 42px;
        height: 0;
      }

      &::after {
        position: absolute;
        content: "";
        bottom: 0;
        left: 0;
        border-left: 29px solid #fff;
        border-right: 29px solid #fff;
        border-top: 29px solid red;
        width: 42px;
        height: 0;
      }
    }

    .hexagon {
      position: relative;
      top: 50px;
      width: 100px;
      height: 55px;
      background: red;

      &::before {
        position: absolute;
        content: "";
        top: -25px;
        left: 0;
        border-left: 50px solid #fff;
        border-right: 50px solid #fff;
        border-bottom: 25px solid red;
        width: 0;
        height: 0;
      }
      &::after {
        position: absolute;
        content: "";
        bottom: -25px;
        left: 0;
        border-left: 50px solid #fff;
        border-right: 50px solid #fff;
        border-top: 25px solid red;
        width: 0;
        height: 0;
      }
    }

    .pentagon {
      position: relative;
      top: 50px;
      width: 90px;
      border-width: 50px 18px 0 18px;
      border-style: solid;
      border-color: red transparent;
      &::before {
        position: absolute;
        content: "";
        top: -85px;
        left: -18px;
        width: 0;
        height: 0;
        border-width: 0 45px 35px 45px;
        border-style: solid;
        border-color: transparent transparent red transparent;
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
