<template>
  <div class="wrapper">
    <ul class="menu">
      <li class="item" v-for="(item, index) in menuItems" :key="index">
        <p href="#" class="btn" @click="toggleMenu(index)">{{ item.title }}</p>
        <div class="subMenu" v-show="activeIndex === index">
          <a
            v-for="(subItem, subIndex) in item.subItems"
            :key="subIndex"
            href="#"
            >{{ subItem }}</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuItems = ref([
  { title: "student", subItems: ["item-1", "item-2", "item-3"] },
  { title: "about", subItems: ["item-1", "item-2"] },
  { title: "class", subItems: ["item-1", "item-2"] },
  { title: "out", subItems: ["item-1", "item-2"] },
]);

const activeIndex = ref(-1);

const toggleMenu = index => {
  console.log(index);
  activeIndex.value = activeIndex.value === index ? -1 : index;
};
</script>

<style scoped>
.menu {
  width: 250px !important;
  display: block;
  border-radius: 10px;
  overflow: hidden;
}
.item {
  border-bottom: 1px solid #ef584a;
  overflow: hidden;
}
.btn {
  position: relative;
  display: block;
  padding: 15px 20px;
  background-color: #ff6f61;
  color: #fff;
}
.btn::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  bottom: -20px;
  right: 15px;
  border: 10px solid transparent;
  border-top: 10px solid #ff6f61;
}
.subMenu {
  background: #273057;
  transition: display 0.5s;
}
.subMenu a {
  position: relative;
  display: block;
  padding: 15px 20px;
  color: #fff;
  border-bottom: 1px solid #394c7f;
  font-size: 14px;
}
.subMenu a:hover {
  background: linear-gradient(
    to bottom,
    #273057 0%,
    #273057 50%,
    #394c7f 51%,
    #394c7f 100%
  );
  transition: all 0.3s;
}
</style>
