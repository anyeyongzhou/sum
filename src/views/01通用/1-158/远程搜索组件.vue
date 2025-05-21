<template>
  <div class="search-container">
    <input
      v-model="searchText"
      type="text"
      class="search-input"
      @click="showList = true"
      @input="handleInput"
      @keydown="handleKeyDown"
      placeholder="请输入搜索内容"
    />
    <ul v-show="showList && filteredOptions.length > 0" class="suggestion-list">
      <li
        v-for="(item, index) in filteredOptions"
        :key="index"
        :class="{ active: activeIndex === index }"
        @click="selectItem(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [
      "《第七个读者》",
      "《心理罪 画像》",
      "《心理罪 教化场》",
      "《心理罪 暗河》",
      "《心理罪 城市之光》",
      "《地球往事》",
      "《黑暗森林》",
      "《死神永生》",
      "《乡村教师》",
      "《地球大炮》",
    ],
  },
});

const searchText = ref("");
const showList = ref(false);
const activeIndex = ref(-1);

// 过滤后的选项
const filteredOptions = computed(() => {
  return props.options.filter(item => item.includes(searchText.value));
});

// 输入处理
const handleInput = () => {
  showList.value = true;
  activeIndex.value = -1;
};

// 键盘事件处理
const handleKeyDown = e => {
  switch (e.keyCode) {
    case 13: // Enter
      if (activeIndex.value >= 0) {
        selectItem(filteredOptions.value[activeIndex.value]);
      }
      showList.value = !showList.value;
      break;

    case 38: // 上箭头
      e.preventDefault();
      if (activeIndex.value > 0) {
        activeIndex.value--;
      } else {
        activeIndex.value = filteredOptions.value.length - 1;
      }
      updateInputValue();
      break;

    case 40: // 下箭头
      e.preventDefault();
      if (activeIndex.value < filteredOptions.value.length - 1) {
        activeIndex.value++;
      } else {
        activeIndex.value = 0;
      }
      updateInputValue();
      break;
  }
};

// 更新输入框值
const updateInputValue = () => {
  if (activeIndex.value >= 0) {
    searchText.value = filteredOptions.value[activeIndex.value];
  }
};

// 选择项目
const selectItem = item => {
  searchText.value = item;
  showList.value = false;
  activeIndex.value = -1;
};

// 点击外部关闭列表
const handleClickOutside = e => {
  if (!e.target.closest(".search-container")) {
    showList.value = false;
  }
};

// 添加全局点击事件监听
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// 移除事件监听
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.search-container {
  width: 500px !important;
  margin: 100px auto 0;
  position: relative;
}

.search-input {
  width: 100%;
  line-height: 30px;
  font-size: 14px;
  border: 1px solid #ccc;
  padding: 0 10px;
  box-sizing: border-box;
}

.suggestion-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ccc;
  border-top: none;
  position: absolute;
  width: 100%;
  background: white;
  z-index: 10;
}

.suggestion-list li {
  padding: 8px 10px;
  background: #009999;
  margin-top: 3px;
  color: #fff;
  cursor: pointer;
}

.suggestion-list li:hover {
  background: #00ff99;
}

.suggestion-list li.active {
  background: #60625b;
}
</style>
