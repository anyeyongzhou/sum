<template>
  <div class="pager">
    <a :class="{ disabled: currentPage === 1 }" @click="goToPage(1)"> 首页 </a>
    <a
      :class="{ disabled: currentPage === 1 }"
      @click="goToPage(currentPage - 1)"
    >
      上一页
    </a>

    <a
      v-for="i in visiblePages"
      :key="i"
      :class="{ active: currentPage === i }"
      @click="goToPage(i)"
    >
      {{ i }}
    </a>

    <a
      :class="{ disabled: currentPage === pageNumber }"
      @click="goToPage(currentPage + 1)"
    >
      下一页
    </a>
    <a
      :class="{ disabled: currentPage === pageNumber }"
      @click="goToPage(pageNumber)"
    >
      尾页
    </a>

    <span>{{ currentPage }} / {{ pageNumber }}</span>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: Number, default: 1 }, // 双向绑定页码
  pageNumber: { type: Number, required: true },
  mostNumber: { type: Number, default: 10 },
});
const emit = defineEmits(["update:modelValue", "change"]);

const currentPage = ref(props.modelValue);

watch(
  () => props.modelValue,
  val => {
    currentPage.value = val;
  }
);

function goToPage(page) {
  if (page < 1 || page > props.pageNumber || page === currentPage.value) return;
  currentPage.value = page;
  emit("update:modelValue", page);
  emit("change", page);
}

// 计算要显示的中间页码列表
const visiblePages = computed(() => {
  let min = Math.floor(currentPage.value - props.mostNumber / 2);
  if (min < 1) min = 1;
  let max = min + props.mostNumber - 1;
  if (max > props.pageNumber) {
    max = props.pageNumber;
    min = Math.max(1, max - props.mostNumber + 1);
  }
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
});
</script>

<style lang="scss" scoped>
.pager {
  text-align: center;
  a {
    border: 1px solid #e1e2e3;
    color: #001ac4;
    height: 34px;
    display: inline-block;
    line-height: 34px;
    padding: 0 12px;
    margin: 8px;
    cursor: pointer;

    &.active {
      border: none;
      color: #f40;
      cursor: auto;
    }

    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
  span {
    margin-left: 12px;
  }
}
</style>
