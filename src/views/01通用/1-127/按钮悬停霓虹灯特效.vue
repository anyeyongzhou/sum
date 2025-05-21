<template>
  <div class="button-container">
    <button
      v-for="n in 3"
      :key="n"
      class="styled-button"
      :class="`button-${n}`"
    >
      button
    </button>
  </div>
</template>

<script setup>
// Vue 3 setup 语法，这里没有需要声明的逻辑，所以可以为空
</script>

<style lang="scss" scoped>
.button-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}

.styled-button {
  padding: 10px 30px;
  margin: 0 30px;
  position: relative;
  color: #21ebff;
  font-size: 20px;
  text-transform: uppercase;
  outline: none;
  border: none;
  background: none;
  transition: 0.5s;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0003);

  &:nth-child(1) {
    filter: hue-rotate(115deg);
  }

  &:nth-child(3) {
    filter: hue-rotate(270deg);
  }

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -1px;
    width: 10px;
    height: 10px;
    border-top: 2px solid #21ebff;
    border-left: 2px solid #21ebff;
    transition: 0.5s;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    right: -1px;
    width: 10px;
    height: 10px;
    border-right: 2px solid #21ebff;
    border-bottom: 2px solid #21ebff;
    transition: 0.5s;
  }

  &:hover {
    background: #21ebff;
    color: #111;
    box-shadow: 0 0 50px #21ebff;
    transition-delay: 0.5s;

    &::before {
      width: 100%;
      height: 100%;
    }

    &::after {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
