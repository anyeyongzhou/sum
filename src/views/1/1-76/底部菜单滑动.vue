<template>
  <div class="home">
    <div class="containers">
      <div class="navigation-wrapper">
        <button class="arrow-button left-arrow" @click="moveLeft">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
            />
          </svg>
        </button>

        <div ref="parent" class="parent-container">
          <div
            v-for="(text, index) in menuItems"
            :key="index"
            class="child-container"
            :class="{ active: activeIndex === index }"
            @click="centerChild(index)"
          >
            {{ text }}
          </div>
        </div>

        <button class="arrow-button right-arrow" @click="moveRight">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const parent = ref(null);
const menuItems = ref([
  "全局监测",
  "碳智库",
  "碳核算模型库",
  "碳排放因子库",
  "碳溯源",
  "碳资产管理",
  "碳服务管理",
  "碳服务管理1",
  "碳服务管理2",
  "碳服务管理3",
  "碳服务管理4",
]);
const activeIndex = ref(0);
const childWidth = 100;
const parentWidth = 600;
const visibleChildren = Math.floor(parentWidth / childWidth); // 6

const centerChild = index => {
  activeIndex.value = index;
  updateScrollPosition();
};

const updateScrollPosition = () => {
  const halfVisible = Math.floor(visibleChildren / 2); // 3
  let scrollTo = (activeIndex.value - halfVisible) * childWidth;

  // 处理边界情况
  if (scrollTo < 0) scrollTo = 0;
  const maxScroll = (menuItems.value.length - visibleChildren) * childWidth;
  if (scrollTo > maxScroll) scrollTo = maxScroll;

  parent.value.scrollTo({
    left: scrollTo,
    behavior: "smooth",
  });
};

const moveLeft = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
    updateScrollPosition();
  }
};

const moveRight = () => {
  if (activeIndex.value < menuItems.value.length - 2) {
    activeIndex.value++;
    updateScrollPosition();
  }
};

onMounted(() => {
  // 初始化时显示第一个菜单项
  centerChild(0);
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow-y: scroll;

  .containers {
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;

    .navigation-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .parent-container {
      width: 600px;
      height: 50px;
      border: 2px solid #333;
      position: relative;
      overflow: hidden;
      display: flex;
      scroll-behavior: smooth;
    }

    .child-container {
      width: 100px;
      height: 50px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.3s ease;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 5px;
      // transform: skewX(-30deg); /* 向右倾斜30度 */
      margin-right: 10px; /* 添加右边距 */

      &:hover {
        background-color: #e0e0e0;
      }

      &.active {
        background-color: #4caf50;
        color: white;
        font-weight: bold;
      }
    }

    .arrow-button {
      width: 40px;
      height: 40px;
      border: none;
      background-color: #f0f0f0;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        background-color: #e0e0e0;
      }

      &:active {
        transform: scale(0.95);
      }

      svg {
        fill: #333;
      }
    }

    .left-arrow {
      margin-right: 5px;
    }

    .right-arrow {
      margin-left: 5px;
    }
  }
}
</style>
