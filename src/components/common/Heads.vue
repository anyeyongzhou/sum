<!---->
<template>
  <div class="head">
    <div class="head-content">
      <p class="span">
        {{ props.size == 2 ? "(" : ""
        }}{{ props.size == 2 || props.size == 3 ? ")" : "" }}{{ props.context }}
      </p>
    </div>
  </div>
</template>

<script setup name="heads">
const props = defineProps({
  //内容
  context: {
    type: String,
    default: "卡片",
  },
  //字体大小
  size: {
    type: Number,
    default: 1,
  },
  //字体颜色
  color: {
    type: Number,
    default: 8,
  },
  //字体粗细
  weight: {
    type: Number,
    default: 1,
  },
  //背景颜色
  backgroundColor: {
    type: Number,
    default: 5,
  },
});

const fontSizeList = ["40px", "32px", "28px", "24px", "20px"];
const backgroundColorList = [
  "red",
  "orange",
  "yellow ",
  "green",
  "cyan",
  "blue",
  "violet",
  "gray",
  "white",
  "black",
];
const wightList = [400, 700, 500];

const fontSize = fontSizeList[props.size];
const color = backgroundColorList[props.color];
const fontWeight = wightList[props.weight];
const backgroundColor = backgroundColorList[props.backgroundColor];
const marginLeft = (props.size - 1) * 10 + "px";
</script>
<style lang="scss" scoped>
.head {
  padding: 10px 10px;
  .head-content {
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    p {
      background: v-bind(backgroundColor);
      font-size: v-bind(fontSize);
      color: v-bind(color);
      font-weight: v-bind(fontWeight);
      line-height: v-bind(fontSize);
      text-align: center;
      padding: 5px;
      margin-left: v-bind(marginLeft);
      border-radius: 10px;
    }
  }
}
</style>
