<template>
  <div
    class="container"
    :style="{ backgroundColor: bodyColor, color: textColor }"
  >
    <div class="kaiguan" @click="toggleTheme">
      <div :class="buttonClass"></div>
    </div>
    <h1>Life of Pi</h1>
    <p>
      &emsp;&emsp;&emsp; He lives in Scarborough. He's a small, slim man – no
      more than five foot five. Dark hair, dark eyes. Hair greying at the
      temples. Can't be older than forty. Leasing coffee-coloured complexion.
      Mild fall weather, yet puts on a big winter parka with fur-lined hood for
      the walk to the diner.
      <!-- Content truncated for brevity -->
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isDarkTheme = ref(false);

const bodyColor = computed(() =>
  isDarkTheme.value ? "rgb(7, 7, 29)" : "white"
);
const textColor = computed(() => (isDarkTheme.value ? "white" : "black"));
const buttonClass = computed(() => (isDarkTheme.value ? "hei" : "bai"));

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
};
</script>

<style lang="scss" scoped>
.container {
  transition: all 1s;
  position: relative;
}

.kaiguan {
  position: absolute;
  top: 20px;
  right: 50px;
  width: 40px;
  height: 20px;
  border: 2px solid black;
  border-radius: 20px;
  cursor: pointer;
  transition: all 3s;
}

.bai {
  position: absolute;
  top: 1.5px;
  left: 2px;
  height: 13px;
  width: 13px;
  background-color: rgb(0, 0, 0);
  border-radius: 50%;
  transition: all 1s;
}

.hei {
  position: absolute;
  top: 1.5px;
  right: 2px;
  height: 13px;
  width: 13px;
  background-color: rgb(11, 243, 81);
  border-radius: 50%;
  transition: all 1s;
}

h1 {
  margin: 100px auto;
  width: 1000px;
  text-align: center;
}

p {
  margin: -60px auto;
  width: 1100px;
  text-align-last: center;
}
</style>
