<template>
  <div class="container">
    <input
      type="text"
      v-model="searchText"
      placeholder="请输入关键词"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @keydown="handleKeyDown"
    />

    <ul
      class="list"
      v-show="showList"
      @mouseover="handleMouseOver"
      @mousedown="handleMouseDown"
    >
      <li
        v-for="(item, index) in searchResults"
        :key="index"
        :class="{ active: index === currentIndex }"
        v-html="highlightText(item)"
      ></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 搜索文本
const searchText = ref("");
// 是否显示列表
const showList = ref(false);
// 当前选中索引
const currentIndex = ref(-1);

// 词库数据
const words = [
  "1建设清洁美丽世界，习主席清洁这些话字清洁字珠玑",
  "1垃圾分类分出首饰",
  "1不和同事吃饭被批",
  "1秋瓷炫求婚于晓光",
  "1乐视体育被吊执照",
  "1言承旭拍片被围观",
  "1迪拜酋长王妃出逃",
  "1黄晓明辟谣离婚",
  "1基因编辑清除HIV",
  "1史上最贵离婚生效",
  "1上海下放户籍审批",
  "1河北高温红色预警",
  "1灵魂拷问，monica真的18岁吗",
  "1成哥到底有几个女朋友",
];

// 搜索结果
const searchResults = computed(() => {
  const key = searchText.value;
  if (!key) return [];

  return words.filter(item => item.includes(key));
});

// 高亮显示关键词
const highlightText = text => {
  const key = searchText.value;
  if (!key) return text;

  return text.replace(
    new RegExp(key, "g"),
    match => `<span class="key">${match}</span>`
  );
};

// 处理输入框聚焦
const handleFocus = () => {
  if (searchResults.value.length > 0) {
    showList.value = true;
  }
};

// 处理输入框失焦
const handleBlur = () => {
  showList.value = false;
};

// 处理输入事件（带防抖）
let timer = null;
const handleInput = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    currentIndex.value = -1;
    if (searchResults.value.length > 0) {
      showList.value = true;
    } else {
      showList.value = false;
    }
  }, 500);
};

// 处理键盘事件
const handleKeyDown = e => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    currentIndex.value = Math.max(0, currentIndex.value - 1);
    scrollToSelected();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    currentIndex.value = Math.min(
      searchResults.value.length - 1,
      currentIndex.value + 1
    );
    scrollToSelected();
  } else if (e.key === "Enter") {
    e.preventDefault();
    selectCurrentItem();
  }
};

// 处理鼠标悬停
const handleMouseOver = e => {
  if (e.target.tagName === "LI") {
    const index = Array.from(e.target.parentNode.children).indexOf(e.target);
    currentIndex.value = index;
  }
};

// 处理鼠标点击
const handleMouseDown = e => {
  if (e.target.tagName === "LI") {
    selectCurrentItem();
  }
};

// 选择当前项
const selectCurrentItem = () => {
  if (
    currentIndex.value >= 0 &&
    currentIndex.value < searchResults.value.length
  ) {
    searchText.value = searchResults.value[currentIndex.value];
    showList.value = false;
  }
};

// 滚动到选中项
const scrollToSelected = () => {
  const list = document.querySelector(".list");
  const selectedItem = list?.children[currentIndex.value];
  if (!list || !selectedItem) return;

  const listRect = list.getBoundingClientRect();
  const itemRect = selectedItem.getBoundingClientRect();

  if (itemRect.top < listRect.top) {
    list.scrollTop = selectedItem.offsetTop;
  } else if (itemRect.bottom > listRect.bottom) {
    list.scrollTop =
      selectedItem.offsetTop - (listRect.height - itemRect.height);
  }
};
</script>

<style scoped>
.container {
  width: 300px !important;
  margin: 50px auto;
  position: relative;
}

input {
  width: 100%;
  height: 30px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
}

input:focus {
  border-color: #409eff;
}

.list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  margin: 5px 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.list li {
  padding: 8px 10px;
  cursor: pointer;
  line-height: 1.5;
}

.list li:hover,
.list li.active {
  background-color: #f5f7fa;
}

.key {
  color: #409eff;
  font-weight: bold;
}
</style>
