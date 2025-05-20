<template>
  <div class="wrap">
    <div class="cube">
      <!-- 大正方体六面 -->
      <div class="out-front">前面</div>
      <div class="out-back">后面</div>
      <div class="out-left">左面</div>
      <div class="out-right">右面</div>
      <div class="out-top">上面</div>
      <div class="out-bottom">下面</div>
      <!-- 小正方体六面（骰子点数） -->
      <span class="in-front">
        <span class="points"></span>
      </span>
      <span class="in-back">
        <span class="points"></span>
        <span class="points pitB2"></span>
        <span class="points pitB3"></span>
      </span>
      <span class="in-left">
        <span class="points"></span>
        <span class="points pitL2"></span>
      </span>
      <span class="in-right">
        <span class="points"></span>
        <span class="points"></span>
        <span class="points"></span>
        <span class="points"></span>
      </span>
      <span class="in-top">
        <span class="pitT1">
          <span class="points"></span>
          <span class="points"></span>
        </span>
        <span class="pitT2">
          <span class="points"></span>
        </span>
        <span class="pitT3">
          <span class="points"></span>
          <span class="points"></span>
        </span>
      </span>
      <span class="in-bottom">
        <span class="points"></span>
        <span class="points"></span>
        <span class="points"></span>
        <span class="points"></span>
        <span class="points"></span>
        <span class="points"></span>
      </span>
    </div>
  </div>
</template>

<script setup>
// 纯 CSS 动画，无需 JS 逻辑
</script>

<style scoped>
@keyframes move {
  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(720deg) rotateY(360deg) rotateZ(360deg);
  }
}

div.wrap {
  margin-top: 200px;
  width: 200px !important;
  perspective: 1000px;
}
.wrap > div.cube {
  width: 200px !important;
  height: 200px;
  position: relative;
  color: #ff92ff;
  font-size: 36px;
  font-weight: 100;
  text-align: center;
  line-height: 200px;
  transform-style: preserve-3d;
  transform: rotateX(-50deg) rotateY(-50deg) rotateZ(0deg);
  animation: move 8s infinite linear;
}
.cube > div {
  width: 100%;
  height: 100%;
  border: 10px solid #66daff;
  border-radius: 20px;
  position: absolute;
  background-color: rgba(51, 51, 51, 0.3);
  transition: transform 0.3s ease-in;
}
.cube div.out-front {
  transform: translateZ(100px);
}
.cube div.out-back {
  transform: translateZ(-100px) rotateY(180deg);
}
.cube div.out-left {
  transform: translateX(-100px) rotateY(-90deg);
}
.cube div.out-right {
  transform: translateX(100px) rotateY(90deg);
}
.cube div.out-top {
  transform: translateY(-100px) rotateX(90deg);
}
.cube div.out-bottom {
  transform: translateY(100px) rotateX(-90deg);
}
.cube > span {
  display: block;
  width: 90px;
  height: 90px;
  background-color: #ffe7f9;
  position: absolute;
  top: 50px;
  left: 50px;
  border: 5px solid #424242;
  opacity: 0.9;
  border-radius: 30%;
}
.cube span.in-front {
  transform: translateZ(50px);
}
.cube span.in-back {
  transform: translateZ(-50px) rotateY(180deg);
}
.cube span.in-left {
  transform: translateX(-50px) rotateY(-90deg);
}
.cube span.in-right {
  transform: translateX(50px) rotateY(90deg);
}
.cube span.in-top {
  transform: translateY(-50px) rotateX(90deg);
}
.cube span.in-bottom {
  transform: translateY(50px) rotateX(-90deg);
}
.wrap:hover .cube div.out-front {
  transform: translateZ(200px);
}
.wrap:hover .cube div.out-back {
  transform: translateZ(-200px) rotateY(180deg);
}
.wrap:hover .cube div.out-left {
  transform: translateX(-200px) rotateY(-90deg);
}
.wrap:hover .cube div.out-right {
  transform: translateX(200px) rotateY(90deg);
}
.wrap:hover .cube div.out-top {
  transform: translateY(-200px) rotateX(90deg);
}
.wrap:hover .cube div.out-bottom {
  transform: translateY(200px) rotateX(-90deg);
}
span.points {
  display: flex;
  width: 20px;
  height: 20px;
  margin: 5px;
  border-radius: 50%;
  background-color: #bb9aff;
}
span.in-front {
  display: flex;
  justify-content: center;
  align-items: center;
}
.in-front > span {
  width: 40px;
  height: 40px;
}
span.in-left {
  display: flex;
  justify-content: center;
}
span.in-left > .pitL2 {
  align-self: flex-end;
}
.in-left > span,
.in-right > span {
  width: 25px;
  height: 25px;
  margin: 10px;
}
span.in-back {
  display: flex;
}
span.in-back > .pitB2 {
  align-self: center;
}
span.in-back > .pitB3 {
  align-self: flex-end;
}
span.in-right {
  display: flex;
  flex-wrap: wrap;
}
span.in-top {
  display: flex;
}
span.in-top > .pitT1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
span.in-top > .pitT2 {
  display: flex;
  align-items: center;
}
span.in-top > .pitT3 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
span.in-bottom {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
}
</style>
