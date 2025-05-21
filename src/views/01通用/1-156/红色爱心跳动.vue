<template>
  <div class="heart">
    <div class="topLeft"></div>
    <div class="topRight"></div>
    <div class="bottom"></div>
  </div>
</template>

<script setup>
// No script needed for this simple animation component
</script>

<style lang="scss" scoped>
.heart {
  margin: 100px auto;
  width: 200px !important;
  height: 200px;
  position: relative;
  animation: shake 0.5s infinite;

  div {
    width: 100%;
    height: 100%;
    position: absolute;
    background: pink;
    animation: shadow 0.5s infinite;

    &.topLeft {
      border-radius: 100px 100px 0 0;
      transform: translate(-50px, 0) rotate(-45deg);
    }

    &.topRight {
      border-radius: 100px 100px 0 0;
      transform: translate(50px, 0) rotate(45deg);
    }

    &.bottom {
      transform: translate(0, 64px) rotate(45deg) scale(0.9, 0.9);
    }
  }
}

@keyframes shake {
  from {
    transform: scale(0.9, 0.9);
  }
  to {
    transform: scale(1.1, 1.1);
  }
}

@keyframes shadow {
  from {
    box-shadow: 0px 0px 0px pink;
  }
  to {
    box-shadow: 0px 0px 50px pink;
  }
}
</style>
