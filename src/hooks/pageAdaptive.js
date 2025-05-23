/* 页面自适应hook */
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useMapInfoStore } from "/@/stores";
import { storeToRefs } from "pinia";

export default function pageAdaptive(appRef) {
  const mapInfoStore = storeToRefs(useMapInfoStore());

  //默认缩放值
  const scale = {
    width: "1",
    height: "1",
  };

  //设计稿尺寸（px）
  const baseWidth = window.screen.width || 1920;
  const baseHeight = window.screen.height || 1080;
  // 浏览器的像素比
  const devicePixelRatio = window.devicePixelRatio

  //需保持的比例（默认1.77778）
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));

  //定时函数
  let drawTiming = null;

  //根据实际的宽高比和默认的宽高比比较，决定scale的比例
  const calcRate = () => {
    if (!appRef.value) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // 当前宽高比
    const currentRate = parseFloat((width / height).toFixed(5));
    if (width != 0 && height != 0) {
      if (currentRate > baseProportion) {
        //宽度更宽(宽度没有填满)，需要以高度比例为基准，更改宽度的数值
        scale.width = ((height * baseProportion) / baseWidth).toFixed(5);
        scale.height = (height / baseHeight).toFixed(5);
        appRef.value.style.transform = `scale(${scale.width},${scale.height}) translate(-50%, -50%)`;
      } else {
        //高度更高(高度没有填满)，需要以宽度比例为基准，更改高度的数值
        scale.width = (width / baseWidth).toFixed(5);
        scale.height = (width / baseProportion / baseHeight).toFixed(5);
        appRef.value.style.transform = `scale(${scale.width},${scale.height}) translate(-50%, -50%)`;
      }
      mapInfoStore.scale.value.width = scale.width;
      mapInfoStore.scale.value.height = scale.height;
    } else {
      return false;
    }
  };

  //调整屏幕大小
  const resize = () => {
    clearTimeout(drawTiming);
    setTimeout(() => {
      calcRate();
    }, 200);
  };

  onMounted(async () => {
    calcRate();
    window.addEventListener("resize", resize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resize);
  });
}