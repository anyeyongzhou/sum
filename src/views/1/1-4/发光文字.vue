<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Title
          :orderNum="1"
          context="利用text-shadow实现发光文字"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="glowing-text">发光文字</div>
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
  markdownContent.value = marked(mdFileContent.default);
});
/* 不改的代码 end */
</script>

<style lang="scss" scoped>
.home {
  height: 110%;
  width: 100%;
  background-color: #000;
  position: relative;
  overflow-y: scroll;

  .container {
    width: 60%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;

    /* 编写CSS begin */
    .glowing-text {
      font-size: 48px; /* 字体大小 */
      color: transparent; /* 文字颜色透明 */
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.5),
        /* 外层发光 */ 0 0 10px rgba(255, 255, 255, 0.7),
        /* 中层发光 */ 0 0 20px rgba(255, 0, 0, 1),
        /* 红色发光 */ 0 0 30px rgba(255, 0, 0, 1); /* 红色发光 */
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 0, 0, 1);
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
