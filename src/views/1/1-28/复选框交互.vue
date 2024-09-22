<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <div class="ui-layout-page">
          <h1>请选择关注类型</h1>
          <div class="ui-checkbox">
            <!-- 复选框 item start -->
            <div
              :class="{
                'ui-item-box': true,
                'ui-item-check': i.isCheck,
                'ui-item-disable': i.disable,
              }"
              v-for="(i, index) in list"
              :key="index"
              @click="doCheck(i)"
            >
              <img :src="i.icon" />
              <span class="span-bar">
                <p class="label-bar">{{ i.label }}</p>
                <p class="desc-bar">{{ i.desc }}</p>
              </span>
              <!-- 选中标识 start -->
              <span v-if="i.isCheck" class="icon-check"> </span>
              <!-- 选中标识 end -->
            </div>
            <!-- 复选框 item end -->
          </div>
          <p style="font-size: 12px; color: #333">
            当前选择ids：{{ checked.join(",") }}
          </p>
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

const checked = ref(["1", "2"]);

const list = reactive([
  {
    label: "JYM系统消息",
    id: "1",
    desc: "关注掘金系统消息",
    isCheck: true,
    icon: "https://gd-hbimg.huaban.com/6f3e3ff111c6c98be6785d9eddd5b13f8979ef9d1719e-Xwo8QB_fw658webp",
    disable: true,
  },
  {
    label: "JYM后端",
    id: "2",
    isCheck: true,
    desc: "关注后端讨论区新消息",
    icon: "https://gd-hbimg.huaban.com/e2622fe339d655bd17de59fed3b0ae0afb9a16c31db25-YNpnGV_fw658webp",
    disable: false,
  },
  {
    label: "JYM前端",
    id: "3",
    isCheck: false,
    desc: "关注前端讨论区新消息",
    icon: "https://gd-hbimg.huaban.com/80765200aa4ffb7683ddea51c3063b0801874fb86324-3OVCQN_fw1200",
    disable: false,
  },
  {
    label: "JYM开发工具",
    id: "4",
    isCheck: false,
    desc: "关注开发工具讨论区新消息",
    icon: "https://gd-hbimg.huaban.com/ef1c0e1fb2eae73d674aae791526a331b45b26d2b78e-r4p1aq_fw1200",
    disable: false,
  },
]);

const doCheck = el => {
  if (el.disable) return;
  if (checked.value.includes(el.id)) {
    el.isCheck = false;
    checked.value = checked.value.filter(item => item !== el.id);
  } else {
    el.isCheck = true;
    checked.value.push(el.id);
  }
  checked.value.join(",");
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

    /* 编写CSS begin */
    .ui-layout-page {
      padding: 20px;
      h1 {
        font-size: 16px;
      }

      // 个性化复选框 css start -------------
      .ui-checkbox {
        width: 100%;

        $primary-color: #1e80ff; // 主题色-掘金蓝
        $primary-disable: #7ab0fd; // 只读或禁用色

        // 选中状态css
        .ui-item-check {
          border: 1px solid $primary-color !important;
          background: rgba($primary-color, 0.05) !important;
        }

        // 禁用状态css
        .ui-item-disable {
          border: 1px solid #d3d3d3 !important;
          background: #f3f3f3 !important;
          cursor: not-allowed !important;
          .icon-check {
            border-top: 20px solid #ccc !important;
          }
          .label-bar {
            color: #777 !important;
          }
          .desc-bar {
            color: #a3a3a3 !important;
          }
        }

        // 常规状态css
        .ui-item-box {
          position: relative;
          display: inline-flex;
          align-items: center;
          width: 220px;
          height: 70px;
          border: 1px solid #ccc;
          cursor: pointer;
          margin: 0px 8px 8px 0px;
          border-radius: 4px;
          overflow: hidden;

          &:hover {
            border: 1px solid $primary-color;
            background: rgba($primary-color, 0.05);
          }

          img {
            width: 38px;
            height: 38px;
            margin-left: 15px;
          }
          p {
            margin: 0px;
          }
          .span-bar {
            width: 0px;
            flex: 1 0 auto;
            padding: 0px 10px;

            .label-bar {
              font-size: 14px;
              font-weight: 700;
              margin-bottom: 4px;
              color: #333;
            }
            .desc-bar {
              font-size: 12px;
              color: #999;
            }
          }
          // 绘制圆角斜三角形
          .icon-check {
            position: absolute;
            width: 0px;
            height: 0px;
            top: 2px;
            right: 2px;
            border-top: 20px solid $primary-color;
            border-left: 25px solid transparent;
            border-radius: 5px 3px 5px 0px;
            &:after {
              content: "✓";
              position: relative;
              color: #fff;
              font-size: 12px;
              left: -12px;
              top: -26px;
            }
          }
        }
      }
      // 个性化复选框 css end -------------
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
