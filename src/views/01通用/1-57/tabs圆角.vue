<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <Title
          :orderNum="1"
          context="tabs圆角"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="tab-list">
          <div
            v-for="tab in tabList"
            :key="tab.id"
            class="tab-item"
            :class="activeTab === tab.id ? 'tab-selected' : ''"
            @click="onTab(tab.id)"
          >
            <image :src="tab.icon" class="tab-icon" />
            <div>{{ tab.label }}</div>
          </div>
        </div>
        <Title
          :orderNum="2"
          context="曲线圆角"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="tab-list1">
          <div
            v-for="tab in tabList"
            :key="tab.id"
            class="tab-item"
            :class="activeTab === tab.id ? 'tab-selected' : 'not-selected'"
            @click="onTab(tab.id)"
          >
            <image :src="tab.icon" class="tab-icon" />
            <div>{{ tab.label }}</div>
          </div>
        </div>
        <Title
          :orderNum="3"
          context="clip-path path函数实现"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="wrap">
          <div class="tabs">
            <template v-for="index in 3" :key="index">
              <div
                @click="onTab(index)"
                class="tab"
                :class="activeTab == index ? 'active' : ''"
              >
                <p>标签+{{ index }}</p>
              </div>
            </template>
          </div>
          <div class="content-wrap"></div>
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

import img1Url from "/@/assets/beauty/1/1-1.png";
import img2Url from "/@/assets/beauty/1/1-2.png";
import img3Url from "/@/assets/beauty/1/1-3.png";

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
const tabList = [
  {
    id: 0,
    icon: "/@/assets/beauty/1/1-1.png",
    label: "数据报告",
  },
  {
    id: 1,
    icon: "/@/assets/beauty/1/1-2.png",
    label: "数据建模",
  },
  {
    id: 2,
    icon: "/@/assets/beauty/1/1-3.png",
    label: "数据诊断",
  },
];

const activeTab = ref(0);
const onTab = id => {
  if (activeTab.value != id) {
    activeTab.value = id;
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 110%;
  width: 100%;
  background-color: pink;
  position: relative;
  overflow-y: scroll;

  .container {
    width: 60%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;

    /* 编写CSS begin */
    $tab-height: 52px;
    $tab-bgcolor: #e2e8f8;
    $active-color: #fff;
    $default-color: #e2e8f8;
    $primary-color: #000;
    .tab-list {
      display: flex;
      border-radius: 12px 12px 0 0;
      background-color: $tab-bgcolor;
      overflow: hidden;

      .tab-item {
        flex: 1;
        height: $tab-height;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        opacity: 0.65;
        color: $primary-color;
        font-weight: 600;
        position: relative;
        cursor: pointer;
      }

      .tab-icon {
        width: 17px;
        height: 17px;
        margin-right: 4px;
      }

      .tab-selected {
        opacity: 1;
        background: #ffffff;
        border-radius: 12px 12px 0 0;
        // box-shadow: 12px 12px 0 0 #fff, -12px 12px 0 0 #fff;
      }

      .tab-selected::before {
        content: "";
        position: absolute;
        left: -12px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        background: $tab-height;
        border-radius: 0 0 12px 0;
      }

      .tab-selected::after {
        content: "";
        position: absolute;
        right: -12px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        background: $tab-bgcolor;
        border-radius: 0 0 0 12px;
      }
    }

    .tab-list1 {
      display: flex;
      position: relative;
      z-index: 2;
      border-radius: 12px 12px 0 0;
      background-color: $tab-bgcolor;
      overflow: hidden;

      .tab-item {
        flex: 1;
        height: $tab-height;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        // opacity: 0.65;
        color: $primary-color;
        font-weight: 600;
        position: relative;
        cursor: pointer;
      }

      .tab-icon {
        width: 17px;
        height: 17px;
        margin-right: 4px;
        margin-top: 1px;
      }

      .tab-selected {
        opacity: 1;
        background: #ffffff;
        border-radius: 12px 12px 0 0;
        box-shadow: 24px 40px 0 $active-color, -24px 40px 0 0 $active-color;
      }

      .tab-selected::before {
        content: "";
        position: absolute;
        left: -6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        border-top-left-radius: 12px;
        background-color: $active-color;
        transform: skewX(-15deg); // 重点
      }
      .tab-selected::after {
        content: "";
        position: absolute;
        right: -6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        border-top-right-radius: 12px;
        background-color: $active-color;
        transform: skewX(15deg); // 重点
      }

      .not-selected::before {
        content: "";
        position: absolute;
        left: 6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        background: $default-color;
        border-bottom-left-radius: 12px;

        transform: skewX(15deg); // 重点
      }
      .not-selected::after {
        content: "";
        position: absolute;
        right: 6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        background: $default-color;
        z-index: 3;
        border-bottom-right-radius: 12px;
        transform: skewX(-15deg); // 重点
      }
    }
    .wrap {
      background-color: #eee;
      width: 100%;
      margin: 0 auto;
      padding: 10px;

      .tabs {
        display: flex;
        width: 100%;
        overflow: hidden;
        border-radius: 8px 8px 0 0;
        background: linear-gradient(#cdd9fe, #e2e9fd);
      }

      .tab {
        flex: 0 0 33.34%;
        height: 50px;
        cursor: pointer;
        position: relative;
        text-align: center;
        line-height: 50px;
      }

      .tab.active {
        background-color: #fff;
        color: #4185ef;
      }
      .tab.active:before {
        content: "";
        position: absolute;
        top: 0;
        left: -50px;
        height: 100%;
        width: 50px;
        z-index: 2;
        background-color: #fff;
        clip-path: path("M 0,50 C 25,50 25,0 50,0 L 50, 50 Z");
      }

      .tab.active:after {
        content: "";
        position: absolute;
        top: 0;
        right: -50px;
        height: 100%;
        width: 50px;
        z-index: 2;
        background-color: #fff;
        clip-path: path("M 0,0 C 25,0 25,50 50,50 L 0, 50 Z");
      }

      .content-wrap {
        min-height: 200px;
        background-color: #fff;
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
