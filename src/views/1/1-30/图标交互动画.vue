<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <div id="app" class="layout-page">
          <div class="ui-card-box" v-for="(i, index) in list" :key="index">
            <i
              class="img"
              :style="`background:url(${i.iconSrc});background-size:100%;`"
            />
            <p>{{ i.label }}</p>
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

const list = [
  {
    iconSrc:
      "https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/13bf0ab6dd85419d8b7a0aa148af4547~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgRWFzeV9Z:q75.awebp?rk3s=f64ab15b&x-expires=1727237687&x-signature=%2FXwFOqhC56HQeBjLdxqu4AuUzJI%3D",
    label: "弹性计算",
  },
  {
    iconSrc:
      "https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/61e23064669d4288ac3d8f07026b1d74~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgRWFzeV9Z:q75.awebp?rk3s=f64ab15b&x-expires=1727237687&x-signature=y5TOlKCyqXPmwq1EmW4joPVqUyo%3D",
    label: "人工智能",
  },
  {
    iconSrc:
      "https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3c1593beffed426099c985339ba2e671~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgRWFzeV9Z:q75.awebp?rk3s=f64ab15b&x-expires=1727237687&x-signature=z3nkSePJzOEocSqK6fK0p9ZM8ic%3D",
    label: "网络与CDN",
  },
];
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
    .layout-page {
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      background: #001427;
      overflow: auto;
    }

    // 进入动画
    @keyframes move {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 0 -1280px;
        /* 动画帧-1  1340px-64 */
      }
    }
    // 退出动画
    @keyframes moveOut {
      0% {
        background-position: 0 -1280px;
      }
      100% {
        background-position: 0 0px;
        /* 动画帧-1  1340px-64 */
      }
    }
    // 逐帧动画盒子css
    .ui-card-box {
      display: inline-flex;
      flex-direction: column;
      width: 160px;
      height: 200px;
      align-items: center;
      justify-content: center;
      transition: 0.6s;
      background: #05233f;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid;
      margin: 8px;

      $PrimaryColor: #ff6a00; //主题色

      // 图标
      .img {
        width: 64px;
        height: 64px;
        background-size: 100%;
        border: none;
        animation: moveOut 0.6s forwards steps(20, end);
      }
      p {
        font-size: 12px;
        color: #fff;
      }
      &:hover {
        color: $PrimaryColor;
        border: 1px solid $PrimaryColor;
        box-shadow: 0px 2px 12px 0px rgba(#ff6a00, 0.5);
        .img {
          animation: move 0.6s forwards steps(20, end);
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
