<template>
  <div @click="addIcon" class="container">
    <div
      v-for="(icon, index) in icons"
      :key="index"
      class="tx"
      :style="icon.style"
    >
      <span></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const icons = ref([]);

const addIcon = event => {
  const icon = {
    top: event.clientY - 20,
    left: event.clientX - 20,
    opacity: 1,
    scale: 1,
    color: `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${
      255 * Math.random()
    })`,
    style: {},
  };

  icons.value.push(icon);
  moveIcons();
};

const moveIcons = () => {
  icons.value = icons.value
    .map((icon, index) => {
      if (icon.opacity <= 0) {
        return null; // Mark for removal
      }
      icon.top--;
      icon.opacity -= 0.01;
      icon.scale += 0.02;

      icon.style = {
        top: `${icon.top}px`,
        left: `${icon.left}px`,
        color: icon.color,
        opacity: icon.opacity,
        transform: `scale(${icon.scale})`,
      };

      return icon;
    })
    .filter(Boolean); // Remove nulls
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "icomoon";
  src: url("fonts/icomoon.eot");
  src: url("fonts/icomoon.eot#iefix") format("embedded-opentype"),
    url("fonts/icomoon.ttf") format("truetype"),
    url("fonts/icomoon.woff") format("woff"),
    url("fonts/icomoon.svg#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  height: 100vh;
  position: relative;
}

.tx {
  font-family: "icomoon";
  position: absolute;
  color: #000;
  font-size: 15px;
  user-select: none;
}
</style>
