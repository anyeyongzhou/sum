<template>
  <div class="tab">
    <div class="box">
      <ul class="menus">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ bg: selectedIndex === index }"
          @mouseover="selectTab(index)"
        >
          {{ tab.name }}
        </li>
      </ul>
      <div class="right">
        <div class="scroll" :style="{ marginTop: `-${selectedIndex * 800}px` }">
          <div class="tab_right" v-for="(tab, index) in tabs" :key="index">
            <img :src="tab.image" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import a1 from "./img/a1.png";
import a2 from "./img/a2.png";
import a3 from "./img/a3.png";
import a4 from "./img/a4.png";
import a5 from "./img/a5.png";
import a6 from "./img/a6.png";
import a7 from "./img/a7.png";

const tabs = ref([
  { name: "tab1", image: a1 },
  { name: "tab2", image: a2 },
  { name: "tab3", image: a3 },
  { name: "tab4", image: a4 },
  { name: "tab5", image: a5 },
  { name: "tab6", image: a6 },
  { name: "tab7", image: a7 },
]);

const selectedIndex = ref(0);

const selectTab = index => {
  selectedIndex.value = index;
};
</script>

<style scoped>
.tab {
  width: 100%;
  margin-top: 50px;
}
.tab .box {
  width: 1200px !important;
  position: relative;
  margin: 0 auto;
  height: 850px;
}
.tab .box .menus {
  width: 200px;
  height: 700px;
  background: rgb(92, 94, 103);
  float: left;
  margin-top: 60px;
  border-radius: 10px;
  overflow: hidden;
}
.tab .box .menus li {
  width: 200px;
  height: 70px;
  font-size: 20px;
  color: #fff;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  line-height: 70px;
  transition: all 0.3s;
}
.tab .box .bg {
  height: 110px !important;
  background: rgb(0, 159, 233) !important;
  line-height: 110px !important;
}
.tab .right {
  float: left;
  width: 950px;
  margin-top: 25px;
  height: 800px;
  overflow: hidden;
  margin-left: 50px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
}
.tab .tab_right {
  width: 950px;
  height: 800px;
  color: #fff;
  position: relative;
}
.tab .tab_right img {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}
.tab .scroll {
  transition: all 0.5s;
}
</style>
