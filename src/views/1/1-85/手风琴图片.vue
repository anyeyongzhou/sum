<template>
  <div class="container">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        @mouseenter="hover(index)"
        @mouseleave="leave(index)"
        class="item-list"
      >
        <a href="#">
          <img :src="item.image" alt="" />
        </a>
        <p class="title">
          <a href="#">{{ item.title }}</a>
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";
import img3 from "/@/assets/beauty/1/1-3.jpg";
import img4 from "/@/assets/beauty/1/1-4.jpg";
import img5 from "/@/assets/beauty/1/1-5.jpg";

const items = ref([
  { title: "云南.大理", image: img1 },
  { title: "广西.桂林", image: img2 },
  { title: "福建.厦门", image: img3 },
  { title: "浙江.千岛湖", image: img4 },
  { title: "长江.三峡", image: img5 },
]);

const hover = index => {
  document.querySelectorAll(".item-list").forEach((li, i) => {
    if (i === index) {
      li.style.width = "500px";
    } else {
      li.style.width = "80px";
    }
  });
};

const leave = () => {
  document.querySelectorAll(".item-list").forEach(li => {
    li.style.width = "200px";
  });
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%; /* 外层宽度 */
  ul {
    list-style: none; /* 取消默认样式 */
    display: flex;
    overflow: hidden;

    li {
      width: 200px;
      height: 284px;
      transition: all 2s; /* 过渡效果 */
      position: relative; /* title 相对于当前 li 进行定位 */
      overflow: hidden;
      border-left: 2px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.8); /* 阴影效果 */

      &:hover {
        width: 500px; /* 鼠标移入时宽度 */
      }

      a {
        text-decoration: none;
        color: #fff;

        img {
          width: 500px; /* 图片宽度 */
          height: 100%;
        }
      }

      .title {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.5); /* title 背景颜色 */
        text-indent: 2em; /* 首行缩进 */
        line-height: 50px; /* 行高 */
      }
    }
  }
}
</style>
