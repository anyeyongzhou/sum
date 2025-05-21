<template>
  <div class="container">
    <SideBar
      :current-color="currentColor"
      :current-shape="currentShape"
      :item-count="items.length"
      @color-change="setCurrentColor"
      @shape-change="setCurrentShape"
      @clear-grid="clearGrid"
      @randomize="randomizeItems"
      @sort="sortItems"
      @save="saveLayout"
      @load="loadLayout"
    />
    <div class="grid" ref="gridRef">
      <GridCell
        v-for="(cell, index) in cells"
        :key="index"
        :position="cell.position"
        :can-drop="canDropCells.includes(cell.position)"
        :highlight="highlightCell === cell.position"
        @dragover="handleDragOver($event, cell.position)"
        @dragleave="handleDragLeave($event, cell.position)"
        @drop="handleDrop($event, cell.position)"
      >
        <div
          v-if="getCellItem(cell.position)"
          class="dropped-item"
          :class="{ pulse: pulseItems.includes(getCellItem(cell.position).id) }"
          :style="getItemStyle(getCellItem(cell.position))"
          draggable="true"
          @dragstart="handleItemDragStart($event, getCellItem(cell.position))"
        >
          {{ getCellItem(cell.position).number }}
          <div
            class="delete-btn"
            @click.stop="deleteItem(getCellItem(cell.position).id)"
          >
            ×
          </div>
        </div>
      </GridCell>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import SideBar from "./components/SideBar.vue";
import GridCell from "./components/GridCell.vue";
import { useDragDrop } from "./components/hooks/useDragDrop";
import { useGridLayout } from "./components/hooks/useGridLayout";
import { generateCells, findEmptyCell } from "./components/utils/gridUtils";

// 网格配置
const columns = 7;
const rows = 6;

// 状态
const currentColor = ref("lightblue");
const currentShape = ref("square");
const nextItemNumber = ref(1);
const items = reactive([]);
const cells = ref(generateCells(rows, columns));
const canDropCells = ref([]);
const highlightCell = ref(null);
const pulseItems = ref([]);
const draggedItemId = ref(null);
const gridRef = ref(null);

// 从hooks获取功能
const { handleDragStart, handleDragEnd } = useDragDrop();
const { saveLayout, loadLayout } = useGridLayout(
  items,
  cells,
  nextItemNumber,
  pulseItems
);

// 计算属性
const getCellItem = position => {
  return items.find(item => item.position === position);
};

// 获取元素样式
const getItemStyle = item => {
  return {
    background: item.color,
    borderRadius: item.shape === "circle" ? "50%" : "0",
  };
};

// 方法
const setCurrentColor = color => {
  currentColor.value = color;
};

const setCurrentShape = shape => {
  currentShape.value = shape;
};

const handleDragOver = (event, position) => {
  event.preventDefault();
  if (!canDropCells.value.includes(position)) {
    canDropCells.value.push(position);
  }
};

const handleDragLeave = (event, position) => {
  canDropCells.value = canDropCells.value.filter(pos => pos !== position);
};

const handleItemDragStart = (event, item) => {
  draggedItemId.value = item.id;
  handleDragStart(event);
};

const addPulseEffect = itemId => {
  pulseItems.value.push(itemId);
  setTimeout(() => {
    pulseItems.value = pulseItems.value.filter(id => id !== itemId);
  }, 500);
};

const handleDrop = (event, position) => {
  event.preventDefault();
  canDropCells.value = [];
  highlightCell.value = position;

  setTimeout(() => {
    highlightCell.value = null;
  }, 500);

  // 如果是从侧边栏拖动的新元素
  if (!draggedItemId.value) {
    // 检查目标位置是否已有元素
    if (getCellItem(position)) {
      alert("该位置已有元素，请选择空白位置放置");
      return;
    }

    // 创建新元素
    const newItem = {
      id: Date.now(),
      position: position,
      number: nextItemNumber.value++,
      color: currentColor.value,
      shape: currentShape.value,
    };

    items.push(newItem);
    addPulseEffect(newItem.id);
  } else {
    // 网格内元素之间的拖动
    const draggedItem = items.find(item => item.id === draggedItemId.value);
    const targetItem = getCellItem(position);

    if (targetItem) {
      // 交换位置
      const draggedPosition = draggedItem.position;
      draggedItem.position = targetItem.position;
      targetItem.position = draggedPosition;

      addPulseEffect(draggedItem.id);
      addPulseEffect(targetItem.id);
    } else {
      // 移动到空位置
      draggedItem.position = position;
      addPulseEffect(draggedItem.id);
    }

    draggedItemId.value = null;
  }
};

const deleteItem = itemId => {
  const index = items.findIndex(item => item.id === itemId);
  if (index !== -1) {
    addPulseEffect(itemId);
    setTimeout(() => {
      items.splice(index, 1);
    }, 300);
  }
};

const clearGrid = () => {
  if (confirm("确定要清空网格吗？")) {
    items.length = 0;
  }
};

const randomizeItems = () => {
  const emptyCells = cells.value.filter(cell => !getCellItem(cell.position));

  if (emptyCells.length < items.length) {
    alert("没有足够的空间进行随机排列");
    return;
  }

  // 随机排列
  items.forEach(item => {
    addPulseEffect(item.id);
    const randomCell = findEmptyCell(cells.value, items);
    if (randomCell) {
      item.position = randomCell.position;
    }
  });
};

const sortItems = () => {
  // 按数字排序
  const sortedItems = [...items].sort((a, b) => a.number - b.number);

  // 重新分配位置
  sortedItems.forEach((item, index) => {
    if (index < cells.value.length) {
      addPulseEffect(item.id);
      item.position = cells.value[index].position;
    }
  });
};

// 生命周期钩子
onMounted(() => {
  document.addEventListener("dragend", () => {
    canDropCells.value = [];
    draggedItemId.value = null;
  });
});
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 100px);
  grid-template-rows: repeat(6, 100px);
  gap: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
}

.dropped-item {
  width: 98px;
  height: 98px;
  background: lightblue;
  position: absolute;
  top: 0;
  left: 0;
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #333;
  font-weight: bold;
  border-radius: 5px;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.dropped-item:hover {
  transform: scale(1.02);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.delete-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  background: red;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s;
}

.dropped-item:hover .delete-btn {
  opacity: 1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.pulse {
  animation: pulse 0.5s;
}
</style>
