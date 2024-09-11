<template>
  <div
    class="layout-navbars-breadcrumb-user pr15"
    :style="{ flex: layoutUserFlexNum }"
  >
    <!-- 字体 -->
    <!-- <el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onComponentSizeChange">
			<div class="layout-navbars-breadcrumb-user-icon">
				<i class="iconfont icon-ziti" title="字体"></i>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="large" :disabled="state.disabledSize === 'large'">大</el-dropdown-item>
					<el-dropdown-item command="default" :disabled="state.disabledSize === 'default'">默</el-dropdown-item>
					<el-dropdown-item command="small" :disabled="state.disabledSize === 'small'">小</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown> -->
    <!-- 中英文 -->
    <!-- <el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onLanguageChange">
			<div class="layout-navbars-breadcrumb-user-icon">
				<i
					class="iconfont"
					:class="state.disabledI18n === 'en' ? 'icon-fuhao-yingwen' : 'icon-fuhao-zhongwen'"
					:title="$t('message.user.title1')"
				></i>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="zh-cn" :disabled="state.disabledI18n === 'zh-cn'">简体中文</el-dropdown-item>
					<el-dropdown-item command="en" :disabled="state.disabledI18n === 'en'">English</el-dropdown-item>
					<el-dropdown-item command="zh-tw" :disabled="state.disabledI18n === 'zh-tw'">繁體中文</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown> -->
    <!-- 搜索 -->
    <!-- <div class="layout-navbars-breadcrumb-user-icon" @click="onSearchClick">
			<el-icon :title="$t('message.user.title2')">
				<ele-Search />
			</el-icon>
		</div> -->
    <!-- 皮肤 -->
    <!-- <div class="layout-navbars-breadcrumb-user-icon" @click="onLayoutSetingClick">
			<i class="icon-skin iconfont" :title="$t('message.user.title3')"></i>
		</div> -->
    <!-- 提示 -->
    <!-- <div class="layout-navbars-breadcrumb-user-icon" ref="userNewsBadgeRef" v-click-outside="onUserNewsClick">
			<el-badge :is-dot="true">
				<el-icon :title="$t('message.user.title4')">
					<ele-Bell />
				</el-icon>
			</el-badge>
		</div>
		<el-popover
			ref="userNewsRef"
			:virtual-ref="userNewsBadgeRef"
			placement="bottom"
			trigger="click"
			transition="el-zoom-in-top"
			virtual-triggering
			:width="300"
			:persistent="false"
		>
			<span>这里可以加入组件写内容</span>
		</el-popover> -->
    <!-- 全屏 -->
    <!-- <div class="layout-navbars-breadcrumb-user-icon mr10" @click="onScreenfullClick">
			<i
				class="iconfont"
				:title="state.isScreenfull ? $t('message.user.title6') : $t('message.user.title5')"
				:class="!state.isScreenfull ? 'icon-fullscreen' : 'icon-tuichuquanping'"
			></i>
		</div> -->
    <!-- 用户下拉 -->
    <div class="curTime">当前时间：{{ currentTime }}</div>
    <el-dropdown
      :show-timeout="70"
      :hide-timeout="50"
      @command="onHandleCommandClick"
    >
      <span class="layout-navbars-breadcrumb-user-link">
        <!-- &lt;!&ndash; <img :src="userInfos.photo" class="layout-navbars-breadcrumb-user-link-photo mr5" /> &ndash;&gt; -->
        <!-- <img
					:src="userInfos.photo === '' ? '/@/assets/layout/default-avatar.png' : userInfos.photo"
					class="layout-navbars-breadcrumb-user-link-photo mr5 img"
				/> -->
        <!-- <img src="/@/assets/layout/default-avatar.png" class="layout-navbars-breadcrumb-user-link-photo mr5 img" /> -->
        <div class="img"></div>
        <div class="name">
          {{ userInfos.nickName === "" ? "common" : userInfos.nickName }}
        </div>
        <!-- <el-icon class="el-icon&#45;&#45;right">
					<ele-ArrowDown />
				</el-icon> -->
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="/personal"> 个人中心 </el-dropdown-item>
          <el-dropdown-item command="logOut"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <Search ref="searchRef" />
  </div>
</template>

<script setup lang="ts" name="layoutBreadcrumbUser">
import {
  defineAsyncComponent,
  ref,
  unref,
  computed,
  reactive,
  onMounted,
  onUnmounted,
} from "vue";
import { useRouter } from "vue-router";
import {
  ElMessageBox,
  ElMessage,
  ClickOutside as vClickOutside,
} from "element-plus";
import screenfull from "screenfull";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useUserInfo } from "/@/stores/userInfo";
import { useThemeConfig } from "/@/stores/themeConfig";
import other from "/@/utils/other";
import mittBus from "/@/utils/mitt";
import { Session, Local } from "/@/utils/storage";

