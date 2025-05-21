<template>
  <div class="wrapper">
    <div class="imgBox">
      <ul>
        <li v-for="(item, index) in products" :key="index">
          <img :src="item.image" :alt="item.name" />
          <button class="btn1" @click="handleAddToCart($event)">
            加入购物车
          </button>
          <button class="btn2" @click="handleAddToFavorite($event)">
            加入收藏夹
          </button>
        </li>
      </ul>
    </div>
    <div class="rightBox">
      <ul class="rightBox-ul">
        <li
          class="fir"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <a href="javascript:void(0)"></a>
          <div class="fir-leftBox"></div>
        </li>
        <li
          class="sec"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <a href="javascript:void(0)">
            <i></i>
            <div class="con">购物车</div>
            <span id="btn1-add">{{ cartCount }}</span>
          </a>
          <div class="leftBox">我的购物车</div>
        </li>
        <li
          class="thir"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <a href="javascript:void(0)"></a>
          <div class="leftBox">我的资产</div>
        </li>
        <li
          class="four"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <a href="javascript:void(0)"></a>
          <div class="leftBox">我的足迹</div>
        </li>
        <li
          class="fif"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <a href="javascript:void(0)">
            <i></i>
            <span id="btn2-add">{{ favoriteCount }}</span>
          </a>
          <div class="leftBox">我的收藏</div>
        </li>
        <li
          class="six"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <a href="javascript:void(0)"></a>
          <div class="leftBox">我要充值</div>
        </li>
        <li
          class="seven"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <a href="javascript:void(0)"></a>
          <div class="sev-leftBox"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import img1 from "./pic1.jpg";
import img2 from "./pic2.jpg";

// 商品数据
const products = [
  { name: "商品1", image: img1 },
  { name: "商品2", image: img2 },
];

// 购物车和收藏夹数量
const cartCount = ref(0);
const favoriteCount = ref(0);

// 处理加入购物车
const handleAddToCart = event => {
  const img = event.target.parentElement.querySelector("img");
  const flyImg = img.cloneNode(true);
  flyImg.style.opacity = "0.6";
  document.querySelector(".wrapper").appendChild(flyImg);

  // 设置初始样式
  flyImg.style.cssText = `
    z-index: 999;
    border: 3px solid #fff;
    position: absolute;
    height: ${img.offsetHeight}px;
    width: ${img.offsetWidth}px;
    top: ${img.getBoundingClientRect().top}px;
    left: ${img.getBoundingClientRect().left}px;
  `;

  // 第一步动画：缩小并变圆
  flyImg.animate(
    [
      {
        width: `${img.offsetWidth}px`,
        height: `${img.offsetHeight}px`,
        borderRadius: "0",
      },
      {
        width: "50px",
        height: "50px",
        borderRadius: "100%",
      },
    ],
    {
      duration: 500,
      fill: "forwards",
    }
  ).onfinish = () => {
    // 第二步动画：飞向购物车
    const target = document.querySelector("#btn1-add");
    const targetRect = target.getBoundingClientRect();

    flyImg.animate(
      [
        {
          top: `${img.getBoundingClientRect().top}px`,
          left: `${img.getBoundingClientRect().left}px`,
          width: "50px",
          height: "50px",
        },
        {
          top: `${targetRect.top}px`,
          left: `${
            document.documentElement.clientWidth -
            document.querySelector(".rightBox").offsetWidth
          }px`,
          width: "0",
          height: "0",
        },
      ],
      {
        duration: 1500,
        fill: "forwards",
      }
    ).onfinish = () => {
      flyImg.remove();
      cartCount.value++;
    };
  };
};

