<template>
  <div class="svg-text-container">
    <svg width="500" height="200">
      <defs>
        <linearGradient id="yanse">
          <stop offset="33%" stop-color="#00BFFF">
            <animate
              attributeName="stop-color"
              from="#00BFFF"
              to="#FF8C00"
              dur="5s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="66%" stop-color="#00FFFF"></stop>
          <stop offset="100%" stop-color="#00FA9A">
            <animate
              attributeName="stop-color"
              from="#00FA9A"
              to="#FF00FF"
              dur="5s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
      <text x="30" y="120" class="txt">{{ text }}</text>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "北极光之夜。",
  },
});
</script>

<style lang="scss" scoped>
.svg-text-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(30, 49, 71);

  .txt {
    font-family: "fangsong";
    font-weight: 900;
    font-size: 80px;
    letter-spacing: 3px;
    fill: transparent;
    stroke: url("#yanse");
    stroke-width: 1.5px;
    stroke-dasharray: 625;
    stroke-dashoffset: 625;
    animation: draw 5s linear infinite;
  }
}

@keyframes draw {
  0%,
  5% {
    stroke-dasharray: 625;
    stroke-dashoffset: 625;
  }
  40%,
  60% {
    stroke-dasharray: 625;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 625;
    stroke-dashoffset: 625;
  }
}
</style>
