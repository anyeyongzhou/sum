<template>
  <div class="layout-logo" v-if="setShowLogo" @click="onThemeConfigChange">
    <img src="/@/assets/layout/sys-pic.png" class="layout-logo-medium-img" />
    <span>暗夜永昼</span>
  </div>
  <!-- <div class="layout-logo-size" v-else @click="onThemeConfigChange">
		<img :src="logoMini" class="layout-logo-size-img" />
	</div> -->
</template>

<script setup lang="ts" name="layoutLogo">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "/@/stores/themeConfig";
import logoMini from "/@/assets/logo-mini.svg";
// import { onThemeConfigChange } from './onThemeConfigChange';

// 定义变量内容
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

// 设置 logo 的显示。classic 经典布局默认显示 logo
const setShowLogo = computed(() => {
  let { isCollapse, layout } = themeConfig.value;
  return (
    !isCollapse || layout === "classic" || document.body.clientWidth < 1000
  );
});
// logo 点击实现菜单展开/收起
const onThemeConfigChange = () => {
  // if (themeConfig.value.layout === 'transverse') return false;
  // themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
};
</script>

<style scoped lang="scss">
.layout-logo {
  width: 350px;
  height: 80px;
  padding-top: 5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
  color: white;
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
  animation: logoAnimation 0.3s ease-in-out;
  .layout-logo-medium-img {
    position: relative;
    top: -5px;
  }
  span {
    white-space: nowrap;
    display: block;
    font-size: 25px;
    position: relative;
    top: -5px;
  }
  &:hover {
    span {
      color: var(--color-primary-light-2);
    }
  }
  &-medium-img {
    display: block;
    width: 35px;
    margin-right: 10px;
    // margin-left: 25px;
  }
}
.layout-logo-size {
  width: 100%;
  height: 80px;
  display: flex;
  cursor: pointer;
  animation: logoAnimation 0.3s ease-in-out;
  &-img {
    width: 50px;
    margin: auto;
  }
  &:hover {
    img {
      animation: logoAnimation 0.3s ease-in-out;
    }
  }
}
</style>
