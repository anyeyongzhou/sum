<template>
  <div class="wrap">
    <div class="top">
      <p ref="contentRef" v-html="highlightedContent"></p>
      <div class="buttons">
        <a href="javascript:void(0)" @click="showToolbox('search')">查找</a>
        <a href="javascript:void(0)" @click="showToolbox('replace')">替换</a>
      </div>
    </div>

    <div
      class="toolbox"
      :class="{ search: mode === 'search', replace: mode === 'replace' }"
      v-show="isToolboxVisible"
    >
      <span class="close" @click="closeToolbox">×</span>
      <span @click="switchMode('search')" :class="{ active: mode === 'search' }"
        >查找</span
      >
      <span
        @click="switchMode('replace')"
        :class="{ active: mode === 'replace' }"
        >替换</span
      >

      <div class="search-box" v-show="mode === 'search'">
        <input
          type="text"
          v-model="searchText"
          placeholder="请输入要查找的内容"
          @input="handleSearch"
        />
        <input type="button" value="查找" @click="handleSearch" />
      </div>

      <div class="replace-box" v-show="mode === 'replace'">
        <input
          type="text"
          v-model="searchText"
          placeholder="请输入要查找的内容"
          @input="handleSearch"
        />
        <input
          type="text"
          v-model="replaceText"
          placeholder="请输入要替换的内容"
        />
        <input type="button" value="替换" @click="handleReplace" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  content: {
    type: String,
    default:
      "这是一段示例文本，用于演示文本搜索和替换功能。您可以在这里输入要查找的内容，也可以输入要替换的内容。",
  },
});

const emit = defineEmits(["update:content"]);

const contentRef = ref(null);
const searchText = ref("");
const replaceText = ref("");
const mode = ref("search");
const isToolboxVisible = ref(false);
const currentMatches = ref([]);
const currentMatchIndex = ref(-1);

// 高亮显示匹配的文本
const highlightedContent = computed(() => {
  if (!searchText.value) return props.content;

  const regex = new RegExp(searchText.value, "g");
  return props.content.replace(
    regex,
    match => `<span class="highlight">${match}</span>`
  );
});

// 显示工具箱
function showToolbox(type) {
  mode.value = type;
  isToolboxVisible.value = true;
}

// 关闭工具箱
function closeToolbox() {
  isToolboxVisible.value = false;
  searchText.value = "";
  replaceText.value = "";
  currentMatches.value = [];
  currentMatchIndex.value = -1;
}

// 切换模式
function switchMode(type) {
  mode.value = type;
}

// 处理搜索
function handleSearch() {
  if (!searchText.value) {
    currentMatches.value = [];
    currentMatchIndex.value = -1;
    return;
  }

  const regex = new RegExp(searchText.value, "g");
  const matches = [...props.content.matchAll(regex)];
  currentMatches.value = matches;
  currentMatchIndex.value = matches.length > 0 ? 0 : -1;
}

// 处理替换
function handleReplace() {
  if (!searchText.value || !replaceText.value) return;

  const regex = new RegExp(searchText.value, "g");
  const newContent = props.content.replace(regex, replaceText.value);
  emit("update:content", newContent);
  closeToolbox();
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 680px;
  margin: 50px auto;
  position: relative;
  box-shadow: 0 0 20px #2d2d2d;
  border-radius: 10px;
  background: #fff;
  padding: 30px;
  overflow: hidden;
}

.top {
  overflow: hidden;
}

p {
  border: 1px solid #abdde7;
  background: #eef8fa;
  border-radius: 3px;
  width: 500px;
  padding: 20px;
  font-family: "微软雅黑";
  font-size: 20px;
  line-height: 36px;
  float: left;
  margin: 0;

  :deep(.highlight) {
    background: yellow;
  }
}

.buttons {
  float: right;

  a {
    text-decoration: none;
    margin-bottom: 5px;
    color: #fff;
    width: 120px;
    line-height: 70px;
    text-align: center;
    font-family: "微软雅黑";
    font-size: 20px;
    display: block;
    background: #90e2f2;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
}

.toolbox {
  width: 640px;
  padding: 20px;
  background: #eef8fa;
  font-size: 0;
  position: relative;
  margin-top: 50px;
  border: 1px solid #abdde7;
  border-radius: 5px;

  .close {
    font-size: 24px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    color: #90e2f2;
  }

  span {
    font-family: "微软雅黑";
    font-size: 20px;
    width: 80px;
    line-height: 40px;
    display: inline-block;
    cursor: pointer;
    text-align: center;

    &.active {
      background: #a8a6f5;
      color: #fff;
    }
  }

  input[type="text"] {
    margin: 20px 0;
    padding: 2px 10px;
    font-size: 24px;
    margin-right: 10px;
    border: 1px solid #abdde7;
    background: #fff;
    height: 48px;
    vertical-align: middle;

    &[placeholder] {
      color: #999;
    }
  }

  input[type="button"] {
    margin: 20px 0;
    height: 52px;
    width: 96px;
    font-size: 20px;
    color: #fff;
    border: none;
    vertical-align: middle;
    font-family: "微软雅黑";
    cursor: pointer;
    background: #a8a6f5;
  }

  &.replace {
    input[type="button"] {
      background: #9fe7a9;
    }
  }
}
</style>
