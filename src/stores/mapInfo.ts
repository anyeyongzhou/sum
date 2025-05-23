import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMapInfoStore = defineStore("mapInfo", () => {
  // 地图组件是否加载完毕
  const mapPluginStatus = ref(false);
  // 地图的缩放比
  const scale = ref({
    width: 1,
    height: 1,
  });
  // 碳管理指标全景监测数据
  const loaderData = ref({});
  // 碳管理指标全景监测地图 -- 后端返回的数据第一次不是空（因为地图初始化大小时要是没有数据就会固定时400*300）
  const mapLoadDataFirst = ref(false);

  const appKey = ref(null);
  const appSecret = ref(null);
  const appUrl = ref(null);

  // 地图是否加载完毕
  const mapLoadingOver = ref(false);

  return {
    mapPluginStatus,
    scale,
    loaderData,
    mapLoadDataFirst,
    appKey,
    appSecret,
    appUrl,
    mapLoadingOver,
  };
});
