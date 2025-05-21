<template>
  <div class="accordion-container">
    <ul class="menu-container">
      <li
        class="menu"
        v-for="(menu, index) in menus"
        :key="index"
        :class="{ 'is-open': menu.isOpen }"
      >
        <h2 @click="toggleMenu(index)">
          {{ menu.title }}
        </h2>
        <ul
          class="submenu"
          :style="{ height: menu.isOpen ? menu.height : '0px' }"
        >
          <li
            v-for="(item, itemIndex) in menu.items"
            :key="itemIndex"
            class="submenu-item"
          >
            {{ item }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const itemHeight = 30;

const menus = ref([
  {
    title: "菜单1",
    items: ["菜单1", "菜单2", "菜单3", "菜单4"],
    isOpen: false,
    height: "0px",
  },
  {
    title: "菜单2",
    items: ["菜单1", "菜单2", "菜单3", "菜单4"],
    isOpen: false,
    height: "0px",
  },
  {
    title: "菜单3",
    items: ["菜单1", "菜单2", "菜单3", "菜单4"],
    isOpen: false,
    height: "0px",
  },
  {
    title: "菜单4",
    items: ["菜单1", "菜单2", "菜单3", "菜单4"],
    isOpen: false,
    height: "0px",
  },
]);

// Calculate full height when component mounts
onMounted(() => {
  menus.value.forEach(menu => {
    menu.height = `${menu.items.length * itemHeight}px`;
  });
});

const toggleMenu = index => {
  // Close any currently open menu first
  const currentlyOpenIndex = menus.value.findIndex(menu => menu.isOpen);
  if (currentlyOpenIndex !== -1 && currentlyOpenIndex !== index) {
    menus.value[currentlyOpenIndex].isOpen = false;
  }

  // Toggle the clicked menu
  menus.value[index].isOpen = !menus.value[index].isOpen;
};
</script>

<style lang="scss">
.accordion-container {
  display: flex;
  justify-content: center;
  padding: 20px;

  h2 {
    margin: 0;
    padding: 0;
    font-size: 100%;
    font-weight: normal;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .menu-container {
    width: 200px;
    line-height: 30px;

    .menu {
      margin: 20px 0;

      h2 {
        background-color: lightblue;
        padding: 0 25px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: darken(lightblue, 10%);
        }
      }

      &.is-open h2 {
        background-color: darken(lightblue, 15%);
      }

      .submenu {
        background: #e0f0f7;
        padding: 0 30px;
        overflow: hidden;
        transition: height 300 ease;

        &-item {
          height: 30px;
          transition: background-color 0.2s;

          &:hover {
            background-color: darken(#e0f0f7, 5%);
          }
        }
      }
    }
  }
}
</style>
