<template>
  <div class="container">
    <a
      v-for="(item, index) in items"
      :key="index"
      href="#"
      class="item"
      :class="`item${index + 1}`"
    >
      aurora
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </a>
  </div>
</template>

<script setup>
const items = Array.from({ length: 3 }, (_, i) => ({
  text: "aurora",
  filter: `hue-rotate(${i * 85 + 100}deg)`,
}));
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0);
  flex-wrap: wrap;
  gap: 20px;
}

.item {
  position: relative;
  margin: 50px;
  width: 300px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 35px;
  letter-spacing: 5px;
  color: aqua;
  overflow: hidden;
  -webkit-box-reflect: below 1px
    linear-gradient(transparent, rgba(6, 133, 133, 0.3));

  &:hover {
    background-color: aqua;
    box-shadow: 0 0 5px aqua, 0 0 75px aqua, 0 0 155px aqua;
    color: black;
  }

  span {
    position: absolute;
    background-image: linear-gradient(aqua, transparent);
    animation: move 1s linear infinite;
  }

  span:nth-of-type(1) {
    left: -100%;
    width: 100%;
    height: 3px;
    animation-name: shang;
  }

  span:nth-of-type(2) {
    top: -100%;
    right: 0;
    width: 3px;
    height: 100%;
    animation-name: you;
    animation-delay: 0.25s;
  }

  span:nth-of-type(3) {
    right: -100%;
    bottom: 0;
    width: 100%;
    height: 3px;
    animation-name: xia;
    animation-delay: 0.5s;
  }

  span:nth-of-type(4) {
    bottom: -100%;
    left: 0;
    width: 3px;
    height: 100%;
    animation-name: zuo;
    animation-delay: 0.75s;
  }
}

@keyframes shang {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

@keyframes you {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

@keyframes xia {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

@keyframes zuo {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}

.item1 {
  filter: hue-rotate(100deg);
}

.item2 {
  filter: hue-rotate(185deg);
}

.item3 {
  filter: hue-rotate(270deg);
}
</style>
