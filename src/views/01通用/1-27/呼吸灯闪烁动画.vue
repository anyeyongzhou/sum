<template>
  <div class="home">
    <div class="containers">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <Title
          :orderNum="1"
          context="效果1"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="container">
          <div class="circle1"></div>
        </div>
        <Title
          :orderNum="2"
          context="效果2"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 60px"
        />
        <div class="container">
          <div class="circle2"></div>
          <div class="big-circle"></div>
        </div>
        <Title
          :orderNum="3"
          context="效果3"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
          style="margin-top: 60px"
        />
        <div class="container">
          <div class="circle3"></div>
        </div>
      </template>
      <template v-else>
        <div class="code">
          <pre><code>{{ indexFile }}</code></pre>
        </div>
      </template>
    </div>
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
    background-color: #000;

    /* 编写CSS begin */

    .container {
      position: relative;

      @keyframes twinkling {
        0% {
          opacity: 0.2;
          transform: scale(1);
        }

        50% {
          opacity: 0.5;
          transform: scale(1.12);
        }

        100% {
          opacity: 0.2;
          transform: scale(1);
        }
      }
      .circle1 {
        border-radius: 50%;
        width: 12px;
        height: 12px;
        background: green;
        position: relative;
        top: 36px;
        left: 36px;

        &::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          border-radius: 50%;
          background: greenyellow;
          animation: twinkling 1s infinite ease-in-out;
          animation-fill-mode: both;
        }
      }

      .circle2 {
        position: relative;
        width: 12px;
        height: 12px;
        background-color: pink;
        border-radius: 50%;
        top: 36px;
        left: 36px;

        &:before {
          content: "";
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          opacity: 0.4;
          background-color: pink;
          animation: scale 1s infinite cubic-bezier(0, 0, 0.49, 1.02);
        }
      }

      .big-circle {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        opacity: 0.4;
        background-color: pink;
        top: 36px;
        left: 36px;
        animation: scales 1s infinite cubic-bezier(0, 0, 0.49, 1.02);
      }

      @keyframes scale {
        0% {
          transform: scale(1);
        }

        50%,
        75% {
          transform: scale(3);
        }

        78%,
        100% {
          opacity: 0;
        }
      }

      @keyframes scales {
        0% {
          transform: scale(1);
        }

        50%,
        75% {
          transform: scale(2);
        }

        78%,
        100% {
          opacity: 0;
        }
      }

      @keyframes scaless {
        0% {
          transform: scale(1);
        }

        50%,
        75% {
          transform: scale(3);
        }

        78%,
        100% {
          opacity: 0;
        }
      }

      .circle3 {
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: transparent;
        border-radius: 50%;
        top: 36px;
        left: 36px;

        &:before {
          content: "";
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          opacity: 0.7;
          border: 3px solid hotpink;
          background-color: transparent;
          animation: scaless 1s infinite cubic-bezier(0, 0, 0.49, 1.02);
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
