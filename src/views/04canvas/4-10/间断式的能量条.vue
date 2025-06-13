<template>
  <div class="grid-container">
    <div class="member-card" v-for="(member, index) in members" :key="index">
      <canvas :id="'canvas-' + index" width="150" height="150"></canvas>
      <div class="circle">
        <img :src="member.avatar" alt="avatar" class="avatar" />
      </div>
    </div>
  </div>
</template>

<script setup>
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";
import img5 from "/@/assets/beauty/1/1-5.jpg";
import img6 from "/@/assets/beauty/1/1-6.jpg";
import img7 from "/@/assets/beauty/1/1-7.jpg";
import img8 from "/@/assets/beauty/1/1-8.jpg";
import img9 from "/@/assets/beauty/1/1-9.jpg";
import img10 from "/@/assets/beauty/1/1-10.jpg";
import img11 from "/@/assets/beauty/1/1-11.jpg";
import img12 from "/@/assets/beauty/1/1-12.jpg";

const members = ref([]);

const imgList = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

onMounted(() => {
  for (let i = 0; i < 11; i++) {
    members.value.push({
      name: "用户" + i,
      avatar: imgList[i],
      numbers: Math.floor(Math.random() * 10 + 1),
    });
  }
  nextTick(() => {
    members.value.forEach((member, index) => {
      drawEnergyBar(index, member.numbers); // 使用member.numbers作为参数
    });
  });
});

function drawEnergyBar(index, count) {
  console.log("index", index);
  console.log("count", count);
  const canvas = document.getElementById(`canvas-${index}`);
  console.log("canvas", canvas);
  const ctx = canvas.getContext("2d");

  // 重置画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制设置
  // 将canvas的坐标轴移到中间
  ctx.translate(canvas.width / 2, canvas.height / 2);
  // 将坐标轴反向转动90度
  ctx.rotate(-Math.PI / 2);

  // 设置画笔的颜色
  ctx.strokeStyle = "rgb(144, 211, 205)";
  // 这里是设置画笔的宽度，也就是能量条的宽度
  ctx.lineWidth = 60;
  //这里设置画笔结束的位置是圆的直的还是弯的
  ctx.lineCap = "butt";

  // 根据传入的count值绘制线段
  for (let i = 0; i < count; i++) {
    ctx.beginPath();
    // 绘制小段圆弧 (角度改为弧度制)
    // 前两个位置是圆心，第三个是半径，第四个是开始角度，第五个是结束角度，第六个是是否逆时针
    ctx.arc(0, 0, 44, -Math.PI / 36, Math.PI / 36, false);
    ctx.stroke();
    // 这里坐标轴顺时针移动一定角度，如果想要格子更多就设的更小，上面画线的角度也要调小
    ctx.rotate(Math.PI / 16);
  }
}
</script>

<style scoped>
/* 修改canvas样式 */
canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  /* 作为背景层 */
}

.member-card {
  position: relative;
  width: 150px;
  height: 150px;
  /* 添加固定高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  border: rgb(144, 211, 205) solid 2px;
  border-radius: 50%;
  background-color: black;
  overflow: hidden;
}

.circle {
  position: relative;
  border: 2px solid black;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  /* 确保在画布上方 */
  margin: 0;
  /* 移除外边距 */
}

.grid-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 30px;
  max-width: calc(150px * 6 + 30px * 5);
  margin: 0 auto;
  background: url("/@/assets/hotel/1.jpg") no-repeat;
  background-size: 100% 100%;
}

.member-card {
  position: relative;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  border: rgb(144, 211, 205) solid 2px;
  border-radius: 50%;
  background-color: black;
}

.circle {
  position: relative;
  border: 2px solid black;
  margin: 20px 20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
</style>
