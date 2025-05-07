<template>
  <div id="box">
    <dl v-for="(item, index) in filters" :key="index">
      <dt>{{ item.label }}：</dt>
      <dd
        v-for="(option, idx) in item.options"
        :key="idx"
        @click="selectOption(index, option)"
      >
        {{ option }}
      </dd>
    </dl>
    <dl class="select">
      <dt>已选条件</dt>
      <dd v-for="(selected, idx) in selectedOptions" :key="idx">
        {{ selected }} <span @click="removeOption(selected)">x</span>
      </dd>
    </dl>
  </div>
</template>

<script setup>
import { ref } from "vue";

const filters = ref([
  {
    label: "品牌",
    options: [
      "惠普",
      "联想",
      "戴尔",
      "三星",
      "宏基",
      "苹果",
      "神舟",
      "华硕",
      "方正",
    ],
  },
  {
    label: "价格",
    options: [
      "3000-3999",
      "4000-4999",
      "5000-5999",
      "6000-6999",
      "7000-7999",
      "8000-8999",
      "9000-9999",
      "10000以上",
    ],
  },
  {
    label: "尺寸",
    options: [
      "8.9英寸以及以下",
      "11英寸",
      "12英寸",
      "13英寸",
      "14英寸",
      "15英寸",
      "16英寸",
    ],
  },
  { label: "显卡", options: ["独立显卡", "集成显卡", "核芯显卡"] },
]);

const selectedOptions = ref([]);

const selectOption = (filterIndex, option) => {
  const selected = `${filters.value[filterIndex].label}: ${option}`;
  if (!selectedOptions.value.includes(selected)) {
    selectedOptions.value.push(selected);
  }
};

const removeOption = option => {
  selectedOptions.value = selectedOptions.value.filter(
    selected => selected !== option
  );
};
</script>

<style scoped>
#box {
  width: 850px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px #494242;
  margin: 50px auto;
  padding-top: 20px;
}

dl {
  margin: 0 20px;
  height: 50px;
  font: 14px/50px "Arial";
  border-bottom: 1px dashed #fad8e6;
  overflow: hidden;
}

dl.select {
  margin: 0;
  padding: 0 20px;
  background: #ebe4e4;
}

dt {
  float: left;
  color: #8a8a8a;
}

dd {
  float: left;
  cursor: pointer;
  font-size: 14px;
  color: #252525;
  margin: 0 10px;
}

dd.active {
  color: #c4284d;
}

dl.select dd {
  border: 1px solid #c4284d;
  font: 14px/25px "Arial";
  padding: 0 2px 0 10px;
  margin-top: 13px;
  cursor: auto;
}

span {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  display: inline-block;
  background: #c4284d;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
}
</style>
