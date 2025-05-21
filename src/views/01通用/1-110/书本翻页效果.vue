<template>
  <div class="shu">
    <div class="feng"></div>
    <div class="wen">
      <h3 style="padding-top: 50px; padding-left: 40px">Life of Pi</h3>
      <p style="padding-top: 20px; padding-left: 40px; padding-right: 15px">
        He lives in Scarborough. He's a small, slim man – no more than five foot
        five. Dark hair, dark eyes. Hair greying at the temples. Can't be older
        than forty. Leaning coffee-coloured complexion. Mild fall weather, yet
        puts on a big winter parka with fur-lined hood for the walk to the
        diner.
      </p>
    </div>
  </div>
</template>

<script setup>
// Vue 3 setup 语法，这里没有需要声明的逻辑，所以可以为空
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  background-image: radial-gradient(white, black);
  display: flex;
  justify-content: center;
  align-items: center;
}

.shu {
  position: relative;
  width: 300px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.774);
  transform-style: preserve-3d;
  box-shadow: 300px 0px 30px rgb(0, 0, 0, 0.6) inset;
  transition: 1s cubic-bezier(0.79, 0.34, 0.47, 0.92);

  &:hover {
    box-shadow: 30px 0px 30px rgb(0, 0, 0, 0.6) inset;
    transform: rotate(-5deg);
  }

  &::after {
    content: "";
    position: absolute;
    height: 3px;
    width: 303px;
    left: 0px;
    bottom: -3px;
    background-image: linear-gradient(
      to right,
      rgb(71, 68, 68),
      rgba(124, 120, 120, 0.3)
    );
    border-bottom-left-radius: 5px;
  }

  &::before {
    content: "";
    position: absolute;
    width: 3px;
    height: 100%;
    right: -3px;
    top: 0px;
    background-image: linear-gradient(
      to top,
      rgb(114, 111, 111),
      rgba(90, 87, 87, 0.5)
    );
    border-top-right-radius: 3px;
  }
}

.feng {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-image: url("./bg.png");
  background-size: 100%;
  transform-origin: left;
  transition: 1s cubic-bezier(0.79, 0.34, 0.47, 0.92);
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;

  .shu:hover & {
    transform: rotateY(-140deg);
  }
}

.wen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: "fangsong";
  text-align: left;
}
</style>
