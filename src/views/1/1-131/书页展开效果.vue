<template>
  <div class="wrapper">
    <div class="left" :class="{ open: isCardOpen }">
      <div class="page">
        <div class="sectionWrap">
          <h1>Title</h1>
          <hr />
          <p class="preview">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>
          <button class="openB" @click="openCard">read more...</button>
        </div>
      </div>
      <div class="back">
        <div class="sectionWrap">
          <h1>Left</h1>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata
          </p>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="sectionWrap">
        <h1>middle</h1>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata
        </p>
      </div>
    </div>
    <div class="right" :class="{ open: isCardOpen }">
      <div class="sectionWrap">
        <h1>right</h1>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata
        </p>
      </div>
      <button class="closeB" @click="closeCard">X</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isCardOpen = ref(false);

const openCard = () => {
  isCardOpen.value = true;
};

const closeCard = () => {
  isCardOpen.value = false;
};
</script>

<style lang="scss" scoped>
$background-color: rgba(17, 126, 104, 0.8);
$font-color: #34495e;
$button-color: rgba(0, 0, 0, 0.5);
$button-hover-color: rgba(0, 0, 0, 1);

* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $background-color;
}

.wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5%;
}

.left,
.middle,
.right {
  position: relative;
  width: 33%;
  height: 100%;
  float: left;
  background-color: #fff;
  border-radius: 10px;
}

.left {
  transform-origin: 100% 50%;
  transform: rotateY(180deg);
  z-index: 20;
  transition: 0.7s ease-in-out;
}

.right {
  transform-origin: 0% 50%;
  transform: rotateY(-180deg);
  transition: 0.7s ease-in-out;
}

.left .page,
.left .back {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 10px;
}

.left .page {
  transform: rotateY(180deg);
  background-color: #fff;
  z-index: 5;
}

.left .back {
  background-color: #fff;
  z-index: 4;
}

.sectionWrap {
  height: 100%;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
}

h1 {
  font-family: "Playfair Display", serif;
  font-size: 3em;
  line-height: 1;
  color: $font-color;
}

p {
  font-family: "Josefin Sans", sans-serif;
  font-size: 1.2em;
  max-height: 100px;
  text-overflow: clip;
}

hr {
  border: 3px solid $font-color;
  width: 30px;
  margin: 12px 0 8px 1px;
  text-align: left;
}

.openB {
  background-color: transparent;
  border: 2px solid $button-color;
  padding: 5px;
  position: absolute;
  min-width: 120px;
  max-width: 150px;
  z-index: 50;
  bottom: 30px;
  font-weight: 400;
  font-size: 1em;
  opacity: 0.7;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.openB:hover {
  background-color: $button-hover-color;
  color: white;
  transition: 0.2s ease-in-out;
}

.preview {
  max-height: 100px;
  overflow: hidden;
  content: "";
  position: relative;
  display: block;
}

.preview:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(transparent, white);
}

.closeB {
  position: absolute;
  border: none;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  z-index: 50;
  width: 50px;
  font-size: 1.5em;
  cursor: pointer;
  height: 50px;
  top: 0;
  right: 0;
  transition: 0.2s ease-in-out;
  border-radius: 10px;
}

.closeB:hover {
  background-color: rgba(0, 0, 0, 0.2);
  transition: 0.2s ease-in-out;
}

.left.open {
  transform-origin: 100% 50%;
  transform: rotateY(0deg);
  transition: 0.7s ease-in-out;
}

.right.open {
  transform-origin: 0% 50%;
  transform: rotateY(0deg);
  transition: 0.7s ease-in-out;
}

.back.open {
  z-index: 10;
}
</style>