// 处理加入收藏夹
const handleAddToFavorite = event => {
  const img = event.target.parentElement.querySelector("img");
  const flyImg = img.cloneNode(true);
  flyImg.style.opacity = "0.6";
  document.querySelector(".wrapper").appendChild(flyImg);

  // 设置初始样式
  flyImg.style.cssText = `
    z-index: 999;
    border: 3px solid #fff;
    position: absolute;
    height: ${img.offsetHeight}px;
    width: ${img.offsetWidth}px;
    top: ${img.getBoundingClientRect().top}px;
    left: ${img.getBoundingClientRect().left}px;
  `;

  // 第一步动画：缩小并变圆
  flyImg.animate(
    [
      {
        width: `${img.offsetWidth}px`,
        height: `${img.offsetHeight}px`,
        borderRadius: "0",
      },
      {
        width: "50px",
        height: "50px",
        borderRadius: "100%",
      },
    ],
    {
      duration: 500,
      fill: "forwards",
    }
  ).onfinish = () => {
    // 第二步动画：飞向收藏夹
    const target = document.querySelector("#btn2-add");
    const targetRect = target.getBoundingClientRect();

    flyImg.animate(
      [
        {
          top: `${img.getBoundingClientRect().top}px`,
          left: `${img.getBoundingClientRect().left}px`,
          width: "50px",
          height: "50px",
        },
        {
          top: `${targetRect.top}px`,
          left: `${
            document.documentElement.clientWidth -
            document.querySelector(".rightBox").offsetWidth
          }px`,
          width: "0",
          height: "0",
        },
      ],
      {
        duration: 1500,
        fill: "forwards",
      }
    ).onfinish = () => {
      flyImg.remove();
      favoriteCount.value++;
    };
  };
};

// 处理鼠标悬停
const handleMouseEnter = event => {
  const leftBox = event.currentTarget.querySelector(".leftBox");
  const firLeftBox = event.currentTarget.querySelector(".fir-leftBox");
  const sevLeftBox = event.currentTarget.querySelector(".sev-leftBox");

  leftBox?.animate([{ left: "-121px" }, { left: "-90px" }], {
    duration: 300,
    fill: "forwards",
  });

  if (firLeftBox) firLeftBox.classList.add("show");
  if (sevLeftBox) sevLeftBox.classList.add("show");
};

// 处理鼠标离开
const handleMouseLeave = event => {
  const leftBox = event.currentTarget.querySelector(".leftBox");
  const firLeftBox = event.currentTarget.querySelector(".fir-leftBox");
  const sevLeftBox = event.currentTarget.querySelector(".sev-leftBox");

  leftBox?.animate([{ left: "-90px" }, { left: "-121px" }], {
    duration: 300,
    fill: "forwards",
  });

  if (firLeftBox) firLeftBox.classList.remove("show");
  if (sevLeftBox) sevLeftBox.classList.remove("show");
};
</script>

<style scoped>
.wrapper {
  width: 100% !important;
  height: 100%;
  position: relative;
}

.imgBox {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.imgBox ul {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.imgBox li {
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
}

.imgBox img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.imgBox button {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #409eff;
  color: white;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
}

.imgBox li:hover button {
  opacity: 1;
}

.btn2 {
  bottom: 40px !important;
  background-color: #67c23a !important;
}

.rightBox {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.rightBox-ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rightBox-ul li {
  position: relative;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.rightBox-ul li a {
  display: block;
  width: 100%;
  height: 100%;
  color: #333;
  text-decoration: none;
}

.rightBox-ul li i {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #409eff;
  border-radius: 50%;
}

.rightBox-ul li span {
  position: absolute;
  top: 5px;
  right: 5px;
  min-width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  background-color: #f56c6c;
  color: white;
  border-radius: 8px;
  font-size: 12px;
}

.leftBox {
  position: absolute;
  left: -121px;
  top: 0;
  width: 90px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333;
}

.fir-leftBox,
.sev-leftBox {
  position: absolute;
  left: -121px;
  width: 30px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s;
}

.fir-leftBox.show,
.sev-leftBox.show {
  opacity: 1;
}
</style>
