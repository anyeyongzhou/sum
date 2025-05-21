<template>
  <div class="container">
    <ul class="list">
      <li>
        <input
          type="checkbox"
          id="selectAll"
          v-model="selectAll"
          @change="handleSelectAll"
        />
        <label for="selectAll">全选</label>
      </li>
      <li v-for="(item, index) in items" :key="index">
        <input
          type="checkbox"
          :id="'item' + index"
          v-model="item.checked"
          @change="handleItemChange"
        />
        <label :for="'item' + index">{{ item.name }}</label>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 列表数据
const items = ref([
  { name: "bbbb", checked: false },
  { name: "cccc", checked: false },
  { name: "eeee", checked: false },
  { name: "ffff", checked: false },
]);

// 全选状态
const selectAll = computed({
  get: () => items.value.every(item => item.checked),
  set: value => {
    items.value.forEach(item => (item.checked = value));
  },
});

// 处理全选
const handleSelectAll = () => {
  items.value.forEach(item => (item.checked = selectAll.value));
};

// 处理单个选项变化
const handleItemChange = () => {
  // 当所有选项都被选中时，自动勾选全选
  selectAll.value = items.value.every(item => item.checked);
};
</script>

<style scoped>
.container {
  width: 300px !important;
  margin: 50px auto;
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
}

.list li {
  padding: 10px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
}

.list li:last-child {
  border-bottom: none;
}

.list li label {
  margin-left: 8px;
  cursor: pointer;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  accent-color: #409eff;
}
</style>
