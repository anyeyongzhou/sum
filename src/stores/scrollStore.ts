// stores/scrollStore.ts
import { defineStore } from "pinia";

export const useScrollStore = defineStore("scroll", {
  state: () => ({
    positions: {} as Record<string, number>, // 存储各页面的滚动位置
    lastClickedButtons: {} as Record<string, string>, // 存储各页面最后点击的按钮路径
    searchTexts: {} as Record<string, string>, // 新增搜索状态存储
    allRoutes: {}, // 存储所有路由信息
  }),
  actions: {
    savePosition(key: string, position: number) {
      this.positions[key] = position;
    },
    getPosition(key: string): number {
      return this.positions[key] || 0;
    },
    saveLastClicked(key: string, path: string) {
      this.lastClickedButtons[key] = path;
    },
    getLastClicked(key: string): string | null {
      return this.lastClickedButtons[key] || null;
    },
    // 新增搜索状态方法
    saveSearchText(key: string, text: string) {
      this.searchTexts[key] = text;
    },
    getSearchText(key: string): string {
      return this.searchTexts[key] || "";
    },
    clearPageData(key: string) {
      delete this.positions[key];
      delete this.lastClickedButtons[key];
      delete this.searchTexts[key];
    },
    // 保存所有路由信息
    setAllRoutes(routes: any) {
      this.allRoutes = routes;
    },
    // 获取上一个路由
    getPrevRoute(path: any) {
      const keys = Object.keys(this.allRoutes);
      const currentIndex = keys.indexOf(path);
      if (currentIndex === -1 || currentIndex === 0) {
        return null; // 当前路由不存在或已经是第一个路由
      } else {
        return this.allRoutes[keys[currentIndex - 1]]; // 返回上一个路由
      }
    },
    // 获取下一个路由
    getNextRoute(path: any) {
      const keys = Object.keys(this.allRoutes);
      const currentIndex = keys.indexOf(path);
      if (currentIndex === -1 || currentIndex === keys.length - 1) {
        return null; // 当前路由不存在或已经是最后一个路由
      } else {
        return this.allRoutes[keys[currentIndex + 1]]; // 返回下一个路由
      }
    },
    // 新增方法：重置路由列表
    resetAllRoutes(routes: any) {
      this.allRoutes = routes;
    },
  },
  persist: true, // 启用持久化
});
