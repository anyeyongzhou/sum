<template>
  <div id="box">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="item"
      @mousedown="onMouseDown($event, index)"
    >
      <img :src="item" width="150" height="100" />
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
import img6 from "./img/6.png";
import img7 from "./img/7.png";
import img8 from "./img/8.png";

const items = ref([img1, img2, img3, img4, img5, img6, img7, img8]);

let bstop = true;

const onMouseDown = (event, index) => {
  if (bstop) {
    bstop = false;
    const item = event.currentTarget;
    const disx = event.offsetX;
    const disy = event.offsetY;
    const $clone = item.cloneNode(true);
    $clone.classList.add("draging");
    $clone.style.left = item.offsetLeft + "px";
    $clone.style.top = item.offsetTop + "px";
    document.getElementById("box").appendChild($clone);
    item.classList.add("moving");
    item.innerHTML = "";

    const onMouseMove = e => {
      $clone.style.left = e.pageX - disx + "px";
      $clone.style.top = e.pageY - disy + "px";
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      const minIndex = getNearestItemIndex($clone);
      if (minIndex === index) {
        $clone.animate(
          [{ left: item.offsetLeft + "px", top: item.offsetTop + "px" }],
          { duration: 400 }
        );
        setTimeout(() => {
          item.classList.remove("moving");
          item.innerHTML = $clone.innerHTML;
          $clone.remove();
          bstop = true;
        }, 400);
      } else {
        const $minbox = document.getElementById("box").children[minIndex];
        const $clone2 = $minbox.cloneNode(true);
        $clone2.classList.add("draging");
        $clone2.style.left = $minbox.offsetLeft + "px";
        $clone2.style.top = $minbox.offsetTop + "px";
        document.getElementById("box").appendChild($clone2);
        $minbox.classList.add("moving");
        $clone.animate(
          [{ left: $minbox.offsetLeft + "px", top: $minbox.offsetTop + "px" }],
          { duration: 400 }
        );

        setTimeout(() => {
          $minbox.classList.remove("moving");
          $minbox.innerHTML = $clone.innerHTML;
          $clone.remove();
          bstop = true;
        }, 400);
        $clone2.animate(
          [{ left: item.offsetLeft + "px", top: item.offsetTop + "px" }],
          { duration: 400 }
        );
        setTimeout(() => {
          item.classList.remove("moving");
          item.innerHTML = $clone2.innerHTML;
          $clone2.remove();
          bstop = true;
        }, 400);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
  }
};

const getNearestItemIndex = clone => {
  let minIndex = 0;
  let minDistance = Infinity;
  Array.from(document.getElementById("box").children).forEach((item, index) => {
    const distance = Math.sqrt(
      Math.pow(clone.offsetLeft - item.offsetLeft, 2) +
        Math.pow(clone.offsetTop - item.offsetTop, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      minIndex = index;
    }
  });
  return minIndex;
};
</script>

<style scoped>
#box {
  margin: auto;
  width: 490px !important;
  height: 340px;
  border: 1px solid #000000;
  position: relative;
}

.item {
  width: 150px;
  height: 100px;
  border-radius: 5px;
  margin: 5px;
  float: left;
  background: goldenrod;
  border: 1px solid lightgray;
  z-index: 1;
  text-align: center;
  font-size: 30px;
  line-height: 100px;
  cursor: move;
}

.moving {
  border: 1px dashed gray;
  background: white;
}

.draging {
  width: 150px;
  height: 100px;
  position: absolute;
  background: goldenrod;
  box-shadow: 0 0 2px 2px #555;
  border-radius: 5px;
  z-index: 500;
}
</style>
