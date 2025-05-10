<template>
  <table class="table">
    <thead>
      <tr>
        <th>
          <input
            class="check-all"
            type="checkbox"
            v-model="allChecked"
            @change="toggleAll"
          />
        </th>
        <th @click="sortTable(1)">编号</th>
        <th @click="sortTable(2)">姓名</th>
        <th @click="sortTable(3)">年龄</th>
        <th @click="sortTable(4)">职位</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in sortedData" :key="item.id">
        <td>
          <input
            type="checkbox"
            v-model="item.checked"
            @change="updateCheckAll"
          />
        </td>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.position }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed } from "vue";

const data = ref([
  { id: 3, name: "王同学", age: 24, position: "C++程序员", checked: false },
  { id: 5, name: "张同学", age: 28, position: "WEB前端", checked: false },
  { id: 6, name: "艾伦", age: 21, position: "交互设计师", checked: false },
  { id: 22, name: "小明同学", age: 30, position: "PHP工程师", checked: false },
  { id: 1, name: "玛丽", age: 24, position: "测试员", checked: false },
]);

const allChecked = ref(false);

const sortedData = computed(() => {
  return data.value.slice().sort((a, b) => a.id - b.id); // 默认按编号排序
});

const toggleAll = () => {
  data.value.forEach(item => {
    item.checked = allChecked.value;
  });
};

const updateCheckAll = () => {
  allChecked.value = data.value.every(item => item.checked);
};

const sortTable = index => {
  // Toggle sort based on index (1: id, 2: name, 3: age, 4: position)
  data.value.sort((a, b) => {
    if (index === 2 || index === 4) {
      return a[index - 1].localeCompare(b[index - 1], "zh");
    }
    return a[index - 1] - b[index - 1];
  });
};
</script>

<style scoped>
.table {
  margin: 100px auto;
  width: 500px !important;
  border-collapse: collapse;
}

th {
  cursor: pointer;
  color: #909399;
}

th,
td {
  border: 1px solid #ccc;
  text-align: center;
  height: 40px;
}

[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
</style>
