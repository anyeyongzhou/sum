<template>
  <div class="menu">
    <div class="menu-header">
      <form class="filterform" @submit.prevent>
        <input
          v-model="searchText"
          class="filterinput"
          type="text"
          placeholder="搜索菜单..."
        />
      </form>
    </div>
    <ul class="menu-list">
      <li
        v-for="(item, index) in filteredMenuItems"
        :key="index"
        :class="{ active: item.active }"
        @click="handleItemClick(item)"
      >
        <a href="#" @click.prevent>{{ item.text }}</a>
        <span v-if="item.label" class="menu-label">{{ item.label }}</span>
        <ul
          v-if="item.submenu"
          class="submenu"
          :style="{ display: item.isOpen ? 'block' : 'none' }"
        >
          <li
            v-for="(subItem, subIndex) in item.submenu"
            :key="subIndex"
            @click.stop="handleSubItemClick(subItem)"
          >
            <a href="#" @click.prevent>{{ subItem.text }}</a>
            <span v-if="subItem.label" class="menu-label">{{
              subItem.label
            }}</span>
            <ul
              v-if="subItem.submenu"
              class="submenu"
              :style="{ display: subItem.isOpen ? 'block' : 'none' }"
            >
              <li
                v-for="(subSubItem, subSubIndex) in subItem.submenu"
                :key="subSubIndex"
                @click.stop="handleSubSubItemClick(subSubItem)"
              >
                <a href="#" @click.prevent>{{ subSubItem.text }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <div class="menu-footer">Footer</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 菜单数据
const menuItems = ref([
  {
    text: "Home",
    active: true,
    isOpen: false,
  },
  {
    text: "Events",
    isOpen: false,
  },
  {
    text: "Gallery",
    label: "12",
    isOpen: false,
  },
  {
    text: "Services",
    isOpen: false,
    submenu: [
      { text: "Web Design" },
      { text: "Hosting" },
      {
        text: "Design",
        isOpen: false,
        submenu: [
          { text: "Graphics" },
          { text: "Vectors" },
          { text: "Photoshop" },
          { text: "Fonts" },
        ],
      },
      { text: "Consulting" },
    ],
  },
  {
    text: "系统管理",
    isOpen: false,
  },
  {
    text: "Portfolio",
    isOpen: false,
    submenu: [
      { text: "Web Design" },
      { text: "Graphics", label: "10" },
      { text: "Photoshop" },
      { text: "Programming" },
    ],
  },
  {
    text: "About",
    isOpen: false,
  },
  {
    text: "Contact",
    isOpen: false,
  },
]);

// 搜索文本
const searchText = ref("");

// 过滤后的菜单项
const filteredMenuItems = computed(() => {
  if (!searchText.value) return menuItems.value;

  const filterItems = items => {
    return items.filter(item => {
      const textMatch = item.text
        .toLowerCase()
        .includes(searchText.value.toLowerCase());
      const submenuMatch = item.submenu
        ? filterItems(item.submenu).length > 0
        : false;
      return textMatch || submenuMatch;
    });
  };

  return filterItems(menuItems.value);
});

// 处理菜单项点击
const handleItemClick = item => {
  if (item.submenu) {
    item.isOpen = !item.isOpen;
    // 关闭其他同级菜单
    menuItems.value.forEach(otherItem => {
      if (otherItem !== item && otherItem.submenu) {
        otherItem.isOpen = false;
      }
    });
  }
};

// 处理子菜单项点击
const handleSubItemClick = item => {
  if (item.submenu) {
    item.isOpen = !item.isOpen;
  }
};

// 处理孙菜单项点击
const handleSubSubItemClick = item => {
  // 处理孙菜单项点击事件
};
</script>

<style scoped>
.menu {
  width: 300px !important;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.filterform {
  width: 100%;
}

.filterinput {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  position: relative;
}

.menu-list li a {
  display: block;
  padding: 12px 15px;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #eee;
}

.menu-list li.active > a {
  background: #f5f5f5;
  color: #007bff;
}

.menu-label {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: #007bff;
  color: #fff;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #f9f9f9;
}

.submenu li a {
  padding-left: 30px;
}

.submenu .submenu li a {
  padding-left: 45px;
}

.menu-footer {
  padding: 15px;
  text-align: center;
  border-top: 1px solid #eee;
  color: #666;
}
</style>
