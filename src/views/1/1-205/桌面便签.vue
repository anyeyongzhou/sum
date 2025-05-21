<template>
  <div class="container" ref="containerRef">
    <div
      v-for="(note, index) in notes"
      :key="index"
      class="item"
      :style="{
        left: note.position.x + 'px',
        top: note.position.y + 'px',
        height: note.isCollapsed ? '40px' : '400px',
        zIndex: note.zIndex,
        backgroundColor: note.color,
      }"
      @mousedown="handleMouseDown($event, index)"
    >
      <div class="title">
        <div>便笺</div>
        <div class="controls">
          <div class="color-picker" @click.stop="showColorPicker(index)">
            <div
              class="color-dot"
              :style="{ backgroundColor: note.color }"
            ></div>
          </div>
          <div class="slideup" @click.stop="toggleCollapse(index)">
            {{ note.isCollapsed ? "+" : "-" }}
          </div>
        </div>
      </div>
      <div
        class="content"
        contenteditable="true"
        @input="updateContent($event, index)"
        v-html="note.content"
      ></div>
      <div class="control">
        <div class="newItem" @click="createNote">新建便笺</div>
        <div class="removeItem" @click="removeNote(index)">删除便笺</div>
      </div>
    </div>

    <!-- 颜色选择器 -->
    <div v-if="showPicker" class="color-picker-popup" :style="pickerPosition">
      <div
        v-for="color in colors"
        :key="color"
        class="color-option"
        :style="{ backgroundColor: color }"
        @click="changeColor(color)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  initialNotes: {
    type: Array,
    default: () => ["超市买卫生纸", "写作业"],
  },
});

const containerRef = ref(null);
const notes = ref([]);
const itemWidth = 300;
const itemHeight = 400;
let isDragging = false;
let currentDragIndex = -1;
let dragOffset = { x: 0, y: 0 };

// 颜色选择器相关
const showPicker = ref(false);
const currentColorIndex = ref(-1);
const pickerPosition = ref({ left: "0px", top: "0px" });
const colors = [
  "#fff",
  "#ffcdd2",
  "#f8bbd0",
  "#e1bee7",
  "#d1c4e9",
  "#c5cae9",
  "#bbdefb",
  "#b3e5fc",
  "#b2ebf2",
  "#b2dfdb",
  "#c8e6c9",
  "#dcedc8",
  "#f0f4c3",
  "#fff9c4",
  "#ffecb3",
  "#ffe0b2",
  "#ffccbc",
  "#d7ccc8",
  "#f5f5f5",
  "#cfd8dc",
];

// 生成随机位置
function getRandomPosition() {
  const container = containerRef.value;
  const maxX = container.offsetWidth - itemWidth;
  const maxY = container.offsetHeight - itemHeight;
  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY),
  };
}

// 创建新便笺
function createNote() {
  const position = getRandomPosition();
  notes.value.push({
    content: "",
    position,
    isCollapsed: false,
    zIndex: notes.value.length,
    color: colors[0],
  });
}

// 删除便笺
function removeNote(index) {
  if (window.confirm("是否要删除此便笺？")) {
    notes.value.splice(index, 1);
  }
}

// 更新便笺内容
function updateContent(event, index) {
  notes.value[index].content = event.target.innerHTML;
}

// 切换折叠状态
function toggleCollapse(index) {
  const note = notes.value[index];
  note.isCollapsed = !note.isCollapsed;

  // 如果展开时超出边界，调整位置
  if (!note.isCollapsed) {
    const container = containerRef.value;
    if (note.position.y > container.offsetHeight - itemHeight) {
      note.position.y = container.offsetHeight - itemHeight;
    }
  }
}

// 显示颜色选择器
function showColorPicker(index) {
  const note = notes.value[index];
  const rect = event.target.getBoundingClientRect();
  pickerPosition.value = {
    left: rect.left + "px",
    top: rect.bottom + "px",
  };
  currentColorIndex.value = index;
  showPicker.value = true;
}

// 更改便笺颜色
function changeColor(color) {
  if (currentColorIndex.value !== -1) {
    notes.value[currentColorIndex.value].color = color;
  }
  showPicker.value = false;
}

// 处理鼠标按下事件
function handleMouseDown(event, index) {
  if (event.target.className === "title") {
    isDragging = true;
    currentDragIndex = index;
    dragOffset = {
      x: event.offsetX,
      y: event.offsetY,
    };

    // 将当前便笺置于顶层
    notes.value.forEach((note, i) => {
      note.zIndex = i === index ? notes.value.length : i;
    });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }
}

// 处理鼠标移动事件
function handleMouseMove(event) {
  if (!isDragging) return;

  const note = notes.value[currentDragIndex];
  const container = containerRef.value;

  // 计算新位置
  let newX = event.clientX - dragOffset.x;
  let newY = event.clientY - dragOffset.y;

  // 边界检查
  newX = Math.max(0, Math.min(newX, container.offsetWidth - itemWidth));
  newY = Math.max(
    0,
    Math.min(
      newY,
      container.offsetHeight - (note.isCollapsed ? 40 : itemHeight)
    )
  );

  note.position = { x: newX, y: newY };
}

// 处理鼠标释放事件
function handleMouseUp() {
  isDragging = false;
  currentDragIndex = -1;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

// 点击外部关闭颜色选择器
function handleClickOutside(event) {
  if (showPicker.value && !event.target.closest(".color-picker-popup")) {
    showPicker.value = false;
  }
}

// 初始化
onMounted(() => {
  // 创建初始便笺
  props.initialNotes.forEach(content => {
    const position = getRandomPosition();
    notes.value.push({
      content,
      position,
      isCollapsed: false,
      zIndex: notes.value.length,
      color: colors[0],
    });
  });

  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100% !important;
  height: 100vh;
  position: relative;
  background-color: #f5f5f5;
}

.item {
  width: 300px;
  position: absolute;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transition: all 0.3s;
}

.title {
  width: 100%;
  height: 40px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: rgb(223, 190, 80);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
  user-select: none;

  div {
    margin: 0 15px;
    font-size: 16px;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.content {
  width: 100%;
  height: calc(100% - 80px);
  padding: 15px;
  box-sizing: border-box;
  outline: none;
  overflow-y: auto;
}

.control {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;

  div {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all 0.3s;

    &:hover {
      background-color: #e0e0e0;
    }
  }
}

.color-picker {
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .color-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
}

.color-picker-popup {
  position: fixed;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  z-index: 1000;

  .color-option {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
