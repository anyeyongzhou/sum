<template>
  <div class="home">
    <RightDrawer>
      <!-- 这里是抽屉展开时的内容 -->
      <h3>抽屉标题</h3>
      <p>这里是抽屉内容...</p>
    </RightDrawer>
  </div>
</template>

<script setup>
import RightDrawer from "./components/RightDrawer.vue";
</script>

<style lang="scss" scoped>
.home {
  height: 80%;
  width: 80%;
  padding: 10px;
  position: relative;
}
</style>
