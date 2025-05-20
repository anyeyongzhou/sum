<template>
  <div class="skin-peeler-container">
    <div class="theme-switcher">
      <h3 class="title">主题切换</h3>
      <div class="theme-list">
        <div
          v-for="(theme, index) in themes"
          :key="index"
          class="theme-item"
          :class="{ active: currentTheme === theme.name }"
          @click="switchTheme(theme.name)"
        >
          <div class="theme-preview" :style="{ background: theme.primary }">
            <div
              class="theme-dot"
              :style="{ background: theme.secondary }"
            ></div>
          </div>
          <span class="theme-name">{{ theme.label }}</span>
        </div>
      </div>
    </div>

    <div class="mode-switcher">
      <h3 class="title">显示模式</h3>
      <div class="mode-list">
        <div
          class="mode-item"
          :class="{ active: isDarkMode }"
          @click="toggleDarkMode"
        >
          <span class="mode-icon">🌙</span>
          <span class="mode-name">深色模式</span>
        </div>
        <div
          class="mode-item"
          :class="{ active: !isDarkMode }"
          @click="toggleDarkMode"
        >
          <span class="mode-icon">☀️</span>
          <span class="mode-name">浅色模式</span>
        </div>
      </div>
    </div>

    <div class="font-switcher">
      <h3 class="title">字体大小</h3>
      <div class="font-controls">
        <button class="font-btn" @click="decreaseFontSize">A-</button>
        <div class="font-size-display">{{ fontSize }}px</div>
        <button class="font-btn" @click="increaseFontSize">A+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// 主题配置
const themes = [
  {
    name: "default",
    label: "默认蓝",
    primary: "#1890ff",
    secondary: "#e6f7ff",
  },
  { name: "green", label: "清新绿", primary: "#52c41a", secondary: "#f6ffed" },
  { name: "purple", label: "优雅紫", primary: "#722ed1", secondary: "#f9f0ff" },
  { name: "orange", label: "活力橙", primary: "#fa8c16", secondary: "#fff7e6" },
  { name: "red", label: "热情红", primary: "#f5222d", secondary: "#fff1f0" },
];

// 当前主题
const currentTheme = ref("default");
// 深色模式
const isDarkMode = ref(false);
// 字体大小
const fontSize = ref(14);

// 切换主题
const switchTheme = themeName => {
  currentTheme.value = themeName;
  document.documentElement.setAttribute("data-theme", themeName);
};

// 切换深色模式
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark-mode");
};

// 增加字体大小
const increaseFontSize = () => {
  if (fontSize.value < 20) {
    fontSize.value++;
    updateFontSize();
  }
};

// 减小字体大小
const decreaseFontSize = () => {
  if (fontSize.value > 12) {
    fontSize.value--;
    updateFontSize();
  }
};

// 更新字体大小
const updateFontSize = () => {
  document.documentElement.style.fontSize = `${fontSize.value}px`;
};

// 监听主题变化
watch(currentTheme, newTheme => {
  // 这里可以添加主题切换的其他逻辑
  console.log("主题已切换为:", newTheme);
});

// 监听深色模式变化
watch(isDarkMode, newMode => {
  // 这里可以添加深色模式切换的其他逻辑
  console.log("深色模式:", newMode ? "开启" : "关闭");
});
</script>

<style scoped>
.skin-peeler-container {
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

/* 主题切换样式 */
.theme-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.theme-item {
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.theme-preview {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin: 0 auto 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.theme-name {
  font-size: 14px;
  color: #666;
}

.theme-item.active .theme-preview {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.theme-item.active .theme-name {
  color: #1890ff;
  font-weight: 500;
}

/* 模式切换样式 */
.mode-list {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.mode-item {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  background: #f5f5f5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.mode-item.active {
  background: #e6f7ff;
  color: #1890ff;
}

.mode-icon {
  font-size: 18px;
}

.mode-name {
  font-size: 14px;
}

/* 字体大小控制样式 */
.font-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.font-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  transition: all 0.3s ease;
}

.font-btn:hover {
  background: #e6f7ff;
  color: #1890ff;
}

.font-size-display {
  min-width: 60px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

/* 深色模式样式 */
:root.dark-mode {
  --bg-color: #1f1f1f;
  --text-color: #fff;
}

:root.dark-mode .skin-peeler-container {
  background: #2f2f2f;
}

:root.dark-mode .title {
  color: #fff;
}

:root.dark-mode .theme-name,
:root.dark-mode .mode-name,
:root.dark-mode .font-size-display {
  color: #ccc;
}

:root.dark-mode .mode-item {
  background: #3f3f3f;
}

:root.dark-mode .mode-item.active {
  background: #1890ff;
  color: #fff;
}

:root.dark-mode .font-btn {
  background: #3f3f3f;
  color: #ccc;
}

:root.dark-mode .font-btn:hover {
  background: #1890ff;
  color: #fff;
}
</style>
