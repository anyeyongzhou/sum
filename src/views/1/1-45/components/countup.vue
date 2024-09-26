<template>
  <span ref="countRef"></span>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { CountUp } from "countup.js";

const props = defineProps({
  end: {
    type: Number,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
    required: false,
  },
});
const countRef = ref(null);
let countUp;

// props.options  初始配置
// let options =  {
//     startVal: 700, //初始值
//     duration: 10, // 动画持续时间（秒）不设置动画速度最快
//     useEasing: true, // 使用缓动效果
//     useGrouping: true, // 使用分组分隔符（如1,000）
//     smartEasingThreshold: 10, //对于高于此值的大数进行平滑缓动
//     separator: ",", //分隔符逗号，
//     decimal: ".", //小数点
//   }

onMounted(() => {
  // props.end  结束值
  countUp = new CountUp(countRef.value, props.end, props.options);
  if (countUp.error) {
    console.error(countUp.error);
    return;
  }
  countUp.start();
});

watch(
  () => props.end,
  newVal => {
    if (countUp) {
      countUp.update(newVal);
    }
  }
);
</script>
