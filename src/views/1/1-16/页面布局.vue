<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Title
          :orderNum="1"
          context="左边固定，右边自适应宽度"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <Title
          :orderNum="1"
          context="flex:1;"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="1"
        />
        <div class="card-content-wrap">
          <div class="left">左边元素固定宽度308px------------------</div>
          <div class="right">右边元素flex:1</div>
        </div>
        <Title
          :orderNum="2"
          context="当这个自适应元素（父元素）内部有子元素且子元素宽度大于父元素时"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="1"
        />
        <div class="card-content-wrap">
          <div class="left">左边元素固定宽度308px------------------</div>
          <div class="right">
            右边元素flex:1
            <div style="width: 920px; border: 1px #ff2d2d solid">
              子元素较大，导致左侧固定元素被挤压
            </div>
          </div>
        </div>
        <Title
          :orderNum="3"
          context="使用overflow: hidden"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="1"
        />
        <div class="card-content-wrap">
          <div class="left">左边元素固定宽度308px------------------</div>
          <div class="right right-3">
            右边元素flex:1
            <div style="width: 920px; border: 1px #ff2d2d solid">
              子元素较大，导致左侧固定元素被挤压,子元素较大，导致左侧固定元素被挤压,子元素较大，导致左侧固定元素被挤压
            </div>
          </div>
        </div>
        <Title
          :orderNum="4"
          context="使用width:0"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="1"
        />
        <div class="card-content-wrap">
          <div class="left">左边元素固定宽度308px------------------</div>
          <div class="right right-4">
            右边元素flex:1
            <div style="width: 920px; border: 1px #ff2d2d solid">
              子元素较大，导致左侧固定元素被挤压,子元素较大，导致左侧固定元素被挤压,子元素较大，导致左侧固定元素被挤压
            </div>
          </div>
        </div>
        <Title
          :orderNum="5"
          context="使用min-width:0"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="1"
        />
        <div class="card-content-wrap">
          <div class="left">左边元素固定宽度308px------------------</div>
          <div class="right right-5">
            右边元素flex:1
            <div style="width: 920px; border: 1px #ff2d2d solid">
              子元素较大，导致左侧固定元素被挤压,子元素较大，导致左侧固定元素被挤压,子元素较大，导致左侧固定元素被挤压
            </div>
          </div>
        </div>
        <Title
          :orderNum="6"
          context="左侧flex-shrink: 0;"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="1"
        />
        <div class="card-content-wrap">
          <div class="left6">左边元素固定宽度308px------------------</div>
          <div class="right-6">
            右边元素flex:1
            <div style="width: 920px; border: 1px #ff2d2d solid">
              子元素较大，导致左侧固定元素被挤压,子元素较大，导致左侧固定元素被挤压,子元素较大，导致左侧固定元素被挤压
            </div>
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
});
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

    .card-content-wrap {
      width: 750px;
      border: 1px solid blue;
      display: flex;
      justify-content: space-between;
      .left {
        width: 308px;
        margin-right: 16px;
        background-color: #f00;
      }
      .right {
        flex: 1;
        background-color: #0f0;
      }
      .right-3 {
        overflow: hidden;
      }
      .right-4 {
        width: 0;
        overflow: auto;
      }
      .right-5 {
        min-width: 0;
        overflow: auto;
      }
      .left6 {
        flex-shrink: 0;
      }
      .right-6 {
        // flex: 1 0 0;
        background-color: #0f0;
        overflow: auto;
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
