<template>
  <div class="wrapper">
    <canvas class="cavs" width="700" height="335"></canvas>
    <ul class="btn-list">
      <li><input type="color" id="colorChange" v-model="color" /></li>
      <li>
        <input type="button" id="cleanBoard" value="清屏" @click="clearBoard" />
      </li>
      <li>
        <input type="button" id="eraser" value="橡皮" @click="useEraser" />
      </li>
      <li><input type="button" id="rescind" value="撤销" @click="undo" /></li>
      <li>
        <input
          type="range"
          id="lineRuler"
          v-model="lineWidth"
          min="1"
          max="20"
          @input="changeLineWidth"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const color = ref("#000000");
const lineWidth = ref(5);
const cavs = ref(null);
const context = ref(null);
const imgArr = ref([]);
let isDrawing = false;

const clearBoard = () => {
  context.value.clearRect(0, 0, cavs.value.width, cavs.value.height);
};

const useEraser = () => {
  context.value.strokeStyle = "#FFFFFF";
};

const undo = () => {
  if (imgArr.value.length > 0) {
    context.value.putImageData(imgArr.value.pop(), 0, 0);
  }
};

const changeLineWidth = () => {
  context.value.lineWidth = lineWidth.value;
};

const startDrawing = e => {
  isDrawing = true;
  const { offsetX, offsetY } = e;
  context.value.beginPath();
  context.value.moveTo(offsetX, offsetY);
};

const draw = e => {
  if (!isDrawing) return;
  const { offsetX, offsetY } = e;
  context.value.lineTo(offsetX, offsetY);
  context.value.stroke();
};

const stopDrawing = () => {
  isDrawing = false;
  context.value.closePath();
  imgArr.value.push(
    context.value.getImageData(0, 0, cavs.value.width, cavs.value.height)
  );
};

onMounted(() => {
  cavs.value = document.querySelector(".cavs");
  context.value = cavs.value.getContext("2d");
  context.value.lineCap = "round"; // 线条起始和结尾样式
  context.value.lineJoin = "round"; // 转弯
  context.value.strokeStyle = color.value;
  context.value.lineWidth = lineWidth.value;

  cavs.value.addEventListener("mousedown", startDrawing);
  cavs.value.addEventListener("mousemove", draw);
  cavs.value.addEventListener("mouseup", stopDrawing);
  cavs.value.addEventListener("mouseleave", stopDrawing);
});
</script>

<style scoped>
.wrapper {
  width: 700px !important;
  height: 360px;
}

.wrapper canvas {
  border: 1px solid royalblue;
  border-radius: 25px;
  box-shadow: 10px 10px 5px #888888;
  margin: 10px 0 0 10px;
}

.wrapper .btn-list {
  width: 100%;
  text-align: center;
  border-radius: 25px;
  margin-top: 10px;
}

.wrapper .btn-list li {
  display: inline-block;
  margin-left: 35px;
}

.wrapper .btn-list li input {
  background-color: yellow;
  color: black;
  border: none;
  padding: 6px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 25px;
  transition-duration: 0.2s;
}

.wrapper .btn-list li input:hover {
  border: 1px solid rebeccapurple;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24);
}
</style>
