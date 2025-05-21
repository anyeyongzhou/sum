<template>
  <ElDialog v-model="dialogVisible" :title="title" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </ElDialog>
</template>

<script setup>
import { computed } from "vue";
import { ElDialog } from "element-plus";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:visible", "close"]);

const dialogVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emits("update:visible", visible);
    if (!visible) {
      emits("close");
    }
  },
});
</script>
