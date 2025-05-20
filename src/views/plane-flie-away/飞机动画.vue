<template>
  <div
    v-if="visible"
    class="plane-flie-away-root"
    :style="{ background: bgColor }"
  >
    <div id="wind">
      <div id="plane" :class="{ front: isFront }">
        <form action="#">
          <textarea class="message" v-model="message"></textarea>
        </form>
        <button class="send" @click="handleSend">起飞</button> <br />
        <div id="plane_bottom">
          <a href="javascript:;" id="plane_close" @click="handleClose"> X </a>
        </div>
      </div>
      <div id="wind_container" :class="containerClass">
        <div id="left-wing">
          <div class="top_left curvable" :class="{ curved: isCurved }"></div>
          <div class="bottom_left curvable" :class="{ curved: isCurved }"></div>
          <div class="wing wing1"></div>
          <div class="wing wing2"></div>
        </div>
        <div id="right-wing">
          <div class="top_right curvable" :class="{ curved: isCurved }"></div>
          <div
            class="bottom_right curvable"
            :class="{ curved: isCurved }"
          ></div>
          <div class="wing wing3"></div>
          <div class="wing wing4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const visible = ref(true);
const message = ref("前端路上，一路有你。编辑你的正能量，快乐工作，努力生活~");

// 动画步骤状态
const isFront = ref(true);
const isCurved = ref(false);
const containerState = ref("beginning"); // beginning, hover, fly_away_first, fly_away

// 背景色状态
const bgColor = ref("#000");

const containerClass = computed(() => {
  let cls = [containerState.value];
  if (containerState.value === "hover" && flyAwayFirst.value)
    cls.push("fly_away_first");
  if (containerState.value === "hover" && flyAwayFirst.value && flyAway.value)
    cls.push("fly_away");
  return cls.join(" ");
});

const flyAwayFirst = ref(false);
const flyAway = ref(false);

function handleSend(e) {
  e.preventDefault();
  // 步骤一：隐藏面板、显示飞机、完成折叠效果
  setTimeout(() => {
    isFront.value = false;
    containerState.value = "";
    setTimeout(() => {
      isCurved.value = true;
      containerState.value = "beginning";
      bgColor.value = "#54575A";
      // 步骤二：平放飞机
      setTimeout(() => {
        containerState.value = "hover";
        bgColor.value = "#AD8BD8";
        // 步骤三：飞机后退助跑
        setTimeout(() => {
          flyAwayFirst.value = true;
          bgColor.value = "#6E99C4";
          // 步骤四：飞机向前飞翔至消失
          setTimeout(() => {
            flyAway.value = true;
            bgColor.value = "#3F9BFF";
            // 步骤五：飞机复位
            setTimeout(() => {
              isFront.value = true;
              isCurved.value = false;
              containerState.value = "beginning";
              flyAwayFirst.value = false;
              flyAway.value = false;
              bgColor.value = "#000";
            }, 3000);
          }, 600);
        }, 2000);
      }, 2800);
    }, 200);
  }, 0);
}

function handleClose() {
  visible.value = false;
}
</script>

