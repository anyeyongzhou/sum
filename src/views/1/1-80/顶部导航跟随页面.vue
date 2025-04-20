<template>
  <div
    class="header"
    :style="{
      backgroundColor: scrollTop > 0 || navActive > 1 ? '#fff' : 'transparent',
    }"
  >
    <div class="header-box">
      <div class="logo-container">logo</div>
      <div class="nav-box">
        <div
          v-for="item in navList"
          :key="item.value"
          :class="['nav-item', navActive === item.value ? 'active' : '']"
          @click="goAnchor(item.id, item.value)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
  <div class="box-col" id="box" ref="scrollContainer">
    <div id="part1" ref="part1">核心产品</div>
    <div id="part2" ref="part2">应用场景</div>
    <div id="part3" ref="part3">服务领域</div>
    <div id="part4" ref="part4">联系我们</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// 响应式数据
const scrollTop = ref(0);
const navClickFlag = ref(false);
const navActive = ref(1);
const offTopLs = ref([]);
const scrollContainer = ref(null);

// 导航列表数据
const navList = [
  {
    label: "核心产品",
    value: 1,
    id: "part1",
  },
  {
    label: "应用场景",
    value: 2,
    id: "part2",
  },
  {
    label: "服务领域",
    value: 3,
    id: "part3",
  },
  {
    label: "联系我们",
    value: 4,
    id: "part4",
  },
];

// 获取各锚点的高度
const getOffTop = () => {
  const offsets = [];
  navList.forEach(item => {
    const element = document.getElementById(item.id);
    if (element) offsets.push(element.offsetTop);
  });
  offTopLs.value = offsets;
};

// 处理滚动事件
const handleScroll = event => {
  if (!navClickFlag.value && scrollContainer.value) {
    const scTop = scrollContainer.value.scrollTop;
    scrollTop.value = scTop;

    offTopLs.value.forEach((element, index) => {
      const offsetTop = scrollContainer.value.offsetTop + 88;
      if (scTop + offsetTop >= element) {
        navActive.value = index + 1;
      }

      // 滚动到底部，高亮最后一个
      if (
        scTop + scrollContainer.value.clientHeight >=
        scrollContainer.value.scrollHeight
      ) {
        navActive.value = navList.length;
      }
    });
  }
};

// 锚点导航跳转
const goAnchor = (keyId, val) => {
  if (navClickFlag.value || navActive.value === val) return;
  if (val === 1) scrollTop.value = 0;

  navClickFlag.value = true;
  navActive.value = val;

  const targetElement = document.getElementById(keyId);
  if (targetElement && scrollContainer.value) {
    const offsetTop = targetElement.offsetTop;
    scrollContainer.value.scrollTo({
      top: offsetTop - 88,
      behavior: "smooth",
    });
  }

  setTimeout(() => {
    navClickFlag.value = false;
  }, 1000);
};

// 生命周期钩子
onMounted(() => {
  scrollContainer.value.addEventListener("scroll", handleScroll);
  getOffTop();
});

onBeforeUnmount(() => {
  scrollContainer.value.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss">
html {
  overflow: hidden;
}

.box-col {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.header {
  width: 100vw;
  background-color: #fff;
  height: 88px;
  position: fixed;
  z-index: 10;
  transition: background-color 0.3s;

  &-box {
    width: 1440px;
    height: 100%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;

    .logo-container {
      width: 199px;
      height: 42px;
      font-size: 24px;
    }

    .nav-box {
      margin-left: 10px;
      display: flex;

      .nav-item {
        color: #000000;
        padding: 8px 35px;
        cursor: pointer;

        &.active {
          border-radius: 5px;
          color: #fff;
          background: rgb(0, 108, 238);
        }
      }
    }
  }
}

#part1,
#part2,
#part3,
#part4 {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

#part1 {
  background-color: #ccc;
}

#part2 {
  background-color: #ccd;
}

#part3 {
  background-color: #cad;
}

#part4 {
  background-color: #cba;
}
</style>
