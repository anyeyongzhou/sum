// stores/scrollStore.ts
import { defineStore } from "pinia";

export const useScrollStore = defineStore("scroll", {
  state: () => ({
    positions: {} as Record<string, number>, // 存储各页面的滚动位置
    lastClickedButtons: {} as Record<string, string>, // 存储各页面最后点击的按钮路径
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
  },
  persist: true, // 启用持久化
});
