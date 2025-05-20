<template>
  <div class="shop-cart-container">
    <!-- 商品展示区 -->
    <div class="products-grid">
      <div v-for="(item, index) in products" :key="index" class="product-card">
        <div class="product-image">
          <img :src="item.image" :alt="item.name" />
        </div>
        <div class="product-info">
          <h3>{{ item.name }}</h3>
          <p class="price">¥{{ item.price }}</p>
          <div class="action-buttons">
            <button class="add-to-cart" @click="handleAddToCart($event)">
              <i class="cart-icon"></i>
              加入购物车
            </button>
            <button
              class="add-to-favorite"
              @click="handleAddToFavorite($event)"
            >
              <i class="heart-icon"></i>
              收藏
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 侧边工具栏 -->
    <div class="side-toolbar">
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon home-icon"></div>
        <div class="toolbar-label">首页</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon cart-icon">
          <span class="badge">{{ cartCount }}</span>
        </div>
        <div class="toolbar-label">购物车</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon wallet-icon"></div>
        <div class="toolbar-label">钱包</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon history-icon"></div>
        <div class="toolbar-label">历史</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon favorite-icon">
          <span class="badge">{{ favoriteCount }}</span>
        </div>
        <div class="toolbar-label">收藏</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon recharge-icon"></div>
        <div class="toolbar-label">充值</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon feedback-icon"></div>
        <div class="toolbar-label">反馈</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import img4 from "./img/4.png";

// 商品数据
const products = [
  { name: "时尚连衣裙", price: 299, image: img1 },
  { name: "休闲运动鞋", price: 399, image: img2 },
  { name: "真丝衬衫", price: 199, image: img3 },
  { name: "牛仔外套", price: 459, image: img4 },
];

// 购物车和收藏夹数量
const cartCount = ref(0);
const favoriteCount = ref(0);

// 处理加入购物车
const handleAddToCart = event => {
  const productCard = event.target.closest(".product-card");
  const img = productCard.querySelector("img");
  const flyImg = img.cloneNode(true);
  flyImg.style.opacity = "0.6";
  document.querySelector(".shop-cart-container").appendChild(flyImg);

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
    const target = document.querySelector(".cart-icon");
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
          left: `${targetRect.left}px`,
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
  const productCard = event.target.closest(".product-card");
  const img = productCard.querySelector("img");
  const flyImg = img.cloneNode(true);
  flyImg.style.opacity = "0.6";
  document.querySelector(".shop-cart-container").appendChild(flyImg);

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
    const target = document.querySelector(".favorite-icon");
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
          left: `${targetRect.left}px`,
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
  const toolbarItem = event.currentTarget;
  const label = toolbarItem.querySelector(".toolbar-label");

  label.animate(
    [
      { transform: "translateX(20px)", opacity: 0 },
      { transform: "translateX(0)", opacity: 1 },
    ],
    {
      duration: 300,
      fill: "forwards",
    }
  );
};

// 处理鼠标离开
const handleMouseLeave = event => {
  const toolbarItem = event.currentTarget;
  const label = toolbarItem.querySelector(".toolbar-label");

  label.animate(
    [
      { transform: "translateX(0)", opacity: 1 },
      { transform: "translateX(20px)", opacity: 0 },
    ],
    {
      duration: 300,
      fill: "forwards",
    }
  );
};
</script>

<style scoped>
.shop-cart-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding-right: 60px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 15px;
}

.product-info h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #333;
}

.price {
  color: #ff6b6b;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.action-buttons button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.3s;
}

.add-to-cart {
  background-color: #4caf50;
  color: white;
}

.add-to-favorite {
  background-color: #ff6b6b;
  color: white;
}

.action-buttons button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.side-toolbar {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: 12px 0 0 12px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
}

.toolbar-item {
  position: relative;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toolbar-item:hover {
  background-color: #f5f5f5;
}

.toolbar-icon {
  width: 24px;
  height: 24px;
  margin: 0 auto;
  position: relative;
}

.toolbar-label {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 5px;
  opacity: 0;
  transform: translateX(20px);
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff6b6b;
  color: white;
  font-size: 12px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

/* 图标样式 */
.home-icon {
  background: url("./icons/home.png") no-repeat center/contain;
}
.cart-icon {
  background: url("./icons/cart.png") no-repeat center/contain;
}
.wallet-icon {
  background: url("./icons/wallet.png") no-repeat center/contain;
}
.history-icon {
  background: url("./icons/history.png") no-repeat center/contain;
}
.favorite-icon {
  background: url("./icons/favorite.png") no-repeat center/contain;
}
.recharge-icon {
  background: url("./icons/recharge.png") no-repeat center/contain;
}
.feedback-icon {
  background: url("./icons/feedback.png") no-repeat center/contain;
}
</style>
