<template>
  <div class="wrapper">
    <ul class="box">
      <li
        v-for="(name, index) in names"
        :key="index"
        :class="{ change: index === selectedIndex }"
      >
        {{ name }}
      </li>
    </ul>
    <button class="start" @click="startPicking">开始点名</button>
    <button class="stop" @click="stopPicking">停止</button>
    <div class="choose">
      <span>幸运的的你~</span>
      <img src="./1.gif" alt="" />
      <span class="name">{{ selectedName }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const names = [
  "郭强",
  "诸泽涵",
  "张利宏",
  "高海波",
  "张东升",
  "高英伟",
  "秦超蒙",
  "麦腾阳",
  "吴金正",
  "马方岩",
  "尚义鹏",
  "赵建龙",
  "李旭斌",
  "张丰",
  "金豪",
  "王银鹏",
  "温壮",
  "田利明",
  "邱国军",
  "姚志强",
  "黎怡志",
  "张崇如",
  "高帅帅",
  "谷世龙",
  "陈娜",
  "?常勇",
  "杨明豪",
  "段春林",
  "丛绍谨",
  "曾佑坤",
  "洪洋",
  "王永琪",
  "王阳",
  "陈宇",
];
const selectedIndex = ref(null);
const selectedName = ref("");
let timer = null;

const startPicking = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    selectedIndex.value = randomIndex;
  }, 10);
};

const stopPicking = () => {
  clearInterval(timer);
  selectedName.value = names[selectedIndex.value];
};
</script>

<style scoped>
.wrapper {
  width: 800px;
  margin: 100px auto;
  border: 1px solid #ddd;
  text-align: center;
}
.box li {
  vertical-align: top;
  display: inline-block;
  width: 100px;
  height: 50px;
  border: 2px solid #ddd;
  border-radius: 15px;
  text-align: center;
  line-height: 50px;
  margin: 5px;
}
.box li.change {
  background-color: red;
  color: #fff;
  font-weight: bolder;
}
.wrapper button {
  display: inline-block;
  border: none;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  margin-top: 20px;
  font-weight: bolder;
  color: #333;
  background-color: #eee;
}
.wrapper .choose {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid #000;
}
.wrapper .choose img {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
