<template>
  <div class="streamer-button">
    <a
      href="#"
      @click.prevent="handleClick"
      :style="{
        width: width + 'px',
        height: height + 'px',
        lineHeight: height + 'px',
        fontSize: fontSize + 'px',
        borderRadius: borderRadius + 'px',
      }"
    >
      {{ text }}
    </a>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "submitbutton",
  },
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 100,
  },
  fontSize: {
    type: Number,
    default: 24,
  },
  borderRadius: {
    type: Number,
    default: 50,
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>

<style lang="scss" scoped>
.streamer-button {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;

  a {
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    background-image: linear-gradient(
      to right,
      #03a9f4,
      #f441a5,
      #ffeb3b,
      #09a8f4
    );
    background-size: 400%;
    position: relative;
    z-index: 1;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      background-image: linear-gradient(
        to right,
        #03a9f4,
        #f441a5,
        #ffeb3b,
        #09a8f4
      );
      background-size: 400%;
      filter: blur(20px);
      z-index: -1;
      border-radius: inherit;
      width: 100%;
      height: 100%;
    }

    &:hover,
    &:hover::before {
      animation: bright 7s infinite alternate;
    }
  }
}

@keyframes bright {
  100% {
    background-position: -400% 0;
  }
}
</style>
