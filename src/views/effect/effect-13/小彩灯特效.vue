<template>
  <div class="neon-container">
    <ul class="light-container">
      <li
        v-for="(light, index) in lights"
        :key="index"
        :class="getLightClass(index)"
      ></li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const lightCount = ref(25); // 灯光数量

const lightTypes = [
  { name: "blue", color: "rgb(4, 255, 242)", animation: "lan" },
  { name: "yellow", color: "rgb(251, 255, 4)", animation: "huang" },
  { name: "green", color: "rgb(33, 255, 4)", animation: "lv" },
  { name: "purple", color: "rgb(255, 4, 255)", animation: "zhi" },
];

const lights = ref(Array.from({ length: lightCount.value }));

const getLightClass = index => {
  const typeIndex = index % lightTypes.length;
  return {
    [lightTypes[typeIndex].animation]: true,
    "light-item": true,
  };
};
</script>

<style scoped>
.neon-container {
  margin-top: 10px;
  width: 100%;
  background-color: rgb(0, 0, 0);
}

.light-container {
  width: 100%;
  height: 120px;
  white-space: nowrap;
  overflow: hidden;
  list-style: none;
}

.light-item {
  display: inline-block;
  margin-top: 30px;
  margin-right: 50px;
  width: 15px;
  height: 30px;
  border-radius: 50%;
  position: relative;
}

.light-item::after {
  content: "";
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 12px;
  background-color: rgb(27, 27, 27);
  box-shadow: inset 0 0 3px rgb(129, 129, 129);
  border-radius: 10px;
}

.light-item::before {
  content: "";
  position: absolute;
  top: -23px;
  left: 15px;
  width: 55px;
  height: 30px;
  border-bottom: 3px solid rgb(61, 61, 61);
  border-radius: 50%;
}

/* 动画效果 */
.lan {
  animation: lan 2s infinite;
}

.huang {
  animation: huang 2.2s infinite;
}

.zhi {
  animation: zhi 1.8s infinite;
}

.lv {
  animation: lv 2.8s infinite;
}

@keyframes lan {
  0%,
  100% {
    background-color: rgba(4, 255, 242, 0.5);
  }
  50% {
    background-color: rgb(4, 255, 242);
    box-shadow: 0 0 10px rgb(4, 255, 242), 0 0 30px rgb(4, 255, 242),
      0 0 50px rgb(4, 255, 242);
  }
}

@keyframes huang {
  0%,
  100% {
    background-color: rgba(251, 255, 4, 0.5);
  }
  50% {
    background-color: rgb(251, 255, 4);
    box-shadow: 0 0 10px rgb(251, 255, 4), 0 0 12px rgb(251, 255, 4),
      0 0 30px rgb(251, 255, 4);
  }
}

@keyframes lv {
  0%,
  100% {
    background-color: rgba(33, 255, 4, 0.5);
  }
  50% {
    background-color: rgb(33, 255, 4);
    box-shadow: 0 0 10px rgb(33, 255, 4), 0 0 12px rgb(33, 255, 4),
      0 0 30px rgb(33, 255, 4);
  }
}

@keyframes zhi {
  0%,
  100% {
    background-color: rgba(255, 4, 255, 0.5);
  }
  50% {
    background-color: rgb(255, 4, 255);
    box-shadow: 0 0 10px rgb(255, 4, 255), 0 0 25px rgb(255, 4, 255),
      0 0 40px rgb(255, 4, 255);
  }
}
</style>
