<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
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
        <Title
          :orderNum="4"
          context="中间显示省略号"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="1"
        />
        <div class="text">
          <Text orderNum="a" context="原始的字符串" />
          <div>
            近日，银行纷纷下调大额存单利率，但银行定期存款仍被疯抢。银行理财经理表示：有意向购买定期存款要尽快，不确定利率是否会再降。
          </div>
          <Text orderNum="b" context="js方法处理" effect />
          <div class="title" ref="domRef">
            近日，银行纷纷下调大额存单利率，但银行定期存款仍被疯抢。银行理财经理表示：有意向购买定期存款要尽快，不确定利率是否会再降。
          </div>
          <Text orderNum="c" context="css方法处理" effect />
          <div class="css1">
            <ul class="con">
              <li class="wrap">
                <span class="txt"
                  >CSS测试标题，这是一个稍微有点长的标题，超出一行以后才会有title提示，标题是实现优惠券的技巧-2021-03-26</span
                >
                <span
                  class="title"
                  title="CSS 测试标题，这是一个稍微有点长的标题，超出一行以后才会有title提示，标题是 实现优惠券的技巧 - 2021-03-26"
                  >CSS测试标题，这是一个稍微有点长的标题，超出一行以后才会有title提示，标题是实现优惠券的技巧-2021-03-26</span
                >
              </li>
            </ul>
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
import { checkLength, calcTextLength } from "./util.js";
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

  setTextContent();
});
/* 不改的代码 end */

const singleTextContext = ref(
  "你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说。"
);

const headTextContext = ref("11111 22222 33333 44444");

const multiplyTextContent = ref(
  "你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说。"
);

const domRef = ref(null);

// 设置文本内容
function setTextContent() {
  var text =
    "近日，银行纷纷下调大额存单利率，但银行定期存款仍被疯抢。银行理财经理表示：有意向购买定期存款要尽快，不确定利率是否会再降";
  console.log("domRef", domRef.value);
  const { status, width } = checkLength(domRef.value);
  let str = "";
  if (status) {
    // 翻转文本
    let reverseStr = text.split("").reverse().join("");

    // 计算左右两边文本要截取的字符索引
    const leftTextIndex = calcTextLength(text, width);
    const rightTextIndex = calcTextLength(reverseStr, width);

    // 将右侧字符先截取，后翻转
    reverseStr = reverseStr.substring(0, rightTextIndex);
    reverseStr = reverseStr.split("").reverse().join("");

    // 字符拼接
    str = `${text.substring(0, leftTextIndex)}...${reverseStr}`;
  } else {
    str = text;
  }
  domRef.value.innerHTML = str;
}
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

      .title {
        width: 640px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #00b388;
        border: 1px solid #ddd;
        overflow: hidden;
        /* text-overflow: ellipsis; */
        white-space: nowrap;
        /* box-sizing: border-box; */
        padding: 0 10px;
      }

      .css1 {
        .con {
          font-size: 14px;
          color: #666;
          width: 600px;
          margin: 50px auto;
          border-radius: 8px;
          padding: 15px;
          overflow: hidden;
          resize: horizontal;
          box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
        }

        .wrap {
          position: relative;
          line-height: 2;
          height: 2em;
          padding: 0 10px;
          overflow: hidden;
          background: #fff;
          margin: 5px 0;
        }

        .title {
          display: block;
          position: relative;
          background: inherit;
          text-align: justify;
          height: 2em;
          overflow: hidden;
          top: -4em;
        }

        .txt {
          display: block;
          max-height: 4em;
        }
        .title::before {
          content: attr(title);
          width: 50%;
          float: right;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          direction: rtl;
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
