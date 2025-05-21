<template>
  <div class="game-container">
    <!-- <video class="background-video" src="/11.mp4" autoplay muted loop></video> -->
    <h1 class="game-title">北极光之夜</h1>

    <div class="game-board" ref="gameBoard">
      <div
        v-for="(block, index) in activeBlocks"
        :key="'active-' + index"
        class="block active-block"
        :style="getBlockStyle(block)"
      ></div>

      <div
        v-for="(block, pos) in fixedBlocks"
        :key="'fixed-' + pos"
        class="block fixed-block"
        :style="getFixedBlockStyle(pos, block)"
      ></div>
    </div>

    <div class="mark">分数：{{ score }}</div>
    <div class="restart-btn" @click="restartGame">再来一局</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { cloneDeep } from "lodash";

// 游戏常量
const ROW_COUNT = 18;
const COL_COUNT = 10;
const BLOCK_SIZE = 28;
const STEP = BLOCK_SIZE;
const MOVE_INTERVAL = 500;

// 游戏状态
const gameBoard = ref(null);
const activeBlocks = ref([]);
const fixedBlocks = ref({});
const score = ref(0);
const currentModel = ref({});
const currentX = ref(0);
const currentY = ref(0);
const moveInterval = ref(null);
const isGameOver = ref(false);

// 方块模型
const BLOCK_MODELS = [
  // L型
  {
    0: { row: 2, col: 0 },
    1: { row: 2, col: 1 },
    2: { row: 2, col: 2 },
    3: { row: 1, col: 2 },
  },
  // 凸型
  {
    0: { row: 1, col: 1 },
    1: { row: 0, col: 0 },
    2: { row: 1, col: 0 },
    3: { row: 2, col: 0 },
  },
  // 田型
  {
    0: { row: 1, col: 1 },
    1: { row: 2, col: 1 },
    2: { row: 1, col: 2 },
    3: { row: 2, col: 2 },
  },
  // 长条型
  {
    0: { row: 0, col: 0 },
    1: { row: 0, col: 1 },
    2: { row: 0, col: 2 },
    3: { row: 0, col: 3 },
  },
  // Z型
  {
    0: { row: 1, col: 1 },
    1: { row: 1, col: 2 },
    2: { row: 2, col: 2 },
    3: { row: 2, col: 3 },
  },
];

// 颜色数组
const COLORS = [
  "#FF1493",
  "#FF00FF",
  "#0000FF",
  "#1E90FF",
  "#00FFFF",
  "#00FF7F",
  "#00FF00",
  "#FFFF00",
  "#FF6600",
];

// 初始化游戏
const initGame = () => {
  activeBlocks.value = [];
  fixedBlocks.value = {};
  score.value = 0;
  currentX.value = 0;
  currentY.value = 0;
  isGameOver.value = false;
  createNewBlock();
};

// 创建新方块
const createNewBlock = () => {
  if (checkGameOver()) {
    endGame();
    return;
  }

  const randomModelIndex = Math.floor(Math.random() * BLOCK_MODELS.length);
  currentModel.value = cloneDeep(BLOCK_MODELS[randomModelIndex]);
  currentX.value = Math.floor(COL_COUNT / 2) - 2; // 居中显示
  currentY.value = 0;

  updateActiveBlocks();
  startAutoMove();
};

