<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <div class="easy-y-layout-card">
          <!-- list start -->
          <div class="easy-y-list-box">
            <div class="list-item-box" v-for="(i, index) in list" :key="index">
              <!-- icon start -->
              <div class="list-item-icon">
                <div class="layer-icon" v-html="i.icon"></div>
                <i class="layer-2" />
                <i class="layer-1" />
              </div>
              <!-- icon end -->
              <!-- info start -->
              <div class="list-item-info">
                <p>{{ i.label }}</p>
                <h1>{{ i.value }}</h1>
              </div>
              <!-- info end -->
            </div>
          </div>
          <!-- list end -->
          <!-- 底座 start -->
          <div class="layer-base-3"></div>
          <div class="layer-base-2"></div>
          <div class="layer-base-1"></div>
          <!-- 底座 end -->
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

const list = ref([
  {
    label: "展现数",
    value: "2630",
    icon: '<svg t="1726293692531" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30359" width="26" height="26"><path d="M131.4816 509.5424m26.624 0l142.9504 0q26.624 0 26.624 26.624l0 353.8944q0 26.624-26.624 26.624l-142.9504 0q-26.624 0-26.624-26.624l0-353.8944q0-26.624 26.624-26.624Z"  p-id="30360"></path><path d="M403.456 127.7952m26.624 0l154.624 0q26.624 0 26.624 26.624l0 735.6416q0 26.624-26.624 26.624l-154.624 0q-26.624 0-26.624-26.624l0-735.6416q0-26.624 26.624-26.624Z" p-id="30361"></path><path d="M675.84 331.3664m26.624 0l165.888 0q26.624 0 26.624 26.624l0 532.0704q0 26.624-26.624 26.624l-165.888 0q-26.624 0-26.624-26.624l0-532.0704q0-26.624 26.624-26.624Z" p-id="30362"></path></svg>',
  },
  {
    label: "阅读数",
    value: "638",
    icon: '<svg t="1726294004268" class="icon" viewBox="0 0 1056 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="38203" id="mx_n_1726294004269" width="26" height="26"><path d="M664 192c-76.8 0-92.8 92.8-92.8 124.8V832l76.8-28.8c12.8-6.4 25.6-9.6 41.6-12.8 12.8-3.2 28.8-3.2 41.6-3.2h160V192H664z m-256 0c76.8 0 92.8 92.8 92.8 124.8V832l-76.8-28.8c-12.8-6.4-25.6-9.6-41.6-12.8-12.8-3.2-28.8-3.2-41.6-3.2h-156.8V192h224z" p-id="38204"></path></svg>',
  },
  {
    label: "点赞数",
    value: "128",
    icon: '<svg t="1726478525218" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10298" width="26" height="26"><path d="M773.6 912.7h-1.2c-37.2-0.4-74.5-0.4-111.8-0.4h-56.9c-38 0-76 0-114.1-0.5-21.1-0.6-41.9-5-61.5-13-33.3-13-52.3-42-52.2-79.7l0.1-141.4c0-78.3 0-156.7 0.7-235 0.1-21.3 13.8-41.3 25.5-51.8 45.3-41.4 94.5-93 115.1-162.6 5.7-19.4 7.9-40.8 10.2-63.4 4.6-45 33.8-74.3 72.8-74.3 15.3 0 30.6 4.6 45.6 13.5 30.1 18.1 50.2 46.5 61.3 87 17.8 64.3 8.7 126.7-1.3 180.2v0.2c-2.3 12.5 7.1 24.1 19.9 24.1h130c22.4 0 54.5 2.8 74.3 26.8 14.4 17.5 18.5 41.1 12.4 72.3-18.6 95.9-41.4 192.6-63.2 282.7-6.8 28.1-18.1 54.1-29 79.3l-4.7 10.8c-12.4 29.2-38 45.2-72 45.2zM216.1 903.3h-11.9c-43 0-78.2-35.2-78.2-78.2V476.6c0-43 35.2-78.2 78.2-78.2h11.9c43 0 78.2 35.2 78.2 78.2V825c0.1 43.1-35.1 78.3-78.2 78.3z" p-id="10299"></path></svg>',
  },
  {
    label: "评论数",
    value: "57",
    icon: '<svg t="1726478607998" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12396" width="26" height="26"><path d="M512 512m-450.56 0a450.56 450.56 0 1 0 901.12 0 450.56 450.56 0 1 0-901.12 0Z" fill="#131415" p-id="12397"></path><path d="M225.28 798.72h286.72v163.84H148.6848a40.96 40.96 0 0 1-27.19744-71.5776L225.28 798.72z" fill="#131415" p-id="12398"></path><path d="M276.48 512m-71.68 0a71.68 71.68 0 1 0 143.36 0 71.68 71.68 0 1 0-143.36 0Z"   p-id="12399"></path><path d="M512 512m-71.68 0a71.68 71.68 0 1 0 143.36 0 71.68 71.68 0 1 0-143.36 0Z"  p-id="12400"></path><path d="M747.52 512m-71.68 0a71.68 71.68 0 1 0 143.36 0 71.68 71.68 0 1 0-143.36 0Z" fill="#FFFFFF" p-id="12401"></path></svg>',
  },
]);

