<template>
  <div class="container">
    <div id="wrap">
      <div
        v-for="(item, index) in balloons"
        :key="index"
        class="balloon"
        :class="`balloon-${index + 1}`"
      >
        <h2>{{ item.text }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
const balloons = [
  {
    text: "！",
    color: "rgba(182, 15, 97, 0.7)",
    shadow: "rgba(135, 11, 72, 0.7)",
    animation: "rise 2s forwards, fly1 6s 2s ease-in-out infinite",
  },
  {
    text: "恭",
    color: "rgba(45, 181, 167, 0.7)",
    shadow: "rgba(35, 140, 129, 0.7)",
    animation: "rise 3s forwards, fly4 6s 3s ease-in-out infinite",
  },
  {
    text: "喜",
    color: "rgba(190, 61, 244, 0.7)",
    shadow: "rgba(173, 14, 240, 0.7)",
    animation: "rise 1s forwards, fly1 5s 1s ease-in-out infinite",
  },
  {
    text: "发",
    color: "rgba(180, 224, 67, 0.7)",
    shadow: "rgba(158, 206, 34, 0.7)",
    animation: "rise 2s forwards, fly3 5s 2s ease-in-out infinite",
  },
  {
    text: "财",
    color: "rgba(242, 194, 58, 0.7)",
    shadow: "rgba(234, 177, 15, 0.7)",
    animation: "rise 4s forwards, fly2 4s 4s ease-in-out infinite",
  },
  {
    text: "！",
    color: "rgba(242, 112, 45, 0.7)",
    shadow: "rgba(222, 85, 14, 0.7)",
    animation: "rise 3s forwards, fly2 6s 5s ease-in-out infinite",
  },
];
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 10%;
  margin: 0;
  background: #dfd3c3 url("./images/bg.svg");
}

#wrap {
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.balloon {
  width: 140px;
  height: 140px;
  background: green;
  border-radius: 70px 70px 0 70px;
  transform: rotate(45deg) translate(100vh, 100vh);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    color: #fff;
    font-size: 50px;
    transform: rotate(-45deg);
  }

  &:before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    bottom: -10px;
    right: -10px;
    transform: rotate(45deg);
    border: 20px solid;
    border-color: transparent #000 transparent transparent;
  }
}

.balloon-1 {
  background: rgba(182, 15, 97, 0.7);
  box-shadow: inset 10px 10px 10px rgba(135, 11, 72, 0.7);
  animation: rise 2s forwards, fly1 6s 2s ease-in-out infinite;

  &:before {
    border-color: transparent rgba(182, 15, 97, 0.7) transparent transparent;
  }
}

.balloon-2 {
  background: rgba(45, 181, 167, 0.7);
  box-shadow: inset 10px 10px 10px rgba(35, 140, 129, 0.7);
  animation: rise 3s forwards, fly4 6s 3s ease-in-out infinite;

  &:before {
    border-color: transparent rgba(45, 181, 167, 0.7) transparent transparent;
  }
}

.balloon-3 {
  background: rgba(190, 61, 244, 0.7);
  box-shadow: inset 10px 10px 10px rgba(173, 14, 240, 0.7);
  animation: rise 1s forwards, fly1 5s 1s ease-in-out infinite;

  &:before {
    border-color: transparent rgba(190, 61, 244, 0.7) transparent transparent;
  }
}

.balloon-4 {
  background: rgba(180, 224, 67, 0.7);
  box-shadow: inset 10px 10px 10px rgba(158, 206, 34, 0.7);
  animation: rise 2s forwards, fly3 5s 2s ease-in-out infinite;

  &:before {
    border-color: transparent rgba(180, 224, 67, 0.7) transparent transparent;
  }
}

.balloon-5 {
  background: rgba(242, 194, 58, 0.7);
  box-shadow: inset 10px 10px 10px rgba(234, 177, 15, 0.7);
  animation: rise 4s forwards, fly2 4s 4s ease-in-out infinite;

  &:before {
    border-color: transparent rgba(242, 194, 58, 0.7) transparent transparent;
  }
}

.balloon-6 {
  background: rgba(242, 112, 45, 0.7);
  box-shadow: inset 10px 10px 10px rgba(222, 85, 14, 0.7);
  animation: rise 3s forwards, fly2 6s 5s ease-in-out infinite;

  &:before {
    border-color: transparent rgba(242, 112, 45, 0.7) transparent transparent;
  }
}

@keyframes rise {
  100% {
    transform: rotate(45deg) translate(0, 0);
  }
}

@keyframes fly1 {
  0%,
  100% {
    transform: rotate(45deg) translateY(0);
  }
  50% {
    transform: rotate(53deg) translateY(-20px);
  }
}

@keyframes fly2 {
  0%,
  100% {
    transform: rotate(45deg) translateY(0);
  }
  50% {
    transform: rotate(37deg) translateY(-30px);
  }
}

@keyframes fly3 {
  0%,
  100% {
    transform: rotate(45deg) translateY(0);
  }
  50% {
    transform: rotate(37deg) translate(-20px, -30px);
  }
}

@keyframes fly4 {
  0%,
  100% {
    transform: rotate(45deg) translateY(0);
  }
  50% {
    transform: rotate(55deg) translate(-15px, -10px);
  }
}
</style>