// 引入组件
const UserNews = defineAsyncComponent(
  () => import("/@/layout/navBars/topBar/userNews.vue")
);
const Search = defineAsyncComponent(
  () => import("/@/layout/navBars/topBar/search.vue")
);

// 定义变量内容
const userNewsRef = ref();
const userNewsBadgeRef = ref();
const { locale, t } = useI18n();
const router = useRouter();
const stores = useUserInfo();
const storesThemeConfig = useThemeConfig();
const { userInfos } = storeToRefs(stores);
const { themeConfig } = storeToRefs(storesThemeConfig);
const searchRef = ref();
const state = reactive({
  isScreenfull: false,
  disabledI18n: "zh-cn",
  disabledSize: "large",
});

// 设置分割样式
const layoutUserFlexNum = computed(() => {
  let num: string | number = "";
  const { layout, isClassicSplitMenu } = themeConfig.value;
  const layoutArr: string[] = ["defaults", "columns"];
  if (
    layoutArr.includes(layout) ||
    (layout === "classic" && !isClassicSplitMenu)
  )
    num = "1";
  else num = "";
  return num;
});
// 全屏点击时
const onScreenfullClick = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning("暂不不支持全屏");
    return false;
  }
  screenfull.toggle();
  screenfull.on("change", () => {
    if (screenfull.isFullscreen) state.isScreenfull = true;
    else state.isScreenfull = false;
  });
};
// 消息通知点击时
const onUserNewsClick = () => {
  unref(userNewsRef).popperRef?.delayHide?.();
};
// 布局配置 icon 点击时
const onLayoutSetingClick = () => {
  mittBus.emit("openSetingsDrawer");
};
// 下拉菜单点击时
const onHandleCommandClick = (path: string) => {
  if (path === "logOut") {
    ElMessageBox({
      closeOnClickModal: false,
      closeOnPressEscape: false,
      title: t("message.user.logOutTitle"),
      message: t("message.user.logOutMessage"),
      showCancelButton: true,
      confirmButtonText: t("message.user.logOutConfirm"),
      cancelButtonText: t("message.user.logOutCancel"),
      buttonSize: "default",
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = t("message.user.logOutExit");
          setTimeout(() => {
            done();
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 300);
          }, 700);
        } else {
          done();
        }
      },
    })
      .then(async () => {
        // 清除缓存/token等
        Session.clear();
        // 使用 reload 时，不需要调用 resetRoute() 重置路由
        window.location.reload();
      })
      .catch(() => {});
  } else {
    router.push({
      path: "/personal",
    });
  }
};
// 菜单搜索点击
const onSearchClick = () => {
  searchRef.value.openSearch();
};
// 组件大小改变
const onComponentSizeChange = (size: string) => {
  Local.remove("themeConfig");
  themeConfig.value.globalComponentSize = size;
  Local.set("themeConfig", themeConfig.value);
  initI18nOrSize("globalComponentSize", "disabledSize");
  window.location.reload();
};
// 语言切换
const onLanguageChange = (lang: string) => {
  Local.remove("themeConfig");
  themeConfig.value.globalI18n = lang;
  Local.set("themeConfig", themeConfig.value);
  locale.value = lang;
  other.useTitle();
  initI18nOrSize("globalI18n", "disabledI18n");
};
// 初始化组件大小/i18n
const initI18nOrSize = (value: string, attr: string) => {
  (<any>state)[attr] = Local.get("themeConfig")[value];
};

// 设置当前时间
const rawTime = ref(new Date());

const currentTime = computed(() => {
  const time = rawTime.value;
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const day = String(time.getDate()).padStart(2, "0");
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
});
let intervalId: any = null;

// 页面加载时
onMounted(() => {
  if (Local.get("themeConfig")) {
    initI18nOrSize("globalComponentSize", "disabledSize");
    initI18nOrSize("globalI18n", "disabledI18n");
  }

  intervalId = setInterval(() => {
    rawTime.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .curTime {
    color: white;
  }
  .layout-navbars-breadcrumb-user-link {
    color: white;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    cursor: pointer;
    // border: 1px solid red;
    position: relative;
    right: -15px;
    // background-image: url(/@/assets/layout/user-bg.png);
    .img {
      width: 27px;
      height: 27px;
      position: relative;
      // top: 10px;
      margin: 0 10px 0 40px;
    }

    .name {
      max-width: 60px;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &-link {
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;

    &-photo {
      width: 25px;
      height: 25px;
      border-radius: 100%;
    }
  }

  &-icon {
    padding: 0 10px;
    cursor: pointer;
    color: var(--next-bg-topBarColor);
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;

    &:hover {
      background: var(--next-color-user-hover);

      i {
        display: inline-block;
        animation: logoAnimation 0.3s ease-in-out;
      }
    }
  }

  :deep(.el-dropdown) {
    // color: var(--next-bg-topBarColor);
    color: white;
  }

  :deep(.el-badge) {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
  }

  :deep(.el-badge__content.is-fixed) {
    top: 12px;
  }
}
</style>
