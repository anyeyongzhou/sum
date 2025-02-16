<template>
  <div class="home">
    <div class="containers">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <div class="cards">
          <div class="container">
            <template v-for="(item, index) in cardList" :key="index">
              <div class="card" @click="scrollToCenter($event)">{{ item }}</div>
            </template>
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

const cardList = [
  "1111",
  "2222",
  "3333",
  "4444",
  "5555",
  "6666",
  "7777777",
  "8",
  "999",
  "1000000",
];

const scrollToCenter = e => {
  const element = e.target;
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect(); // 获取容器的数据
  const elementRect = element.getBoundingClientRect(); // 获取卡片的数据
  const offset = elementRect.left - containerRect.left; // 偏移量
  const containerCenter = containerRect.width / 2; // 获取容器中间位置
  const elementCenter = elementRect.width / 2; // 获取卡片的中间位置
  // container.scrollLeft 容器滑动多少 +  offset 偏移值 + ( elementCenter到达卡片一半的位置 - containerCenter达到一半宽的位置)
  // ( elementCenter到达卡片一半的位置 - containerCenter达到一半宽的位置) == 卡片左头那个地方
  const scrollPos =
    container.scrollLeft + offset - containerCenter + elementCenter;

  container.scrollTo({
    left: scrollPos,
    behavior: "smooth",
  });
};

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

  .containers {
    width: 60%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;
    /* 编写CSS begin */
    .cards {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      .container {
        width: 400px;
        height: 100%;
        border: 1px solid green;
        margin: 50px auto;
        overflow-x: auto; /* 启用水平滚动 */
        white-space: nowrap;
        border: 1px solid #ccc;
        position: relative;
        .card {
          display: inline-block;
          padding: 10px 20px;
          cursor: pointer;
          transition: background-color 0.3s;
          border: 1px solid #ccc;
          margin: 0 5px;
        }
        .card:hover {
          background-color: #f0f0f0;
        }
        &::-webkit-scrollbar {
          display: none; /* Chrome 和 Safari 隐藏滚动条 */
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
