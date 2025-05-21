<template>
  <el-button @click="clickHandler" :loading="loading">
    <template v-for="(_, key, i) in slots" :key="i" #[key]>
      <slot :name="key" />
    </template>
  </el-button>
</template>

<script setup>
import { ref, useSlots } from "vue";

const props = defineProps(["onClick"]);

const loading = ref(false);
const clickHandler = async e => {
  loading.value = true;
  try {
    await props.onClick(e);
  } finally {
    loading.value = false;
  }
};
const slots = useSlots();
</script>
