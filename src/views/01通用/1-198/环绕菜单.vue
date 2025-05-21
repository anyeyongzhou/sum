<template>
  <div class="spin-menu">
    <div class="selector" :class="{ open: isOpen }">
      <ul>
        <li
          v-for="(item, index) in menuItems"
          :key="item.id"
          :style="getLiStyle(index)"
        >
          <input
            :id="item.id"
            type="checkbox"
            v-model="selectedItems"
            :value="item.id"
          />
          <label :for="item.id" :style="getLabelStyle(index)">
            {{ item.text }}
          </label>
        </li>
      </ul>
      <button @click="toggleMenu">click</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const isOpen = ref(false);
const selectedItems = ref([]);

const menuItems = [
  { id: "1", text: "unit 1" },
  { id: "2", text: "unit 2" },
  { id: "3", text: "unit 3" },
  { id: "4", text: "unit 4" },
  { id: "5", text: "unit 5" },
  { id: "6", text: "unit 6" },
  { id: "7", text: "unit 7" },
  { id: "8", text: "unit 8" },
];

const deg = computed(() => 360 / menuItems.length);

const getLiStyle = index => {
  const rotation = isOpen.value ? index * deg.value : -360;
  return {
    transform: `rotateZ(${rotation}deg)`,
  };
};

const getLabelStyle = index => {
  const rotation = isOpen.value ? -index * deg.value : 360;
  return {
    transform: `rotateZ(${rotation}deg)`,
  };
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  // 初始打开菜单
  setTimeout(() => {
    isOpen.value = true;
  }, 100);
});
</script>

<style lang="scss" scoped>
.spin-menu {
  width: 100%;
  height: 100vh;
  background: linear-gradient(#fff, #333);
  display: flex;
  align-items: center;
  justify-content: center;

  .selector {
    position: relative;
    width: 140px;
    height: 140px;

    button {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: deeppink;
      color: #fff;
      border: 0;
      font-size: 20px;
      cursor: pointer;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease;

      &:hover {
        background: #c71585;
      }
    }

    ul {
      position: absolute;
      top: -20px;
      bottom: -20px;
      left: -20px;
      right: -20px;
    }

    li {
      position: absolute;
      width: 100%;
      height: 100%;
      transition: all 0.8s ease-in-out;

      input {
        display: none;
      }

      label {
        position: absolute;
        top: -120px;
        left: 50%;
        margin-left: 0;
        width: 0;
        height: 0;
        background: #fff;
        border-radius: 50%;
        text-align: center;
        line-height: 0;
        overflow: hidden;
        box-shadow: none;
        font-size: 0;
        transition: all 0.8s ease-in-out, color 0.1s, background 0.1s;

        &:hover {
          color: orange;
        }
      }

      input:checked + label {
        background: orange;
        color: #fff;

        &:hover {
          background: #ff6600;
        }
      }
    }

    &.open {
      li label {
        width: 80px;
        height: 80px;
        margin-left: -40px;
        line-height: 80px;
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
        font-size: 14px;
      }
    }
  }
}
</style>
