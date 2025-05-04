<template>
  <div class="container">
    <div class="galaxy">
      <div v-for="n in 4" :key="n" class="orbit" :class="`orbit-${n}`">
        <div class="particle"></div>
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
  background: radial-gradient(
    ellipse at center,
    #34679a 0%,
    #214163 50%,
    #0d1926 100%
  );
}

.galaxy {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px #fff solid;
  border-radius: 50%;
  transform-style: preserve-3d;
  transform: rotateX(80deg) rotateY(20deg);
}

.orbit {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: trail 1s infinite linear;

  &.orbit-1 {
    transform: rotateX(80deg) rotateY(20deg);
  }
  &.orbit-2 {
    transform: rotateX(-80deg) rotateY(20deg);
    animation-delay: -0.5s;
  }
  &.orbit-3 {
    transform: rotateX(-70deg) rotateY(60deg);
    animation-delay: -1s;
  }
  &.orbit-4 {
    transform: rotateX(70deg) rotateY(60deg);
    animation-delay: -1.5s;
  }
}

.particle {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #fff;
  top: -5px;
  left: 50%;
  margin-left: -5px;
  border-radius: 50%;
  box-shadow: 0 0 12px #fff;
  animation: particle 1s infinite linear;
}

@keyframes trail {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}

@keyframes particle {
  from {
    transform: rotateX(90deg) rotateY(0deg);
  }
  to {
    transform: rotateX(90deg) rotateY(-360deg);
  }
}

.galaxy::after {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  background: #fff;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -20px;
  border-radius: 50%;
  transform: rotateX(80deg);
  animation: nucleus 2s infinite linear;
}

@keyframes nucleus {
  0% {
    box-shadow: 0 0 0 transparent;
  }
  50% {
    box-shadow: 0 0 25px #fff;
  }
  100% {
    box-shadow: 0 0 0 transparent;
  }
}
</style>
