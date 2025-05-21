<template>
  <div class="container">
    <div class="top">
      <div class="item select" @click="toggleSelect">
        {{ allSelected ? "UNSELECT" : "SELECT ALL" }}
      </div>
      <h1>SELECT YOUR PHOTO</h1>
      <div
        class="item send"
        :data-counter="selectedCount"
        @click="sendSelected"
        :class="{ selected: hasSelected }"
      >
        &#10004;
      </div>
    </div>
    <ul class="bottom">
      <li
        v-for="(photo, index) in photos"
        :key="index"
        @click="togglePhoto(index)"
        :class="{ selected: photo.selected }"
        :style="{ backgroundImage: `url(${photo.src})` }"
      >
        <span class="checkmark" v-if="photo.selected">&#10004;</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import img1 from "./img/1.jpeg";
import img2 from "./img/2.jpeg";
import img3 from "./img/3.jpeg";
import img4 from "./img/4.jpeg";
import img5 from "./img/5.jpeg";
import img6 from "./img/6.jpeg";
import img7 from "./img/7.jpeg";
import img8 from "./img/8.jpeg";

const photos = ref([
  { src: img1, selected: false },
  { src: img2, selected: false },
  { src: img3, selected: false },
  { src: img4, selected: false },
  { src: img5, selected: false },
  { src: img6, selected: false },
  { src: img7, selected: false },
  { src: img8, selected: false },
]);

const selectedCount = computed(
  () => photos.value.filter(photo => photo.selected).length
);
const hasSelected = computed(() => selectedCount.value > 0);
const allSelected = computed(() => selectedCount.value === photos.value.length);

const togglePhoto = index => {
  photos.value[index].selected = !photos.value[index].selected;
};

const toggleSelect = () => {
  const newState = !allSelected.value;
  photos.value.forEach(photo => {
    photo.selected = newState;
  });
};

const sendSelected = () => {
  alert(`Selected count: ${selectedCount.value}`);
};
</script>

<style scoped>
.container {
  width: 700px !important;
  height: 500px;
  margin: 30px auto;
}

.top {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom {
  width: 100%;
  height: 350px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.item {
  background-color: rgb(72, 89, 105);
  color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  line-height: 50px;
}

div.select {
  width: 150px;
  height: 50px;
  position: relative;
}

h1 {
  color: rgb(85, 85, 85);
  font-weight: 500;
}

div.send {
  width: 50px;
  height: 50px;
  position: relative;
}

.bottom > li {
  width: 150px;
  height: 150px;
  border: 5px solid #fff;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
}

.bottom > li.selected {
  box-shadow: 0 0 0 4px #00c09e;
}

.checkmark {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #00c09e;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

.bottom > li.selected .checkmark {
  opacity: 1;
}
</style>
