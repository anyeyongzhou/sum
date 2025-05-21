<template>
  <div class="container">
    <div class="container-item" @click="handleClick">
      <div>{{ open ? "收起" : "展开" }}</div>
      <div :class="[open ? 'rotate' : 'arrow']">▼</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const open = ref(false);

const handleClick = () => {
  open.value = !open.value;
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .container-item {
    // width: 100%;
    // height: 100%;
    color: #fff;
    border: 1px solid #ff0;
    display: flex;
    div {
      cursor: pointer;
    }
    .arrow {
      transition: transform 0.3s linear;
    }
    .rotate {
      transform: rotate(180deg);
      transition: transform 0.3s linear;
    }
  }
}
</style>
