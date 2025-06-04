<template>
  <el-container class="layout-container flex-center">
    <LayoutHeader />
    <el-container class="layout-mian-height-50">
      <!-- <LayoutAside /> -->
      <div class="flex-center layout-backtop">
        <el-breadcrumb separator="|" class="breadcrumb_list">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item> -->
          <el-breadcrumb-item
            class="breadcrumb_list_item"
            v-if="routeObj.routeName && routeObj.routeName !== '首页'"
            :to="{ path: routeObj.routePath }"
            >{{ routeObj.routeName }}</el-breadcrumb-item
          >
        </el-breadcrumb>
        <!-- <LayoutTagsView v-if="isTagsview" /> -->
        <LayoutMain ref="layoutMainRef" />
        <!--        <div style="background-color: white;height: 50px;">-->
        <!--          <Breadcrumb />-->
        <!--        </div>-->
      </div>
    </el-container>
    <div class="btn-list" v-if="route.path != '/home'">
      <el-button @click="gotoPre" size="small" type="primary">
        上一个
      </el-button>
      <el-button @click="gotoHome" size="small" type="success">
        首页
      </el-button>
      <el-button @click="gotoNext" size="small" type="primary">
        下一个
      </el-button>
    </div>
  </el-container>
</template>

<script setup lang="ts" name="layoutClassic">
import {
  defineAsyncComponent,
  computed,
  ref,
  watch,
  nextTick,
  onMounted,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useScrollStore } from "/@/stores/scrollStore";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "/@/stores/themeConfig";
import { useScrollPosition } from "/@/hooks/useScrollPosition";

// 引入组件
const Breadcrumb = defineAsyncComponent(
  () => import("/@/layout/navBars/topBar/breadcrumb.vue")
);
const LayoutAside = defineAsyncComponent(
  () => import("/@/layout/component/aside.vue")
);
const LayoutHeader = defineAsyncComponent(
  () => import("/@/layout/component/header.vue")
);
const LayoutMain = defineAsyncComponent(
  () => import("/@/layout/component/main.vue")
);
const LayoutTagsView = defineAsyncComponent(
  () => import("/@/layout/navBars/tagsView/tagsView.vue")
);

// 定义变量内容
const layoutMainRef = ref<InstanceType<typeof LayoutMain>>();
const route = useRoute();
const router = useRouter();
const storesThemeConfig = useThemeConfig();
const scrollStore = useScrollStore();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { saveLastClicked } = useScrollPosition("home_page");

// 判断是否显示 tasgview
const isTagsview = computed(() => {
  return themeConfig.value.isTagsview;
});
// 重置滚动条高度，更新子级 scrollbar
const updateScrollbar = () => {
  layoutMainRef.value?.layoutMainScrollbarRef.update();
};
// 重置滚动条高度，由于组件是异步引入的
const initScrollBarHeight = () => {
  nextTick(() => {
    setTimeout(() => {
      updateScrollbar();
      // '!' not null 断言操作符，不执行运行时检查
      if (layoutMainRef.value)
        layoutMainRef.value!.layoutMainScrollbarRef.wrapRef.scrollTop = 0;
    }, 500);
  });
};
let routeObj = ref({
  routeName: "",
  routePath: "",
});

const routerName = computed(() => {
  console.log("routerName", routeObj.value.routeName);
  return routeObj.value.routeName;
});

const gotoHome = () => {
  router.push({
    path: "/home",
  });
};
const gotoPre = (path: any) => {
  let pathObj = scrollStore.getPrevRoute(route.path);
  if (pathObj) {
    router.push({
      path: pathObj.path,
    });
    saveLastClicked(pathObj.path);
  } else {
    ElMessage({
      message: "已经是第一个了",
      type: "warning",
    });
  }
};
const gotoNext = (path: any) => {
  let pathObj = scrollStore.getNextRoute(route.path);
  if (pathObj) {
    router.push({
      path: pathObj.path,
    });
    saveLastClicked(pathObj.path);
  } else {
    ElMessage({
      message: "已经是最后一个了",
      type: "warning",
    });
  }
};

// 页面加载时
onMounted(() => {
  if (route.meta.title != null) {
    routeObj.value.routeName = route.meta.title;
    routeObj.value.routePath = route.path;
  }
  initScrollBarHeight();
});
// 监听路由的变化，切换界面时，滚动条置顶
watch(
  () => route.path,
  () => {
    if (route.meta.title != null) {
      routeObj.value.routeName = route.meta.title;
      routeObj.value.routePath = route.path;
    }
    initScrollBarHeight();
  }
);
// 监听 themeConfig  isTagsview 配置文件的变化，更新菜单 el-scrollbar 的高度
watch(
  () => themeConfig.value.isTagsview,
  () => {
    nextTick(() => {
      updateScrollbar();
    });
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
@import "src/theme/element.scss";
.breadcrumb_list {
  height: 40px;
  line-height: 40px;
  :deep(.breadcrumb_list_item) {
    .is-link {
      color: var(--el-menu-active-color);
    }
  }
}
.btn-list {
  position: fixed;
  top: 8.5%;
  right: 2%;
  // width: 200px;
  height: 40px;
  // border: 1px solid red;
  display: flex;
  // flex-wrap: nowrap;
  // flex-direction: row;
  justify-content: space-around;
  align-items: center;
  // padding: 5% 0;
}
</style>
