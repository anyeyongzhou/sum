<template>
  <div class="pop-star-root">
    <div class="score-area">
      <div class="score-item">目标分数：{{ targetScore }}</div>
      <div class="score-item">当前分数：{{ totalScore }}</div>
      <transition name="fade">
        <div v-if="showSelectScore" class="score-item select-score">
          {{ chooseBlocks.length }}块 {{ selectScore }}分
        </div>
      </transition>
    </div>
    <div
      class="board"
      :style="{ backgroundImage: `url(${bgImage})` }"
      ref="boardRef"
    >
      <transition-group name="block-fade" tag="div">
        <div
          v-for="block in flatBlocks"
          :key="block.key"
          class="block"
          :class="{ flicker: block.flicker, removing: block.removing }"
          :style="blockStyle(block)"
          @mouseover="onBlockHover(block)"
          @mouseleave="onBlockLeave"
          @click="onBlockClick(block)"
        ></div>
      </transition-group>
      <transition name="fade">
        <div v-if="showResult" class="result-mask">
          <img
            v-if="resultImg"
            :src="resultImg"
            class="result-img"
            alt="result"
          />
          <div class="result-text">{{ resultText }}</div>
          <button class="restart-btn" @click="restart">再来一局</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";

// 批量导入图片资源
const blockImages = Object.values(
  import.meta.glob("./pic/{0,1,2,3,4}.png", { eager: true, import: "default" })
);
const bgImage = new URL("./pic/background.png", import.meta.url).href;
const resultImgs = {
  win: new URL("./pic/good.png", import.meta.url).href,
  lose: new URL("./pic/clearance.png", import.meta.url).href,
};

const boardSize = 10;
const squareWidth = 50;
const baseScore = 5;
const stepScore = 10;
const targetScore = 2000;

const boardRef = ref(null);
const totalScore = ref(0);
const chooseBlocks = ref([]); // 当前选中的方块
const showSelectScore = ref(false);
const selectScore = ref(0);
const showResult = ref(false);
const resultText = ref("");
const resultImg = ref("");

// 棋盘数据结构
const board = reactive(
  Array.from({ length: boardSize }, (_, row) =>
    Array.from({ length: boardSize }, (_, col) => createBlock(row, col))
  )
);

function createBlock(row, col) {
  const type = Math.floor(Math.random() * 5);
  return {
    row,
    col,
    type, // 0~4
    key: `${row}-${col}-${Math.random()}`,
    flicker: false,
    removing: false,
  };
}

// 扁平化棋盘用于渲染
const flatBlocks = computed(() => {
  const arr = [];
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const block = board[row][col];
      if (block) arr.push(block);
    }
  }
  return arr;
});

function blockStyle(block) {
  return {
    width: squareWidth + "px",
    height: squareWidth + "px",
    left: block.col * squareWidth + "px",
    bottom: block.row * squareWidth + "px",
    backgroundImage: `url(${blockImages[block.type]})`,
    backgroundSize: "cover",
    position: "absolute",
    borderRadius: "12px",
    transition: "left 0.3s, bottom 0.3s",
    boxSizing: "border-box",
    border: block.flicker ? "3px solid #BFEFFF" : "0px solid #BFEFFF",
    transform: block.flicker ? "scale(1.05)" : "scale(0.95)",
    zIndex: block.removing ? 0 : 1,
  };
}

let flickerTimer = null;

function onBlockHover(block) {
  if (showResult.value) return;
  clearFlicker();
  chooseBlocks.value = [];
  findLinked(block, chooseBlocks.value);
  if (chooseBlocks.value.length <= 1) {
    chooseBlocks.value = [];
    return;
  }
  startFlicker();
  calcSelectScore();
}

function onBlockLeave() {
  clearFlicker();
  chooseBlocks.value = [];
  showSelectScore.value = false;
}

function onBlockClick(block) {
  if (showResult.value) return;
  if (chooseBlocks.value.length <= 1) return;
  removeBlocks();
}

function findLinked(block, arr) {
  if (!block || arr.includes(block)) return;
  arr.push(block);
  // 上下左右递归查找同色
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  for (const [dr, dc] of dirs) {
    const nr = block.row + dr;
    const nc = block.col + dc;
    if (
      nr >= 0 &&
      nr < boardSize &&
      nc >= 0 &&
      nc < boardSize &&
      board[nr][nc] &&
      board[nr][nc].type === block.type &&
      !arr.includes(board[nr][nc])
    ) {
      findLinked(board[nr][nc], arr);
    }
  }
}

