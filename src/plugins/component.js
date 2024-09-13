import { defineAsyncComponent } from "vue";

export default {
  install(app) {
    const requireModules = import.meta.glob("../components/common/*.vue");

    for (const path in requireModules) {
      // 修正正则表达式
      const result = path.match(/\.\/components\/common\/(.+)\.vue$/);
      if (result) {
        const moduleContent = requireModules[path]; // 获取模块内容
        app.component(result[1], defineAsyncComponent(moduleContent));
      } else {
        console.warn(`Failed to match path: ${path}`);
      }
    }
  },
};
