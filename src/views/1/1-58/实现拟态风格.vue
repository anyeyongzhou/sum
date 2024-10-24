<template>
  <div class="home">
    <div class="containers">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <Title
          :orderNum="1"
          context="凸起效果"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="container">
          <div class="soft-element"></div>
        </div>
        <Title
          :orderNum="2"
          context="凹陷效果"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="container1">
          <div class="soft-element"></div>
        </div>
        <Title
          :orderNum="3"
          context="完整效果"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="container2">
          <div class="soft-phone">
            <div class="header">
              <div class="btn">
                <i class="bi bi-chevron-left"></i>
              </div>
              <div class="header-title">Play</div>
              <div class="btn">
                <i class="bi bi-three-dots"></i>
              </div>
            </div>
            <div class="rotary"></div>
            <div style="font-size: 20px">Deep reason shallow</div>
            <div
              style="
                font-size: 14px;
                font-weight: 500;
                color: #a2adbe;
                margin: 10px;
              "
            >
              Eminem
            </div>

            <div class="tool">
              <div class="btn">
                <i class="bi bi-skip-start-fill"></i>
              </div>
              <div class="btn">
                <i class="bi bi-caret-right-fill"></i>
              </div>
              <div class="btn">
                <i class="bi bi-skip-end-fill"></i>
              </div>
            </div>

            <div class="progress"></div>

            <div class="footer">
              <div class="btn">
                <i class="bi bi-cast"></i>
              </div>
              <div class="btn">
                <i class="bi bi-list-ul"></i>
              </div>
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
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 200px;
      background: #f1f3f6;
      .soft-element {
        width: 185px;
        height: 185px;
        border-radius: 30px;
        background: linear-gradient(145deg, #ffffff, #f1f3f6);
        box-shadow: 6px 6px 18px #c6c7ca, -6px -6px 18px #ffffff;
      }
    }

    .container1 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 200px;
      background: #f1f3f6;
      .soft-element {
        width: 185px;
        height: 185px;
        border-radius: 30px;
        background: linear-gradient(145deg, #d9dbdd, #ffffff);
        box-shadow: 6px 6px 18px #c6c7ca, -6px -6px 18px #ffffff;
      }
    }

    .container2 {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 100%;
      height: 1000px;
      color: #5c7aaa;
      font-weight: 600;
      font-size: 18px;
      background: #f1f3f6;
      .soft-phone {
        width: 375px;
        height: 812px;
        border-radius: 60px;
        background: #f1f3f6;
        box-shadow: 15px 15px 30px #dee0e2, -15px -15px 30px #ffffff;
      }
      .header,
      .tool,
      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 45px 30px;
      }
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 45px;
        height: 45px;
        border-radius: 15px;
        background: #f1f3f6;
        box-shadow: 7px 7px 14px #dee0e2, -7px -7px 14px #ffffff;
      }
      .btn .bi::before {
        font-weight: 700 !important;
      }
      .rotary {
        width: 220px;
        height: 220px;
        margin: 0 auto 45px;
        border-radius: 130px;
        background: #f1f3f6;
        box-shadow: 21px 21px 43px #dee0e2, -21px -21px 43px #ffffff;
      }
      .tool {
        padding: 40px 45px;
      }
      .tool .btn {
        width: 58px;
        height: 58px;
      }
      .tool .btn .bi {
        font-size: 24px;
      }
      .footer {
        justify-content: center;
        padding: 40px 45px;
      }
      .footer .btn {
        margin: 0 30px;
        width: 40px;
        height: 40px;
        border-radius: 12px;
        font-size: 16px;
      }
      .progress {
        position: relative;
        height: 5px;
        margin: 0 30px;
        border-radius: 5px;
        background: #d7e3ef;
        box-shadow: inset 1px 1px 4px #dee0e2, inset -1px -1px 4px #ffffff;
      }
      .progress::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 40%;
        height: 5px;
        border-radius: 5px;
        background: linear-gradient(145deg, #a9b5e7, #d2d7fd);
        box-shadow: 1px 1px 4px #dee0e2, -1px -1px 4px #ffffff;
      }
      .progress::after {
        position: absolute;
        content: "";
        top: 50%;
        left: 40%;
        transform: translate(-40%, -50%);
        width: 15px;
        height: 15px;
        border-radius: 20px;
        background: linear-gradient(145deg, #a9b5e7, #d2d7fd);
        box-shadow: 3px 3px 6px #dee0e2, -3px -3px 6px #ffffff;
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
