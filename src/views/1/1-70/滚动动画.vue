<template>
  <div class="container">
    <div class="box-container" ref="boxsRef">
      <div
        v-for="(box, index) in boxes"
        :key="index"
        :class="['box', { show: box.isVisible }]"
      >
        Box {{ index + 1 }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from "vue";

const boxsRef = ref(null);

// 创建响应式的数组来控制每个方块的显示状态
const boxes = ref(
  new Array(10).fill(false).map(() => ({ isVisible: false })) // 生成10个盒子，初始状态为不可见
);

const checkBoxes = () => {
  const triggerBottom = (window.innerHeight / 5) * 4;

  // 遍历boxes数组，检查每个方块的可视状态
  boxes.value.forEach((box, index) => {
    const boxElement = document.querySelectorAll(".box")[index];
    const boxTop = boxElement.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.isVisible = true;
    } else {
      box.isVisible = false;
    }
  });
};

onMounted(() => {
  // 监听滚动事件
  boxsRef.value.addEventListener("scroll", checkBoxes);

  // 初始化状态，页面加载时调用一次checkBoxes
  checkBoxes();
});

onUpdated(() => {
  // 如果页面更新时重新调用checkBoxes，确保状态同步
  checkBoxes();
});
</script>

<style scoped lang="scss">
.container {
  border: 1px solid green;
  .box-container {
    width: 500px;
    height: 500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    border: 1px solid red;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .box {
    background-color: steelblue;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 200px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
    transform: translateX(400%);
    transition: transform 0.4s ease;
  }

  .box:nth-of-type(even) {
    transform: translateX(-400%);
  }

  /* 添加 show 类时的样式，实现方块滑入效果 */
  .box.show {
    transform: translateX(0);
  }
}
</style>
