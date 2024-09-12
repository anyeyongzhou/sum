<template>
  <el-config-provider :size="getGlobalComponentSize" :locale="getGlobalI18n">
    <router-view v-show="setLockScreen" />
    <LockScreen v-if="themeConfig.isLockScreen" />
    <Setings ref="setingsRef" v-show="setLockScreen" />
    <CloseFull v-if="!themeConfig.isLockScreen" />
  </el-config-provider>
</template>

<script setup lang="ts" name="app">
import {
  defineAsyncComponent,
  computed,
  ref,
  onBeforeMount,
  onMounted,
  onUnmounted,
  nextTick,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { useTagsViewRoutes } from "/@/stores/tagsViewRoutes";
import { useThemeConfig } from "/@/stores/themeConfig";
import other from "/@/utils/other";
import { Local, Session } from "/@/utils/storage";
import mittBus from "/@/utils/mitt";
import setIntroduction from "/@/utils/setIconfont";
import { jsonp } from "vue-jsonp";

// 引入组件
const LockScreen = defineAsyncComponent(
  () => import("/@/layout/lockScreen/index.vue")
);
const Setings = defineAsyncComponent(
  () => import("/@/layout/navBars/topBar/setings.vue")
);
const CloseFull = defineAsyncComponent(
  () => import("/@/layout/navBars/topBar/closeFull.vue")
);

// 定义变量内容
const { messages, locale } = useI18n();
const setingsRef = ref();
const route = useRoute();
const stores = useTagsViewRoutes();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

// 设置锁屏时组件显示隐藏
const setLockScreen = computed(() => {
  // 防止锁屏后，刷新出现不相关界面
  return themeConfig.value.isLockScreen
    ? themeConfig.value.lockScreenTime > 1
    : themeConfig.value.lockScreenTime >= 0;
});

// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
  return other.globalComponentSize();
});
// 获取全局 i18n
const getGlobalI18n = computed(() => {
  return messages.value[locale.value];
});

// function loadMapResource(url: string): void {
//   jsonp(url)
//     .then((response: any) => {

//     })
//     .catch((error: any) => {

//     });
// }

// 设置初始化，防止刷新时恢复默认
onBeforeMount(() => {
  // 设置批量第三方 icon 图标
  setIntroduction.cssCdn();
  // 设置批量第三方 js
  setIntroduction.jsCdn();
  //导入思极地图资源
  // $jsonp('https://map.sgcc.com.cn/maps?v=3.0.0').then((error: any) => {
  // 	ElMessage.error('思极地图资源导入失败', error);
  // });
  // const mode = import.meta.env.MODE;
  // if (mode === 'production') {
  // 	// 信通
  // 	loadMapResource('http://map.js.sgcc.com.cn/maps?v=3.0.0');
  // } else if (mode === 'stage') {
  // 	// 子网
  // 	loadMapResource('http://20.46.77.225/maps?v=3.0.0');
  // } else {
  // 	// 外网
  // loadMapResource("https://map.sgcc.com.cn/maps?v=3.0.0");
  // }
});
// 页面加载时
onMounted(() => {
  nextTick(() => {
    // 监听布局配'置弹窗点击打开
    mittBus.on("openSetingsDrawer", () => {
      setingsRef.value.openDrawer();
    });
    // 获取缓存中的布局配置
    if (Local.get("themeConfig")) {
      storesThemeConfig.setThemeConfig({
        themeConfig: Local.get("themeConfig"),
      });
      document.documentElement.style.cssText = Local.get("themeConfigStyle");
    }
    // 获取缓存中的全屏配置
    if (Session.get("isTagsViewCurrenFull")) {
      stores.setCurrenFullscreen(Session.get("isTagsViewCurrenFull"));
    }
  });
});
// 页面销毁时，关闭监听布局配置/i18n监听
onUnmounted(() => {
  mittBus.off("openSetingsDrawer", () => {});
});
// 监听路由的变化，设置网站标题
watch(
  () => route.path,
  () => {
    other.useTitle();
  },
  {
    deep: true,
  }
);
</script>
