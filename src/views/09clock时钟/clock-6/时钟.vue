<template>
  <div id="clock" ref="clock"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const monthText = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
const dayText = [
  "一号",
  "二号",
  "三号",
  "四号",
  "五号",
  "六号",
  "七号",
  "八号",
  "九号",
  "十号",
  "十一号",
  "十二号",
  "十三号",
  "十四号",
  "十五号",
  "十六号",
  "十七号",
  "十八号",
  "十九号",
  "二十号",
  "二十一号",
  "二十二号",
  "二十三号",
  "二十四号",
  "二十五号",
  "二十六号",
  "二十七号",
  "二十八号",
  "二十九号",
  "三十号",
  "三十一号",
];
const weekText = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
const hourText = [
  "零点",
  "一点",
  "两点",
  "三点",
  "四点",
  "五点",
  "六点",
  "七点",
  "八点",
  "九点",
  "十点",
  "十一点",
  "十二点",
  "十三点",
  "十四点",
  "十五点",
  "十六点",
  "十七点",
  "十八点",
  "十九点",
  "二十点",
  "二十一点",
  "二十二点",
  "二十三点",
];
const minuteText = Array.from({ length: 60 }, (_, i) => `${i + 1}分`);
const secondsText = Array.from({ length: 60 }, (_, i) => `${i + 1}秒`);

const clock = ref(null);
const textSet = [
  [monthText, []],
  [dayText, []],
  [weekText, []],
  [hourText, []],
  [minuteText, []],
  [secondsText, []],
];
let isCircle = false;

onMounted(() => {
  init();
  setInterval(runTime, 100);
  changePosition();
  setTimeout(changeCircle, 2000);
});

function init() {
  for (const [texts, list] of textSet) {
    for (const text of texts) {
      const label = createLabel(text);
      clock.value.appendChild(label);
      list.push(label);
    }
  }
}

function createLabel(text) {
  const div = document.createElement("div");
  div.classList.add("label");
  div.innerText = text;
  return div;
}

function runTime() {
  const now = new Date();
  const nowValue = [
    now.getMonth(),
    now.getDate() - 1,
    now.getDay(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  ];

  initStyle();
  nowValue.forEach((num, i) => {
    textSet[i][1][num].style.color = "#fff";
  });

  if (isCircle) {
    const widthMid = document.body.clientWidth / 2;
    const heightMid = document.body.clientHeight / 2;

    for (let i = 0; i < textSet.length; i++) {
      for (let j = 0; j < textSet[i][0].length; j++) {
        const r = (i + 1) * 35 + 50 * i;
        const deg = (360 / textSet[i][1].length) * (j - nowValue[i]);
        const x = r * Math.sin((deg * Math.PI) / 180) + widthMid;
        const y = heightMid - r * Math.cos((deg * Math.PI) / 180);
        const temp = textSet[i][1][j];
        temp.style.transform = `rotate(${-90 + deg}deg)`;
        temp.style.left = `${x}px`;
        temp.style.top = `${y}px`;
      }
    }
  }
}

function initStyle() {
  const labels = document.getElementsByClassName("label");
  for (const label of labels) {
    label.style.color = "#4d4d4d";
  }
}

function changePosition() {
  for (let i = 0; i < textSet.length; i++) {
    for (let j = 0; j < textSet[i][1].length; j++) {
      const temp = textSet[i][1][j];
      setTimeout(() => {
        temp.style.position = "absolute";
      }, 50);
    }
  }
}

function changeCircle() {
  isCircle = true;
  clock.value.style.transform = "rotate(90deg)";
}
</script>

<style scoped>
#clock {
  position: relative;
  width: 100%;
  height: 100%;
  /* background: black; */
}
.label {
  display: inline-block;
  color: #4d4d4d;
  text-align: center;
  padding: 0 5px;
  font-size: 19px;
  transition: left 1s, top 1s;
  transform-origin: 0% 0%;
}
</style>
