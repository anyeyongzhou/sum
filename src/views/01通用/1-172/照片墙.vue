<template>
  <div class="wrapper">
    <div class="imgBox" ref="imgBoxRef">
      <img
        v-for="(img, i) in images"
        :key="i"
        :ref="el => (imgRefs[i] = el)"
        :src="img"
        alt=""
      />
    </div>
    <div class="btn" @click="handleClick">点击查看效果</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const images = Array.from({ length: 50 }, (_, i) => {
  const index = (i % 10) + 1;
  return new URL(`./pic/${index}.jpg`, import.meta.url).href;
});

const imgRefs = [];
const flag = ref(true);
const imgBoxRef = ref(null);

function monition(dom, time, doFun, callBack) {
  dom.style.transition = time;
  doFun.call(dom);
  const handler = () => {
    dom.removeEventListener("transitionend", handler);
    callBack && callBack.call(dom);
  };
  dom.addEventListener("transitionend", handler);
}

function handleClick() {
  if (!flag.value) return;
  flag.value = false;
  let endNum = 0;
  imgRefs.forEach((img, i) => {
    setTimeout(() => {
      monition(
        img,
        "1s",
        function () {
          this.style.transform = "scale(0)";
        },
        function () {
          monition(
            this,
            "1s",
            function () {
              this.style.transform = "scale(1)";
              this.style.opacity = "0";
            },
            function () {
              endNum++;
              if (endNum === imgRefs.length) {
                show();
              }
            }
          );
        }
      );
    }, Math.random() * 1000);
  });
}

function show() {
  let allEnd = 0;
  imgRefs.forEach((img, i) => {
    img.style.transition = "";
    img.style.transform = `rotateY(0deg) translateZ(-${Math.random() * 500}px)`;
    setTimeout(() => {
      monition(
        img,
        "2s",
        function () {
          this.style.opacity = "1";
          this.style.transform = "rotateY(-360deg) translateZ(0)";
        },
        function () {
          allEnd++;
          if (allEnd === imgRefs.length) {
            flag.value = true;
          }
        }
      );
    }, Math.random() * 1000);
  });
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 70%;
  margin: 50px auto;

  .imgBox {
    width: 500px;
    height: 252px;
    margin: 50px auto;
    perspective: 700px;
    display: flex;
    flex-wrap: wrap;
    img {
      width: 50px;
      height: 50px;
    }
  }

  .btn {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #6c6c6c;
    background-color: #0fc;
    border-radius: 5px;
    margin: 0 auto;
    padding: 5px;
    cursor: pointer;
    box-shadow: 2px 2px 3px #eee;
    font-weight: bolder;
  }
}
</style>
