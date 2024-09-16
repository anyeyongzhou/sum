<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Title
          :orderNum="1"
          context="文本溢出"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <Title
          :orderNum="1"
          context="单行文本溢出尾部打点"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="1"
        />
        <div class="text">
          <Text orderNum="a" context="原始的字符串" />
          <div class="content">
            <span>{{ singleTextContext }}</span>
          </div>
          <Text orderNum="b" context="理想的效果" effect />
          <div class="content correct">
            <span>{{ singleTextContext }}</span>
          </div>
          <Text orderNum="c" context="没有加width的字符串" />
          <div class="content no-width">
            <span></span>
            <span>{{ singleTextContext }}</span>
          </div>
          <Text orderNum="d" context="本身不是块级元素的字符串" />
          <div class="content not-block">
            <span>{{ singleTextContext }}</span>
          </div>
        </div>
        <Title
          :orderNum="2"
          context="单行文本溢出头部打点"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="1"
        />
        <div class="text">
          <Text orderNum="a" context="原始的字符串" />
          <div class="head-content">
            <span>{{ headTextContext }}</span>
          </div>
          <Text orderNum="b" context="理想的效果" effect />
          <div class="head-content rtl-correct">
            <bdi dir="ltr">{{ headTextContext }}</bdi>
          </div>
        </div>
        <Title
          :orderNum="3"
          context="多行文本溢出"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="1"
        />
        <div class="text">
          <Text orderNum="a" context="原始的字符串" />
          <div class="mul-content">
            <span class="original">{{ multiplyTextContent }}</span>
          </div>
          <Text orderNum="b" context="使用伪类" effect />
          <div class="mul-content">
            <span class="original after-class">{{ multiplyTextContent }}</span>
            <span class="ellipsis"></span>
          </div>
          <Text orderNum="c" context="使用定位和padding-right" effect />
          <div class="mul-content1">
            {{ multiplyTextContent }}
            <span class="ellipsis">...</span>
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
    <!-- <div class="tip" v-html="markdownContent"></div> -->
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

const singleTextContext = ref(
  "你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说。"
);

const headTextContext = ref("11111 22222 33333 44444");

const multiplyTextContent = ref(
  "你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说。"
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

    .text {
      width: 100%;
      .content {
        padding: 20px;
        span {
          border: 1px solid green;
        }
      }
      .correct {
        max-width: 100px;
        white-space: nowrap; //文本不换行
        overflow: hidden; //溢出隐藏
        text-overflow: ellipsis; //文本溢出显示符号：省略号
      }
      .no-width {
        white-space: nowrap; //文本不换行
        overflow: hidden; //溢出隐藏
        text-overflow: ellipsis; //文本溢出显示符号：省略号
      }
      .not-block {
        max-width: 100px;
        white-space: nowrap; //文本不换行
        overflow: hidden; //溢出隐藏
        text-overflow: ellipsis; //文本溢出显示符号：省略号
        display: flex;
      }

      .head-content {
        width: 100px;
        border: 1px solid red;
      }

      .rtl-correct {
        overflow: hidden;
        text-overflow: ellipsis;
        direction: rtl;
        white-space: nowrap;
      }

      .mul-content {
        width: 100%;
        .original {
          border: 1px solid blue;
        }

        .after-class {
          display: inline-block;
          height: 56px;
          line-height: 28px;
          overflow: hidden;
        }

        .ellipsis::after {
          content: "...";
          display: inline;
        }
      }

      .mul-content1 {
        width: 100%;
        height: 56px;
        line-height: 28px;
        overflow: hidden;
        padding-right: 16px; /* 留出省略号位置 */
        position: relative;
        .ellipsis {
          position: absolute;
          right: 10px;
          bottom: 0;
        }
      }
    }

    .code {
      padding: 20px;
      border: 1px solid gray;
      font-size: 20px;
    }
  }

  .tip {
    width: 600px;
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
