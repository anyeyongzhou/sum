<template>
  <div class="brand-wall">
    <ul class="icon-wall">
      <li
        v-for="(brand, index) in visibleBrands"
        :key="brand.id"
        @mouseenter="hoverIndex = index"
        @mouseleave="hoverIndex = null"
      >
        <div
          class="img-3d"
          :style="get3DStyle(index)"
          @click="toggle3DEffect(index)"
        >
          <div class="img-back">
            <img :src="brand.backImage" :alt="brand.name" />
          </div>
          <div class="img-front">
            <img :src="brand.frontImage" :alt="brand.name" />
          </div>
        </div>
        <div class="mask" :style="{ opacity: hoverIndex === index ? 1 : 0 }">
          <img :src="heartImage" alt="关注" />
          <p>关注人数 {{ brand.followers }}万</p>
          <a href="javascript:">点击进入</a>
        </div>
      </li>
      <li class="refresh-btn" @click="refreshBrands">
        <div
          class="icon-refresh"
          :style="{ transform: `rotate(${rotateDegrees}deg)` }"
        ></div>
        <span>换一批</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 导入图片资源
const heartImage = new URL("./images/heart.png", import.meta.url).href;
const refreshImage = new URL("./images/refresh.png", import.meta.url).href;
const refreshWhiteImage = new URL("./images/refresh-white.png", import.meta.url)
  .href;

// 品牌数据
const brands = ref([
  {
    id: 1,
    name: "品牌1",
    backImage: new URL("./images/icon1.jpg", import.meta.url).href,
    frontImage: new URL("./images/icon11.jpg", import.meta.url).href,
    followers: 323.4,
  },
  {
    id: 2,
    name: "品牌2",
    backImage: new URL("./images/icon2.jpg", import.meta.url).href,
    frontImage: new URL("./images/icon12.jpg", import.meta.url).href,
    followers: 323.4,
  },
  {
    id: 3,
    name: "品牌3",
    backImage: new URL("./images/icon3.jpg", import.meta.url).href,
    frontImage: new URL("./images/icon13.jpg", import.meta.url).href,
    followers: 323.4,
  },
  // 添加更多品牌数据...
]);

const rotateDegrees = ref(0);
const hoverIndex = ref(null);
const flippedIndices = ref([]);
const currentPage = ref(0);
const itemsPerPage = 24;

// 计算当前显示的品牌
const visibleBrands = computed(() => {
  const start = currentPage.value * itemsPerPage;
  return brands.value.slice(start, start + itemsPerPage);
});

// 获取3D翻转样式
const get3DStyle = index => {
  const isFlipped = flippedIndices.value.includes(index);
  return {
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
    transition: "transform 0.3s linear",
  };
};

// 切换3D效果
const toggle3DEffect = index => {
  if (flippedIndices.value.includes(index)) {
    flippedIndices.value = flippedIndices.value.filter(i => i !== index);
  } else {
    flippedIndices.value.push(index);
  }
};

// 刷新品牌列表
const refreshBrands = () => {
  rotateDegrees.value += 360;
  currentPage.value =
    (currentPage.value + 1) % Math.ceil(brands.value.length / itemsPerPage);
  flippedIndices.value = [];
};
</script>

<style lang="scss" scoped>
.brand-wall {
  font-family: Arial, "Microsoft YaHei UI Light";
  width: 100% !important;
  max-width: 732px;
  margin: 0 auto;

  .icon-wall {
    background-color: #f0f0f0;
    overflow: hidden;
    padding-top: 1px;
    padding-left: 1px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 121px;
      height: 108px;
      float: left;
      margin-right: 1px;
      margin-bottom: 1px;
      position: relative;
      background-color: #fff;
      cursor: pointer;

      .img-3d {
        transform-style: preserve-3d;
        width: 100%;
        height: 100%;
        position: relative;

        .img-back,
        .img-front {
          position: absolute;
          left: 0;
          top: 0;
          background-color: #fff;
          width: 100%;
          height: 100%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
        }

        .img-back {
          transform: rotateY(180deg);
        }

        img {
          max-width: 100%;
          max-height: 100%;
          vertical-align: middle;
        }
      }

      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        transition: opacity 0.3s linear;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
          position: absolute;
          right: 8px;
          top: 8px;
        }

        p {
          font-size: 12px;
          color: #fff;
          margin-top: 10px;
          text-align: center;
        }

        a {
          color: #fff;
          text-decoration: none;
          font-size: 12px;
          background-color: red;
          width: 70px;
          display: block;
          margin: 5px auto 0;
          text-align: center;
          height: 18px;
          line-height: 18px;
          border-radius: 9px;
        }
      }
    }

    .refresh-btn {
      text-align: center;
      transition: background-color 0.3s linear, color 0.3s linear;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &:hover {
        color: #fff;
        background-color: #dd2727;

        .icon-refresh {
          background-image: v-bind("`url(${refreshWhiteImage})`");
        }
      }

      .icon-refresh {
        width: 28px;
        height: 28px;
        background: v-bind("`url(${refreshImage})`") no-repeat center;
        margin-bottom: 5px;
        transition: transform 0.3s linear;
      }

      span {
        font-size: 12px;
      }
    }
  }
}
</style>
