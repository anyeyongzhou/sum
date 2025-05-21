<template>
  <div class="home">
    <div class="container">
      <div class="box" ref="boxRef"></div>
      <el-button type="primary" @click="start">启动动画</el-button>
      <el-button type="primary" @click="pause">暂停动画</el-button>
      <el-button type="primary" @click="reverse">反向动画</el-button>
      <el-button type="primary" @click="finish">完成动画</el-button>
      <el-button type="primary" @click="cancel">取消动画</el-button>
    </div>
  </div>
</template>

<script setup>
const boxRef = ref();
let animation = null;

const start = () => {
  animation.play();
};

const pause = () => {
  animation.pause();
};

const reverse = () => {
  animation.reverse();
};

const finish = () => {
  animation.finish();
};

const cancel = () => {
  animation.cancel();
};

onMounted(async () => {
  animation = boxRef.value.animate(
    [{ transform: "translateY(0%)" }, { transform: "translateY(100%)" }],
    { duration: 3000, fill: "forwards" }
  );
  animation.pause();
});

// const boxRef = ref();
</script>

<style lang="scss" scoped>
.home {
  height: 110%;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow-y: scroll;

  .container {
    width: 60%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;

    /* 编写CSS begin */
    .box {
      width: 100px;
      height: 100px;
      border: 1px solid #f00;
    }
    /* 编写CSS end */
  }
}
</style>
