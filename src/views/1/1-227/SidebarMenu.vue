<template>
  <div class="sidebar-container" ref="sidebarRef">
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-icon">D</div>
        <span class="brand-name">Dashboard</span>
      </div>
      <button class="toggle-btn" @click="toggleSidebar">
        <span class="icon">{{ isCollapsed ? "→" : "☰" }}</span>
      </button>
    </div>

    <div class="sidebar-content">
      <div class="menu-section">
        <h3 class="section-title">主要功能</h3>
        <div class="menu-items">
          <div
            v-for="(item, index) in mainMenuItems"
            :key="index"
            class="menu-item"
            :class="{ active: currentPath === item.path }"
            @click="handleMenuClick(item.path)"
          >
            <span class="menu-icon">{{ item.icon }}</span>
            <span class="menu-text">{{ item.text }}</span>
            <span v-if="item.badge" class="menu-badge">{{ item.badge }}</span>
          </div>
        </div>
      </div>

      <div class="menu-section">
        <h3 class="section-title">数据分析</h3>
        <div class="menu-items">
          <div
            v-for="(item, index) in analyticsMenuItems"
            :key="index"
            class="menu-item"
            :class="{ active: currentPath === item.path }"
            @click="handleMenuClick(item.path)"
          >
            <span class="menu-icon">{{ item.icon }}</span>
            <span class="menu-text">{{ item.text }}</span>
            <span v-if="item.badge" class="menu-badge">{{ item.badge }}</span>
          </div>
        </div>
      </div>

      <div class="menu-section">
        <h3 class="section-title">系统设置</h3>
        <div class="menu-items">
          <div
            v-for="(item, index) in settingsMenuItems"
            :key="index"
            class="menu-item"
            :class="{ active: currentPath === item.path }"
            @click="handleMenuClick(item.path)"
          >
            <span class="menu-icon">{{ item.icon }}</span>
            <span class="menu-text">{{ item.text }}</span>
            <span v-if="item.badge" class="menu-badge">{{ item.badge }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar-footer">
      <div class="user-info">
        <img :src="avatarImg" alt="User Avatar" class="user-avatar" />
        <div class="user-details">
          <span class="user-name">John Doe</span>
          <span class="user-role">管理员</span>
        </div>
      </div>
      <button class="logout-btn" @click="handleLogout">
        <span class="icon">🚪</span>
        <span>退出登录</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import avatarImg from "/@/assets/beauty/2/2-10.jpg";

// 侧边栏引用
const sidebarRef = ref(null);
// 收起状态
const isCollapsed = ref(false);

// 当前路径
const currentPath = ref("/dashboard");

// 主要功能菜单项
const mainMenuItems = [
  { icon: "📊", text: "仪表盘", path: "/dashboard" },
  { icon: "📝", text: "任务管理", path: "/tasks", badge: "3" },
  { icon: "📅", text: "日程安排", path: "/calendar" },
  { icon: "📧", text: "消息中心", path: "/messages", badge: "5" },
];

// 数据分析菜单项
const analyticsMenuItems = [
  { icon: "📈", text: "销售统计", path: "/analytics/sales" },
  { icon: "👥", text: "用户分析", path: "/analytics/users" },
  { icon: "📊", text: "数据报表", path: "/analytics/reports" },
];

// 系统设置菜单项
const settingsMenuItems = [
  { icon: "⚙️", text: "基本设置", path: "/settings/general" },
  { icon: "🔒", text: "安全设置", path: "/settings/security" },
  { icon: "👥", text: "用户管理", path: "/settings/users" },
];

// 处理菜单点击
const handleMenuClick = path => {
  currentPath.value = path;
  // 这里可以添加路由跳转逻辑
};

// 处理退出登录
const handleLogout = () => {
  // 这里添加退出登录逻辑
  console.log("退出登录");
};

// 切换侧边栏
const toggleSidebar = () => {
  sidebarRef.value.classList.toggle("collapsed");
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.sidebar-container {
  width: 280px !important;
  height: 100vh;
  background: #ffffff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  /* overflow: hidden; */
}

.sidebar-container.collapsed {
  width: 80px !important;
}

.sidebar-container.collapsed .logo {
  display: none;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #1890ff, #36cfc9);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.brand-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #666;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.toggle-btn .icon {
  transition: transform 0.3s ease;
}

.sidebar-container.collapsed .toggle-btn {
  margin: 0 auto;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
}

.menu-section {
  margin-bottom: 30px;
}

.section-title {
  padding: 0 20px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.menu-items {
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.sidebar-container.collapsed .menu-item {
  padding: 12px;
  justify-content: center;
}

.sidebar-container.collapsed .menu-text {
  display: none;
}

.sidebar-container.collapsed .menu-icon {
  margin: 0;
  font-size: 20px;
}

.sidebar-container.collapsed .menu-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  transform: scale(0.8);
}

.menu-item:hover {
  background: #f5f5f5;
}

.menu-item.active {
  background: #e6f7ff;
  color: #1890ff;
}

.menu-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
}

.menu-text {
  font-size: 14px;
  color: #333;
}

.menu-badge {
  position: absolute;
  right: 20px;
  background: #ff4d4f;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid #f0f0f0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.user-role {
  font-size: 12px;
  color: #999;
}

.logout-btn {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #f5f5f5;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.logout-btn:hover {
  background: #ff4d4f;
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar-container {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    transform: translateX(-100%);
  }

  .sidebar-container.collapsed {
    transform: translateX(0);
  }
}

/* 滚动条样式 */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