const count = ref(0);
const addCount = () => {
  count.value += 1;
};
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
    background: linear-gradient(#0a162d 40%, #021129 0);
    background-size: 100% 30px;

    /* 编写CSS begin */
    .easy-y-layout-card {
      position: relative;
      width: 780px;
      perspective: 150;
      -webkit-perspective: 150; /* Safari and Chrome */
      // 统计内容css
      .easy-y-list-box {
        position: absolute;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5;
        // 统计项css
        .list-item-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 170px;
          height: 60px;
          cursor: pointer;
          transition: 200ms linear;
          &:hover {
            top: -10px;
            * {
              transform: rotateX(0deg) rotateY(0deg) !important;
              left: 0px !important;
            }
            .layer-2 {
              background: #39ffff !important;
              animation-play-state: paused !important;
            }
            .layer-icon {
              * {
                fill: #021129 !important;
              }
            }
          }
          .list-item-icon {
            position: relative;
            width: 48px;
            height: 48px;
            flex-shrink: 0;
            margin-right: 20px;
            // 图标
            .layer-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              position: absolute;
              z-index: 5;
              left: 6px;
              top: -1px;
              transform: rotateX(20deg) rotateY(15deg);
              * {
                fill: #87fcff;
                filter: drop-shadow(
                  0 0 8px rgba(#26c1ff, 0.8)
                ); // 不规则形状加阴影
              }
            }
            // 图标闪亮动画
            @keyframes iconOpacity {
              0% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
              100% {
                opacity: 1;
              }
            }
            .layer-1 {
              position: absolute;
              width: 100%;
              height: 100%;
              border: 1px solid #0967e3;
              border-radius: 100%;
              filter: blur(1px);
              background: rgba(#0474f2, 0.4);
              transform: rotateX(20deg) rotateY(15deg);
              animation: iconOpacity 1s linear infinite;
            }
            // size动画
            @keyframes iconSize {
              0% {
                width: 100%;
                height: 100%;
              }
              50% {
                width: 95%;
                height: 92%;
              }
              100% {
                width: 100%;
                height: 100%;
              }
            }
            .layer-2 {
              position: absolute;
              width: 100%;
              height: 100%;
              border: 2px solid #39ffff;
              border-radius: 100%;
              background: rgba(#193f66, 0.9);
              transform: rotateX(20deg) rotateY(15deg);
              animation: iconSize 1s linear infinite;
              left: 5px;
              top: -2px;
            }
          }
          .list-item-info {
            width: 0px;
            flex-grow: 1;
            p,
            h1 {
              margin: 0px;
            }
            p {
              font-size: 14px;
              color: #83c9ff;
            }
            h1 {
              font-size: 18px;
              color: #e7ffff;
              padding-top: 2px;
            }
          }
        }
      }
      @mixin layerBase {
        position: absolute;
        width: 90%;
        height: 40px;
        background: linear-gradient(
          to bottom,
          rgba(#0d2857, 0.8),
          rgba(#0d2857, 1)
        );
        border-radius: 4px;
        border: 1px solid #0b4f81;
      }
      // 底座效果 css
      .layer-base-3 {
        @include layerBase;
        top: 40px;
        z-index: 1;
        opacity: 0.9;
        transform: rotateX(30deg);
      }
      .layer-base-2 {
        @include layerBase;
        width: 80%;
        top: 50px;
        left: 5%;
        z-index: 1;
        opacity: 0.4;
        transform: rotateX(30deg);
      }
      .layer-base-1 {
        @include layerBase;
        width: 70%;
        top: 60px;
        left: 10%;
        z-index: 1;
        opacity: 0.2;
        transform: rotateX(30deg);
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
