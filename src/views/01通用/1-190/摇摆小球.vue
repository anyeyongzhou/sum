<template>
  <div class="swinging-ball">
    <div class="container">
      <div class="loader">
        <div class="ball"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无需额外的逻辑
</script>

<style lang="scss" scoped>
.swinging-ball {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1f2f;

  .container {
    width: 200px;
    height: 200px;
    -webkit-box-reflect: below 5px -webkit-linear-gradient(transparent 10%, rgba(0, 0, 0, 0.5));
  }

  .loader {
    position: relative;
    width: 160px;
    height: 160px;
    border: 20px solid transparent;
    border-bottom-color: #06c8f0;
    border-right-color: #06c8f0;
    border-radius: 50%;
    transform: rotate(45deg);
    animation: move 3s ease-in-out infinite alternate;
  }

  .ball {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    animation: ballMove 3s ease-in-out infinite alternate;

    &::before {
      content: "";
      width: 30px;
      height: 30px;
      position: absolute;
      left: 20px;
      bottom: 20px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}

@keyframes move {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(90deg);
  }
}

@keyframes ballMove {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-180deg);
  }
}
</style>
