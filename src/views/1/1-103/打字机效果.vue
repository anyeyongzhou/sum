<template>
  <h1>
    <span class="text">{{ currentText }}</span>
  </h1>
</template>

<script setup>
import { ref, onMounted } from "vue";

const txt = ["北极光之夜。", "夜越黑，星星越亮。", "答案在风中飘荡。"];
const currentText = ref("");
const index = ref(0);
const xiaBiao = ref(0);
const huan = ref(true);

const updateText = () => {
  if (huan.value) {
    currentText.value = txt[xiaBiao.value].slice(0, index.value + 1);
    index.value++;
  } else {
    currentText.value = txt[xiaBiao.value].slice(0, index.value - 1);
    index.value--;
  }

  if (index.value >= txt[xiaBiao.value].length) {
    huan.value = false;
  } else if (index.value < 0) {
    index.value = 0;
    huan.value = true;
    xiaBiao.value++;
    if (xiaBiao.value >= txt.length) {
      xiaBiao.value = 0;
    }
  }
};

onMounted(() => {
  setInterval(updateText, 200);
});
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(43, 52, 82);
}

.text {
  font-family: "fangsong";
  display: inline-block;
  position: relative;
  font-size: 40px;
  height: 60px;
  line-height: 60px;
  color: rgb(245, 245, 245);

  &::after {
    content: "";
    position: absolute;
    right: -10px;
    top: 5px;
    height: 50px;
    width: 3px;
    background-color: #fff;
    animation: san 0.5s steps(1) infinite;
  }
}

@keyframes san {
  0%,
  100% {
    background-color: #fff;
  }
  50% {
    background-color: transparent;
  }
}
</style>
