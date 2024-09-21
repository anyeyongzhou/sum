<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Title
          :orderNum="1"
          context="echarts"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div ref="chartRef" style="width: 100%; height: 400px"></div>
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
import { useECharts } from "./useEchart";
import { OnlineUserAPI } from "./data";
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

  setTimeout(() => {
    options.series[0].data = [210, 200, 200, 200, 200, 220, 280];
  }, 1000);
});

const chartRef = ref(null);
const { options } = useECharts(
  chartRef,
  OnlineUserAPI.STREAM_SSE.chartOptions()
);
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

    .face {
      display: flex;
      justify-content: center;

      .face-inner {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: linear-gradient(
          180deg,
          rgb(255, 207, 5),
          rgb(255, 240, 36)
        );
        position: relative;
        top: 50px;
        box-shadow: inset 0 0 3px rgb(15, 15, 9), inset 0 0 5px rgb(15, 15, 9);
      }

      .face-inner::after {
        content: "";
        position: absolute;
        bottom: 12%;
        left: 50%;
        transform: translateX(-50%);
        width: 90px;
        height: 40px;
        background-color: rgb(255, 199, 45);
        border-radius: 0 0 70px 70px;
        box-shadow: inset 0 0 5px rgb(53, 53, 53);
      }

      .eye {
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: inset 0 0 5px rgb(58, 58, 58);
      }

      .eye::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 5%;
        transform: translateY(-50%);
        width: 50%;
        height: 50%;
        background-color: #000;
        border-radius: 50%;
        box-shadow: inset 0 0 3px white, inset 0 0 5px white;
      }

      .eye:nth-child(1) {
        top: 26%;
        left: 12%;
      }

      .eye:nth-child(2) {
        top: 26%;
        right: 12%;
      }
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
