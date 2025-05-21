<template>
  <ul id="container">
    <li v-for="(icon, index) in icons" :key="index">
      <label>
        <input type="checkbox" v-model="icon.selected" />
        <div class="icon-box">
          <i :class="['iconfont', icon.class]"></i>
        </div>
      </label>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const icons = ref([
  { class: "icon-phone1", selected: false },
  { class: "icon-moon", selected: false },
  { class: "icon-volume", selected: false },
  { class: "icon-bluetooth", selected: false },
  { class: "icon-wifi", selected: false },
  { class: "icon-plane", selected: false },
]);
</script>

<style scoped>
ul {
  width: 200px !important;
  list-style: none;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
    3px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

ul li {
  margin: 15px;
}

.icon-box {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
    3px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

input[type="checkbox"] {
  display: none;
}

.icon-box .iconfont {
  font-size: 30px;
  color: #6a9bd8;
}

input[type="checkbox"]:checked ~ .icon-box {
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1) inset,
    3px 3px 5px rgba(0, 0, 0, 0.1) inset;
}
</style>
