<template>
  <label class="button">
    <input type="checkbox" v-model="isChecked" />
    <span class="hole">
      <span class="switch">
        <span class="one"></span>
        <span class="two"></span>
      </span>
    </span>
  </label>
</template>

<script setup>
import { ref } from "vue";

const isChecked = ref(true);
</script>

<style scoped>
.button {
  display: block;
  width: 180px !important;
  height: 230px;
  margin: 200px auto;
  cursor: pointer;
  position: relative;
  border-radius: 6px;
  background-image: linear-gradient(#464a54, #2c2225);
  box-shadow: 0 -5px 0px #464649, 0 4px 20px rgba(0, 0, 0, 0.5),
    0 2px 1px #66696e inset, 4px 0 0 rgba(0, 0, 0, 0.1) inset,
    -4px 0 0 rgba(0, 0, 0, 0.1) inset, 0 -8px 2px rgba(0, 0, 0, 0.1) inset;
}

.button input {
  display: none;
}

.button .hole {
  width: 140px;
  height: 186px;
  background-color: #090909;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 -2px 1px rgba(255, 255, 255, 0.25) inset,
    0 2px 1px rgba(255, 255, 255, 0.2) inset;
}

.button .switch {
  width: 132px;
  height: 174px;
  position: absolute;
  top: 6px;
  left: 4px;
  background-image: linear-gradient(#882626, #290606);
  border-radius: 8px;
  box-shadow: 2px 0 1px rgba(255, 255, 255, 0.1) inset,
    -2px 0 1px rgba(255, 255, 255, 0.1) inset,
    0 -2px 2px rgba(255, 255, 255, 0.05) inset,
    0 4px 2px rgba(0, 0, 0, 0.05) inset, 0 -30px 8px rgba(198, 45, 45, 0.5),
    0 -25px 8px rgba(198, 45, 45, 0.3), 0 -20px 8px rgba(198, 45, 45, 0.4),
    0 -15px 8px rgba(198, 45, 45, 0.5), 0 -10px 8px rgba(198, 45, 45, 0.6),
    0 -5px 8px rgba(198, 45, 45, 0.9);
  transform: perspective(1500px) rotateX(-30deg) translateY(16px);
  transition: transform 200ms;
}

.button .switch::before {
  content: "";
  width: 122px;
  height: 5px;
  position: absolute;
  top: -2px;
  left: 5px;
  background-image: radial-gradient(rgba(255, 255, 255, 0.4), transparent 80%);
}

.button .switch .one {
  width: 6px;
  height: 40px;
  position: absolute;
  top: 24px;
  left: calc(50% - 3px);
  background-image: linear-gradient(#ccc, #999);
  border-radius: 4px;
  box-shadow: 0 2px 1px white inset;
}

.button .switch .two {
  width: 32px;
  height: 40px;
  position: absolute;
  bottom: 24px;
  left: calc(50% - 16px);
  box-shadow: 0 4px 2px rgba(255, 255, 255, 0.5) inset,
    0 -4px 2px rgba(0, 0, 0, 0.2) inset, 0 0 0 6px #666 inset;
  border-radius: 50%;
}

.button input:checked ~ .hole .switch {
  background-image: radial-gradient(
      rgba(254, 244, 0, 0.5),
      rgba(254, 244, 0, 0.2) 30%,
      rgba(254, 244, 0, 0) 50%,
      transparent 80%
    ),
    linear-gradient(#b43222, #a51810 100%);
  box-shadow: 4px 0 1px rgba(255, 255, 255, 0.15) inset,
    -4px 0 1px rgba(255, 255, 255, 0.15) inset,
    0 4px 1px rgba(255, 255, 255, 0.15) inset,
    0 -12px 8px rgba(0, 0, 0, 0.25) inset, 0 30px 8px rgba(128, 17, 5, 0.5),
    0 25px 8px rgba(128, 17, 5, 0.3), 0 20px 8px rgba(128, 17, 5, 0.4),
    0 15px 8px rgba(128, 17, 5, 0.5), 0 10px 8px rgba(128, 17, 5, 0.6),
    0 5px 8px rgba(128, 17, 5, 0.9);
  transform: perspective(1500px) rotateX(30deg) translateY(-16px);
}

.button input:checked ~ .hole .switch::before {
  top: auto;
  bottom: -2px;
}

.button input:checked ~ .hole .switch::after {
  content: "";
  width: 96px;
  height: 16px;
  position: absolute;
  bottom: -24px;
  left: calc(50% - 48px);
  background-image: radial-gradient(
    #fef400,
    rgba(254, 244, 0, 0.3) 60%,
    transparent 100%
  );
  filter: blur(8px);
}
</style>
