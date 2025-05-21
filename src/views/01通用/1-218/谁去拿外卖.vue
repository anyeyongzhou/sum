<template>
  <div class="roll-container">
    <div class="outdiv">
      <a href="javascript:void(0)" class="ico" @click="showModal = true">
        <img src="./img/logo.png" alt="logo" />
      </a>
    </div>

    <div class="mask" v-show="showModal">
      <div class="contents">
        <div class="head">
          <p>谁去拿外卖</p>
          <a href="#" @click="showModal = false">X</a>
        </div>
        <div class="cont-wapper">
          <div class="cont-inner">
            <h2></h2>
            <button
              @mousedown="handleMouseDown"
              @mouseup="handleMouseUp"
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
            ></button>
            <div class="sign">随机到最小数字的人去拿外卖</div>
            <ul>
              <li
                v-for="(num, index) in numberList"
                :key="index"
                :class="{ 'takeout-list': index === minIndex }"
              >
                扔出了一个{{ num }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const showModal = ref(false);
const numberList = ref([]);
const minIndex = ref(-1);

// 生成随机数
const generateNumber = () => {
  const num = Math.floor(Math.random() * 100);
  if (numberList.value.length > 0 && num === Math.min(...numberList.value)) {
    return generateNumber();
  }
  return num;
};

// 更新数字列表
const updateNumberList = () => {
  const num = generateNumber();
  numberList.value.push(num);

  if (numberList.value.length > 11) {
    const min = Math.min(...numberList.value);
    const index = numberList.value.indexOf(min);

    if (num > min && index === 0) {
      numberList.value.splice(1, 1);
    } else {
      numberList.value.shift();
    }
  }

  minIndex.value = numberList.value.indexOf(Math.min(...numberList.value));
};

// 按钮事件处理
const handleMouseDown = event => {
  event.target.style.backgroundPosition = "0 -80px";
  updateNumberList();
};

const handleMouseUp = event => {
  event.target.style.backgroundPosition = "0 -40px";
};

const handleMouseEnter = event => {
  event.target.style.backgroundPosition = "0 -40px";
};

const handleMouseLeave = event => {
  event.target.style.backgroundPosition = "0 0";
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
}

body {
  background: #f7f7f7;
}

.outdiv {
  position: relative;
  width: 90%;
  height: 100px;
  top: 150px;
  margin: 0 auto;
  border: 1px solid #e6e6e6;
  background: white;
}

.ico {
  position: absolute;
  display: block;
  width: 186px;
  height: 55px;
  right: 0;
  top: -50px;
}

.ico img {
  width: 100%;
  height: 100%;
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.contents {
  position: absolute;
  top: 54px;
  left: 50%;
  width: 360px;
  border: 1px solid gray;
  border-radius: 5px;
  transform: translateX(-50%);
  background: white;
}

.head {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #eee;
  height: 44px;
}

.head p {
  float: left;
}

.head a {
  float: right;
  width: 16px;
  line-height: 24px;
  color: #ccc;
}

.head a:hover {
  color: blue;
}

.cont-wapper {
  width: 300px;
  color: #555;
  padding: 15px;
  margin: 0 auto;
}

.cont-wapper .cont-inner {
  font-size: 12px;
  background: #dbf0fa;
  padding-top: 15px;
  margin: 0 auto 10px;
}

.cont-wapper .cont-inner h2 {
  width: 186px;
  height: 188px;
  margin: 0 auto;
  background: url(./img/ico.png) 0 -120px no-repeat;
}

.cont-wapper .cont-inner button {
  display: block;
  cursor: pointer;
  width: 271px;
  height: 40px;
  border: 0;
  background: url(./img/ico.png) 0 0 no-repeat;
  margin: -45px auto 15px;
}

.cont-wapper .cont-inner .sign {
  position: relative;
  text-align: center;
  color: #777;
  margin-bottom: 10px;
}

.cont-wapper .cont-inner .sign::after {
  content: "";
  display: block;
  position: absolute;
  width: 40px;
  height: 7px;
  background: #ccc;
  right: 16px;
  top: 5px;
}

.cont-wapper .cont-inner .sign::before {
  content: "";
  display: block;
  position: absolute;
  width: 40px;
  height: 7px;
  background: #ccc;
  left: 16px;
  top: 5px;
}

.cont-wapper .cont-inner ul {
  height: 180px;
  margin: 0 10px;
  padding: 5px 5px 0 5px;
  overflow: hidden;
}

.cont-wapper li.takeout-list {
  color: #fe5a23;
  font-weight: 600;
  height: 19px;
  line-height: 19px;
  background: url(./img/ico.png) 0 -320px no-repeat;
}

.cont-wapper li {
  padding-left: 5px;
}

.cont-wapper .cont-inner button:hover {
  background-position: 0 -40px;
}
</style>
