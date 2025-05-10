<template>
  <div id="div1" ref="box" @mousedown="onMouseDown">
    <div class="t" @mousedown.stop="startResize('top')"></div>
    <div class="r" @mousedown.stop="startResize('right')"></div>
    <div class="b" @mousedown.stop="startResize('bottom')"></div>
    <div class="l" @mousedown.stop="startResize('left')"></div>
    <div class="lt" @mousedown.stop="startResize('top-left')"></div>
    <div class="lb" @mousedown.stop="startResize('bottom-left')"></div>
    <div class="rt" @mousedown.stop="startResize('top-right')"></div>
    <div class="rb" @mousedown.stop="startResize('bottom-right')"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const box = ref(null);
let preWidth, preHeight, preLeft, preTop, preX, preY;
let resizing = false;

const onMouseDown = ev => {
  const oEvent = ev || event;
  preWidth = box.value.offsetWidth;
  preHeight = box.value.offsetHeight;
  preLeft = box.value.offsetLeft;
  preTop = box.value.offsetTop;
  preX = oEvent.clientX;
  preY = oEvent.clientY;

  document.onmousemove = ev => {
    if (resizing) {
      resizeBox(ev);
    }
  };

  document.onmouseup = () => {
    resizing = false;
    document.onmousemove = null;
    document.onmouseup = null;
  };

  return false;
};

const startResize = direction => {
  resizing = direction;
};

const resizeBox = ev => {
  const oEvent = ev || event;

  if (resizing === "top") {
    const deltaY = preY - oEvent.clientY;
    box.value.style.height = `${preHeight + deltaY}px`;
    box.value.style.top = `${preTop - deltaY}px`;
  }
  if (resizing === "right") {
    const deltaX = oEvent.clientX - preX;
    box.value.style.width = `${preWidth + deltaX}px`;
  }
  if (resizing === "bottom") {
    const deltaY = oEvent.clientY - preY;
    box.value.style.height = `${preHeight + deltaY}px`;
  }
  if (resizing === "left") {
    const deltaX = preX - oEvent.clientX;
    box.value.style.width = `${preWidth + deltaX}px`;
    box.value.style.left = `${preLeft - deltaX}px`;
  }
  if (resizing === "top-left") {
    const deltaY = preY - oEvent.clientY;
    const deltaX = preX - oEvent.clientX;
    box.value.style.height = `${preHeight + deltaY}px`;
    box.value.style.top = `${preTop - deltaY}px`;
    box.value.style.width = `${preWidth + deltaX}px`;
    box.value.style.left = `${preLeft - deltaX}px`;
  }
  if (resizing === "top-right") {
    const deltaY = preY - oEvent.clientY;
    const deltaX = oEvent.clientX - preX;
    box.value.style.height = `${preHeight + deltaY}px`;
    box.value.style.top = `${preTop - deltaY}px`;
    box.value.style.width = `${preWidth + deltaX}px`;
  }
  if (resizing === "bottom-left") {
    const deltaY = oEvent.clientY - preY;
    const deltaX = preX - oEvent.clientX;
    box.value.style.height = `${preHeight + deltaY}px`;
    box.value.style.width = `${preWidth + deltaX}px`;
    box.value.style.left = `${preLeft - deltaX}px`;
  }
  if (resizing === "bottom-right") {
    const deltaY = oEvent.clientY - preY;
    const deltaX = oEvent.clientX - preX;
    box.value.style.height = `${preHeight + deltaY}px`;
    box.value.style.width = `${preWidth + deltaX}px`;
  }
};
</script>

<style scoped>
#div1 {
  width: 200px !important;
  height: 200px;
  background-color: #71e4ff;
  position: absolute;
  left: 200px;
  top: 200px;
}
.t,
.r,
.b,
.l {
  background-color: #ffa2d3;
  position: absolute;
}
.t {
  width: 100%;
  height: 20px;
  top: 0;
}
.r {
  width: 20px;
  height: 100%;
  right: 0;
}
.b {
  width: 100%;
  height: 20px;
  bottom: 0;
}
.l {
  width: 20px;
  height: 100%;
  left: 0;
}
.lt,
.lb,
.rt,
.rb {
  width: 20px;
  height: 20px;
  background-color: #93ff6b;
  position: absolute;
}
.lt {
  left: 0;
  top: 0;
}
.lb {
  left: 0;
  bottom: 0;
}
.rt {
  right: 0;
  top: 0;
}
.rb {
  right: 0;
  bottom: 0;
}
</style>
