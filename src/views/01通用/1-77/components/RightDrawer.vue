<template>
  <div class="homes">
    <div
      class="drawer-container"
      :class="{ 'drawer-expanded': isExpanded }"
      @click="toggleDrawer"
    >
      <div class="drawer-handle">
        <span class="arrow-icon">{{ isExpanded ? "→" : "←" }}</span>
      </div>
      <div class="drawer-content">
        <slot v-if="isExpanded"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const isExpanded = ref(false);

const toggleDrawer = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style lang="scss" scoped>
.homes {
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  .drawer-container {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    z-index: 10000;
    border: 1px solid red;
    cursor: pointer;

    .drawer-content {
      width: 200px;
      background: #f0f;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
      height: 100%;
      overflow-y: auto;
    }

    .drawer-handle {
      width: 30px;
      height: 60px;
      background: #1890ff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 4px 0 0 4px;
      margin-top: 20px;
      color: white;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);

      .arrow-icon {
        font-weight: bold;
        user-select: none;
      }
    }
  }

  .drawer-container:not(.drawer-expanded) {
    transform: translateX(calc(200px - 30px));

    .drawer-content {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
