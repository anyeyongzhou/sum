<template>
  <div class="home">
    <div class="containers">
      <div class="search" ref="searchRef">
        <input
          ref="inputRef"
          type="text"
          class="input"
          placeholder="Search..."
        />
        <el-button
          @click="handleClickBtn"
          :icon="Search"
          class="btn"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
/* 不改的代码 begin */
const searchRef = ref(null);

const inputRef = ref(null);

const handleClickBtn = () => {
  searchRef.value.classList.toggle("active"); // 添加与移除active
  inputRef.value.focus(); // 聚焦input
};

/* 不改的代码 end */
</script>

<style lang="scss" scoped>
.home {
  height: 110%;
  width: 100%;
  background-color: #00f;
  position: relative;
  overflow-y: scroll;

  .containers {
    width: 60%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;

    /* 编写CSS begin */
    /* 设置搜索栏的容器样式 */
    .search {
      position: relative;
      height: 50px;
      .input {
        background-color: #fff;
        border: 0;
        font-size: 18px;
        padding: 15px;
        height: 50px;
        width: 50px; /* 初始宽度 */
        transition: width 0.3s ease;
      }
      /* 设置按钮样式 */
      .btn {
        background-color: #fff;
        border: 0;
        cursor: pointer;
        font-size: 24px;
        position: absolute; /* 绝对定位 */
        top: 0;
        left: 0;
        height: 50px;
        width: 50px;
        transition: transform 0.3s ease; /* 添加平移过渡动画 */
      }
      /* 去除按钮和输入框的聚焦状态样式 */
      .btn:focus,
      .input:focus {
        outline: none;
      }

      /* 当搜索栏处于激活状态时，展开输入框 */
      &.active .input {
        width: 200px; /* 展开后的宽度 */
      }

      /* 当搜索栏处于激活状态时，移动按钮以适应展开的输入框 */
      &.active .btn {
        transform: translateX(198px); /* 平移按钮 */
      }
    }

    /* 编写CSS end */
  }
}
</style>