function startFlicker() {
  clearFlicker();
  let num = 0;
  flickerTimer = setInterval(() => {
    chooseBlocks.value.forEach(block => {
      block.flicker = num % 2 === 0;
    });
    num++;
  }, 300);
  showSelectScore.value = true;
}

function clearFlicker() {
  if (flickerTimer) clearInterval(flickerTimer);
  flatBlocks.value.forEach(block => (block.flicker = false));
}

function calcSelectScore() {
  let score = 0;
  for (let i = 0; i < chooseBlocks.value.length; i++) {
    score += baseScore + i * stepScore;
  }
  selectScore.value = score;
  showSelectScore.value = true;
  setTimeout(() => {
    showSelectScore.value = false;
  }, 1000);
}

function removeBlocks() {
  chooseBlocks.value.forEach(block => (block.removing = true));
  setTimeout(() => {
    // 移除数据
    chooseBlocks.value.forEach(block => {
      board[block.row][block.col] = null;
    });
    // 加分
    totalScore.value += selectScore.value;
    chooseBlocks.value = [];
    clearFlicker();
    moveBlocks();
  }, 300);
}

function moveBlocks() {
  // 竖直下落
  for (let col = 0; col < boardSize; col++) {
    let pointer = 0;
    for (let row = 0; row < boardSize; row++) {
      if (board[row][col]) {
        if (row !== pointer) {
          board[pointer][col] = board[row][col];
          board[pointer][col].row = pointer;
          board[row][col] = null;
        }
        pointer++;
      }
    }
  }
  // 横向移动
  for (let col = 0; col < board[0].length; ) {
    if (!board[0][col]) {
      for (let row = 0; row < boardSize; row++) {
        board[row].splice(col, 1);
      }
      continue;
    }
    col++;
  }
  setTimeout(() => {
    checkGameOver();
  }, 350);
}

function checkGameOver() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const block = board[row][col];
      if (!block) continue;
      const arr = [];
      findLinked(block, arr);
      if (arr.length > 1) return; // 还有可消除
    }
  }
  // 游戏结束
  showResult.value = true;
  if (totalScore.value >= targetScore) {
    resultText.value = "恭喜获胜！";
    resultImg.value = resultImgs.win;
  } else {
    resultText.value = "游戏失败";
    resultImg.value = resultImgs.lose;
  }
}

function restart() {
  // 重置棋盘
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      board[row][col] = createBlock(row, col);
    }
  }
  totalScore.value = 0;
  showResult.value = false;
  resultText.value = "";
  resultImg.value = "";
  chooseBlocks.value = [];
  clearFlicker();
}

onMounted(() => {
  // 初始化时无特殊操作，数据已初始化
});
</script>

<style lang="scss" scoped>
.pop-star-root {
  width: 100% !important;
  min-height: 100vh;
  background: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .score-area {
    width: 500px;
    margin: 0 auto;
    padding-top: 30px;
    .score-item {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-size: 20px;
      position: relative;
      opacity: 1;
      &.select-score {
        color: #ffe066;
        font-weight: bold;
        opacity: 1;
        transition: opacity 2s;
      }
    }
  }
  .board {
    width: 500px;
    height: 500px;
    margin: 30px auto 0 auto;
    position: relative;
    background-size: cover;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px #0008;
  }
  .block {
    cursor: pointer;
    position: absolute;
    user-select: none;
    transition: left 0.3s, bottom 0.3s, transform 0.2s, border 0.2s;
    box-shadow: 0 2px 8px #0003;
  }
  .flicker {
    border: 3px solid #bfefff !important;
    transform: scale(1.05) !important;
    z-index: 2;
  }
  .removing {
    opacity: 0;
    transition: opacity 0.3s;
  }
  .result-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    .result-img {
      width: 180px;
      margin-bottom: 20px;
    }
    .result-text {
      color: #fff;
      font-size: 32px;
      margin-bottom: 24px;
      font-weight: bold;
      text-shadow: 0 2px 8px #000a;
    }
    .restart-btn {
      background: #ffe066;
      color: #222;
      border: none;
      border-radius: 8px;
      padding: 10px 32px;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 2px 8px #0003;
      transition: background 0.2s;
      &:hover {
        background: #ffd700;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.block-fade-enter-active,
.block-fade-leave-active {
  transition: all 0.3s;
}
.block-fade-enter-from,
.block-fade-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
</style>
