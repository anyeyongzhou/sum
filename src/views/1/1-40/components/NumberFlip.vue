<template>
  <div v-if="to" :id="nodeId" class="count-to">
    <span class="num count-color"></span>
    <span class="num count-color">
      <slot name="unit"></slot>
    </span>
  </div>

  <!-- fix flip插件数字为0的时候不显示 -->
  <span v-else-if="to == 0 || !to" class="num_0 count-color">{{ 0 }}</span>
</template>

<script setup>
import uniqueId from "lodash/uniqueId";
import { nextTick, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import { Flip } from "number-flip";

const props = defineProps({
  // 翻动起始数值
  from: {
    type: [String, Number],
    default: 0,
  },
  // 最终展示数值
  to: [String, Number],
  // 数字翻动时间
  duration: {
    type: Number,
    default: 2,
  },
  color: {
    type: String,
    default: "#fff",
  },
  nodeId: {
    type: String,
    default: () => {
      // 生成随机不重复id
      return uniqueId(["countCard_"]);
    },
  },
  // flip插件的其他参数
  params: {
    type: Object,
    default: () => ({}),
  },
});
let flip = null;
const initFlip = () => {
  const numNode = document.querySelector(`#${props.nodeId} .num`);
  if (numNode && props.to) {
    numNode.innerHTML = "";
    flip = new Flip({
      ...props.params,
      node: numNode,
      from: props.from,
      to: props.to,
      duration: props.duration,
    });
  }
};
onMounted(() => {
  initFlip();
});
onUpdated(() => {
  initFlip();
});

onUnmounted(() => {
  flip = null;
});
</script>

<style lang="scss" scoped>
.count-to {
  overflow: hidden;
  height: 24px;
  text-align: center;
  width: 100%;
}

.num,
.num_0 {
  font-size: 20px;
  text-align: center;
}

.count-color {
  color: v-bind(color);
}
</style>
