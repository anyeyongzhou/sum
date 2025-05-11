<template>
  <div>
    <div class="btns">
      <button @click="addElement">添加元素</button>
      <button @click="removeElement">删除元素</button>
      <button @click="shuffleElements">随机排序</button>
    </div>
    <div class="container" ref="container">
      <div class="item" v-for="(item, index) in items" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const items = ref([]);
let nextNumber = 1;
const duration = 500;

const container = ref(null);

onMounted(() => {
  init();
});

const init = () => {
  while (nextNumber <= 100) {
    items.value.push(nextNumber);
    nextNumber++;
  }
};

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const addElement = () => {
  const flipper = createFlipper(container.value, duration);

  const newItem = nextNumber++;
  items.value.splice(getRandom(0, items.value.length), 0, newItem);

  flipper.move();
};

const removeElement = () => {
  if (items.value.length === 0) return;

  const flipper = createFlipper(container.value, duration);
  const index = getRandom(0, items.value.length);
  items.value.splice(index, 1);

  flipper.move();
};

const shuffleElements = () => {
  const flipper = createFlipper(container.value, duration);

  for (let i = 0; i < items.value.length; i++) {
    const j = getRandom(0, items.value.length);
    [items.value[i], items.value[j]] = [items.value[j], items.value[i]];
  }

  flipper.move();
};

// Flip animation functions
const createFlipper = (container, duration) => {
  const getPositions = elems => {
    const map = new Map();
    for (let i = 0; i < elems.length; i++) {
      const rect = elems[i].getBoundingClientRect();
      map.set(elems[i], { left: rect.left, top: rect.top });
    }
    return map;
  };

  const revertAndPlay = (ele, firstMap, lastMap) => {
    const first = firstMap.get(ele);
    const last = lastMap.get(ele);
    if (
      !first ||
      !last ||
      (first.left === last.left && first.top === last.top)
    ) {
      return;
    }
    const leftDis = first.left - last.left;
    const topDis = first.top - last.top;
    ele.animate(
      [
        { transform: `translate(${leftDis}px, ${topDis}px)` },
        { transform: "" },
      ],
      { duration }
    );
  };

  const firstMap = getPositions(container.children);
  return {
    move: () => {
      const lastMap = getPositions(container.children);
      for (let i = 0; i < container.children.length; i++) {
        const ele = container.children[i];
        revertAndPlay(ele, firstMap, lastMap);
      }
    },
  };
};
</script>

<style>
.btns {
  text-align: center;
}
.btns button {
  margin: 0 1em;
  outline: none;
  border: none;
  background: #579ef8;
  color: #fff;
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.btns button:hover {
  opacity: 0.8;
}
.container {
  width: 500px;
  overflow: hidden;
  margin: 1em auto;
}
.item {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  text-align: center;
  background: #eef5fe;
  border: 1px solid #ddebfd;
  line-height: 50px;
  float: left;
}
</style>
