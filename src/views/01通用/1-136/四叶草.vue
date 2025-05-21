<template>
  <main>
    <div class="one" @click="toggleStyle(1)">医疗</div>
    <div class="two" @click="toggleStyle(2)">饮食</div>
    <div class="three" @click="toggleStyle(3)">运动</div>
    <div class="four" @click="toggleStyle(4)">消费</div>
  </main>
</template>

<script setup>
import { ref } from "vue";

const styles = ref({
  1: "one",
  2: "two",
  3: "three",
  4: "four",
});

const toggleStyle = index => {
  const currentStyle = styles.value[index];
  if (currentStyle.endsWith("s")) {
    styles.value[index] = currentStyle.slice(0, -1); // Remove 's'
    document.body.style.background = "none";
  } else {
    styles.value[index] = currentStyle + "s"; // Add 's'
    switch (index) {
      case 1:
        document.body.style.background = "rgba(247, 114, 114, 0.986)";
        break;
      case 2:
        document.body.style.background = "rgb(245, 245, 129)";
        break;
      case 3:
        document.body.style.background = "rgb(193, 245, 115)";
        break;
      case 4:
        document.body.style.background = "rgb(133, 219, 245)";
        break;
    }
  }
};
</script>

<style scoped>
main {
  width: 400px !important;
  height: 400px;
  position: relative;
}

div {
  width: 150px;
  height: 150px;
  position: absolute;
  box-sizing: border-box;
  transition: 0.5s;
  background: rgba(0, 0, 0, 0.493);
  text-align: center;
  line-height: 150px;
  color: rgba(255, 255, 255, 0.849);
  font-size: 35px;
  cursor: pointer;
}

.one:hover,
.two:hover {
  box-shadow: 0 0 10px rgb(102, 98, 98);
  transform: translateY(-10px);
}

.three:hover,
.four:hover {
  box-shadow: 0 0 10px rgb(102, 98, 98);
  transform: translateY(10px);
}

.one {
  left: 45px;
  top: 45px;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 50%;
  background: rgba(238, 10, 10, 0.644);
}

.two {
  right: 45px;
  top: 45px;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  background: rgba(252, 235, 3, 0.863);
}

.three {
  left: 45px;
  bottom: 45px;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  background: rgba(149, 247, 3, 0.877);
}

.four {
  bottom: 45px;
  right: 45px;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 50%;
  background: rgba(5, 190, 247, 0.856);
}

.ones,
.twos,
.threes,
.fours {
  border: 3px solid white;
  color: white;
  border-radius: 80%;
}
</style>
