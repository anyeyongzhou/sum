<template>
  <div
    class="menu"
    ref="menuRef"
    @mouseenter="showBox"
    @mouseleave="hideBox"
    @mousedown="startDrag"
  >
    <div
      class="box"
      ref="boxRef"
      :style="{ display: isBoxVisible ? 'block' : 'none' }"
    >
      <a class="t1" href="http://www.17sucai.com/"></a>
      <a class="t2" href="http://www.17sucai.com/"></a>
      <a class="t3" href="http://www.17sucai.com/"></a>
      <a class="t4" href="http://www.17sucai.com/"></a>
      <a class="t5" href="http://www.17sucai.com/"></a>
      <a class="t6" href="http://www.17sucai.com/"></a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuRef = ref(null);
const boxRef = ref(null);
const isBoxVisible = ref(false);

// 鼠标位置和拖动状态
const dragState = ref({
  isDragging: false,
  startX: 0,
  startY: 0,
  startLeft: 0,
  startTop: 0,
});

const showBox = () => {
  isBoxVisible.value = true;
};

const hideBox = () => {
  isBoxVisible.value = false;
};

const startDrag = e => {
  dragState.value = {
    isDragging: true,
    startX: e.clientX,
    startY: e.clientY,
    startLeft: menuRef.value.offsetLeft,
    startTop: menuRef.value.offsetTop,
  };

  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDrag);
};

const handleDrag = e => {
  if (!dragState.value.isDragging) return;

  const dx = e.clientX - dragState.value.startX;
  const dy = e.clientY - dragState.value.startY;

  menuRef.value.style.left = `${dragState.value.startLeft + dx}px`;
  menuRef.value.style.top = `${dragState.value.startTop + dy}px`;
};

const stopDrag = () => {
  dragState.value.isDragging = false;
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);
};
</script>

<style lang="scss" scoped>
.menu {
  width: 80px !important;
  height: 80px;
  position: fixed;
  top: 340px;
  left: 360px;
  background: url("./images/menu.png") no-repeat;

  cursor: move;

  .box {
    width: 200px;
    height: 253px;
    background: url("./images/m-bg.png") no-repeat;
    position: absolute;
    top: -88px;
    left: -30px;
    display: none;

    a {
      background: url("./images/m1.png") no-repeat;
      position: absolute;

      &:hover {
        background: url("./images/m2.png") no-repeat;
      }
    }

    .t1 {
      background-position: 0px 0px;
      width: 49px;
      height: 59px;
      left: 34px;
      top: 8px;

      &:hover {
        background-position: 0px 0px;
      }
    }

    .t2 {
      background-position: 0px -80px;
      width: 49px;
      height: 52px;
      left: 104px;
      top: 24px;

      &:hover {
        background-position: 0px -80px;
      }
    }

    .t3 {
      background-position: 0px -160px;
      width: 58px;
      height: 50px;
      left: 134px;
      top: 84px;

      &:hover {
        background-position: 0px -160px;
      }
    }

    .t4 {
      background-position: 0px -240px;
      width: 54px;
      height: 49px;
      left: 126px;
      top: 154px;

      &:hover {
        background-position: 0px -240px;
      }
    }

    .t5 {
      background-position: 0px -320px;
      width: 50px;
      height: 57px;
      left: 74px;
      top: 189px;

      &:hover {
        background-position: 0px -320px;
      }
    }

    .t6 {
      background-position: 0px -400px;
      width: 50px;
      height: 54px;
      left: 3px;
      top: 185px;

      &:hover {
        background-position: 0px -400px;
      }
    }
  }
}
</style>
