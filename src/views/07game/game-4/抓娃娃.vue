<template>
  <div class="game">
    <div class="button" @click="handleButtonClick"></div>
    <div class="claw" :class="{ open: isClawOpen }"></div>
    <div class="toys" ref="toyContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const toyContainer = ref(null);
const isClawOpen = ref(true);
const config = {
  containerWidth: 470,
  toyWidth: 200,
  clawMaxHeight: 350,
  clawMinHeight: 80,
};
const toys = [];

function createToy(left) {
  const dom = document.createElement("div");
  let timer = null;

  const toy = {
    left,
    dom,
    show() {
      this.dom.style.left = this.left + "px";
    },
    autoMove() {
      clearInterval(timer);
      timer = setInterval(() => {
        this.left++;
        this.show();
        if (this.left > config.containerWidth) {
          this.remove();
          clearInterval(timer);
        }
      }, 8);
    },
    remove() {
      this.dom.remove();
      const index = toys.indexOf(this);
      toys.splice(index, 1);
      const first = toys[0];
      createToy(first.left - config.toyWidth);
    },
    canBeCatch() {
      return this.left >= 110 && this.left <= 170;
    },
    catched() {
      clearInterval(timer);
      this.dom.style.transition = "transform 1s linear";
      this.dom.style.zIndex = 1;
      this.dom.style.transform = "translate(0, -250px)";
      setTimeout(() => {
        this.remove();
      }, 1000);
    },
  };

  toy.show();
  toy.autoMove();
  toyContainer.value.appendChild(dom);
  dom.classList.add("toy");
  toys.push(toy);
}

function init() {
  const initNumber = 5;
  for (let i = 0; i < initNumber; i++) {
    createToy((i - initNumber) * config.toyWidth);
  }
}

onMounted(() => {
  init();
});

const claw = {
  moveDown() {
    const clawDom = document.querySelector(".claw");
    clawDom.style.height = config.clawMaxHeight + "px";
    setTimeout(() => {
      isClawOpen.value = false;
      this.catchToy();
      this.moveUp();
    }, 1000);
  },
  moveUp() {
    const clawDom = document.querySelector(".claw");
    clawDom.style.height = config.clawMinHeight + "px";
    setTimeout(() => {
      isClawOpen.value = true;
    }, 1000);
  },
  catchToy() {
    for (const toy of toys) {
      if (toy.canBeCatch()) {
        toy.catched();
        return;
      }
    }
  },
};

function handleButtonClick() {
  const button = document.querySelector(".button");
  if (button.classList.contains("down")) {
    return;
  }
  button.classList.add("down");
  claw.moveDown();
  setTimeout(() => {
    button.classList.remove("down");
  }, 2000);
}
</script>

<style lang="scss">
.game {
  width: 100%;
  height: 100%;
  background: url("./img/bg.png") no-repeat center top;
  margin: 0 auto;
  position: relative;
}

.button {
  width: 200px;
  height: 150px;
  background: url("./img/start.png") no-repeat;
  cursor: pointer;
  position: absolute;
  bottom: 200px;
  right: 114px;

  &.down {
    background-position: 0px -150px;
  }
}

.claw {
  position: absolute;
  background: url("./img/hand.png") no-repeat;
  width: 150px;
  height: 80px;
  left: 280px;
  top: 235px;
  background-position: 12px bottom;
  z-index: 1;
  transition: height 1s linear;

  &.open {
    background-position: -148px bottom;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 15px;
    background: url("./img/rod.png") repeat-y center top;
    top: 0;
    left: 0;
    right: 0;
    bottom: 80px;
    margin: auto;
  }
}

.toys {
  width: 470px;
  margin-left: 120px;
  padding-top: 540px;
  height: 200px;
  position: relative;
  overflow: hidden;

  .toy {
    position: absolute;
    bottom: 0;
    background: url("./img/toy.png") no-repeat;
    width: 200px;
    height: 200px;
    left: 0;
  }
}
</style>
