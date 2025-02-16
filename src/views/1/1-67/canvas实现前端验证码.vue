<template>
  <div class="home">
    <div class="containers">
      <div class="baibai">
        <div class="verificationCode" @click="randomOption">
          <canvas ref="canvas" width="100" height="50"></canvas>
        </div>
        <label style="line-height: 50px; height: 50px; margin: 0 15px"
          >正确答案</label
        >
        <input class="inputNumber" v-model="inputValue" type="number" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 绑定输入框的值
const inputValue = ref("");

// 画布和上下文
const canvas = ref(null);
const ctx = ref(null);

// 上一次旋转角度
const preRotateDeg = ref([[0, 0, 0]]);

// 组件挂载后初始化画布
onMounted(() => {
  ctx.value = canvas.value.getContext("2d");
  randomOption();
});

const randomto16Sting = () => {
  return "#" + parseInt(randomNumber(0xffffff)).toString(16);
};

const randomNumber = number => {
  return Math.random() * number;
};

const randomRotate = () => {
  let arr = [];
  let arr1 = [];
  let count = 0;

  while (count < 3) {
    switch (count) {
      case 0:
        arr.push(randomNumber(10));
        break;
      case 1:
        arr.push(randomNumber(10));
        break;
      case 2:
        arr.push(randomNumber(10));
        let sum = arr.reduce((a, b) => a + b, 0);
        if (Math.max(...arr) / sum > 0.6) {
          arr[arr.indexOf(Math.max(...arr))] = -sum / (sum * 0.6);
        } else {
          arr[arr.indexOf(Math.max(...arr))] = -Math.max(...arr);
        }

        arr1 = arr.map(element => {
          return element * (Math.PI / 180);
        });

        break;
      default:
        break;
    }
    count++;
  }

  preRotateDeg.value.unshift(arr1);
  return arr1;
};

const drawArc = randomRange => {
  let x = randomNumber(canvas.value.width);
  let y = randomNumber(canvas.value.height);
  let r = randomNumber(randomRange) + 2;
  let to16Sting = randomto16Sting();
  ctx.value.beginPath();
  ctx.value.arc(x, y, r, 0, Math.PI * 2);
  ctx.value.fillStyle = to16Sting;
  ctx.value.fill();
  ctx.value.strokeStyle = to16Sting;
  ctx.value.lineWidth = 1;
  ctx.value.stroke();
  ctx.value.closePath();
};

const drawLine = randomRange => {
  ctx.value.beginPath();
  let x1 = randomNumber(canvas.value.width - 10) + 10;
  let y1 = randomNumber(canvas.value.height - 10) + 10;
  let x2 = randomNumber(canvas.value.width - 10) + 10;
  let y2 = randomNumber(canvas.value.height - 10) + 10;
  ctx.value.moveTo(x1, y1);
  ctx.value.lineTo(x2, y2);
  ctx.value.strokeStyle = randomto16Sting();
  ctx.value.lineWidth = randomNumber(randomRange) + 1;
  ctx.value.stroke();
  ctx.value.closePath();
};

const drawText = dataArray => {
  ctx.value.font = "26px Gaoel";
  ctx.value.textAlign = "center";
  ctx.value.textBaseline = "middle";
  let rotateNumber = randomRotate();

  ctx.value.rotate(-preRotateDeg.value[1][0]);
  ctx.value.rotate(rotateNumber[0]);
  ctx.value.fillText(dataArray[0], 20, 25);
  ctx.value.fillStyle = randomto16Sting();

  ctx.value.rotate(-preRotateDeg.value[1][1]);
  ctx.value.rotate(rotateNumber[1]);
  ctx.value.fillText(dataArray[1], 50, 25);
  ctx.value.fillStyle = randomto16Sting();

  ctx.value.rotate(-preRotateDeg.value[1][2]);
  ctx.value.rotate(rotateNumber[2]);
  ctx.value.fillText(dataArray[2], 80, 25);
  ctx.value.fillStyle = randomto16Sting();
};

const randomOption = () => {
  let firstNumber = Math.ceil(Math.random(1) * 10);
  let operationNumber = Math.ceil(Math.random() * 4);
  let secondNumber = Math.ceil(Math.random(1) * 10);
  let answer = 0;
  let mul = 0; //交互使用
  let operation = "";

  switch (operationNumber) {
    case 1:
      operation = "+";
      answer = firstNumber + secondNumber;
      break;
    case 2:
      operation = "-";
      if (firstNumber < secondNumber) {
        mul = firstNumber;
        firstNumber = secondNumber;
        secondNumber = mul;
      }
      answer = firstNumber - secondNumber;
      break;
    case 3:
      operation = "×";
      answer = firstNumber * secondNumber;
      break;
    case 4:
      operation = "÷";
      let answerFirst = firstNumber * secondNumber;
      mul = firstNumber;
      firstNumber = answerFirst;
      answer = mul;
      break;
    default:
      break;
  }

  let dataArray = [firstNumber, operation, secondNumber, answer];
  inputValue.value = dataArray[3];

  // 清除画布
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  for (let index = 0; index < 60; index++) {
    // 画球,传画球的半径（范围）
    drawArc(15);
  }

  for (let index = 0; index < 6; index++) {
    // 画线,传画线的线宽（范围）
    drawLine(4);
  }

  // 画显示文字
  drawText(dataArray);
};
</script>

<style lang="scss" scoped>
.home {
  height: 110%;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow-y: scroll;

  .containers {
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;

    /* 编写CSS begin */
    .baibai {
      display: flex;
      margin: 0 auto;
      .verificationCode {
        width: 100px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        cursor: pointer;
      }
      .inputNumber {
        padding: 9px;
        width: 70px;
        margin-left: 15px;
        font-size: 24px;
      }

      .inputNumber::-webkit-inner-spin-button {
        appearance: none;
      }
    }
    /* 编写CSS end */
  }
}
</style>
