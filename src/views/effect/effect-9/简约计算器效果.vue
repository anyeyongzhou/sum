<template>
  <form class="kuang">
    <input type="text" class="result" v-model="result" readonly />
    <div class="anniu">
      <span
        v-for="button in buttons"
        :key="button"
        @click="updateResult(button)"
      >
        {{ button }}
      </span>
    </div>
    <div class="zero" @click="clearResult">I'll clear it (一键清空)</div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const result = ref("");
const buttons = [
  "7",
  "8",
  "9",
  "+",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "*",
  "0",
  ".",
  "/",
];

const updateResult = value => {
  if (value === "=") {
    try {
      result.value = eval(result.value);
    } catch {
      result.value = "Error";
    }
  } else {
    result.value += value;
  }
};

const clearResult = () => {
  result.value = "";
};
</script>

<style lang="scss" scoped>
.kuang {
  width: 300px !important;
  height: 400px;
  background-color: rgb(172, 166, 166);
  position: relative;
  background-image: url(6.1.png);
  background-size: 100% 100%;
  border-radius: 10px;
  box-shadow: 4px 4px 6px rgb(6, 50, 70);
}

.result {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 260px;
  height: 60px;
  padding: 20px;
  font-size: 23px;
  text-align: right;
  letter-spacing: 1px;
  outline: none;
  background-color: rgb(166, 219, 190);
  opacity: 0.9;
}

.anniu {
  position: absolute;
  top: 100px;
  left: 20px;
  width: 260px;
  height: 240px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: space-between;
  cursor: pointer;
}

.anniu span {
  width: 60px;
  height: 55px;
  color: rgb(34, 36, 58);
  line-height: 55px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  background-color: rgb(248, 247, 247);
  border-radius: 5px;
  box-shadow: inset 2px 2px 3px rgb(65, 64, 64),
    inset -2px -2px 3px rgb(88, 86, 86);
}

.anniu span:hover {
  opacity: 0.8;
}

.anniu span:active {
  opacity: 1;
}

.zero {
  position: absolute;
  left: 20px;
  bottom: 20px;
  width: 260px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  text-align: center;
  letter-spacing: 1px;
  border-radius: 15px;
  background-color: rgb(248, 247, 247);
  box-shadow: inset 1px 1px 1px rgb(65, 64, 64),
    inset -1px -1px 1px rgb(88, 86, 86);
  cursor: pointer;
  opacity: 0.4;
}

.zero:hover {
  opacity: 0.9;
}

.zero:active {
  opacity: 0.5;
}
</style>
