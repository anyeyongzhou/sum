<template>
  <div class="container">
    <input
      type="text"
      v-model="searchText"
      placeholder="输入1试一下"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @keydown="handleKeyDown"
    />

    <div class="tip" v-show="showList">
      <ul @mouseover="handleMouseOver" @click="handleClick">
        <li
          v-for="(item, index) in searchResults"
          :key="index"
          :class="{ hover: index === currentIndex }"
          :title="item"
          v-html="highlightText(item)"
        ></li>
      </ul>
    </div>
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
  "1建设清洁美丽世界，习主席这些话字字珠玑",
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
  "1灵魂拷问，Monica真的18岁吗",
  "1成哥到底有几个女朋友",
  "1母驴为何半夜惨叫？老尼姑的门为何夜夜被敲？是人性的扭曲还是道德的沦丧？请看今晚焦点访谈——成哥的传奇人生",
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
  const len = searchResults.value.length;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    currentIndex.value = Math.min(len - 1, currentIndex.value + 1);
    scrollToSelected("down");
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    currentIndex.value = Math.max(0, currentIndex.value - 1);
    scrollToSelected("up");
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
const handleClick = e => {
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
const scrollToSelected = direction => {
  const tip = document.querySelector(".tip");
  const selectedItem = tip?.querySelector("li.hover");
  if (!tip || !selectedItem) return;

  if (direction === "down") {
    const visibleTop = selectedItem.offsetTop + selectedItem.clientHeight;
    if (visibleTop > 300) {
      tip.scrollTop = visibleTop - 300;
    }
  } else {
    if (selectedItem.offsetTop - tip.scrollTop < 0) {
      tip.scrollTop = selectedItem.offsetTop;
    }
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

.tip {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.tip ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tip li {
  padding: 8px 10px;
  cursor: pointer;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tip li:hover,
.tip li.hover {
  background-color: #f5f7fa;
}

.key {
  color: #409eff;
  font-weight: bold;
}
</style>
