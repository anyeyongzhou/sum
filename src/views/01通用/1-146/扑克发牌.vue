<template>
  <div class="game-container" ref="gameContainer" @click="handleDeal">
    <el-image
      v-for="(poker, index) in allPokers"
      :src="images[index]?.url"
      :key="`${poker.number}_${poker.color}`"
      lazy
      loading="lazy"
      :style="{
        width: `${config.pokerWidth}px`,
        height: `${config.pokerHeight}px`,
        left: `${poker.left}px`,
        top: `${poker.top}px`,
        zIndex: poker.zIndex,
        transition: `all ${config.duration}s ${poker.delay}s`,
      }"
      class="poker-card"
      fit="fill"
    ></el-image>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const images = ref([]);

async function loadImagesVite() {
  const modules = import.meta.glob("./img/*.{png,jpg,jpeg,gif,svg}");

  for (const path in modules) {
    const module = await modules[path]();
    const imageName = path.split("/").pop();

    images.value.push({
      name: imageName,
      url: module.default,
    });
  }
  console.log("images", images.value);
}
// 使用示例

// 配置
const config = {
  containerWidth: 1000,
  containerHeight: 700,
  pokerWidth: 105,
  pokerHeight: 150,
  duration: 0.25,
};

const gameContainer = ref(null);
const allPokers = ref([]);
const isDealing = ref(false);
const players = ref([]);

// 初始化游戏
const initGame = async () => {
  // 创建一副牌
  const pokers = [];
  for (let i = 1; i <= 15; i++) {
    for (let j = 1; j <= 4; j++) {
      if (i >= 14 && j > 1) break; // 大小王只有一种花色
      pokers.push({
        number: i,
        color: i >= 14 ? 1 : j, // 大小王固定花色为1
        left: 0,
        top: 0,
        zIndex: 0,
        delay: 0,
      });
    }
  }

  await loadImagesVite();

  // 洗牌
  allPokers.value = pokers.sort(() => Math.random() - 0.5);

  // 设置初始位置
  const center = getCenterPointer();
  allPokers.value.forEach((poker, index) => {
    poker.left = center.left + index * 0.2;
    poker.top = center.top + index * 0.2;
    poker.zIndex = allPokers.value.length - index;
    poker.delay = index * config.duration;
  });

  // 初始化玩家
  players.value = [
    new Player("bottom", 17, 30),
    new Player("left", 17, 30),
    new Player("right", 17, 30),
    new Player("top", 3, 150),
  ];
};

// 获取中心点坐标
const getCenterPointer = () => ({
  left: (config.containerWidth - config.pokerWidth) / 2,
  top: (config.containerHeight - config.pokerHeight) / 2,
});

// 玩家类
class Player {
  constructor(direction, totalNumber, gap) {
    this.direction = direction;
    this.totalNumber = totalNumber;
    this.gap = gap;
    this.pokers = [];

    // 计算初始位置
    if (direction === "top" || direction === "bottom") {
      const w = (totalNumber - 1) * gap + config.pokerWidth;
      this.firstX = (config.containerWidth - w) / 2;
      this.firstY =
        direction === "top" ? 0 : config.containerHeight - config.pokerHeight;
    } else {
      const h = (totalNumber - 1) * gap + config.pokerHeight;
      this.firstY = (config.containerHeight - h) / 2;
      this.firstX =
        direction === "left" ? 0 : config.containerWidth - config.pokerWidth;
    }
  }

  getPoker(poker) {
    this.pokers.push(poker);
    this.setPositions();
  }

  setPositions() {
    this.pokers.forEach((poker, i) => {
      setTimeout(() => {
        poker.zIndex = i + 1;
      }, (config.duration * 1000) / 2);

      if (this.direction === "left" || this.direction === "right") {
        poker.left = this.firstX;
        poker.top = this.firstY + i * this.gap;
      } else {
        poker.left = this.firstX + i * this.gap;
        poker.top = this.firstY;
      }
    });
  }

  sort() {
    this.pokers.forEach(poker => (poker.delay = 0));
    this.pokers.sort((a, b) => {
      if (a.number === b.number) return a.color - b.color;
      return a.number - b.number;
    });
    this.setPositions();
  }
}

// 发牌
const deal = () => {
  if (isDealing.value) return;
  isDealing.value = true;

  let next = 0;
  allPokers.value.forEach((poker, i) => {
    if (i >= allPokers.value.length - 3) next = 3;
    const player = players.value[next];
    player.getPoker(poker);
    next = (next + 1) % 3;

    // 最后一张牌动画结束后排序
    if (i === allPokers.value.length - 1) {
      setTimeout(() => {
        players.value[0].sort();
        players.value[1].sort();
        players.value[2].sort();
      }, config.duration * 1000);
    }
  });
};

const handleDeal = () => {
  if (!isDealing.value) {
    deal();
  }
};

onMounted(() => {
  // 设置容器样式
  gameContainer.value.style.width = `${config.containerWidth}px`;
  gameContainer.value.style.height = `${config.containerHeight}px`;

  // 初始化游戏
  initGame();
});
</script>

<style lang="scss">
.game-container {
  border: 1px solid #ccc;
  margin: 0 auto;
  position: relative;

  .poker-card {
    position: absolute;
    border-radius: 5px;
    transition-property: left, top, z-index;
    transition-timing-function: ease;
  }
}
</style>