<style lang="scss" scoped>
.plane-flie-away-root {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 2s linear;
  overflow: hidden;
}
#wind {
  width: 100vw;
  height: 680px;
  position: relative;
}
#plane.front {
  transform: rotateY(0deg);
}
#plane {
  background: rgba(255, 255, 255, 0.15);
  background: hsl(0, 0%, 88%);
  transform: rotateY(-180deg);
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
  backface-visibility: hidden;
  width: 400px;
  height: 260px;
  top: 240px;
  transition: all 0.8s ease-in-out;
  margin: auto;
}
.message {
  width: 100%;
  max-width: 360px;
  min-height: 100px;
  padding: 10px;
  box-sizing: border-box;
  height: 140px;
  font-size: 14px;
  font-family: "Microsoft YaHei", Helvetica, Arial, Verdana;
  line-height: 20px;
}
.send {
  transition: all 0.3s ease-in-out;
  border: 2px solid hsl(194, 100%, 72%);
  margin: 15px 0;
  padding: 10px;
  outline: none;
  font-size: 18px;
  cursor: pointer;
  font-family: "Microsoft YaHei";
  background-color: hsl(0, 0%, 94%);
  border-radius: 4px;
}
#plane_close {
  color: #fff;
  text-decoration: none;
}
.send:active {
  transform: scale(0.85);
  transition: all 10ms ease-in-out;
  background-color: hsl(0, 0%, 85%);
  border: 2px solid hsl(194, 30%, 55%);
}
#plane_bottom {
  position: absolute;
  right: 7px;
  bottom: 0;
  width: 30px;
  height: 30px;
}
#wind_container {
  perspective: 600px;
  perspective-origin: 200px 131px;
  transform-style: preserve-3d;
  transition: all 0.8s ease-in-out;
  backface-visibility: hidden;
  position: relative;
  width: 400px;
  height: 260px;
  margin: auto;
}
#left-wing,
#right-wing {
  transform-style: preserve-3d;
  width: 200px;
  height: 260px;
  display: block;
  position: absolute;
  top: 0px;
  transition: all 1s ease-in-out;
}
#left-wing {
  transform: rotateZ(0deg);
  transform-origin: 100% 50% 0;
  left: 0;
}
#right-wing {
  transform: rotateZ(0deg);
  transform-origin: 0% 50%;
  left: 199px;
}
.wing {
  position: absolute;
  transform-origin: 0 0 0;
  perspective: 1px;
  perspective-origin: 50% 50%;
  backface-visibility: hidden;
  transition: all 1.3s linear;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  border-top: 240px solid hsla(0, 0%, 0%, 0);
  border-bottom: 0px solid hsla(0, 0%, 0%, 0);
  border-right: 100px solid hsl(0, 0%, 88%);
  width: 0;
  height: 0;
  bottom: 0;
}
.curvable {
  transition: transform 800ms ease-out;
  backface-visibility: hidden;
  position: absolute;
  background-color: transparent;
  z-index: 0;
  width: 0;
}
.curvable.top_left {
  transform-origin: 100px 112px;
  transition-delay: 1300ms;
  width: 0;
  height: 0;
  top: 0;
  border-right: 202px solid hsla(0, 0%, 0%, 0);
  border-bottom: 202px solid hsla(0, 0%, 0%, 0);
  border-top: 223px solid hsl(0, 0%, 88%);
}
.curvable.top_right {
  right: 0;
  border-left: 202px solid hsla(0, 0%, 0%, 0);
  border-bottom: 202px solid hsla(0, 0%, 0%, 0);
  border-top: 224px solid hsl(0, 0%, 88%);
  transform-origin: 96px 112px;
  transition-delay: 1650ms;
}
.wing1 {
  transform-origin: 100% 100%;
  transform: translateY(-38px) translateX(8px) rotateZ(22.62deg)
    skewY(-22.62deg);
}
.wing2 {
  transform: rotateZ(22.62deg);
  transform-origin: 100% 100%;
  border-left: 100px solid hsl(0, 0%, 88%);
  border-right: none;
  left: 100px;
}
.wing3 {
  transform: rotateZ(-22.62deg);
  transform-origin: 0% 100%;
  border-right: 100px solid hsl(0, 0%, 88%);
}
.wing4 {
  transform: translateY(-38px) translateX(-8px) rotateZ(-22.62deg)
    skewY(22.62deg);
  transform-origin: 0% 100%;
  border-right: none;
  border-left: 100px solid hsl(0, 0%, 88%);
  left: 100px;
}
.top_left.curvable.curved {
  transform: rotate3d(1, -1.11, 0, 180deg);
}
.bottom_left.curvable.curved {
  transform: rotate3d(2.4867, 1, 0, -180deg);
}
.bottom_right.curvable.curved {
  transform: rotate3d(-2.4867, 1, 0, 180deg);
}
.top_right.curvable.curved {
  transform: rotate3d(1, 1.11, 0, 180deg);
}
.bottom_left.curvable {
  transform-origin: 109px 0;
  transition-delay: 2100ms;
  width: 109px;
  height: 38px;
  background: hsl(0, 0%, 88%);
  bottom: 0;
  left: 0;
}
.bottom_right.curvable {
  transform-origin: 0px 0;
  transition-delay: 2450ms;
  width: 109px;
  height: 38px;
  background: hsl(0, 0%, 88%);
  bottom: 0;
  right: 0;
}
.bottom_left.curvable:after {
  position: absolute;
  content: "";
  border-right: 92px solid hsla(0, 0%, 0%, 0);
  border-bottom: 39px solid hsl(0, 0%, 88%);
  border-top: 37px solid hsla(0, 0%, 0%, 0);
  left: 109px;
  bottom: 0;
}
.bottom_right.curvable:after {
  position: absolute;
  content: "";
  border-left: 92px solid hsla(0, 0%, 0%, 0);
  border-bottom: 39px solid hsl(0, 0%, 88%);
  border-top: 37px solid hsla(0, 0%, 0%, 0);
  left: -92px;
  bottom: 0;
}
#wind_container.beginning {
  transform: rotateY(180deg);
}
#wind_container.hover {
  transform: rotateX(54deg) rotateY(-10deg) rotateZ(25deg);
  transition-delay: 0.5s;
}
#wind_container.hover #left-wing {
  transform: rotateY(60deg);
}
#wind_container.hover #right-wing {
  transform: rotateY(-60deg);
}
#wind_container.hover .wing1 {
  transform: translateY(-38px) translateX(8px) rotateZ(22.62deg) rotateY(-60deg)
    skewY(-22.62deg);
  border-right: 100px solid hsl(0, 0%, 95%);
}
#wind_container.hover .wing2 {
  border-left: 100px solid hsl(0, 0%, 85%);
}
#wind_container.hover .wing3 {
  border-right: 100px solid hsl(0, 0%, 71%);
}
#wind_container.hover .wing4 {
  transform: translateY(-38px) translateX(-8px) rotateZ(-22.62deg)
    rotateY(60deg) skewY(20deg);
  border-left: 100px solid hsl(0, 0%, 95%);
}
#wind_container.hover .wing {
  backface-visibility: visible;
}
#wind_container.hover .curved {
  display: none;
}
#wind_container.hover.fly_away_first {
  transform: translatex(-100px) translateZ(300px) rotateX(42deg) rotateY(-11deg)
    rotateZ(27deg);
  transition-delay: 0;
  transition-duration: 0.4s;
  transition-timing-function: ease-out;
}
#wind_container.hover.fly_away_first.fly_away {
  transform: translateX(600px) translateY(-400px) translateZ(-5000px)
    rotateX(66deg) rotateY(-12deg) rotateZ(36deg);
  transition: transform 2s ease-out, opacity 1.5s 0.5s linear;
  opacity: 0;
}
</style>
