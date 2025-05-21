<template>
  <div class="sokoban">
    <div class="game" ref="gameRef" :style="gameStyle">
      <div v-for="(row, y) in gameMap" :key="y" class="row">
        <div
          v-for="(cell, x) in row"
          :key="x"
          class="cell"
          :class="{
            'is-correct': cell === 0 && isCorrect(x, y),
            'is-player': cell === 1,
            'is-wall': cell === 2,
            'is-box': cell === 3,
            'is-box-correct': cell === 3 && isCorrect(x, y),
          }"
          :style="getCellStyle(x, y)"
        ></div>
      </div>
    </div>
    <div class="win" v-if="isGameWin">
      <p>成功过关！</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import playerImg from "./imgs/player.png";
import wallImg from "./imgs/wall.jpg";
import boxImg from "./imgs/box.png";
import overBoxImg from "./imgs/over_box.png";

const BLOCK_LEN = 45;
const gameRef = ref(null);
const isGameWin = ref(false);

// 游戏地图数据
const gameMap = ref([
  [0, 0, 2, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 0, 1, 0, 2, 0, 0],
  [0, 0, 2, 0, 3, 0, 2, 0, 0],
  [2, 2, 2, 0, 0, 0, 2, 2, 2],
  [2, 0, 0, 0, 3, 0, 0, 0, 2],
  [2, 0, 3, 3, 3, 3, 3, 0, 2],
  [2, 0, 0, 0, 3, 0, 0, 0, 2],
  [2, 2, 2, 3, 3, 3, 2, 2, 2],
  [0, 0, 2, 0, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 3, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 0, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0],
]);

// 玩家位置
const player = ref({
  x: 4,
  y: 1,
});

// 正确位置
const correct = [
  { x: 4, y: 3 },
  { x: 4, y: 4 },
  { x: 2, y: 5 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
  { x: 5, y: 5 },
  { x: 6, y: 5 },
  { x: 4, y: 6 },
  { x: 4, y: 7 },
  { x: 4, y: 8 },
  { x: 4, y: 9 },
  { x: 4, y: 10 },
];

// 计算游戏容器样式
const gameStyle = computed(() => ({
  height: gameMap.value.length * BLOCK_LEN + "px",
  width: gameMap.value[0].length * BLOCK_LEN + "px",
}));

// 判断位置是否正确
const isCorrect = (x, y) => {
  return correct.find(item => item.x === x && item.y === y) !== undefined;
};

// 获取单元格样式
const getCellStyle = (x, y) => {
  const cell = gameMap.value[y][x];
  let backgroundImage = "";

  if (cell === 1) {
    backgroundImage = `url(${playerImg})`;
  } else if (cell === 2) {
    backgroundImage = `url(${wallImg})`;
  } else if (cell === 3) {
    backgroundImage = isCorrect(x, y) ? `url(${overBoxImg})` : `url(${boxImg})`;
  }

  return {
    width: BLOCK_LEN + "px",
    height: BLOCK_LEN + "px",
    left: x * BLOCK_LEN + "px",
    top: y * BLOCK_LEN + "px",
    backgroundImage: backgroundImage || "none",
  };
};

// 获取新目标位置
const getNewTarget = (direction, initX, initY) => {
  let x = initX,
    y = initY;
  switch (direction) {
    case "left":
      x--;
      break;
    case "right":
      x++;
      break;
    case "up":
      y--;
      break;
    case "down":
      y++;
      break;
  }
  return { x, y };
};

// 移动箱子
const moveBox = (direction, boxX, boxY) => {
  const { x, y } = getNewTarget(direction, boxX, boxY);
  const target = gameMap.value[y][x];

  if (target === 0) {
    gameMap.value[y][x] = 3;
    gameMap.value[boxY][boxX] = 1;
    gameMap.value[player.value.y][player.value.x] = 0;
    player.value.x = boxX;
    player.value.y = boxY;
    return true;
  }
  return false;
};

// 移动玩家
const move = direction => {
  const { x, y } = getNewTarget(direction, player.value.x, player.value.y);
  const target = gameMap.value[y][x];

  if (target === 2) {
    return false;
  } else if (target === 0) {
    gameMap.value[y][x] = 1;
    gameMap.value[player.value.y][player.value.x] = 0;
    player.value.x = x;
    player.value.y = y;
    return true;
  } else if (target === 3) {
    return moveBox(direction, x, y);
  }
};

// 检查是否胜利
const checkWin = () => {
  const result = correct.find(item => gameMap.value[item.y][item.x] !== 3);
  return result === undefined;
};

// 处理键盘事件
const handleKeydown = e => {
  let result = false;

  switch (e.key) {
    case "ArrowUp":
      result = move("up");
      break;
    case "ArrowDown":
      result = move("down");
      break;
    case "ArrowLeft":
      result = move("left");
      break;
    case "ArrowRight":
      result = move("right");
      break;
  }

  if (result && checkWin()) {
    isGameWin.value = true;
    window.removeEventListener("keydown", handleKeydown);
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style lang="scss" scoped>
.sokoban {
  .game {
    position: relative;
    margin: 0 auto;

    .row {
      display: flex;
    }

    .cell {
      position: absolute;
      box-sizing: border-box;
      background-size: 100% 100%;

      &.is-correct {
        border: 2px solid lightgreen;
      }
    }
  }

  .win {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: 3em;
    }
  }
}
</style>
