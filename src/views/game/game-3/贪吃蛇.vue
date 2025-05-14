<template>
  <div>
    <div class="startPage" v-if="isStartPageVisible">
      <div class="startBtn" @click="startGame"></div>
    </div>
    <div class="wrapper">
      <div class="left-side">
        <img
          :src="startImg"
          alt=""
          class="startPaush"
          @click="startOrPauseGame"
        />
      </div>
      <div class="main">
        <div class="header">
          <div class="score">
            分数: <span>{{ score }}</span>
          </div>
        </div>
        <div class="content" ref="content"></div>
      </div>
    </div>
    <div class="loser" v-if="isGameOver">
      <div class="con">
        <div class="close" @click="closeGame"></div>
        <span class="loserScore">{{ score }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import startImg from "./img/start.png";

const isStartPageVisible = ref(true);
const isGameOver = ref(false);
const score = ref(0);
const content = ref(null);
let snakeMove, foodX, foodY;
let snakeBody = [
  [3, 0, "head"],
  [2, 0, "body"],
  [1, 0, "body"],
];
let direction = "right";

const init = () => {
  // Set up the game map
  const mapW = parseInt(window.getComputedStyle(content.value).width);
  const mapH = parseInt(window.getComputedStyle(content.value).height);
  foodX = Math.floor(Math.random() * (mapW / 20));
  foodY = Math.floor(Math.random() * (mapH / 20));
  createFood();
  renderSnake();
};

const startGame = () => {
  isStartPageVisible.value = false;
  init();
  startOrPauseGame();
};

const createFood = () => {
  const food = document.createElement("div");
  food.style.width = "20px";
  food.style.height = "20px";
  food.style.borderRadius = "50%";
  food.style.backgroundColor = "#00F";
  food.style.position = "absolute";
  food.style.left = `${foodX * 20}px`;
  food.style.top = `${foodY * 20}px`;
  content.value.appendChild(food).setAttribute("class", "food");
};

const renderSnake = () => {
  removeClass("snake");
  for (const segment of snakeBody) {
    const snakeSegment = document.createElement("div");
    snakeSegment.style.width = "20px";
    snakeSegment.style.height = "20px";
    snakeSegment.style.borderRadius = "50%";
    snakeSegment.style.position = "absolute";
    snakeSegment.style.left = `${segment[0] * 20}px`;
    snakeSegment.style.top = `${segment[1] * 20}px`;
    snakeSegment.classList.add(segment[2]);
    content.value.appendChild(snakeSegment).classList.add("snake");
  }
};

const moveSnake = () => {
  const head = snakeBody[0];
  const newHead = [...head];

  switch (direction) {
    case "right":
      newHead[0] += 1;
      break;
    case "left":
      newHead[0] -= 1;
      break;
    case "up":
      newHead[1] -= 1;
      break;
    case "down":
      newHead[1] += 1;
      break;
  }

  if (newHead[0] === foodX && newHead[1] === foodY) {
    score.value += 1;
    snakeBody.unshift(newHead);
    createFood();
  } else {
    snakeBody.pop(); // Remove the tail
    snakeBody.unshift(newHead); // Add new head
  }

  checkCollision();
  renderSnake();
};

const checkCollision = () => {
  const head = snakeBody[0];
  if (
    head[0] < 0 ||
    head[0] >= content.value.clientWidth / 20 ||
    head[1] < 0 ||
    head[1] >= content.value.clientHeight / 20 ||
    snakeBody.slice(1).some(seg => seg[0] === head[0] && seg[1] === head[1])
  ) {
    endGame();
  }
};

const endGame = () => {
  clearInterval(snakeMove);
  isGameOver.value = true;
};

const closeGame = () => {
  isGameOver.value = false;
  score.value = 0;
  snakeBody = [
    [3, 0, "head"],
    [2, 0, "body"],
    [1, 0, "body"],
  ];
  direction = "right";
  removeClass("food");
  removeClass("snake");
};

const startOrPauseGame = () => {
  if (!snakeMove) {
    snakeMove = setInterval(moveSnake, 200);
  } else {
    clearInterval(snakeMove);
    snakeMove = null;
  }
};

const removeClass = className => {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

onMounted(() => {
  document.addEventListener("keydown", event => {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== "down") direction = "up";
        break;
      case "ArrowDown":
        if (direction !== "up") direction = "down";
        break;
      case "ArrowLeft":
        if (direction !== "right") direction = "left";
        break;
      case "ArrowRight":
        if (direction !== "left") direction = "right";
        break;
    }
  });
});
</script>

<style lang="scss">
.startPage {
  width: 100% !important;
  height: 800px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
.startBtn {
  position: absolute;
  height: 170px;
  width: 200px;
  background-image: url("./img/startGame.png");
  background-size: 100% 100%;
  cursor: pointer;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.wrapper {
  height: 800px;
  width: 100%;
  position: relative;
  background-image: url("./img/bg.jpg");
  background-size: 100% 100%;
}
.left-side {
  position: absolute;
  width: 24%;
  height: 800px;
}
.main {
  position: absolute;
  left: 25%;
  display: inline-block;
  width: 50%;
  height: 90%;
}
.header {
  width: 100%;
  height: 80px;
  text-align: center;
}
.score {
  line-height: 40px;
  color: #ddd;
  font-size: 20px;
  font-weight: bolder;
}
.content {
  position: absolute;
  width: 79.5%;
  height: 36.5%;
  left: 10%;
  top: 34%;
}
.loser {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.con {
  background-image: url("./img/startP.jpg");
  background-size: 100% 100%;
  height: 300px;
  width: 400px;
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
}
.close {
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  width: 40px;
  background-image: url("./img/closeBtn.png");
  background-size: 100% 100%;
  cursor: pointer;
}
.loserScore {
  display: block;
  height: 30px;
  width: 60px;
  position: absolute;
  top: 42%;
  left: 40%;
  color: #222;
  font-size: 30px;
  font-weight: bolder;
}
.food {
  background-image: url("./img/apple.png");
  background-size: 100% 100%;
}
.head {
  background-image: url("./img/head.png");
  background-size: 100% 100%;
}
.body {
  background-image: url("./img/body.png");
  background-size: 100% 100%;
}
</style>
