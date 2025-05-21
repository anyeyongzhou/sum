<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <div>
          <el-select
            class="autoWidth"
            :class="{ 'has-content': optionLabel }"
            v-model="value"
            placeholder="请选择"
            clearable
          >
            <template #prefix>
              {{ optionLabel }}
            </template>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
const options = ref([
  {
    value: "选项1",
    label: "中华人民共和国/广东省/深圳市/福田区",
  },
  {
    value: "选项2",
    label: "中华人民共和国/广西壮族自治区/南宁市/西乡塘区",
  },
  {
    value: "选项3",
    label: "中华人民共和国/北京市",
  },
  {
    value: "选项4",
    label: "中华人民共和国/台湾省",
  },
  {
    value: "选项5",
    label: "中华人民共和国/香港特别行政区",
  },
]);
const value = ref("");
const optionLabel = computed(() => {
  return (options.value.find(item => item.value === value.value) || {}).label;
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
    .el-select {
      width: auto;
    }
    .autoWidth {
      min-width: 180px;
    }
    :deep(.autoWidth .el-input__prefix) {
      position: relative;
      box-sizing: border-box;
      border: 1px solid #fff;
      padding: 0 30px;
      height: 40px;
      line-height: 40px;
      left: 0px;
      visibility: hidden;
    }

    :deep(.autoWidth input) {
      position: absolute;
    }
    .autoWidth {
      // 当.has-content存在时设置样式
      &.has-content {
        :deep(.el-input__suffix) {
          right: 5px;
        }
      }
      // 当.has-content不存在时的默认或备选样式
      &:not(.has-content) {
        :deep(.el-input__suffix) {
          right: -55px;
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
