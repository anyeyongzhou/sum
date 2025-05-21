<template>
  <div class="star-score">
    <div class="container">
      <h2>星级评分</h2>
      <div class="stars">
        <div
          v-for="(star, index) in stars"
          :key="index"
          class="star"
          :class="{
            hover: hoverIndex >= index,
            checked: modelValue > index,
          }"
          @mouseover="handleMouseOver(index)"
          @mouseout="handleMouseOut"
          @click="handleClick(index)"
        >
          <i class="fas fa-star"></i>
        </div>
      </div>
      <div class="score-text" v-if="showScore">
        当前评分：{{ modelValue + 1 }}星
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: -1,
  },
  showScore: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const stars = Array(5).fill(null);
const hoverIndex = ref(-1);

const handleMouseOver = index => {
  hoverIndex.value = index;
};

const handleMouseOut = () => {
  hoverIndex.value = -1;
};

const handleClick = index => {
  // 如果点击的是当前选中的星星，则取消选中
  if (index === props.modelValue) {
    emit("update:modelValue", -1);
  } else {
    emit("update:modelValue", index);
  }
};
</script>

<style lang="scss" scoped>
@import "https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/all.css";

.star-score {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #222;

  .container {
    width: 600px;
    border: 1px solid #444;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    padding: 20px;

    h2 {
      letter-spacing: 9px;
      color: #eee;
      margin-bottom: 20px;
    }

    .stars {
      display: flex;
      gap: 10px;

      .star {
        cursor: pointer;
        padding: 6px;
        transition: all 0.3s ease;

        i {
          font-size: 40px;
          color: #eee;
          transition: all 0.3s ease;
        }

        &:hover i,
        &.hover i,
        &.checked i {
          color: gold;
          transform: scale(1.1);
        }
      }
    }

    .score-text {
      margin-top: 20px;
      color: #eee;
      font-size: 16px;
    }
  }
}
</style>
