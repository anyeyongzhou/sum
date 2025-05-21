<template>
  <div class="container">
    <div class="left" ref="leftRef">
      <div class="cut" :style="cutStyle" @mousedown="onDragStart">
        <div class="resize" @mousedown.stop.prevent="onResizeStart"></div>
      </div>
    </div>
    <div class="right" :style="rightStyle"></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";

const containerSize = 500;
const resultSize = 150;
const imageUrl = new URL("./images/monica.webp", import.meta.url).href;

const leftRef = ref(null);

const cut = reactive({
  size: 150,
  left: 150,
  top: 150,
});

const cutStyle = computed(() => ({
  width: `${cut.size}px`,
  height: `${cut.size}px`,
  left: `${cut.left}px`,
  top: `${cut.top}px`,
}));

const rightStyle = computed(() => {
  const bgSize = (resultSize / cut.size) * containerSize;
  const bgLeft = (cut.left / containerSize) * bgSize;
  const bgTop = (cut.top / containerSize) * bgSize;

  return {
    width: `${resultSize}px`,
    height: `${resultSize}px`,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: `${bgSize}px ${bgSize}px`,
    backgroundPosition: `-${bgLeft}px -${bgTop}px`,
    backgroundRepeat: "no-repeat",
  };
});

function onDragStart(e) {
  const startX = e.pageX;
  const startY = e.pageY;
  const startLeft = cut.left;
  const startTop = cut.top;

  function onMouseMove(e) {
    const newLeft = Math.min(
      Math.max(0, startLeft + (e.pageX - startX)),
      containerSize - cut.size
    );
    const newTop = Math.min(
      Math.max(0, startTop + (e.pageY - startY)),
      containerSize - cut.size
    );
    cut.left = newLeft;
    cut.top = newTop;
  }

  function onMouseUp() {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

function onResizeStart(e) {
  const startX = e.pageX;
  const startY = e.pageY;
  const startSize = cut.size;

  function onMouseMove(e) {
    const disX = e.pageX - startX;
    const disY = e.pageY - startY;
    const dis = Math.max(disX, disY);
    let newSize = startSize + dis;

    newSize = Math.max(50, newSize);
    const maxSize = Math.min(containerSize - cut.left, containerSize - cut.top);
    newSize = Math.min(newSize, maxSize);

    cut.size = newSize;
  }

  function onMouseUp() {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}
</script>

<style lang="scss" scoped>
.container {
  width: 720px !important;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  gap: 20px;

  .left {
    width: 500px;
    height: 500px;
    background: url("./images/monica.webp") no-repeat;
    background-size: 100% 100%;
    position: relative;

    .cut {
      position: absolute;
      border: 2px solid #fff;
      cursor: move;

      .resize {
        width: 16px;
        height: 16px;
        background: #fff;
        position: absolute;
        right: -8px;
        bottom: -8px;
        cursor: nw-resize;
      }
    }
  }

  .right {
    background-repeat: no-repeat;
    background-color: #000;
  }
}
</style>
