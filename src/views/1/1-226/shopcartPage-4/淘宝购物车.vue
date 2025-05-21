<template>
  <div class="fashion-shop-container">
    <!-- 商品展示区 -->
    <div class="products-gallery">
      <div v-for="(item, index) in products" :key="index" class="product-card">
        <div class="product-image-container">
          <img :src="item.image" :alt="item.name" />
          <div class="product-overlay">
            <div class="product-actions">
              <button
                class="action-button cart-button"
                @click="handleAddToCart($event)"
              >
                <span class="button-icon">🛒</span>
                <span class="button-text">加入购物车</span>
              </button>
              <button
                class="action-button favorite-button"
                @click="handleAddToFavorite($event)"
              >
                <span class="button-icon">❤️</span>
                <span class="button-text">收藏</span>
              </button>
            </div>
          </div>
          <div class="product-badge" v-if="item.isNew">新品</div>
          <div class="product-badge discount" v-if="item.discount">
            {{ item.discount }}折
          </div>
        </div>
        <div class="product-info">
          <div class="product-header">
            <h3 class="product-title">{{ item.name }}</h3>
            <div class="product-rating">
              <span class="stars">★★★★★</span>
              <span class="rating-count">({{ item.rating }})</span>
            </div>
          </div>
          <div class="product-meta">
            <div class="price-section">
              <span class="current-price">¥{{ item.price }}</span>
              <span class="original-price" v-if="item.originalPrice"
                >¥{{ item.originalPrice }}</span
              >
            </div>
            <div class="sales-info">
              <span class="sales-count">已售 {{ item.sales }}+</span>
              <span
                class="stock-status"
                :class="{ 'low-stock': item.stock < 10 }"
              >
                库存: {{ item.stock }}
              </span>
            </div>
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
    originalPrice: 399,
    image: img1,
    sales: 1000,
    rating: 4.8,
    stock: 50,
    tags: ["新品", "热销", "包邮"],
    isNew: true,
    discount: 7.5,
  },
  {
    name: "休闲运动鞋",
    price: 399,
    originalPrice: 499,
    image: img2,
    sales: 800,
    rating: 4.9,
    stock: 8,
    tags: ["限时", "折扣"],
    discount: 8,
  },
  {
    name: "真丝衬衫",
    price: 199,
    image: img3,
    sales: 500,
    rating: 4.7,
    stock: 30,
    tags: ["品质", "精选"],
  },
  {
    name: "牛仔外套",
    price: 459,
    originalPrice: 599,
    image: img4,
    sales: 1200,
    rating: 4.9,
    stock: 5,
    tags: ["热卖", "推荐"],
    discount: 7.5,
  },
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
  document.querySelector(".fashion-shop-container").appendChild(flyImg);

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
    const target = document.querySelector(".cart-button");
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
  document.querySelector(".fashion-shop-container").appendChild(flyImg);

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
    const target = document.querySelector(".favorite-button");
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
.fashion-shop-container {
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
}

.products-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  padding-right: 80px;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
}

.product-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image-container img {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-actions {
  display: flex;
  gap: 15px;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.product-card:hover .product-actions {
  transform: translateY(0);
}

.action-button {
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  background: white;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cart-button {
  background: #4caf50;
  color: white;
}

.favorite-button {
  background: #ff6b6b;
  color: white;
}

.product-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 6px 12px;
  background: #4caf50;
  color: white;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
}

.product-badge.discount {
  background: #ff6b6b;
  left: auto;
  right: 15px;
}

.product-info {
  padding: 20px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.product-title {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
  line-height: 1.4;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 5px;
}

.stars {
  color: #ffd700;
  font-size: 14px;
}

.rating-count {
  color: #666;
  font-size: 12px;
}

.product-meta {
  margin-bottom: 15px;
}

.price-section {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
}

.current-price {
  color: #ff6b6b;
  font-size: 24px;
  font-weight: bold;
}

.original-price {
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
}

.sales-info {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 12px;
}

.stock-status {
  color: #4caf50;
}

.stock-status.low-stock {
  color: #ff6b6b;
}

.product-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  background: #f5f5f5;
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
  border-radius: 20px 0 0 20px;
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
