<template>
  <div class="grade-warp">
    <div v-for="(item, index) in ratingItems" :key="index" class="user-level">
      <div class="ratings-title">
        <span class="txt-classify">{{ item.title }}</span> - {{ item.question }}
        <span class="score-desc">{{ item.description }}</span>
      </div>

      <div class="ratings-bar">
        <span class="input-container">{{ scores[index] }}</span>
        <span class="bars">0</span>
        <div class="scale" ref="scaleRefs">
          <div
            class="progress-line"
            :style="{ width: progressWidths[index] + 'px' }"
          ></div>
          <span
            class="btn"
            :style="{ left: btnPositions[index] + 'px' }"
            @mousedown="handleMouseDown($event, index)"
          ></span>
        </div>
        <span class="bars">10</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 评分项数据
const ratingItems = [
  {
    title: "功能",
    question: "你觉得这个创意在功能上优秀吗？",
    description: "分数越高表示越优秀。",
  },
  {
    title: "外观",
    question: "你觉得这个创意在外观上优秀吗？",
    description: "分数越高表示越优秀。",
  },
  {
    title: "成本",
    question: "你觉得这个创意在成本上优秀吗？",
    description: "分数越高表示越优秀。",
  },
  {
    title: "难度",
    question: "你觉得这个创意在难度上可行吗？",
    description: "分数越高表示越可行。",
  },
  {
    title: "环保",
    question: "你觉得这个创意在环保上优秀吗？",
    description: "分数越高表示越优秀。",
  },
];

// 评分数据
const scores = ref(new Array(ratingItems.length).fill(0));
const progressWidths = ref(new Array(ratingItems.length).fill(0));
const btnPositions = ref(new Array(ratingItems.length).fill(0));
const scaleRefs = ref([]);

// 当前操作的评分项索引
let currentIndex = -1;
// 鼠标按下时的初始位置
let startX = 0;
// 按钮初始位置
let startLeft = 0;
// 最大可移动距离
let maxWidth = 0;

// 处理鼠标按下事件
const handleMouseDown = (e, index) => {
  currentIndex = index;
  startX = e.clientX;
  const scale = scaleRefs.value[index];
  const btn = scale.querySelector(".btn");
  startLeft = btn.offsetLeft;
  maxWidth = scale.offsetWidth - btn.offsetWidth;

  // 添加全局鼠标事件监听
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  // 清除文本选择
  window.getSelection
    ? window.getSelection().removeAllRanges()
    : window.selection.empty();
};

// 处理鼠标移动事件
const handleMouseMove = e => {
  if (currentIndex === -1) return;

  const moveX = e.clientX - startX;
  const newLeft = Math.min(maxWidth, Math.max(0, startLeft + moveX));

  // 更新按钮位置和进度条宽度
  btnPositions.value[currentIndex] = newLeft;
  progressWidths.value[currentIndex] = newLeft;

  // 计算并更新分数
  const score = Math.round((newLeft / maxWidth) * 10);
  scores.value[currentIndex] = score;
};

// 处理鼠标松开事件
const handleMouseUp = () => {
  currentIndex = -1;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};

// 组件卸载时清理事件监听
onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});
</script>

<style scoped>
.grade-warp {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.user-level {
  margin-bottom: 30px;
}

.ratings-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
}

.txt-classify {
  color: #ff6700;
  font-weight: bold;
}

.score-desc {
  font-size: 14px;
  color: #999;
  margin-left: 10px;
}

.ratings-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-container {
  width: 30px;
  text-align: center;
  font-size: 16px;
  color: #ff6700;
}

.bars {
  color: #999;
  font-size: 14px;
}

.scale {
  flex: 1;
  height: 4px;
  background-color: #eee;
  position: relative;
  border-radius: 2px;
}

.progress-line {
  height: 100%;
  background-color: #ff6700;
  border-radius: 2px;
  transition: width 0.1s;
}

.btn {
  position: absolute;
  top: 50%;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid #ff6700;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: left 0.1s;
}

.btn:hover {
  box-shadow: 0 0 5px rgba(255, 103, 0, 0.3);
}
</style>
