<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <Title
          :orderNum="1"
          context="列表向下滚动"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div
          class="content"
          @mouseenter="stop"
          @mouseleave="start"
          :style="{ height: 5 * 47 + 'px' }"
        >
          <div
            class="item-wrap"
            v-for="(item, index) in animationData"
            :key="item.id"
            :class="[
              { moveToBottom: animationActive },
              { show: animationActive && index === 0 },
              { hovered: hoveredIndex === index }, // 添加 hovered 判断
            ]"
            @mouseover="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
          >
            {{ item.name }}
          </div>
        </div>
        <Title
          :orderNum="2"
          context="列表向上滚动"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div
          class="content"
          @mouseenter="stop1"
          @mouseleave="start1"
          :style="{ height: 5 * 47 + 'px' }"
        >
          <div
            class="item-wrap"
            v-for="(item, index) in animationData1"
            :key="item.id"
            :class="[
              { moveToBottom1: animationActive1 },
              { show1: animationActive1 && index === 0 },
              { hovered: hoveredIndex1 === index }, // 添加 hovered 判断
            ]"
            @mouseover="hoveredIndex1 = index"
            @mouseleave="hoveredIndex1 = null"
          >
            {{ item.name }}
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

  mockData();
  mockData1();
});
/* 不改的代码 end */

/* 向下滚动 */

// #假设这是接口请求的10条最新数据
const allCarouseData = ref([]);
// #需要轮播的数据
const animationData = ref([]);
// #是否开启动画
const animationActive = ref(false);
const hoveredIndex = ref(null);
// *定时器
const animationTimerMeta = {
  timer: null,
  timeFuc() {
    let setTimeoutId = null;
    if (this.timer) return;
    this.timer = setInterval(() => {
      if (setTimeoutId) {
        setTimeoutId = null;
        clearTimeout(setTimeoutId);
      }
      // 取轮播数据的第一条id
      let firstId = animationData.value[0].id;
      // 查询
      let index = allCarouseData.value.findIndex(res => res.id === firstId);
      let addIndex =
        index - 1 < 0 ? allCarouseData.value.length - 1 : index - 1;
      animationData.value.unshift(allCarouseData.value[addIndex]);
      // #开启动画
      animationActive.value = true;
      setTimeoutId = setTimeout(() => {
        animationActive.value = false;
        animationData.value.pop();
      }, 1000);
      // 删除数组的最后一项
    }, 1500);
  },
};

const mockData = () => {
  const axiosData = [
    { name: "文字1", id: 1 },
    { name: "文字2", id: 2 },
    { name: "文字3", id: 3 },
    { name: "文字3", id: 4 },
    { name: "文字4", id: 5 },
    { name: "文字5", id: 6 },
    { name: "文字6", id: 7 },
    { name: "文字7", id: 8 },
    { name: "文字8", id: 9 },
    { name: "文字9", id: 10 },
  ];
  allCarouseData.value = axiosData;
  animationData.value = axiosData.slice(-5);
  animationTimerMeta.timeFuc();
};

const stop = () => {
  clearInterval(animationTimerMeta.timer);
  animationTimerMeta.timer = null;
};
const start = () => animationTimerMeta.timeFuc();

/* 向上滚动 */
const allCarouseData1 = ref([]);
// #需要轮播的数据
const animationData1 = ref([]);
// #是否开启动画
const animationActive1 = ref(false);
const hoveredIndex1 = ref(null);

// *定时器
const animationTimerMeta1 = {
  timer: null,
  timeFuc() {
    let setTimeoutId = null;
    if (this.timer) return;
    this.timer = setInterval(() => {
      if (setTimeoutId) {
        setTimeoutId = null;
        clearTimeout(setTimeoutId);
      }
      // 取轮播数据的第一条id
      let firstId = animationData1.value[0].id;
      // 查询
      let index = allCarouseData1.value.findIndex(res => res.id === firstId);
      let addIndex =
        index - 1 < 0 ? allCarouseData1.value.length - 1 : index - 1;
      animationData1.value.push(allCarouseData1.value[addIndex]);
      // #开启动画
      animationActive1.value = true;
      setTimeoutId = setTimeout(() => {
        animationActive1.value = false;
        animationData1.value.shift();
      }, 1000);
      // 删除数组的最后一项
    }, 1500);
  },
};

const mockData1 = () => {
  const axiosData = [
    { name: "文字1", id: 1 },
    { name: "文字2", id: 2 },
    { name: "文字3", id: 3 },
    { name: "文字3", id: 4 },
    { name: "文字4", id: 5 },
    { name: "文字5", id: 6 },
    { name: "文字6", id: 7 },
    { name: "文字7", id: 8 },
    { name: "文字8", id: 9 },
    { name: "文字9", id: 10 },
  ];
  allCarouseData1.value = axiosData;
  animationData1.value = axiosData.slice(-5);
  animationTimerMeta1.timeFuc();
};

const stop1 = () => {
  clearInterval(animationTimerMeta1.timer);
  animationTimerMeta1.timer = null;
};
const start1 = () => animationTimerMeta1.timeFuc();

// !页面卸载时，关闭轮播
onBeforeUnmount(() => {
  clearInterval(animationTimerMeta.timer);
  animationTimerMeta.timer = null;
  clearInterval(animationTimerMeta1.timer);
  animationTimerMeta1.timer = null;
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

    /* 编写CSS begin */
    .content {
      overflow: hidden;
      box-sizing: border-box;
    }
    .item-wrap {
      box-sizing: border-box;
      border: 1px solid #e4e4e4;
      margin-right: 13px;
      padding: 9px 12px;
      display: flex;
      height: 47px;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      // 悬停效果
      &.hovered {
        background-color: black;
        color: white; // 文字颜色可以调整为白色
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border: 1px solid #bbb; // 边框颜色
      }
    }
    @keyframes moveToBottom {
      0% {
        transform: translateY(-47px);
      }

      100% {
        transform: translateY(0);
      }
    }

    .moveToBottom {
      animation: moveToBottom 500ms ease-in-out forwards;
    }

    @keyframes fadeInFromTop {
      0% {
        opacity: 0;
        transform: translateY(-47px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
        color: #683bd6;
      }
    }

    .show {
      animation: fadeInFromTop 500ms ease-in-out forwards;
    }

    @keyframes moveToBottom1 {
      0% {
        transform: translateY(0);
      }

      100% {
        transform: translateY(-47px);
      }
    }

    .moveToBottom1 {
      animation: moveToBottom1 500ms ease-in-out forwards;
    }

    @keyframes fadeInFromTop1 {
      0% {
        opacity: 0;
        transform: translateY(0);
      }

      100% {
        opacity: 1;
        transform: translateY(-47px);
        color: #683bd6;
      }
    }

    .show1 {
      animation: fadeInFromTop1 500ms ease-in-out forwards;
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
