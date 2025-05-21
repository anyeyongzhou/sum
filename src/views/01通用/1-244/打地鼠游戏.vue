<template>
  <div class="whack-mole-container">
    <div class="game-header">
      <div class="score-board">
        <div class="score">
          <span class="label">得分</span>
          <span class="value">{{ score }}</span>
        </div>
        <div class="time">
          <span class="label">时间</span>
          <span class="value">{{ timeLeft }}s</span>
        </div>
      </div>

      <div class="controls">
        <button
          class="start-btn"
          :class="{ active: isPlaying }"
          @click="toggleGame"
        >
          {{ isPlaying ? "暂停" : "开始" }}
        </button>
        <button
          class="restart-btn"
          @click="restartGame"
          :disabled="!isGameOver"
        >
          重新开始
        </button>
      </div>
    </div>

    <div class="game-board">
      <div
        v-for="(hole, index) in holes"
        :key="index"
        class="hole"
        :class="{ active: hole.isActive }"
        @click="whack(index)"
      >
        <div class="mole" :class="{ hit: hole.isHit }">
          <div class="face">
            <div class="eyes">
              <div class="eye left"></div>
              <div class="eye right"></div>
            </div>
            <div class="mouth"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="game-over" v-if="isGameOver">
      <div class="overlay">
        <h2>游戏结束</h2>
        <p>最终得分：{{ score }}</p>
        <button class="restart-btn" @click="restartGame">再来一局</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const score = ref(0);
const timeLeft = ref(30);
const isPlaying = ref(false);
const isGameOver = ref(false);
const holes = ref(
  Array(9)
    .fill()
    .map(() => ({
      isActive: false,
      isHit: false,
    }))
);

let gameTimer = null;
let moleTimer = null;

// 开始/暂停游戏
function toggleGame() {
  if (isGameOver.value) return;

  isPlaying.value = !isPlaying.value;

  if (isPlaying.value) {
    startGame();
  } else {
    pauseGame();
  }
}

// 开始游戏
function startGame() {
  // 开始计时
  gameTimer = setInterval(() => {
    timeLeft.value--;

    if (timeLeft.value <= 0) {
      endGame();
    }
  }, 1000);

  // 开始出现地鼠
  showMole();
}

// 暂停游戏
function pauseGame() {
  clearInterval(gameTimer);
  clearTimeout(moleTimer);
  holes.value.forEach(hole => {
    hole.isActive = false;
    hole.isHit = false;
  });
}

// 结束游戏
function endGame() {
  isPlaying.value = false;
  isGameOver.value = true;
  clearInterval(gameTimer);
  clearTimeout(moleTimer);
  holes.value.forEach(hole => {
    hole.isActive = false;
    hole.isHit = false;
  });
}

// 重新开始游戏
function restartGame() {
  score.value = 0;
  timeLeft.value = 30;
  isPlaying.value = false;
  isGameOver.value = false;
  holes.value.forEach(hole => {
    hole.isActive = false;
    hole.isHit = false;
  });
}

// 显示地鼠
function showMole() {
  if (!isPlaying.value) return;

  // 随机选择一个洞
  const randomIndex = Math.floor(Math.random() * holes.value.length);
  holes.value[randomIndex].isActive = true;
  holes.value[randomIndex].isHit = false;

  // 设置地鼠消失时间
  const showTime = Math.random() * 1000 + 500; // 500-1500ms
  moleTimer = setTimeout(() => {
    if (holes.value[randomIndex].isActive && !holes.value[randomIndex].isHit) {
      holes.value[randomIndex].isActive = false;
    }
    showMole();
  }, showTime);
}

// 打地鼠
function whack(index) {
  if (!isPlaying.value || !holes.value[index].isActive) return;

  holes.value[index].isHit = true;
  score.value += 10;

  // 播放音效
  playSound("hit");

  // 延迟隐藏地鼠
  setTimeout(() => {
    holes.value[index].isActive = false;
    holes.value[index].isHit = false;
  }, 300);
}

// 播放音效
function playSound(type) {
  const audio = new Audio();
  audio.src = type === "hit" ? "/sounds/hit.mp3" : "/sounds/background.mp3";
  audio.play();
}

// 清理
onUnmounted(() => {
  clearInterval(gameTimer);
  clearTimeout(moleTimer);
});
</script>

<style lang="scss" scoped>
.whack-mole-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.score-board {
  display: flex;
  gap: 20px;

  .score,
  .time {
    background-color: #f5f5f5;
    padding: 12px 20px;
    border-radius: 8px;
    text-align: center;

    .label {
      display: block;
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }

    .value {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
  }
}

.controls {
  display: flex;
  gap: 12px;

  button {
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .start-btn {
    background-color: #4caf50;
    color: white;

    &:hover:not(:disabled) {
      background-color: #45a049;
    }

    &.active {
      background-color: #f44336;

      &:hover {
        background-color: #e53935;
      }
    }
  }

  .restart-btn {
    background-color: #2196f3;
    color: white;

    &:hover:not(:disabled) {
      background-color: #1e88e5;
    }
  }
}

.game-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.hole {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: #8b4513;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #3e2723;
    border-radius: 50%;
    transform: translateY(80%);
    transition: transform 0.3s;
  }

  &.active::before {
    transform: translateY(0);
  }
}

.mole {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #795548;
  border-radius: 50%;
  transform: translateY(100%);
  transition: transform 0.3s;

  .face {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
  }

  .eyes {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .eye {
      width: 8px;
      height: 8px;
      background-color: white;
      border-radius: 50%;

      &::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 4px;
        height: 4px;
        background-color: black;
        border-radius: 50%;
      }
    }
  }

  .mouth {
    width: 20px;
    height: 10px;
    border: 2px solid white;
    border-radius: 0 0 10px 10px;
    margin: 0 auto;
  }

  &.hit {
    background-color: #d32f2f;
  }
}

.hole.active .mole {
  transform: translateY(0);
}

.game-over {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

  .overlay {
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    text-align: center;

    h2 {
      margin: 0 0 20px;
      font-size: 24px;
      color: #333;
    }

    p {
      margin: 0 0 20px;
      font-size: 18px;
      color: #666;
    }

    .restart-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      background-color: #4caf50;
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: #45a049;
      }
    }
  }
}

@media (max-width: 768px) {
  .game-header {
    flex-direction: column;
    gap: 20px;
  }

  .score-board {
    width: 100%;
    justify-content: space-between;
  }

  .controls {
    width: 100%;

    button {
      flex: 1;
    }
  }

  .game-board {
    gap: 10px;
  }
}
</style>
