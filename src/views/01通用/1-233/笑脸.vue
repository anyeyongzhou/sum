<template>
  <div class="smile-face">
    <div class="container">
      <h1 class="text">你喜欢这个课程么？</h1>
      <div class="rating">
        <label v-for="(item, index) in ratingItems" :key="index">
          <input
            type="radio"
            name="star"
            :value="index"
            v-model="selectedRating"
          />
          <div>
            <img :src="item.image" :alt="item.text" />
            <h4>{{ item.text }}</h4>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import img4 from "./img/4.png";
import img5 from "./img/5.png";

const selectedRating = ref(2); // 默认选中"一般"

const ratingItems = [
  { text: "讨厌", image: img1 },
  { text: "差评", image: img2 },
  { text: "一般", image: img3 },
  { text: "满意", image: img4 },
  { text: "优秀", image: img5 },
];
</script>

<style lang="scss" scoped>
.smile-face {
  background-color: #20152d;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    width: 1000px;
    margin: 100px auto;
  }

  .text {
    text-align: center;
    font-size: 36px;
    letter-spacing: 2px;
    margin-bottom: 120px;
    color: #fff;
    font-weight: 100;
  }

  .rating {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      text-align: center;

      input {
        display: none;
      }

      div {
        width: 0px;
        height: 100%;
        overflow: hidden;
        opacity: 0;
        filter: grayscale(1);
        transition: 0.5s;

        img {
          width: 100%;
          height: auto;
        }

        h4 {
          margin-top: 20px;
          font-size: 22px;
          color: #fff;
          font-weight: 100;
        }
      }

      input:checked + div {
        width: 200px;
        opacity: 1;
        filter: grayscale(0);
      }
    }

    &:hover {
      label div {
        width: 200px;
        opacity: 0.5;
      }
    }

    label div:hover {
      filter: grayscale(0);
    }
  }
}
</style>
