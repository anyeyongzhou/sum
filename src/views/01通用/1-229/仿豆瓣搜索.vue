<template>
  <div class="search-container">
    <div class="logo">
      <a href="https://movie.douban.com/"></a>
    </div>
    <div class="search">
      <div class="search-inp">
        <input
          v-model="searchText"
          type="text"
          placeholder="搜索电影、电视剧、综艺、影人"
          maxlength="60"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <div class="search-btn"></div>
      <ul
        class="search-list"
        v-show="showSearchList && searchResults.length > 0"
      >
        <li
          v-for="(item, index) in searchResults"
          :key="index"
          class="search-info"
        >
          <div class="poster">
            <img :src="item.img" :alt="item.title" />
          </div>
          <div class="content">
            <div class="title">
              <span>{{ item.title }}</span>
              <span v-if="item.year" class="year">{{ item.year }}</span>
            </div>
            <div class="sub-title">{{ item.sub_title }}</div>
            <div v-if="item.episode" class="episode">
              共{{ item.episode }}集
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// 搜索文本
const searchText = ref("");
// 是否显示搜索结果列表
const showSearchList = ref(false);
// 搜索结果
const searchResults = ref([]);
// 上一次搜索文本
const prevSearchText = ref("");

// 模拟搜索数据
const mockSearchData = [
  {
    img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2574145203.jpg",
    title: "长安十二时辰",
    year: "2019",
    sub_title: "长安十二时辰",
    episode: "48",
  },
  {
    img: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2566594112.jpg",
    title: "隐秘的角落",
    year: "2020",
    sub_title: "隐秘的角落",
    episode: "12",
  },
];

// 处理搜索
const handleSearch = async text => {
  if (text === prevSearchText.value) return;

  // 模拟异步搜索
  await new Promise(resolve => setTimeout(resolve, 300));

  // 过滤搜索结果
  searchResults.value = mockSearchData.filter(
    item =>
      item.title.toLowerCase().includes(text.toLowerCase()) ||
      item.sub_title.toLowerCase().includes(text.toLowerCase())
  );

  prevSearchText.value = text;
};

// 监听搜索文本变化
watch(searchText, newValue => {
  const text = newValue.trim();
  if (text) {
    handleSearch(text);
  } else {
    searchResults.value = [];
  }
});

// 处理输入框聚焦
const handleFocus = () => {
  if (searchResults.value.length > 0) {
    showSearchList.value = true;
  }
};

// 处理输入框失焦
const handleBlur = () => {
  showSearchList.value = false;
};
</script>

<style scoped>
.search-container {
  width: 804px;
  margin: 100px auto 0;
}

.search-container::after {
  content: "";
  display: block;
  clear: both;
}

.logo,
.search {
  float: left;
}

.logo {
  width: 145px;
  height: 56px;
  margin-right: 13px;
  background-image: url("./image/logo.png");
  background-position-y: center;
  background-repeat: no-repeat;
}

.logo a {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.search-inp {
  width: 470px;
  height: 34px;
  margin-top: 11px;
}

.search-inp input {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  border: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  box-shadow: 0px 1px 2px #ccc;
  outline: none;
}

.search-btn {
  position: relative;
  top: -34px;
  right: -470px;
  width: 37px;
  height: 34px;
  background-color: #929ba2;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  background-image: url("./image/search.png");
  background-repeat: no-repeat;
  background-position: center center;
}

.search-list {
  list-style: none;
  position: relative;
  top: -34px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom: none;
}

.search-info {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.poster,
.content {
  display: inline-block;
  vertical-align: middle;
}

.poster {
  width: 45px;
  height: 63px;
}

.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  margin-left: 5px;
}

.title {
  color: #27a;
  font-size: 14px;
}

.year,
.sub-title,
.episode {
  font-size: 12px;
  color: #9b9b9b;
}

.title,
.sub-title,
.episode {
  margin-bottom: 4px;
}

.episode {
  margin-bottom: 0;
}
</style>
