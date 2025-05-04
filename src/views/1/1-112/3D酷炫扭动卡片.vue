<template>
  <div class="container">
    <div
      class="card"
      ref="card"
      @mousemove="handleMouseMove"
      @mouseout="handleMouseOut"
    >
      <div class="card2" ref="card2">
        <img src="./haha.gif" alt="haha" />
        <h2>暗夜永昼</h2>
        <p class="txt">The aurora borealis.</p>
        <div class="font">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const card = ref(null);
const card2 = ref(null);

const handleMouseMove = e => {
  const rect = card.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateY = -(rect.width / 2 - x) / 5;
  const rotateX = (rect.height / 2 - y) / 5;

  card2.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleMouseOut = () => {
  card2.value.style.transform = "rotateY(0deg) rotateX(0deg)";
};
</script>

<style lang="scss" scoped>
$background-color: linear-gradient(
  120deg,
  rgb(255, 196, 0) 40%,
  rgb(31, 223, 175),
  rgb(0, 195, 255),
  rgb(183, 0, 255) 60%
);

.container {
  width: 100%;
  height: 100%;
  display: flex;
  // flex-wrap: nowrap;
  // flex-direction: row;
  justify-content: center;
  align-items: center;
  background: $background-color;
}

.card {
  position: relative;
  width: 250px;
  height: 300px;
  transform-style: preserve-3d;
  cursor: pointer;
}

.card2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-radius: 15px;
  transition: all 0.2s;
  transform-style: preserve-3d;
  box-shadow: inset 0 0 30px rgb(83, 83, 82);
}

.card2 img {
  position: absolute;
  top: 30px;
  left: 75px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transform: translateZ(50px);
  box-shadow: 0 0 10px rgb(83, 83, 83);
}

.card2 h2 {
  font-family: "Permanent Marker", cursive;
  position: absolute;
  top: 150px;
  width: 100%;
  height: 28px;
  font-size: 25px;
  line-height: 28px;
  text-align: center;
  text-shadow: 0 0 5px rgb(177, 174, 174);
  color: rgb(33, 34, 34);
  transform: translateZ(50px);
}

.txt {
  font-family: "Permanent Marker", cursive;
  position: absolute;
  top: 180px;
  width: 100%;
  line-height: 30px;
  font-size: 16px;
  text-align: center;
  text-shadow: 0 0 10px rgb(185, 187, 186);
  transform: translateZ(50px);
}

.font {
  position: absolute;
  top: 215px;
  left: 50%;
  width: 80%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  transform: translateZ(50px) translateX(-50%);
}

.font span {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  color: white;
  border-radius: 50%;
  background-color: rgb(61, 60, 60);
  box-shadow: inset 0 0 8px white, inset 0 0 8px white, inset 0 0 8px white,
    0 0 8px black;
}
</style>
