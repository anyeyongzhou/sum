<template>
  <div class="modern-shop-container">
    <!-- 商品展示区 -->
    <div class="products-showcase">
      <div v-for="(item, index) in products" :key="index" class="product-item">
        <div class="product-image-wrapper">
          <img :src="item.image" :alt="item.name" />
          <div class="product-overlay">
            <div class="product-actions">
              <button
                class="action-btn cart-btn"
                @click="handleAddToCart($event)"
              >
                <span class="icon">🛒</span>
                <span class="text">加入购物车</span>
              </button>
              <button
                class="action-btn favorite-btn"
                @click="handleAddToFavorite($event)"
              >
                <span class="icon">❤️</span>
                <span class="text">收藏</span>
              </button>
            </div>
          </div>
        </div>
        <div class="product-details">
          <h3 class="product-name">{{ item.name }}</h3>
          <div class="product-meta">
            <span class="product-price">¥{{ item.price }}</span>
            <span class="product-sales">已售 {{ item.sales }}+</span>
          </div>
          <div class="product-tags">
            <span
              v-for="(tag, tagIndex) in item.tags"
              :key="tagIndex"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 侧边工具栏 -->
    <div class="floating-toolbar">
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon">
          <span class="icon">🏠</span>
        </div>
        <div class="toolbar-label">首页</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon">
          <span class="icon">🛒</span>
          <span class="badge" v-if="cartCount > 0">{{ cartCount }}</span>
        </div>
        <div class="toolbar-label">购物车</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon">
          <span class="icon">💳</span>
        </div>
        <div class="toolbar-label">钱包</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon">
          <span class="icon">📜</span>
        </div>
        <div class="toolbar-label">历史</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon">
          <span class="icon">❤️</span>
          <span class="badge" v-if="favoriteCount > 0">{{
            favoriteCount
          }}</span>
        </div>
        <div class="toolbar-label">收藏</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon">
          <span class="icon">💰</span>
        </div>
        <div class="toolbar-label">充值</div>
      </div>
      <div
        class="toolbar-item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="toolbar-icon">
          <span class="icon">💬</span>
        </div>
        <div class="toolbar-label">反馈</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";

// 商品数据
const products = [
  {
    name: "时尚连衣裙",
    price: 299,
    image: img1,
    sales: 1000,
    tags: ["新品", "热销", "包邮"],
  },
  {
    name: "休闲运动鞋",
    price: 399,
    image: img2,
    sales: 800,
    tags: ["限时", "折扣"],
  },
  {
    name: "真丝衬衫",
    price: 199,
    image: img3,
    sales: 500,
    tags: ["品质", "精选"],
  },
  {
    name: "牛仔外套",
    price: 459,
    image: img4,
    sales: 1200,
    tags: ["热卖", "推荐"],
  },
];

// 购物车和收藏夹数量
const cartCount = ref(0);
const favoriteCount = ref(0);

// 处理加入购物车
const handleAddToCart = event => {
  const productItem = event.target.closest(".product-item");
  const img = productItem.querySelector("img");
  const flyImg = img.cloneNode(true);
  flyImg.style.opacity = "0.6";
  document.querySelector(".modern-shop-container").appendChild(flyImg);

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
    const target = document.querySelector(".cart-btn");
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
  const productItem = event.target.closest(".product-item");
  const img = productItem.querySelector("img");
  const flyImg = img.cloneNode(true);
  flyImg.style.opacity = "0.6";
  document.querySelector(".modern-shop-container").appendChild(flyImg);

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
    const target = document.querySelector(".favorite-btn");
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
.modern-shop-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f8f9fa;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}

.products-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding-right: 80px;
}

.product-item {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.product-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-item:hover .product-image-wrapper img {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-item:hover .product-overlay {
  opacity: 1;
}

.product-actions {
  display: flex;
  gap: 15px;
}

.action-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  background: white;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 14px;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cart-btn {
  background: #4caf50;
  color: white;
}

.favorite-btn {
  background: #ff6b6b;
  color: white;
}

.product-details {
  padding: 20px;
}

.product-name {
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
  font-weight: 600;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.product-price {
  color: #ff6b6b;
  font-size: 20px;
  font-weight: bold;
}

.product-sales {
  color: #666;
  font-size: 14px;
}

.product-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  background: #f0f0f0;
  border-radius: 15px;
  font-size: 12px;
  color: #666;
}

.floating-toolbar {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: 16px 0 0 16px;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
}

.toolbar-item {
  position: relative;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toolbar-item:hover {
  background: #f8f9fa;
}

.toolbar-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.toolbar-icon .icon {
  font-size: 24px;
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
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}
</style>
