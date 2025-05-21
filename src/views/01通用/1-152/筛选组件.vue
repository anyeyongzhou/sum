<template>
  <div class="transfer-container">
    <div class="title">筛选组件</div>
    <div class="content-container">
      <!-- 备选名单 -->
      <div class="select-container">
        <div class="select-title">
          <label>
            <input
              v-model="leftAllChecked"
              type="checkbox"
              class="check-all"
              @change="handleLeftAllCheck"
            />
            <span class="txt">备选名单</span>
          </label>
        </div>
        <ul class="roster-container">
          <li v-for="item in leftList" :key="item.id" class="roster-item">
            <label>
              <input
                v-model="item.checked"
                type="checkbox"
                class="check-one"
                @change="handleLeftItemCheck"
              />
              <span class="txt">{{ item.name }}</span>
            </label>
          </li>
        </ul>
      </div>

      <!-- 操作按钮 -->
      <div class="controller-container">
        <div
          class="arrow right-arrow"
          :class="{ active: rightArrowActive }"
          @click="moveToRight"
        >
          &gt;&gt;
        </div>
        <div
          class="arrow left-arrow"
          :class="{ active: leftArrowActive }"
          @click="moveToLeft"
        >
          &lt;&lt;
        </div>
      </div>

      <!-- 获奖名单 -->
      <div class="select-container">
        <div class="select-title">
          <label>
            <input
              v-model="rightAllChecked"
              type="checkbox"
              class="check-all"
              @change="handleRightAllCheck"
            />
            <span class="txt">获奖名单</span>
          </label>
        </div>
        <ul class="roster-container">
          <li v-for="item in rightList" :key="item.id" class="roster-item">
            <label>
              <input
                v-model="item.checked"
                type="checkbox"
                class="check-one"
                @change="handleRightItemCheck"
              />
              <span class="txt">{{ item.name }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface RosterItem {
  id: number;
  name: string;
  checked: boolean;
}

// 初始数据
const leftList = ref<RosterItem[]>([
  { id: 1, name: "小明同学", checked: false },
  { id: 2, name: "小亮同学", checked: false },
  { id: 3, name: "luffy同学", checked: false },
  { id: 4, name: "alan同学", checked: false },
  { id: 5, name: "天天同学", checked: false },
  { id: 6, name: "jack同学", checked: false },
  { id: 7, name: "anney同学", checked: false },
  { id: 8, name: "silvia同学", checked: false },
]);

const rightList = ref<RosterItem[]>([]);

// 全选状态
const leftAllChecked = ref(false);
const rightAllChecked = ref(false);

// 计算属性 - 箭头激活状态
const rightArrowActive = computed(() => {
  return leftList.value.some(item => item.checked);
});

const leftArrowActive = computed(() => {
  return rightList.value.some(item => item.checked);
});

// 方法 - 左侧全选
const handleLeftAllCheck = () => {
  leftList.value.forEach(item => {
    item.checked = leftAllChecked.value;
  });
};

// 方法 - 右侧全选
const handleRightAllCheck = () => {
  rightList.value.forEach(item => {
    item.checked = rightAllChecked.value;
  });
};

// 方法 - 左侧单项选择
const handleLeftItemCheck = () => {
  leftAllChecked.value = leftList.value.every(item => item.checked);
};

// 方法 - 右侧单项选择
const handleRightItemCheck = () => {
  rightAllChecked.value = rightList.value.every(item => item.checked);
};

// 方法 - 移动到右侧 (完全修复版)
const moveToRight = () => {
  if (!rightArrowActive.value) return;

  // 1. 找出所有选中的项(创建新对象)
  const selectedItems = leftList.value
    .filter(item => item.checked)
    .map(item => ({ ...item, checked: false }));

  // 2. 从左侧列表中移除选中项
  leftList.value = leftList.value.filter(item => !item.checked);

  // 3. 将选中项添加到右侧列表
  rightList.value.push(...selectedItems);

  // 4. 重置全选状态
  leftAllChecked.value = false;
};

// 方法 - 移动到左侧
const moveToLeft = () => {
  if (!leftArrowActive.value) return;

  // 1. 找出所有选中的项(创建新对象)
  const selectedItems = rightList.value
    .filter(item => item.checked)
    .map(item => ({ ...item, checked: false }));

  // 2. 从右侧列表中移除选中项
  rightList.value = rightList.value.filter(item => !item.checked);

  // 3. 将选中项添加到左侧列表
  leftList.value.push(...selectedItems);

  // 4. 重置全选状态
  rightAllChecked.value = false;
};
</script>

<style lang="scss" scoped>
/* 样式部分保持不变，与之前相同 */
.transfer-container {
  width: 576px !important;
  margin: 100px auto;
  font-family: "微软雅黑";
  color: #666;
  user-select: none;

  .title {
    height: 40px;
    line-height: 40px;
    background-color: #039ae3;
    color: #fff;
    font-weight: bold;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .content-container {
    display: flex;
    background-color: #fff;

    > * {
      background-color: #fff;
    }
  }

  .select-container {
    width: 40%;
    min-height: 362px;
    border: 1px solid #e5e5e5;
    background: #fafafa;
    box-sizing: border-box;
    padding: 10px;

    .select-title {
      height: 30px;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
    }

    .roster-container {
      max-height: 310px;
      overflow-y: auto;
      padding-top: 10px;
      box-sizing: border-box;
      list-style: none;

      .roster-item {
        height: 40px;
        line-height: 40px;

        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
  }

  .controller-container {
    width: 20%;
    height: 362px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .arrow {
      height: 30px;
      width: 50px;
      border: 1px solid #ddd;
      line-height: 30px;
      text-align: center;
      border-radius: 3px;
      font-weight: bold;
      color: #888;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border-color: #039ae3;
        color: #039ae3;
      }

      &.active {
        background-color: #039ae3;
        color: #fff;
        border-color: #039ae3;
      }
    }
  }

  .txt {
    margin-left: 10px;
  }

  [type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  label {
    display: flex;
    align-items: center;
    cursor: pointer;

    > * {
      vertical-align: middle;
    }
  }
}
</style>
