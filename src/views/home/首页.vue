<template>
  <div class="home" ref="scrollContainer">
    <!-- 原有内容保持不变 -->
    <el-divider direction="horizontal" content-position="center"></el-divider>
    <!-- 添加搜索框 -->
    <div class="search">
      <span class="tooltip">输入名称进行搜索：</span>
      <el-input
        v-model="searchText"
        placeholder="请输入按钮名称进行搜索"
        clearable
        class="search-input"
        @change="handleSearchChange"
      />
      <el-button @click="resetState" type="warning" class="reset-btn">
        重置所有状态
      </el-button>
    </div>
    <el-divider direction="horizontal" content-position="center"></el-divider>
    <!-- 修改为根据搜索结果展示 -->
    <div v-if="hasSearchResults">
      <div
        v-for="(buttons, category) in filteredButtons"
        :key="category"
        class="category"
      >
        <div class="title">
          <span>{{ category.replace(/^\d+/, "") }}</span>
        </div>
        <el-button
          v-for="button in buttons"
          :key="button.path"
          @click="handleClick(button.path)"
          type="primary"
          :class="{ 'last-clicked': isLastClicked(button.path), button: true }"
        >
          {{ button.meta.title }}
        </el-button>
      </div>
    </div>

    <!-- 没有搜索结果时的提示 -->
    <div v-else class="no-results">没有找到匹配的按钮</div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useScrollStore } from "/@/stores/scrollStore";
import { useScrollPosition } from "/@/hooks/useScrollPosition";

const router = useRouter();
const buttonList = reactive([]);
const viewsModules = import.meta.glob("../../views/**/*.vue");

const scrollStore = useScrollStore();
const { saveLastClicked, getLastClicked } = useScrollPosition("home_page");

// 从store初始化搜索文本
const searchText = ref(scrollStore.getSearchText("home_page"));
const lastClickedPath = ref(null);
const scrollContainer = ref(null);

// 分类后的按钮
const categorizedButtons = computed(() => {
  const categories = {};
  buttonList.forEach(button => {
    const category = button.category;
    if (!categories[category]) categories[category] = [];
    categories[category].push(button);
  });
  return categories;
});

// 过滤后的按钮（根据搜索文本）
const filteredButtons = computed(() => {
  if (!searchText.value) return categorizedButtons.value;

  const result = {};
  Object.entries(categorizedButtons.value).forEach(([category, buttons]) => {
    const filtered = buttons.filter(button =>
      button.meta.title.toLowerCase().includes(searchText.value.toLowerCase())
    );
    if (filtered.length) {
      result[category] = filtered;
    }
  });
  return result;
});

// 是否有搜索结果
const hasSearchResults = computed(() => {
  return Object.keys(filteredButtons.value).length > 0;
});

const constructButtonList = () => {
  const routes = {};

  Object.entries(viewsModules).forEach(([filePath, component]) => {
    const segments = filePath.split("/");
    const fileName = segments.pop().replace(".vue", "");
    const folderName = segments.pop();
    const category = segments.pop();

    if (["login", "components", "home", "codeTemplate"].includes(folderName)) {
      return;
    }

    const routeInfo = {
      path: `/${folderName}`,
      name: fileName,
      category,
      title: fileName,
    };

    // 添加到按钮列表
    buttonList.push({
      path: routeInfo.path,
      meta: { title: fileName },
      name: fileName,
      category,
    });

    // 添加到路由信息集合
    routes[routeInfo.path] = routeInfo;
  });

  // 存储到Pinia
  scrollStore.resetAllRoutes(routes);
};

const isLastClicked = path => {
  return lastClickedPath.value === path;
};

const handleClick = path => {
  lastClickedPath.value = path;
  saveLastClicked(path);
  router.push(path);
};

// 监听搜索文本变化
const handleSearchChange = () => {
  scrollStore.saveSearchText("home_page", searchText.value);
};

// 重置所有记忆状态
const resetState = () => {
  scrollStore.clearPageData("home_page");
  searchText.value = "";
  lastClickedPath.value = null;
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = 0;
  }
};

// 路由离开前保存状态
onBeforeRouteLeave((to, from, next) => {
  if (scrollContainer.value) {
    scrollStore.savePosition("home_page", scrollContainer.value.scrollTop);
  }
  scrollStore.saveSearchText("home_page", searchText.value);
  next();
});

// 恢复所有状态
onMounted(() => {
  constructButtonList();
  lastClickedPath.value = getLastClicked();

  // 恢复滚动位置
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollStore.getPosition("home_page");
  }
});
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100%;
  background: #fff;
  padding: 10px 10px 50px 10px;
  overflow-y: auto;
  position: relative;
  box-sizing: border-box;

  /* 原有样式保持不变 */
  .search {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 20px 0;
    .tooltip {
      width: 250px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26px;
    }
    .search-input {
      width: 300px;
      height: 100%;
    }
    .reset-btn {
      margin-left: 20px;
    }
  }

  .category {
    margin-bottom: 20px;
    .title {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: skyblue;
        border-radius: 5px;
        font-size: 20px;
        font-weight: 800;
        color: #fff;
        padding: 0 20px;
      }
    }
    .last-clicked {
      background-color: #f56c6c;
      border-color: #f56c6c;
    }
    :deep(.el-button.last-clicked) {
      background-color: #f56c6c;
      border-color: #f56c6c;

      &:hover,
      &:focus {
        background-color: #f78989;
        border-color: #f78989;
      }
    }
  }

  .button {
    margin: 10px;
    transition: all 0.3s ease;
  }

  .no-results {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>