// 更新活动方块位置
const updateActiveBlocks = () => {
  activeBlocks.value = [];
  for (const key in currentModel.value) {
    const block = currentModel.value[key];
    activeBlocks.value.push({
      row: block.row + currentY.value,
      col: block.col + currentX.value,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  }
};

// 方块样式
const getBlockStyle = block => ({
  top: `${block.row * STEP}px`,
  left: `${block.col * STEP}px`,
  boxShadow: `
    inset 0 0 5px ${block.color},
    inset 0 0 10px ${block.color},
    inset 0 0 15px ${block.color}
  `,
  border: `1px solid ${block.color}`,
});

const getFixedBlockStyle = (pos, block) => ({
  top: `${block.row * STEP}px`,
  left: `${block.col * STEP}px`,
  backgroundColor: "rgb(243, 243, 243)",
});

// 键盘控制
const handleKeyDown = e => {
  if (isGameOver.value) return;

  switch (e.keyCode) {
    case 38: // 上 - 旋转
      rotateBlock();
      break;
    case 39: // 右 - 右移
      moveBlock(1, 0);
      break;
    case 40: // 下 - 加速下落
      moveBlock(0, 1);
      break;
    case 37: // 左 - 左移
      moveBlock(-1, 0);
      break;
  }
};

// 移动方块
const moveBlock = (x, y) => {
  if (
    checkCollision(currentX.value + x, currentY.value + y, currentModel.value)
  ) {
    if (y !== 0) {
      fixBlock();
    }
    return;
  }

  currentX.value += x;
  currentY.value += y;
  updateActiveBlocks();
  checkBoundary();
};

// 旋转方块
const rotateBlock = () => {
  const rotatedModel = cloneDeep(currentModel.value);

  // 旋转算法: 行=列, 列=3-行
  for (const key in rotatedModel) {
    const block = rotatedModel[key];
    const temp = block.row;
    block.row = block.col;
    block.col = 3 - temp;
  }

  if (!checkCollision(currentX.value, currentY.value, rotatedModel)) {
    currentModel.value = rotatedModel;
    updateActiveBlocks();
  }
};

// 检查碰撞
const checkCollision = (x, y, model) => {
  for (const key in model) {
    const block = model[key];
    const row = y + block.row;
    const col = x + block.col;

    // 检查边界
    if (col < 0 || col >= COL_COUNT || row >= ROW_COUNT) {
      return true;
    }

    // 检查固定方块
    if (row >= 0 && fixedBlocks.value[`${row}_${col}`]) {
      return true;
    }
  }
  return false;
};

// 检查边界
const checkBoundary = () => {
  for (const key in currentModel.value) {
    const block = currentModel.value[key];
    const col = block.col + currentX.value;

    // 左边界
    if (col < 0) {
      currentX.value++;
    }
    // 右边界
    else if (col >= COL_COUNT) {
      currentX.value--;
    }
    // 下边界
    const row = block.row + currentY.value;
    if (row >= ROW_COUNT) {
      currentY.value--;
      fixBlock();
    }
  }

  updateActiveBlocks();
};

// 固定方块
const fixBlock = () => {
  stopAutoMove();

  // 将活动方块转为固定方块
  for (const block of activeBlocks.value) {
    fixedBlocks.value[`${block.row}_${block.col}`] = {
      row: block.row,
      col: block.col,
    };
  }

  // 检查是否消除行
  checkFullLines();

  // 创建新方块
  createNewBlock();
};

// 检查是否消除行
const checkFullLines = () => {
  for (let row = 0; row < ROW_COUNT; row++) {
    let isFull = true;
    for (let col = 0; col < COL_COUNT; col++) {
      if (!fixedBlocks.value[`${row}_${col}`]) {
        isFull = false;
        break;
      }
    }

    if (isFull) {
      removeLine(row);
      score.value++;
    }
  }
};

// 消除行
const removeLine = line => {
  // 移除该行所有方块
  for (let col = 0; col < COL_COUNT; col++) {
    delete fixedBlocks.value[`${line}_${col}`];
  }

  // 上方方块下落
  for (let row = line - 1; row >= 0; row--) {
    for (let col = 0; col < COL_COUNT; col++) {
      if (fixedBlocks.value[`${row}_${col}`]) {
        fixedBlocks.value[`${row + 1}_${col}`] = {
          row: row + 1,
          col: col,
        };
        delete fixedBlocks.value[`${row}_${col}`];
      }
    }
  }
};

// 自动下落
const startAutoMove = () => {
  stopAutoMove();
  moveInterval.value = setInterval(() => {
    moveBlock(0, 1);
  }, MOVE_INTERVAL);
};

const stopAutoMove = () => {
  if (moveInterval.value) {
    clearInterval(moveInterval.value);
    moveInterval.value = null;
  }
};

// 检查游戏结束
const checkGameOver = () => {
  for (let col = 0; col < COL_COUNT; col++) {
    if (fixedBlocks.value[`0_${col}`]) {
      return true;
    }
  }
  return false;
};

// 结束游戏
const endGame = () => {
  stopAutoMove();
  isGameOver.value = true;
  alert(`游戏结束! 分数为：${score.value}。`);
};

// 重新开始游戏
const restartGame = () => {
  initGame();
};

// 生命周期钩子
onMounted(() => {
  initGame();
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  stopAutoMove();
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped>
.game-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-video {
  position: fixed;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.game-title {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px;
  font-family: "fangsong";
  color: rgb(1, 175, 255);
  text-shadow: 0 0 10px rgb(1, 175, 255), 0 0 15px rgb(1, 175, 255),
    0 0 20px rgb(1, 175, 255);
  z-index: -1;
}

.game-board {
  position: relative;
  width: 280px;
  height: 504px;
  box-shadow: 0 0 5px rgb(218, 218, 218), 0 0 10px rgb(151, 151, 151);
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.2);
}

.block {
  position: absolute;
  width: 28px;
  height: 28px;
}

.active-block {
  /* 活动方块样式 */
}

.fixed-block {
  background-color: rgb(243, 243, 243);
}

.mark {
  font-family: "fangsong";
  position: absolute;
  height: 50px;
  width: 150px;
  bottom: 50px;
  right: -150px;
  text-align: center;
  color: rgb(197, 197, 197);
  line-height: 50px;
  font-size: 25px;
  user-select: none;
}

.restart-btn {
  font-family: "fangsong";
  position: absolute;
  height: 30px;
  width: 100px;
  right: -125px;
  bottom: 10px;
  line-height: 30px;
  text-align: center;
  box-shadow: inset 0 0 10px white;
  color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 5px;
  user-select: none;
}

.restart-btn:hover {
  background-color: rgb(21, 168, 29);
}
</style>
