<template>
  <div>
    <div class="counter" :class="{ hide: isHidden }">
      <div class="nums">
        <span
          v-for="(num, index) in numbers"
          :key="index"
          :class="{ in: currentNum === num, out: previousNum === num }"
        >
          {{ num }}
        </span>
      </div>
      <h4>Get Ready</h4>
    </div>

    <div class="final" :class="{ show: isFinalVisible }">
      <h1>GO</h1>
      <button @click="replay">
        <span>Replay</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const numbers = [3, 2, 1, 0];
const currentNum = ref(numbers[0]);
const previousNum = ref(null);
const isHidden = ref(false);
const isFinalVisible = ref(false);

const runAnimation = () => {
  numbers.forEach((num, idx) => {
    setTimeout(() => {
      previousNum.value = currentNum.value;
      currentNum.value = num;

      if (idx === numbers.length - 1) {
        isHidden.value = true;
        isFinalVisible.value = true;
      }
    }, idx * 1000); // 每个数字显示1秒
  });
};

const resetDOM = () => {
  isHidden.value = false;
  isFinalVisible.value = false;
  currentNum.value = numbers[0];
  previousNum.value = null;
};

const replay = () => {
  resetDOM();
  runAnimation();
};

// 在组件挂载时启动动画
onMounted(() => {
  runAnimation();
});
</script>

<style scoped>
.counter {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.counter.hide {
  transform: translate(-50%, -50%) scale(0);
  animation: hide 0.2s ease-out;
}

@keyframes hide {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    transform: translate(-50%, -50%) scale(0);
  }
}

.final {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  text-align: center;
}

.final.show {
  transform: translate(-50%, -50%) scale(1);
  animation: show 0.2s ease-out;
}

@keyframes show {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  30% {
    transform: translate(-50%, -50%) scale(1.4);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.nums {
  color: #3498db;
  font-size: 50px;
  position: relative;
  overflow: hidden;
  width: 250px;
  height: 50px;
}

.nums span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(120deg);
  transform-origin: bottom center;
}

.nums span.in {
  transform: translate(-50%, -50%) rotate(0deg);
  animation: goIn 0.5s ease-in-out;
}

.nums span.out {
  animation: goOut 0.5s ease-in-out;
}

@keyframes goIn {
  0% {
    transform: translate(-50%, -50%) rotate(120deg);
  }
  30% {
    transform: translate(-50%, -50%) rotate(-20deg);
  }
  60% {
    transform: translate(-50%, -50%) rotate(10deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}

@keyframes goOut {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  60% {
    transform: translate(-50%, -50%) rotate(20deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-120deg);
  }
}
</style>
