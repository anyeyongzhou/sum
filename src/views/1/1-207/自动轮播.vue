<template>
  <div class="container">
    <h1 class="title">{{ title }}</h1>
    <ul class="list" ref="listRef">
      <li v-for="(item, index) in displayItems" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "最新公告",
  },
  items: {
    type: Array,
    default: () => [
      "1.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis",
      "2.Minima, nemo? Deleniti doloribus est quia doloremque velit ea totam a.",
      "3.Enim fugit dolorum quibusdam nam? Eligendi tenetur nam totam earum",
      "4.Inventore nulla incidunt atque! Architecto, sunt laudantium, nam dicta",
    ],
  },
  scrollDuration: {
    type: Number,
    default: 2000,
  },
  itemHeight: {
    type: Number,
    default: 30,
  },
});

const listRef = ref(null);
const currentIndex = ref(0);
let scrollInterval = null;
let moveInterval = null;

// 计算显示的列表项（包含克隆的第一项）
const displayItems = computed(() => {
  return [...props.items, props.items[0]];
});

// 克隆第一个元素
function cloneFirstItem() {
  if (listRef.value && listRef.value.children.length > 0) {
    const firstItem = listRef.value.children[0];
    const newItem = firstItem.cloneNode(true);
    listRef.value.appendChild(newItem);
  }
}

// 移动列表
function moveNext() {
  const from = currentIndex.value * props.itemHeight;
  currentIndex.value++;
  const to = currentIndex.value * props.itemHeight;
  const totalDuration = 500;
  const duration = 10;
  const times = totalDuration / duration;
  const dis = (to - from) / times;
  let currentFrom = from;

  moveInterval = setInterval(() => {
    currentFrom += dis;
    if (currentFrom >= to) {
      clearInterval(moveInterval);
      if (currentIndex.value === displayItems.value.length - 1) {
        currentFrom = 0;
        currentIndex.value = 0;
      }
    }
    if (listRef.value) {
      listRef.value.scrollTop = currentFrom;
    }
  }, duration);
}

// 开始滚动
function startScrolling() {
  scrollInterval = setInterval(moveNext, props.scrollDuration);
}

// 停止滚动
function stopScrolling() {
  if (scrollInterval) {
    clearInterval(scrollInterval);
  }
  if (moveInterval) {
    clearInterval(moveInterval);
  }
}

onMounted(() => {
  cloneFirstItem();
  startScrolling();
});

onUnmounted(() => {
  stopScrolling();
});
</script>

<style lang="scss" scoped>
.container {
  width: 100% !important;
  background-color: #bfedfc;
  height: 30px;
  // padding: 20px 0;
  overflow: hidden;

  &::before {
    content: "";
    display: block;
    clear: both;
  }
}

.title {
  float: left;
  font-size: 16px;
  font-weight: normal;
  margin: 0;
  margin-left: 20px;
  text-align: center;
  margin-top: 5px;
  border-right: 2px solid #ccc;
  padding-right: 30px;
}

.list {
  float: left;
  list-style: none;
  padding: 0;
  height: 30px;
  overflow: hidden;
  margin: 0;
  margin-left: 50px;

  li {
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
