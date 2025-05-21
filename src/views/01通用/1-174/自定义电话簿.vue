<template>
  <div class="main-wp">
    <h2>简易电话本制作</h2>
    <div class="item">
      <label for="userName">姓名：</label>
      <input type="text" v-model="userName" id="userName" />
    </div>
    <div class="item">
      <label for="userMobile">电话：</label>
      <input type="text" v-model="userMobile" id="userMobile" />
    </div>
    <div class="item">
      <label for="userAddress">地址：</label>
      <input type="text" v-model="userAddress" id="userAddress" />
      <input type="hidden" v-model="tempArrId" />
    </div>
    <div class="item">
      <button @click="saveData" class="save-btn">
        {{ isEditing ? "修改" : "保存" }}
      </button>
    </div>
    <hr />
    <table class="table" border="1">
      <thead>
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>电话</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!phoneList.length">
          <td colspan="5">暂无数据存储</td>
        </tr>
        <tr v-for="(item, index) in phoneList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.userName }}</td>
          <td>{{ item.userMobile }}</td>
          <td>{{ item.userAddress }}</td>
          <td>
            <span @click="deleteItem(item.id)" class="handle-btn delete-btn"
              >删除</span
            >
            <span>/</span>
            <span @click="editItem(item)" class="handle-btn update-btn"
              >修改</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const userName = ref("");
const userMobile = ref("");
const userAddress = ref("");
const tempArrId = ref("");
const phoneList = ref([]);
const isEditing = ref(false);

const loadPhoneList = () => {
  const data = JSON.parse(localStorage.getItem("phoneList")) || [];
  phoneList.value = data;
};

const saveData = () => {
  if (
    !userName.value.trim() ||
    !userMobile.value.trim() ||
    !userAddress.value.trim()
  )
    return;

  const phoneData = {
    userName: userName.value,
    userMobile: userMobile.value,
    userAddress: userAddress.value,
    id: isEditing.value
      ? tempArrId.value
      : Date.now() + Math.random().toString().slice(2, 5),
  };

  if (isEditing.value) {
    phoneList.value = phoneList.value.map(item =>
      item.id === tempArrId.value ? phoneData : item
    );
  } else {
    phoneList.value.push(phoneData);
  }

  localStorage.setItem("phoneList", JSON.stringify(phoneList.value));
  resetForm();
  loadPhoneList();
};

const deleteItem = id => {
  phoneList.value = phoneList.value.filter(item => item.id !== id);
  localStorage.setItem("phoneList", JSON.stringify(phoneList.value));
  loadPhoneList();
};

const editItem = item => {
  userName.value = item.userName;
  userMobile.value = item.userMobile;
  userAddress.value = item.userAddress;
  tempArrId.value = item.id;
  isEditing.value = true;
};

const resetForm = () => {
  userName.value = "";
  userMobile.value = "";
  userAddress.value = "";
  tempArrId.value = "";
  isEditing.value = false;
};

onMounted(loadPhoneList);
</script>

<style scoped>
.main-wp {
  display: block;
  width: 550px !important;
  margin: 30px auto 80px;
}
label {
  width: 100px;
  text-align: left;
  font-size: 16px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
input {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  width: 100%;
}
.save-btn {
  color: #fff;
  background-color: #409eff;
  width: 100px;
  height: 30px;
  margin-top: 20px;
  float: right;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.table {
  width: 820px;
  margin: 20px auto;
  border-collapse: collapse;
}
thead {
  color: #909399;
  font-weight: 500;
}
th,
td {
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px solid #ebeef5;
  color: #888;
}
.delete-btn {
  color: #e6a23c;
  cursor: pointer;
}
.update-btn {
  color: #409eff;
  cursor: pointer;
}
h2 {
  margin: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
