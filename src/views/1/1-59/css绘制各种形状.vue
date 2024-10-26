<template>
  <div class="home">
    <div class="containers">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <Title
          :orderNum="1"
          context="心形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="heart"></div>
        <Title
          :orderNum="2"
          context="八边形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="octagon"></div>
        <Title
          :orderNum="3"
          context="六边形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="hexagon"></div>
        <Title
          :orderNum="4"
          context="五边形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="pentagon"></div>
        <Title
          :orderNum="5"
          context="椭圆"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="oval"></div>
        <Title
          :orderNum="6"
          context="五角星"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="star-five"></div>
        <Title
          :orderNum="7"
          context="六角星"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="star-six"></div>
        <Title
          :orderNum="8"
          context="三角星"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="triangle-up"></div>
        <div class="triangle-down"></div>
        <div class="triangle-left"></div>
        <div class="triangle-right"></div>
        <div class="triangle-topleft"></div>
        <div class="triangle-topright"></div>
        <div class="triangle-bottomleft"></div>
        <div class="triangle-bottomright"></div>
        <Title
          :orderNum="9"
          context="梯形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 220px"
        />
        <div class="trapezoid"></div>
        <Title
          :orderNum="10"
          context="平行四边形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="parallelogram"></div>
        <Title
          :orderNum="11"
          context="菱形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="diamond"></div>
        <Title
          :orderNum="12"
          context="钻石盾牌"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="diamond-shield"></div>
        <Title
          :orderNum="13"
          context="钻石形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="cut-diamond"></div>
        <Title
          :orderNum="14"
          context="鸡蛋"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="egg"></div>
        <Title
          :orderNum="15"
          context="鸡蛋"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="pac-man"></div>
        <Title
          :orderNum="16"
          context="聊天框"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="talk-bubble"></div>
        <Title
          :orderNum="17"
          context="电视屏幕"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="tv"></div>
        <Title
          :orderNum="18"
          context="爆炸形状"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="burst-12"></div>
        <Title
          :orderNum="19"
          context="阴阳八卦"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="taiji">
          <div class="left"></div>
          <div class="right"></div>
        </div>
        <Title
          :orderNum="20"
          context="放大镜"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="magnifying-glass"></div>
        <Title
          :orderNum="21"
          context="圆锥形"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="cone"></div>
        <Title
          :orderNum="22"
          context="月亮"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="moon"></div>
        <Title
          :orderNum="23"
          context="徽章丝带"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 100px"
        />
        <div class="badge-ribbon"></div>
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
  // border: 1px solid #0f0;

  .containers {
    width: 60%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;

    /* 编写CSS begin */
    .heart {
      position: relative;
      width: 100px;
      height: 90px;

      &::before {
        position: absolute;
        content: "";
        left: 50px;
        top: 0;
        width: 50px;
        height: 80px;
        background: #f00;
        border-radius: 50px 50px 0 0;
        transform: rotate(-45deg);
        transform-origin: 0 100%;
      }

      &::after {
        position: absolute;
        content: "";
        left: 0px;
        top: 0;
        width: 50px;
        height: 80px;
        background: #0f0;
        border-radius: 50px 50px 0 0;
        transform: rotate(45deg);
        transform-origin: 100% 100%;
      }
    }

    .octagon {
      position: relative;
      width: 100px;
      height: 100px;
      background: #f00;

      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        border-left: 29px solid #fff;
        border-right: 29px solid #fff;
        // border-top: 29px solid #00f;
        border-bottom: 29px solid #0f0;
        width: 42px;
        height: 0;
      }

      &::after {
        position: absolute;
        content: "";
        bottom: 0;
        left: 0;
        border-left: 29px solid #fff;
        border-right: 29px solid #fff;
        border-top: 29px solid red;
        width: 42px;
        height: 0;
      }
    }

    .hexagon {
      position: relative;
      top: 50px;
      width: 100px;
      height: 55px;
      background: red;

      &::before {
        position: absolute;
        content: "";
        top: -25px;
        left: 0;
        border-left: 50px solid #fff;
        border-right: 50px solid #fff;
        border-bottom: 25px solid red;
        width: 0;
        height: 0;
      }
      &::after {
        position: absolute;
        content: "";
        bottom: -25px;
        left: 0;
        border-left: 50px solid #fff;
        border-right: 50px solid #fff;
        border-top: 25px solid red;
        width: 0;
        height: 0;
      }
    }

    .pentagon {
      position: relative;
      top: 50px;
      width: 90px;
      border-width: 50px 18px 0 18px;
      border-style: solid;
      border-color: red transparent;
      &::before {
        position: absolute;
        content: "";
        top: -85px;
        left: -18px;
        width: 0;
        height: 0;
        border-width: 0 45px 35px 45px;
        border-style: solid;
        border-color: transparent transparent red transparent;
      }
    }

    .oval {
      position: relative;
      top: 50px;
      width: 100px;
      height: 50px;
      background: red;
      border-radius: 50px / 25px;
    }

    .star-five {
      margin: 25px 0;
      position: relative;
      display: block;
      color: #4e6fa6;
      width: 0px;
      height: 0px;
      border-right: 50px solid transparent;
      border-bottom: 35px solid #4e6fa6;
      border-left: 50px solid transparent;
      transform: rotate(35deg);

      &::before {
        border-bottom: 40px solid #4e6fa6;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        position: absolute;
        height: 0;
        width: 0;
        top: -22px;
        left: -32px;
        display: block;
        content: "";
        transform: rotate(-35deg);
      }

      &::after {
        position: absolute;
        display: block;
        color: #4e6fa6;
        top: 2px;
        left: -52px;
        width: 0px;
        height: 0px;
        border-right: 50px solid transparent;
        border-bottom: 35px solid #f00;
        border-left: 50px solid transparent;
        transform: rotate(-70deg);
        content: "";
      }
    }

    .star-six {
      position: relative;
      top: 50px;
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 100px solid red;

      &::before {
        position: absolute;
        content: "";
      }

      &::after {
        position: absolute;
        content: "";
        top: 30px;
        left: -50px;
        width: 0;
        height: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-top: 100px solid red;
      }
    }

    .triangle-up {
      position: relative;
      top: 50px;
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 100px solid red;
    }

    .triangle-down {
      position: relative;
      top: 70px;
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-top: 100px solid red;
    }

    /* 向左三角形 */
    .triangle-left {
      position: relative;
      top: 90px;
      width: 0;
      height: 0;
      border-top: 50px solid transparent;
      border-bottom: 50px solid transparent;
      border-right: 100px solid #2ba245;
    }

    /* 向右三角形 */
    .triangle-right {
      position: relative;
      top: 130px;
      width: 0;
      width: 0;
      height: 0;
      border-top: 50px solid transparent;
      border-bottom: 50px solid transparent;
      border-left: 100px solid #2ba245;
    }

    /* 左上三角形 */
    .triangle-topleft {
      position: relative;
      top: 150px;
      width: 0;
      height: 0;
      border-right: 100px solid transparent;
      // border-right: 100px solid #f00;
      border-top: 100px solid #2ba245;
      // border-left: 100px solid #00f;
      // border-bottom: 100px solid #0ff;
    }

    /* 右上三角形 */
    .triangle-topright {
      position: relative;
      top: 170px;
      width: 0;
      height: 0;
      border-left: 100px solid transparent;
      border-top: 100px solid #2ba245;
    }

    /* 左下三角形 */
    .triangle-bottomleft {
      position: relative;
      top: 190px;
      width: 0;
      height: 0;
      border-right: 100px solid transparent;
      border-bottom: 100px solid #2ba245;
    }

    /* 右下三角形 */
    .triangle-bottomright {
      position: relative;
      top: 210px;
      width: 0;
      height: 0;
      border-left: 100px solid transparent;
      border-bottom: 100px solid #2ba245;
    }

    /* 梯形 */
    .trapezoid {
      width: 200px;
      height: 0;
      border-bottom: 200px solid #00f;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
    }

    .parallelogram {
      position: relative;
      left: 20px;
      top: 20px;
      width: 200px;
      height: 100px;
      background-color: #00f;
      transform: skew(20deg);
    }

    .diamond {
      position: relative;
      left: 20px;
      top: 20px;
      width: 100px;
      height: 100px;
      background: #ff0;
      transform: rotate(45deg);
    }

    /* 钻石盾牌 */
    .diamond-shield {
      position: relative;
      width: 0;
      height: 0;
      border: 50px solid transparent;
      border-bottom: 20px solid #f7de1f;
      top: -50px;

      &::after {
        position: absolute;
        content: "";
        top: 20px;
        left: -50px;
        width: 0;
        height: 0;
        border: 50px solid transparent;
        border-top: 70px solid #f7de1f;
      }
    }

    /* 钻石形 */
    .cut-diamond {
      position: relative;
      width: 100px;
      height: 0;
      border-style: solid;
      border-color: transparent transparent #f7de1f transparent;
      border-width: 0 20px 30px 20px;
      margin: 20px 0 50px 0;
      &::after {
        position: absolute;
        content: "";
        top: 30px;
        left: -20px;
        width: 0;
        height: 0;
        border-style: solid;
        border-color: #f7de1f transparent transparent transparent;
        border-width: 70px 50px 0 50px;
      }
    }

    /* 鸡蛋 */
    .egg {
      display: block;
      width: 126px;
      height: 180px;
      background: #f7de1f;
      border-radius: 63px 63px 63px 63px / 108px 108px 72px 72px;
    }

    /* 吃豆人 */
    .pac-man {
      width: 0;
      height: 0;
      border: 60px solid #f7de1f;
      border-right-color: transparent;
      border-radius: 60px;
    }

    /* 聊天框 */
    .talk-bubble {
      position: relative;
      left: 20px;
      width: 120px;
      height: 80px;
      border-radius: 10px;
      background: #f7de1f;
      &::after {
        position: absolute;
        content: "";
        top: 26px;
        right: 100%;
        width: 0;
        height: 0;
        border-top: 13px solid transparent;
        border-bottom: 13px solid transparent;
        border-right: 26px solid #f7de1f;
      }
    }

    /* 电视屏幕 */
    .tv {
      position: relative;
      left: 20px;
      width: 200px;
      height: 150px;
      background: #f7de1f;
      border-radius: 50% / 10%;

      &::before {
        position: absolute;
        content: "";
        top: 10%;
        bottom: 10%;
        left: -5%;
        right: -5%;
        background: inherit;
        border-radius: 5% / 50%;
      }
    }

    .burst-12 {
      position: relative;
      top: 20px;
      left: 20px;
      width: 80px;
      height: 80px;
      background: #f48034;

      &::before {
        width: 80px;
        height: 80px;
        background: #f48034;
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        transform: rotate(30deg);
      }

      &::after {
        width: 80px;
        height: 80px;
        background: #f48034;
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        transform: rotate(60deg);
      }
    }

    .taiji {
      position: relative;
      width: 300px;
      height: 300px;
      background-color: #fff;
      margin-top: 24px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #000;
      .left {
        position: relative;
        height: 100%;
        width: 50%;
        float: left;
      }
      .right {
        position: relative;
        height: 100%;
        width: 50%;
        float: left;
        background-color: #000;
      }
      .right::before {
        position: absolute;
        content: "";
        top: 0;
        left: -75px;
        background-color: #fff;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 50px solid #000;
      }
      .right::after {
        position: absolute;
        content: "";
        bottom: 0;
        left: -75px;
        background-color: #000;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 50px solid #fff;
      }
    }

    .magnifying-glass {
      position: relative;
      width: 40px;
      height: 40px;
      border: 10px solid #f48034;
      background: transparent;
      border-radius: 100%;
      &::before {
        position: absolute;
        content: "";
        right: -25px;
        bottom: -15px;
        width: 35px;
        height: 8px;
        background: #f48034;
        transform: rotate(45deg);
      }
    }

    .cone {
      width: 0;
      height: 0;
      border-left: 70px solid transparent;
      border-right: 70px solid transparent;
      border-top: 100px solid #f48034;
      border-radius: 100%;
    }

    .moon {
      width: 80px;
      height: 80px;
      border-radius: 100%;
      box-shadow: 15px 15px 0 0 #f48034;
    }

    .badge-ribbon {
      position: relative;
      width: 100px;
      height: 100px;
      border-radius: 100%;
      background: #f48034;

      &::before,
      &::after {
        position: absolute;
        content: "";
        top: 70px;
        left: -10px;
        border-bottom: 70px solid #f48034;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
        transform: rotate(-140deg);
      }

      &::after {
        left: auto;
        right: -10px;
        transform: rotate(140deg);
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
