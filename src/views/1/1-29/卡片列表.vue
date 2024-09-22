<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <section class="layout-page-box">
          <div class="item-box card-0">
            <span class="card-icon">A</span>
            <span class="card-info">
              <h3 class="title-1">
                标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行标题限制在一行
              </h3>
              <p class="desc">
                描述内容限制在4行-平时被问到最多的问题还是关于跨域的，其实跨域问题真的不是一个很难解决的问题。这里我来简单总结一下我推荐的几种跨域解决方案本项目的风格指南主要是参照
                vue
                官方的风格指南。在真正开始使用该项目之前建议先阅读一遍指南，这能帮助让你写出更规范和统一的代码
              </p>
            </span>
          </div>
          <div class="item-box card-1">
            <span class="card-icon">B</span>
            <span class="card-info">
              <h3 class="title-2">
                标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行
              </h3>
              <p class="desc">
                描述内容限制在4行-平时被问到最多的问题还是关于跨域的，其实跨域问题真的不是一个很难解决的问题。这里我来简单总结一下我推荐的几种跨域解决方案本项目的风格指南主要是参照
                vue
                官方的风格指南。在真正开始使用该项目之前建议先阅读一遍指南，这能帮助让你写出更规范和统一的代码
              </p>
            </span>
          </div>
          <div class="item-box card-2">
            <span class="card-icon">C</span>
            <span class="card-info">
              <h3 class="title-2">
                标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行
              </h3>
              <p class="desc">
                描述内容限制在4行-平时被问到最多的问题还是关于跨域的，其实跨域问题真的不是一个很难解决的问题。这里我来简单总结一下我推荐的几种跨域解决方案本项目的风格指南主要是参照
                vue
                官方的风格指南。在真正开始使用该项目之前建议先阅读一遍指南，这能帮助让你写出更规范和统一的代码
              </p>
            </span>
          </div>
          <div class="item-box card-3">
            <span class="card-icon">D</span>
            <span class="card-info">
              <h3 class="title-2">
                标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行
              </h3>
              <p class="desc">
                描述内容限制在4行-平时被问到最多的问题还是关于跨域的，其实跨域问题真的不是一个很难解决的问题。这里我来简单总结一下我推荐的几种跨域解决方案本项目的风格指南主要是参照
                vue
                官方的风格指南。在真正开始使用该项目之前建议先阅读一遍指南，这能帮助让你写出更规范和统一的代码
              </p>
            </span>
          </div>
          <div class="item-box card-4">
            <span class="card-icon">E</span>
            <span class="card-info">
              <h3 class="title-2">
                标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行标题限制在二行
              </h3>
              <p class="desc">
                描述内容限制在4行-平时被问到最多的问题还是关于跨域的，其实跨域问题真的不是一个很难解决的问题。这里我来简单总结一下我推荐的几种跨域解决方案本项目的风格指南主要是参照
                vue
                官方的风格指南。在真正开始使用该项目之前建议先阅读一遍指南，这能帮助让你写出更规范和统一的代码
              </p>
            </span>
          </div>
        </section>
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
    /* 卡片样式 */
    $cardArr: (
      0: #eea362,
      1: #da2128,
      2: #4889da,
      3: #29c5e8,
      4: #4e71fd,
    );
    @each $index, $colorBg in $cardArr {
      .card-#{$index} {
        background: rgba($colorBg, 0.1);

        .card-icon {
          height: 45px;
          width: 45px;
          text-align: center;
          line-height: 45px;
          border-radius: 5px;
          color: #fff;
          background: rgba($colorBg, 1);
          box-shadow: 0px 3px 8px rgba($colorBg, 0.3);
        }
      }
    }

    /* 文本超出省略 $line行数 */
    @mixin textOverEllipsis($line: 1) {
      text-align: justify;
      @if $line==1 {
        // 单行超出省略
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      } @else {
        // 多行超出省略
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: $line;
        -webkit-box-orient: vertical;
      }
    }

    // 标题超出一行省略
    .title-1 {
      @include textOverEllipsis(1);
    }

    // 标题超出二行省略
    .title-2 {
      @include textOverEllipsis(2);
    }

    // 描述内容超出三行省略
    .desc {
      @include textOverEllipsis(3);
    }

    // 布局css
    .layout-page-box {
      padding: 20px;
      box-sizing: border-box;
      .item-box {
        width: 400px;
        display: flex;
        border-radius: 5px;
        padding: 20px;
        margin-bottom: 20px;
        .card-info {
          width: 0px;
          flex-grow: 1;
          margin-left: 20px;
        }
        h3 {
          padding: 0px;
          margin: 0px;
          font-size: 13px;
          margin-bottom: 10px;
        }
        p {
          margin: 0px;
          font-size: 12px;
          color: #999;
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
