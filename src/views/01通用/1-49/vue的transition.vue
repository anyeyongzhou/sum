<template>
  <button @click="show = !show">Toggle</button>
  <transition name="fade">
    <div
      v-if="show"
      style="border: 1px solid red; height: 200px; background-color: #000"
    >
      <div
        style="border: 1px solid green; height: 100px; background-color: #fff"
      >
        556
      </div>
    </div>
  </transition>
</template>
<script setup>
const show = ref(false);
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
