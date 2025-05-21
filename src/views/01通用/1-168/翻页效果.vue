<template>
  <div class="card" ref="cardRef">
    <div class="imgBox">
      <div class="bark"></div>
      <img :src="pageImg" alt="page image" />
    </div>
    <div class="details">
      <h4 class="title1">You're my hero!</h4>
      <h4 class="title2">(HAPPY BIRTHDAY)</h4>
      <p>Dear Dad,</p>
      <p>Let's see.. .</p>
      <p>You’re never around, you</p>
      <p>hate the music I’m into, you</p>
      <p>practically despise the movies I</p>
      <p>like, and yet somehow you still</p>
      <p>manage to be the best dad every year.</p>
      <p>How do you do that :)</p>
      <p class="text-right">Happy Birthday, papa!</p>
      <p class="text-right">Sarah</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import pageImg from "./page.png"; // ✅ 模块化引入图片

const cardRef = ref(null);
</script>

<style lang="scss" scoped>
.card {
  width: 300px !important;
  height: 400px;
  color: #013243;
  position: relative;
  margin: auto;
  background-color: #e0e1dc;
  transform-style: preserve-3d;
  perspective: 2000px;
  box-shadow: inset 300px 0 50px rgba(0, 0, 0, 0.5),
    20px 0 60px rgba(0, 0, 0, 0.5);
  transition: 1s;

  &:hover {
    transform: rotate(15deg) scale(1.2);
    box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.5),
      0 10px 100px rgba(0, 0, 0, 0.5);

    .imgBox {
      transform: rotateY(-135deg);
    }

    .bark {
      opacity: 1;
      transition: 0.6s;
      box-shadow: 300px 200px 100px rgba(0, 0, 0, 0.4) inset;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    height: 5px;
    background: #bac1ba;
    transform-origin: bottom;
    transform: skewX(-45deg);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: -5px;
    width: 5px;
    height: 100%;
    background: #92a29c;
    transform-origin: left;
    transform: skewY(-45deg);
  }

  .imgBox {
    width: 100%;
    height: 100%;
    position: relative;
    transform-origin: left;
    transition: 0.7s;

    img {
      width: 100%;
    }
  }

  .bark {
    position: absolute;
    background: #e0e1dc;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: 0.7s;
  }

  .details {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    margin-top: 70px;

    h4 {
      font-size: 26px;
      line-height: 40px;
      text-align: center;
      font-family: "Amatic SC", cursive;
    }

    p {
      font-size: 15px;
      line-height: 15px;
      transform: rotate(-10deg);
      padding: 0 20px;
    }

    .title1 {
      color: #1bbc9b;
    }

    .title2 {
      color: #c0392b;
      margin-bottom: 30px;
    }

    .text-right {
      text-align: right;
    }
  }
}
</style>
