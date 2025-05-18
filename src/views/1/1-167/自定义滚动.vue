<template>
  <div class="container" ref="containerRef" @wheel.prevent="onMouseWheel">
    <div class="contents" ref="contentsRef">
      <p v-for="n in 300" :key="n">渡一教育</p>
    </div>
    <ul>
      <li class="ico up" @click="onScrollButton('up')"></li>
      <li class="duration" ref="durationRef">
        <div class="drag" ref="dragRef" @mousedown="onDragStart"></div>
      </li>
      <li class="ico down" @click="onScrollButton('down')"></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const containerRef = ref(null);
const contentsRef = ref(null);
const durationRef = ref(null);
const dragRef = ref(null);

let dragHeight = 0;

onMounted(() => {
  const container = containerRef.value;
  const contents = contentsRef.value;
  const duration = durationRef.value;
  const drag = dragRef.value;

  const containerHeight = container.offsetHeight;
  const contentsHeight = contents.offsetHeight;
  dragHeight = Math.floor(
    (containerHeight / contentsHeight) * duration.offsetHeight
  );
  drag.style.height = `${dragHeight}px`;
});

function onDragStart(e) {
  const drag = dragRef.value;
  const duration = durationRef.value;
  const contents = contentsRef.value;
  const container = containerRef.value;

  let startY = e.pageY;

  const onMouseMove = moveEvent => {
    const delta = moveEvent.pageY - startY;
    let newTop = drag.offsetTop + delta;

    const maxTop = duration.offsetHeight - drag.offsetHeight;
    newTop = Math.max(0, Math.min(newTop, maxTop));

    drag.style.top = `${newTop}px`;
    updateContentScroll();
    startY = moveEvent.pageY;
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseWheel(e) {
  const drag = dragRef.value;
  const duration = durationRef.value;

  let newTop = drag.offsetTop - (e.deltaY > 0 ? -10 : 10);
  const maxTop = duration.offsetHeight - drag.offsetHeight;
  newTop = Math.max(0, Math.min(newTop, maxTop));

  drag.style.top = `${newTop}px`;
  updateContentScroll();
}

function onScrollButton(direction) {
  const drag = dragRef.value;
  const duration = durationRef.value;

  let offset = direction === "up" ? -10 : 10;
  let newTop = drag.offsetTop + offset;
  const maxTop = duration.offsetHeight - drag.offsetHeight;
  newTop = Math.max(0, Math.min(newTop, maxTop));

  drag.style.top = `${newTop}px`;
  updateContentScroll();
}

function updateContentScroll() {
  const drag = dragRef.value;
  const duration = durationRef.value;
  const contents = contentsRef.value;
  const container = containerRef.value;

  const scale = drag.offsetTop / (duration.offsetHeight - drag.offsetHeight);
  const scrollTop = scale * (contents.offsetHeight - container.offsetHeight);
  contents.style.top = `${-scrollTop}px`;
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 380px !important;
  height: 400px;
  margin: 100px auto;
  border: 1px solid black;
  overflow: hidden;
}

.contents {
  position: absolute;
  left: 0;
  top: 0;
  width: 350px;
  background: #cccccc;
}

ul {
  position: absolute;
  right: 0;
  top: 0;
  width: 28px;
  height: 398px;
  border: 1px solid #ccc;
}

.ico {
  width: 28px;
  height: 28px;
  background: #ccc;
  cursor: pointer;
}

.duration {
  position: relative;
  width: 100%;
  height: 342px;
}

.drag {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: black;
  cursor: grab;
}
</style>
