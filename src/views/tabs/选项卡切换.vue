<template>
  <div class="tabs">
    <!-- 选项卡菜单 -->
    <div class="container">
      <ul class="container-box">
        <li
          v-for="(item, index) in items"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="handleTabClick(index)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <!-- 内容区域 -->
    <div class="content-box">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="content-item"
        :class="{ active: currentIndex === index }"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    title: "新闻喜讯",
    content: "为何在心上划下你的姓名 如果不曾爱过你",
  },
  {
    title: "邓哥奇遇",
    content: "今日内容 你学会了没",
  },
  {
    title: "恐惧恶魔",
    content: "恐惧恶魔 你学会了没",
  },
  {
    title: "道德人性",
    content: "道德人性 你学会了没",
  },
]);

const emit = defineEmits(["change"]);

const currentIndex = ref(0);

const handleTabClick = index => {
  currentIndex.value = index;
  emit("change", index);
};
</script>

<style lang="scss" scoped>
.tabs {
  width: 500px !important;
  margin: 0 auto;
}

.container {
  width: 100%;
  height: 50px;
  text-align: center;
  background: #ccc;

  .container-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    list-style: none;

    li {
      margin: 0 10px;
      padding: 9px;
      cursor: pointer;
      color: #fff;
      font-size: 16px;
      transition: all 0.3s ease;

      &:hover {
        color: #ee5600;
      }

      &.active {
        border-bottom: 2px solid #ee5600;
        font-weight: bold;
        color: #ee5600;
      }
    }
  }
}

.content-box {
  width: 100%;
  min-height: 300px;
  border: 1px solid #ccc;
  margin-top: -1px;
  font-size: 14px;
  line-height: 25px;

  .content-item {
    display: none;
    padding: 20px;

    &.active {
      display: block;
    }
  }
}
</style>
