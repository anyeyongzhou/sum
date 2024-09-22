<template>
  <div class="home">
    <div class="containers">
      <template v-if="flag">
        <Heads
          :orderNum="1"
          context="卡片悬浮发光"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="container">
          <!-- 方块盒子 -->
          <div class="item" ref="cardRef1"></div>
          <!-- 方块盒子 -->
          <div class="item" ref="cardRef2"></div>
          <!-- 方块盒子 -->
          <div class="item" ref="cardRef3"></div>
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
import { useLightCard } from "./hooks/use-light-card";
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

const { cardRef: cardRef1 } = useLightCard();
const { cardRef: cardRef2 } = useLightCard({
  light: {
    color: "#ffffff",
    width: 100,
  },
});
const { cardRef: cardRef3 } = useLightCard({
  light: {
    color: "yellow",
  },
});
</script>

<style lang="scss" scoped>
.home {
  height: 110%;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow-y: scroll;

  .containers {
    width: 60%;
    height: 100%;
    padding: 10px 10px 0 10px;
    border: 1px solid black;

    /* 编写CSS begin */
    .container {
      background: black;
      width: 100%;
      height: 60%;
      padding: 200px;
      display: flex;
      justify-content: space-between;

      .item {
        position: relative;
        width: 125px;
        height: 125px;
        background: #1c1c1f;
        border: 1px solid rgba(255, 255, 255, 0.1);
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
