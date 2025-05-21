<template>
  <div class="home">
    <el-divider direction="horizontal" content-position="center"></el-divider>
    <!-- 添加搜索框 -->
    <div class="search">
      <span class="tooltip">输入名称进行搜索：</span>
      <el-input
        v-model="searchText"
        placeholder="请输入按钮名称进行搜索"
        clearable
        class="search-input"
      />
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
          class="button"
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
import { reactive, computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const buttonList = reactive([]);
const searchText = ref(""); // 搜索文本
const viewsModules = import.meta.glob("../../views/**/*.vue"); // 只扫描.vue文件

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
  Object.entries(viewsModules).forEach(([filePath, component]) => {
    const segments = filePath.split("/");
    const fileName = segments.pop().replace(".vue", ""); // 去掉.vue后缀
    const folderName = segments.pop(); // 第二层文件夹（如1-1）
    const category = segments.pop(); // 第一层文件夹（如1）

    // 排除不需要的目录
    if (["login", "components", "home", "codeTemplate"].includes(folderName))
      return;

    buttonList.push({
      path: `/${folderName}`, // 关键点：路由路径必须和router中注册的一致
      meta: { title: fileName },
      name: fileName,
      category, // 分类标识
    });
  });
};

const handleClick = path => {
  router.push(path); // 确保router中已注册该path
};

onMounted(constructButtonList);
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 10px 10px 50px 10px;

  .search {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 20px 0;
    // border: 1px solid red;
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
  }

  .category {
    margin-bottom: 20px;
    .title {
      width: 100%;
      height: 50px;
      // border: 1px solid red;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        // width: 20%;
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
  }

  .button {
    margin: 10px;
  }

  .no-results {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>
