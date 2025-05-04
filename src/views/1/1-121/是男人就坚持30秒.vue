<template>
  <div class="game-container">
    <span id="timer">{{ timerText }}</span>
    <div id="game-area" ref="gameArea">
      <div id="player" ref="player"></div>
    </div>
    <p class="game-rules">
      游戏规则：鼠标移动到红色部分，拖动红块，避免碰到绿色部分，不要碰到黑色区域，坚持的时间越长你越牛X！是男人就至少坚持30秒，本游戏支持IE，Chrome，Firefox，safari等浏览器！
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const gameArea = ref(null);
const player = ref(null);
const timerText = ref("马上开始");
const timer = ref(null);
const seconds = ref(0);
const balls = ref([]);
const ballTimers = ref([]);

const gameConfig = ref({
  width: 450,
  height: 400,
  ballSpeed: 10,
  spawnInterval: 2000,
  collisionDistance: 55,
});

onMounted(() => {
  initGame();
});

function initGame() {
  startTimer();
  setupPlayerDrag();
  spawnInitialBall();
  startBallSpawning();
}

function startTimer() {
  timer.value = setInterval(() => {
    seconds.value++;
    timerText.value = `已完成${seconds.value}秒`;
  }, 1000);
}

function setupPlayerDrag() {
  const playerEl = player.value;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  playerEl.addEventListener("mousedown", e => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    document.addEventListener("mousemove", movePlayer);
    document.addEventListener("mouseup", stopDrag);
  });

  function movePlayer(e) {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    const newLeft = playerEl.offsetLeft + dx;
    const newTop = playerEl.offsetTop + dy;

    // Check boundaries
    if (
      newLeft < 0 ||
      newTop < 0 ||
      newLeft + playerEl.offsetWidth > gameArea.value.offsetWidth ||
      newTop + playerEl.offsetHeight > gameArea.value.offsetHeight
    ) {
      endGame();
      return;
    }

    playerEl.style.left = `${newLeft}px`;
    playerEl.style.top = `${newTop}px`;

    startX = e.clientX;
    startY = e.clientY;

    // Check collisions with balls
    checkAllCollisions();
  }

  function stopDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", movePlayer);
    document.removeEventListener("mouseup", stopDrag);
  }
}

function createBall() {
  const ball = document.createElement("div");
  ball.className = "enemy-ball";

  // Random position within game area
  const maxLeft = gameArea.value.offsetWidth - 50;
  const left = Math.floor(Math.random() * maxLeft);

  ball.style.left = `${left}px`;
  ball.style.top = "0px";

  gameArea.value.appendChild(ball);

  const speedX =
    Math.random() * gameConfig.value.ballSpeed * 2 - gameConfig.value.ballSpeed;
  const speedY =
    Math.random() * gameConfig.value.ballSpeed * 2 - gameConfig.value.ballSpeed;

  const ballObj = {
    element: ball,
    speedX: speedX === 0 ? 1 : speedX, // Ensure not zero
    speedY: speedY === 0 ? 1 : speedY, // Ensure not zero
    timer: null,
  };

  balls.value.push(ballObj);
  moveBall(ballObj);

  return ballObj;
}

function moveBall(ball) {
  ball.timer = setInterval(() => {
    const ballEl = ball.element;
    let newLeft = ballEl.offsetLeft + ball.speedX;
    let newTop = ballEl.offsetTop + ball.speedY;

    // Bounce off walls
    if (
      newTop > gameArea.value.offsetHeight - ballEl.offsetHeight ||
      newTop < 0
    ) {
      ball.speedY *= -1;
    }
    if (
      newLeft > gameArea.value.offsetWidth - ballEl.offsetWidth ||
      newLeft < 0
    ) {
      ball.speedX *= -1;
    }

    ballEl.style.left = `${newLeft}px`;
    ballEl.style.top = `${newTop}px`;
  }, 50);

  ballTimers.value.push(ball.timer);
}

function spawnInitialBall() {
  createBall();
}

function startBallSpawning() {
  const spawnTimer = setInterval(() => {
    createBall();
  }, gameConfig.value.spawnInterval);

  ballTimers.value.push(spawnTimer);
}

function checkAllCollisions() {
  const playerEl = player.value;
  const playerX = playerEl.offsetLeft + playerEl.offsetWidth / 2;
  const playerY = playerEl.offsetTop + playerEl.offsetHeight / 2;

  balls.value.forEach(ball => {
    const ballEl = ball.element;
    const ballX = ballEl.offsetLeft + ballEl.offsetWidth / 2;
    const ballY = ballEl.offsetTop + ballEl.offsetHeight / 2;

    const dx = Math.abs(playerX - ballX);
    const dy = Math.abs(playerY - ballY);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < gameConfig.value.collisionDistance) {
      endGame();
    }
  });
}

function endGame() {
  // Clear all timers
  clearInterval(timer.value);
  ballTimers.value.forEach(t => clearInterval(t));

  // Show game over message
  alert(`游戏结束 ! 共坚持${seconds.value}秒`);

  // Reload the game
  window.location.reload();
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #326b86;
  color: #ffffff;
  font: 14px Arial, sans-serif;
  text-align: center;
  padding: 30px;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#timer {
  font-size: 18px;
  margin-bottom: 10px;
  display: block;
}

#game-area {
  position: relative;
  width: 450px;
  height: 400px;
  background: #222;
  margin: 30px auto;
  overflow: hidden;
}

#player {
  position: absolute;
  width: 60px;
  height: 60px;
  background: red;
  border-radius: 50%;
  opacity: 0.6;
  cursor: move;
  top: 195px;
  left: 195px;
  z-index: 100;
}

.enemy-ball {
  position: absolute;
  left: 0px;
  top: 0;
  background: #008040;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  opacity: 0.6;
  z-index: 99;
}

.game-rules {
  width: 500px;
  margin: 20px auto;
  font-size: 14px;
  line-height: 18px;
  text-align: left;
}
</style>
