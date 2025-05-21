<template>
  <div class="dropdown-menu">
    <ul class="menu">
      <li v-for="(item, index) in menuItems" :key="index">
        <a href="#" @click.prevent="handleClick(item)">{{ item.title }}</a>
        <ul v-if="item.children" class="submenu">
          <li v-for="(subItem, subIndex) in item.children" :key="subIndex">
            <a href="#" @click.prevent="handleClick(subItem)">{{
              subItem.title
            }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuItems = ref([
  { title: "home" },
  {
    title: "first",
    children: [
      { title: "one" },
      { title: "two" },
      { title: "three" },
      { title: "four" },
      { title: "five" },
      { title: "six" },
    ],
  },
  { title: "second" },
  {
    title: "third",
    children: [
      { title: "one" },
      { title: "two" },
      { title: "three" },
      { title: "four" },
      { title: "five" },
      { title: "six" },
    ],
  },
  { title: "fourth" },
  { title: "other" },
]);

const emit = defineEmits(["select"]);

const handleClick = item => {
  emit("select", item);
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  width: 70%;
  margin: 30px auto;

  .menu {
    height: 58px;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    > li {
      min-width: 140px;
      background: linear-gradient(#3d3838cc, #999999);
      position: relative;
      float: left;

      &:first-child {
        border-radius: 5px 0 0 0;
      }

      &:hover {
        background: linear-gradient(#111111, #424242);

        > a {
          color: white;
          border-left: 3px solid white;
        }

        .submenu {
          max-height: 1000px;
          z-index: 10;

          li {
            opacity: 1;
            transform: rotateY(0deg);
            min-height: 100%;
          }
        }
      }

      a {
        display: block;
        text-align: center;
        color: black;
        padding: 0 25px;
        font-size: 18px;
        line-height: 36px;
        border-left: 3px solid rgba(0, 0, 0, 0);
        text-transform: uppercase;
        text-decoration: none;
      }
    }
  }

  .submenu {
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 0;
    max-height: 0;
    perspective: 400px;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;

    li {
      opacity: 0;
      transform: rotateY(90deg);
      transition: opacity 0.4s, transform 0.5s;
      min-height: 0;
      background: linear-gradient(#3d3838cc, #999999);

      &:hover {
        background: linear-gradient(#111111, #424242);
      }

      a {
        color: black;
        text-decoration: none;

        &:hover {
          color: white;
        }
      }

      @for $i from 1 through 6 {
        &:nth-child(#{$i}) {
          transition-delay: ($i - 1) * 100ms;
        }
      }
    }
  }
}
</style>
