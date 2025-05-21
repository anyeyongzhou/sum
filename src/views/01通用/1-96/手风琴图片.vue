<template>
  <div class="wrapper">
    <ul class="wrapUl">
      <li
        v-for="(item, index) in items"
        :key="index"
        @click="change(index)"
        @mouseleave="init"
        :class="{ active: activeIndex === index }"
      >
        <div class="title">
          <h1>{{ item.title }}</h1>
        </div>
        <div class="picBox" :class="`picBox${index + 1}`"></div>
        <div class="decration">
          {{ item.description }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const items = ref([
  {
    title: "温泉酒店",
    description:
      "有谁不爱泡温泉？浸入雾气蒸腾的泉水之中，把身体泡成一片茶叶，舒展轻盈。有比这更美妙的感觉吗？",
  },
  {
    title: "时尚酒店",
    description:
      "浪漫，是香闺围笼，是灯火迷离，泪眼婆裟的唯美，是杨柳岸、晓风残月中的无语凝噎……",
  },
  {
    title: "设计师酒店",
    description:
      "前卫的酒店设计理念，独具魅力的风格，优美的自然风光才能有这样顶级的酒店",
  },
  {
    title: "青年旅店",
    description:
      "我为你煮一杯温茶，斟一杯美酒。让我们席地而坐，听你的梦想。用你的只言片语装点我们的梦想博物馆",
  },
  {
    title: "民宿客栈",
    description:
      "在这里，你可以静静发呆，而不被人打扰；在这里，你能看见最美好的星星，能让你找到最深的感动",
  },
  {
    title: "海岛酒店",
    description:
      "不过冬，厌倦沉重，就飞去热带的岛屿游泳，卸下包袱，放下压力，在这碧海蓝天之中",
  },
  {
    title: "海外酒店",
    description:
      "因地形地质的区别，世界各地的温泉也千差万别，选择一处适合自己的温泉，你会忘记世界",
  },
]);

const activeIndex = ref(0);
const flag = ref(true);

const init = () => {
  if (flag.value) {
    change(items.value.length - 1);
  }
};

const change = index => {
  activeIndex.value = index;
  if (index === items.value.length - 1) {
    flag.value = false;
  } else {
    flag.value = true;
  }
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
$background-color: #333;
$active-width: 400px;
$inactive-width: 14.2%;
$transition-duration: 300ms;

* {
  margin: 0;
  padding: 0;
  list-style: none;
}

body {
  background-color: $background-color;
}

.wrapper {
  width: 80%;
  margin: 50px auto;
  padding: 40px;
}

.wrapUl {
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;

  li {
    width: $inactive-width;
    height: 260px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: width $transition-duration linear;

    &.active {
      width: $active-width;
    }

    .title {
      position: absolute;
      overflow: hidden;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;

      h1 {
        color: #fff;
        font-size: 20px;
        opacity: 0.8;
      }
    }

    .picBox {
      width: 100%;
      height: 100%;

      &.picBox1 {
        background: url("/@/assets/hotel/1.jpg") no-repeat center 0;
      }

      &.picBox2 {
        background: url("/@/assets/hotel/2.jpg") no-repeat center 0;
      }

      &.picBox3 {
        background: url("/@/assets/hotel/3.jpg") no-repeat center 0;
      }

      &.picBox4 {
        background: url("/@/assets/hotel/4.jpg") no-repeat center 0;
      }

      &.picBox5 {
        background: url("/@/assets/hotel/5.jpg") no-repeat center 0;
      }

      &.picBox6 {
        background: url("/@/assets/hotel/6.jpg") no-repeat center 0;
      }

      &.picBox7 {
        background: url("/@/assets/hotel/7.jpg") no-repeat center 0;
      }
    }

    .decration {
      width: 400px;
      height: 40px;
      padding-left: 20px;
      padding-right: 30px;
      position: absolute;
      left: 0;
      bottom: -50px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      transition: bottom $transition-duration linear;

      &.active {
        bottom: 0;
      }
    }
  }
}
</style>
