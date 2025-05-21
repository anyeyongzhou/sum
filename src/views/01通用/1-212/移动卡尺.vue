<template>
  <div class="scale-shift">
    <h2 id="chooseResult">
      {{
        selectedOption
          ? `选中的文本：${selectedOption.text}，选中的值：${selectedOption.value}`
          : ""
      }}
    </h2>
    <div class="container" ref="container">
      <ul ref="ul">
        <li
          v-for="option in options"
          :key="option.value"
          :style="{ width: optionWidth + 'px' }"
        >
          <i :data-value="option.value">{{ option.text }}</i>
        </li>
      </ul>
      <div class="center"></div>
    </div>
    <div class="button">
      <button @click="setChoose('100')">选中100</button>
      <button @click="setChoose('500')">选中500</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 配置项
const options = [
  { value: -1, text: "不限" },
  { value: 100, text: "100万" },
  { value: 200, text: "200万" },
  { value: 300, text: "300万" },
  { value: 400, text: "400万" },
  { value: 500, text: "500万" },
  { value: 600, text: "600万" },
  { value: 700, text: "700万" },
  { value: 800, text: "800万" },
];

const optionWidth = 70; // 每个选项的宽度
const container = ref(null);
const ul = ref(null);
const selectedOption = ref(null);

// 计算容器和列表的宽度
const containerWidth = ref(0);
const ulWidth = ref(0);
const maxLeft = ref(0);
const minLeft = ref(0);

// 初始化配置
const initConfig = () => {
  if (container.value && ul.value) {
    containerWidth.value = container.value.clientWidth;
    ulWidth.value = options.length * optionWidth;
    maxLeft.value = containerWidth.value / 2;
    minLeft.value = maxLeft.value - ulWidth.value + optionWidth;
    ul.value.style.width = `${ulWidth.value}px`;
  }
};

// 设置选中值
const setChoose = value => {
  if (!ul.value) return;

  value = value.toString();
  ul.value.style.transition = ".5s";
  const children = Array.from(ul.value.children);
  const index = children.findIndex(
    dom => dom.querySelector("i").dataset.value === value
  );
  if (index === -1) return;

  const left = containerWidth.value / 2 - index * optionWidth;
  ul.value.style.marginLeft = `${left}px`;
  selectedOption.value = options[index];
};

// 获取当前选中的选项
const getChoose = () => {
  if (!ul.value) return null;

  const left =
    parseFloat(getComputedStyle(ul.value).marginLeft) -
    containerWidth.value / 2;
  const index = Math.round(Math.abs(left) / optionWidth);
  return options[index];
};

// 注册拖拽事件
const regDragEvent = () => {
  if (!ul.value) return;

  ul.value.onmousedown = e => {
    ul.value.style.transition = "";
    const x = e.pageX;
    const left = parseFloat(getComputedStyle(ul.value).marginLeft);

    const handleMouseMove = e => {
      const dis = e.pageX - x;
      let newLeft = left + dis;

      if (newLeft < minLeft.value) {
        newLeft = minLeft.value;
      } else if (newLeft > maxLeft.value) {
        newLeft = maxLeft.value;
      }

      ul.value.style.marginLeft = `${newLeft}px`;
      selectedOption.value = getChoose();
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      const op = getChoose();
      setChoose(op.value);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
};

// 禁止选择文本
const forbiddenSelect = () => {
  if (container.value) {
    container.value.onselectstart = () => false;
  }
};

// 生命周期钩子
onMounted(() => {
  initConfig();
  forbiddenSelect();
  setChoose("-1");
  regDragEvent();
});

onUnmounted(() => {
  if (ul.value) {
    ul.value.onmousedown = null;
  }
});
</script>

<style scoped>
.scale-shift {
  width: 100% !important;
  max-width: 800px;
  margin: 0 auto;
}

.container {
  width: 800px;
  border-radius: 50px;
  height: 50px;
  border: 1px solid #888;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.container ul {
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.container li {
  float: left;
  width: 50px;
  height: 100%;
  position: relative;
}

.container li i {
  font-style: normal;
  display: inline-block;
  transform: translate(-50%, 5px);
  font-size: 14px;
}

.container li::after {
  content: "";
  position: absolute;
  border-left: 1px solid #aaa;
  height: 13px;
  left: 0;
  bottom: 5px;
}

.container .center {
  width: 5px;
  height: 100%;
  position: absolute;
  background: #f40;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}

#chooseResult {
  text-align: center;
  height: 50px;
  line-height: 50px;
}

.button {
  text-align: center;
  margin-top: 50px;
}

.button button {
  margin: 0 10px;
  padding: 5px 15px;
  border: none;
  border-radius: 4px;
  background-color: #f40;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button button:hover {
  background-color: #f20;
}
</style>
