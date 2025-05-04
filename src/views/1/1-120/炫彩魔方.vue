<template>
  <div class="container">
    <div class="world">
      <div class="cube">
        <div class="cube__front"></div>
        <div class="cube__right"></div>
        <div class="cube__left"></div>
        <div class="cube__back"></div>
        <div class="cube__top"></div>
        <div class="cube__bottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue 3 setup 语法，这里没有需要声明的逻辑，所以可以为空
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  // flex-wrap: nowrap;
  // flex-direction: row;
  justify-content: center;
  align-items: center;
}

.world {
  perspective: 800px;
  width: 100vh;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.cube {
  transform-style: preserve-3d;
  backface-visibility: hidden;
  width: 50vh;
  height: 50vh;
  position: relative;
  animation: rotator 4.5s linear infinite;
  outline: 0;

  & * {
    background: #000;
    box-shadow: 0 0 3vh currentColor;
    transition: background 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  }

  &:hover * {
    background: currentColor;
    box-shadow: 0 0 20vh currentColor;
  }

  &__front {
    color: deeppink;
    transform: translateZ(25vh);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__right {
    color: lightcoral;
    transform: rotateY(90deg) translateZ(25vh);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__left {
    color: skyblue;
    transform: rotateY(270deg) translateZ(25vh);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__back {
    color: seagreen;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotateY(180deg) translateZ(25vh);
  }

  &__top {
    color: mediumseagreen;
    transform: rotateX(90deg) translateZ(25vh);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__bottom {
    color: dodgerblue;
    transform: rotateX(270deg) translateZ(25vh);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

@keyframes rotator {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
</style>
