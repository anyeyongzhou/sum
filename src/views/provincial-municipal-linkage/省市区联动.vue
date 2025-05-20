<template>
  <div class="content">
    <div class="item">
      <div class="left">省会</div>
      <div class="right">
        <select v-model="selectedProvince">
          <option value="">请选择</option>
          <option v-for="p in provinceData" :key="p[0]" :value="p[0]">
            {{ p[1] }}
          </option>
        </select>
      </div>
    </div>
    <div class="item">
      <div class="left">城市</div>
      <div class="right">
        <select v-model="selectedCity">
          <option value="">请选择</option>
          <option v-for="c in cities" :key="c[0]" :value="c[0]">
            {{ c[1] }}
          </option>
        </select>
      </div>
    </div>
    <div class="item">
      <div class="left">学校</div>
      <div class="right">
        <select v-model="selectedSchool">
          <option value="">请选择</option>
          <option v-for="s in schools" :key="s[2]" :value="s[2]">
            {{ s[2] }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
// 省市学校数据（仅截取部分，实际可全部粘贴进来）
const provinceData = [
  ["00", "北京市"],
  ["01", "重庆市"],
  ["02", "福建省"],
  ["03", "江苏省"],
  ["04", "广东省"],
  ["05", "辽宁省"],
  ["06", "内蒙古"],
  ["07", "山西省"],
  ["08", "青海省"],
  ["09", "四川省"],
  ["10", "贵州省"],
  ["11", "云南省"],
  ["12", "陕西省"],
  ["13", "西藏"],
  ["14", "宁夏"],
  ["15", "新疆"],
  ["16", "广西"],
  ["17", "海南省"],
  ["18", "湖南省"],
  ["19", "湖北省"],
  ["20", "河南省"],
  ["21", "山东省"],
  ["22", "江西省"],
  ["23", "安徽省"],
  ["24", "浙江省"],
  ["25", "上海市"],
  ["26", "黑龙江省"],
  ["27", "吉林省"],
  ["28", "甘肃省"],
  ["29", "天津市"],
  ["30", "河北省"],
];
const cityData = {
  "00": [["000", "北京市"]],
  "01": [["014", "重庆市"]],
  "02": [
    ["015", "漳州市"],
    ["016", "厦门市"],
  ],
  // ... 省略，实际可全部粘贴
};
const allschoolData = {
  "000": [
    ["000", "北京市", "北京大学"],
    ["000", "北京市", "清华大学"],
  ],
  "014": [["014", "重庆市", "重庆大学"]],
  "015": [["015", "漳州市", "漳州一中"]],
  "016": [["016", "厦门市", "厦门大学"]],
  // ... 省略，实际可全部粘贴
};

const selectedProvince = ref("");
const selectedCity = ref("");
const selectedSchool = ref("");

const cities = computed(() => cityData[selectedProvince.value] || []);
const schools = computed(() => allschoolData[selectedCity.value] || []);

watch(selectedProvince, () => {
  selectedCity.value = "";
  selectedSchool.value = "";
});
watch(selectedCity, () => {
  selectedSchool.value = "";
});
</script>

<style lang="scss" scoped>
.content {
  width: 300px !important;
  margin: 50px auto;
}
.item {
  width: 100%;
  height: 42px;
  background: #fff;
  border-radius: 14px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.left {
  display: inline-block;
  height: 42px;
  line-height: 42px;
  margin: 0 10px;
  color: #03a9f4;
}
.left::after {
  content: "|";
  display: inline-block;
  color: #ccc;
  font-weight: 500;
  padding-left: 15px;
}
.right {
  display: inline-block;
  height: 42px;
  width: 210px;
  color: #3a3838;
}
select {
  width: 100%;
  height: 30px;
  border-color: transparent;
}
</style>
