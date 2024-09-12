<template>
  <template v-for="val in chils">
    <el-sub-menu
      :index="val.path"
      :key="val.path"
      v-if="val.children && val.children.length > 0"
    >
      <template #title>
        <SvgIcon :name="imageArr.find(m => m.includes(val.name))" />
        <span>{{ $t(val.meta.title) }}</span>
      </template>
      <sub-item :chil="val.children" :imageArr="imageArr" />
    </el-sub-menu>
    <template v-else>
      <el-menu-item :index="val.path" :key="val.path" class="menu_item">
        <template
          v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)"
        >
          <SvgIcon :name="imageArr.find(m => m.includes(val.name))" />
          <span class="span-class">{{ $t(val.meta.title) }}</span>
        </template>
        <template v-else>
          <a class="w100" @click.prevent="onALinkClick(val)">
            <SvgIcon :name="imageArr.find(m => m.includes(val.name))" />
            {{ $t(val.meta.title) }}
          </a>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts" name="navMenuSubItem">
import { computed } from "vue";
import { RouteRecordRaw } from "vue-router";
import other from "/@/utils/other";

// 定义父组件传过来的值
const props = defineProps({
  // 菜单列表
  chil: {
    type: Array<RouteRecordRaw>,
    default: () => [],
  },
  imageArr: {
    type: Array<any>,
    default: () => [],
  },
});

// 获取父级菜单数据
const chils = computed(() => {
  return <RouteItems>props.chil;
});
// 打开外部链接
const onALinkClick = (val: RouteItem) => {
  other.handleOpenLink(val);
};
</script>

<style lang="scss" scoped>
.span-class {
  // border: 1px solid green;
  width: 90px;
}

.img {
  transform: rotate(270deg);
}

.menu_item {
  // border: 1px solid green;
  width: 183px;
}
</style>
