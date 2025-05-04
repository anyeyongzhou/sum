<template>
  <div class="container">
    <a href="#" class="guang">button</a>
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

.guang {
  position: relative;
  display: inline-block;
  width: 220px;
  height: 80px;
  color: white;
  line-height: 80px;
  font-size: 35px;
  font-family: sans-serif;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  border-radius: 30px;
  background: linear-gradient(
    90deg,
    rgb(39, 122, 218),
    rgb(74, 230, 121),
    rgb(201, 214, 13),
    rgb(226, 20, 233),
    rgb(16, 172, 219)
  );
  background-size: 400%;
  z-index: 1;
  text-shadow: 0 0 5px white, 0 0 5px white;

  &:hover {
    animation: move 5s linear alternate infinite;
  }

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    width: 240px;
    height: 100px;
    background: linear-gradient(
      90deg,
      rgb(39, 122, 218),
      rgb(74, 230, 121),
      rgb(243, 169, 10),
      rgb(226, 20, 233),
      rgb(16, 172, 219)
    );
    background-size: 400%;
    opacity: 0;
    z-index: -1;
    border-radius: 45px;
    transition: 0.6s;
  }

  &:hover::before {
    filter: blur(15px);
    opacity: 1;
    animation: move 8s linear alternate infinite;
  }
}

@keyframes move {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
}
</style>
