<template>
  <div class="container">
    <div class="cubes" ref="cubeBox">
      <div
        v-for="(cube, index) in cubes"
        :key="index"
        :style="{ backgroundColor: cube.color }"
      ></div>
    </div>
    <a href="javascript:" class="btn" @click="toggleTwinkle">{{
      buttonLabel
    }}</a>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const cubeBox = ref(null);
    const cubes = ref(Array(9).fill({ color: "#f40" }));
    const buttonLabel = ref("点击开始闪烁");
    let timer = null;
    let isTwinkling = false;
    const colorArr = [
      "#096",
      "green",
      "pink",
      "blue",
      "#369",
      "purple",
      "yellow",
      "#ccc",
      "#000",
    ];

    const toggleTwinkle = () => {
      isTwinkling = !isTwinkling;
      buttonLabel.value = isTwinkling ? "点击停止闪烁" : "点击开始闪烁";

      if (isTwinkling) {
        startTwinkling();
      } else {
        clearInterval(timer);
        resetCubes();
      }
    };

    const startTwinkling = () => {
      timer = setInterval(() => {
        let obj = {};
        for (let i = 0; i < 3; i++) {
          let num = Math.floor(Math.random() * 9);
          if (obj[num] !== undefined) {
            i--;
            continue;
          }
          obj[num] = true;
          cubes.value[num].color = colorArr[num];
        }

        setTimeout(() => {
          resetCubes();
        }, 500);
      }, 1000);
    };

    const resetCubes = () => {
      cubes.value.forEach(cube => {
        cube.color = "#f40";
      });
    };

    return {
      cubeBox,
      cubes,
      buttonLabel,
      toggleTwinkle,
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.container {
  width: 300px !important;
  position: relative;
  margin: 0 auto;
}

.cubes {
  overflow: hidden;
  margin-left: -15px;
}

.cubes > div {
  float: left;
  width: 90px;
  height: 90px;
  margin-left: 15px;
  margin-bottom: 15px;
  border-radius: 6px;
}

.btn {
  display: block;
  width: 296px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border: 2px solid #f40;
  color: #f40;
}

.btn:hover {
  background-color: #f40;
  color: #fff;
}
</style>
