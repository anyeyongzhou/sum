<template>
  <div class="eye-container">
    <!-- 血轮眼 -->
    <div class="zuo">
      <div class="zuoZong">
        <div class="zuoYu">
          <span class="yu"></span>
          <span class="yu"></span>
          <span class="yu"></span>
        </div>
      </div>
    </div>
    <!-- 轮回眼 -->
    <div class="you">
      <div class="dian"></div>
      <div class="youYu">
        <span class="quan" style="--r: 2"></span>
        <span class="quan" style="--r: 3"></span>
        <span class="quan" style="--r: 4"></span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.eye-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}

.zuo,
.you {
  width: 250px;
  height: 120px;
  background-color: rgb(255, 255, 255);
  border-bottom: 5px solid rgb(70, 70, 70);
  overflow: hidden;
  position: relative;
}

.zuo {
  transform: translateX(-135px);
  border-radius: 0 120px 0 120px;
  box-shadow: inset 3px 2px 3px rgba(17, 17, 17, 0.8);

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 95px;
    height: 95px;
    border-radius: 50%;
    border: 2px solid #000;
    animation: colour 2s linear forwards;
  }

  .zuoZong {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: rgb(0, 0, 0);
    z-index: 1;
    animation: da 3s linear forwards;
  }
}

@keyframes colour {
  0%,
  30% {
    background-color: rgb(0, 0, 0);
  }
  100% {
    background-color: rgb(255, 4, 4);
  }
}

@keyframes da {
  100% {
    width: 15px;
    height: 15px;
  }
}

.you {
  transform: translateX(135px);
  border-radius: 120px 0 120px 0;
  box-shadow: inset -3px 2px 3px rgba(17, 17, 17, 0.8);

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 95px;
    height: 95px;
    border-radius: 50%;
    border: 2px solid #000;
    animation: youcolor 2s linear forwards;
  }

  .dian {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #000;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 10;
    animation: youda 3s linear forwards;
  }

  .youYu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@keyframes youcolor {
  0%,
  30% {
    background-color: rgb(0, 0, 0);
  }
  100% {
    background-color: rgb(144, 130, 183);
  }
}

@keyframes youda {
  0% {
    height: 0;
    width: 0;
  }
  100% {
    height: 15px;
    width: 15px;
  }
}

.quan {
  position: absolute;
  border-radius: 50%;
  border: 2px solid #000;
  z-index: calc(1 - var(--r));
  animation: zhi 2s ease-out 2s forwards;
}

@keyframes zhi {
  0% {
    top: calc(var(--r) * 1px);
    left: calc(var(--r) * 1px);
    right: calc(var(--r) * 1px);
    bottom: calc(var(--r) * 1px);
  }
  100% {
    top: calc(var(--r) * -35px);
    left: calc(var(--r) * -35px);
    right: calc(var(--r) * -35px);
    bottom: calc(var(--r) * -35px);
    background-color: rgb(187, 177, 214);
  }
}
</style>
