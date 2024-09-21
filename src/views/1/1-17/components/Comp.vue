<template>
  <div>
    <span>{{ props.text }}</span>
    <ElButton @click="myDialog({ title: props.text })">提交（需确认）</ElButton>
  </div>
</template>

<script setup>
import { ElButton } from "element-plus";

import { useCommandComponent } from "../hooks/useCommandComponent";

import MyDialog from "./MyDialog.vue";

const myDialog = useCommandComponent(MyDialog);

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>
