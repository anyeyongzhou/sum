<template>
  <el-menu
    router
    :default-active="state.defaultActive"
    background-color="transparent"
    :collapse="state.isCollapse"
    :unique-opened="getThemeConfig.isUniqueOpened"
    :collapse-transition="false"
    class="el-menu-class"
  >
    <template v-for="(val, index) in menuLists" :key="index">
      <el-sub-menu
        :index="val.path"
        v-if="val.children && val.children.length > 0"
        :key="val.path"
        @click="handleClick(val)"
      >
        <template #title>
          <SvgIcon :name="imageArr.find(m => m.includes(val.name))" />
          <span>{{ $t(val.meta.title) }}</span>
        </template>
        <SubItem :chil="val.children" :imageArr="imageArr" />
      </el-sub-menu>
      <template v-else>
        <el-menu-item
          :index="val.path"
          :key="val.path"
          style="position: relative; width: 180px"
          v-if="!val.hidden"
        >
          <SvgIcon :name="imageArr.find(m => m.includes(val.name))" />
          <template
            #title
            v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)"
          >
            <span v-tooltip-ellipsis="$t(val.meta.title)">{{
              $t(val.meta.title)
            }}</span>
          </template>
          <template #title v-else>
            <a
              class="w100"
              @click.prevent="onALinkClick(val)"
              v-tooltip-ellipsis="$t(val.meta.title)"
              >{{ $t(val.meta.title) }}</a
            >
          </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts" name="navMenuVertical">
import {
  defineAsyncComponent,
  reactive,
  computed,
  onMounted,
  watch,
  ref,
} from "vue";
import { useRoute, onBeforeRouteUpdate, RouteRecordRaw } from "vue-router";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "/@/stores/themeConfig";
import other from "/@/utils/other";

let imageList = import.meta.glob("/src/assets/menuicon/*.*", { eager: true });
let imageArr = Object.values(imageList).map((v: any) => v.default);

// 引入组件
const SubItem = defineAsyncComponent(
  () => import("/@/layout/navMenu/subItem.vue")
);

// 定义父组件传过来的值
const props = defineProps({
  // 菜单列表
  menuList: {
    type: Array<RouteRecordRaw>,
    default: () => [],
  },
});

// 定义变量内容
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const route = useRoute();
const state = reactive({
  // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
  defaultActive: route.meta.isDynamic ? route.meta.isDynamicPath : route.path,
  isCollapse: false,
});

// 获取父级菜单数据
const menuLists = computed(() => {
  return <RouteItems>props.menuList;
});
// 获取布局配置信息
const getThemeConfig = computed(() => {
  return themeConfig.value;
});
// 菜单高亮（详情时，父级高亮）
const setParentHighlight = (currentRoute: RouteToFrom) => {
  const { path, meta } = currentRoute;
  currentSelectedRoute.value = path + "";
  const pathSplit = meta?.isDynamic
    ? meta.isDynamicPath!.split("/")
    : path!.split("/");
  if (pathSplit.length >= 4 && meta?.isHide)
    return pathSplit.splice(0, 3).join("/");
  else return path;
};
// 打开外部链接
const onALinkClick = (val: RouteItem) => {
  other.handleOpenLink(val);
};

//点击有二级菜单的一级菜单
const handleClick = (val: any) => {};

const currentSelectedRoute = ref("");

// 页面加载时
onMounted(() => {
  state.defaultActive = setParentHighlight(route);
});
// 路由更新时
onBeforeRouteUpdate(to => {
  // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
  state.defaultActive = setParentHighlight(to);
  const clientWidth = document.body.clientWidth;
  if (clientWidth < 1000) themeConfig.value.isCollapse = false;
});

// 设置菜单的收起/展开
watch(
  () => themeConfig.value.isCollapse,
  isCollapse => {
    document.body.clientWidth <= 1000
      ? (state.isCollapse = false)
      : (state.isCollapse = isCollapse);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.el-menu-class {
  height: auto;
  padding-left: 17px;
  padding-right: 20px;

  :deep(.el-sub-menu__title) {
    height: 34px;
    margin-bottom: 10px;
    background: url("/@/assets/images/side_bg.png");

    .el-sub-menu__icon-arrow {
      display: none;
    }

    // .img {
    // 	width: 20px;
    // 	height: 50px;
    // 	position: absolute;
    // 	right: 10px;
    // 	top: -10px;
    // }
  }

  // .img-one {
  // 	width: 20px;
  // 	height: 50px;
  // 	position: absolute;
  // 	right: 10px;
  // }
}
</style>
