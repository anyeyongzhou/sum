<template>
  <div>
    <input type="text" v-model="num" />
    <button @click="generateTable">生成乘法表</button>
    <button @click="startAutoGenerate">自动生成</button>
    <button @click="stopAutoGenerate">停止生成</button>
    <table>
      <tbody>
        <tr v-for="(row, index) in table" :key="index">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const num = ref(9);
const table = ref([]);
let timer = null;

const generateTable = () => {
  const value = Number(num.value);
  if (!value) {
    alert("请输入一个值吧...");
    return;
  }
  if (isNaN(value)) {
    alert("请输入一个数字吧...");
    return;
  }

  table.value = [];
  for (let i = 1; i <= value; i++) {
    const row = [];
    for (let j = 1; j <= i; j++) {
      row.push(`${j} * ${i} = ${i * j}`);
    }
    table.value.push(row);
  }
};

const startAutoGenerate = () => {
  let currentNum = 0;
  timer = setInterval(() => {
    currentNum++;
    num.value = currentNum;
    generateTable();
  }, 600);
};

const stopAutoGenerate = () => {
  clearInterval(timer);
};
</script>

<style scoped>
input[type="text"] {
  padding: 5px;
  margin-right: 10px;
}

table {
  margin-top: 20px;
  border-collapse: collapse;
}

td {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background: #111;
  color: #fff;
  white-space: nowrap;
}
</style>
