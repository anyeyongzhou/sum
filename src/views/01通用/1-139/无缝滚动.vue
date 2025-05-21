<template>
  <div class="lunbo_div">
    <div>
      <el-image
        :src="img1"
        lazy
        loading="lazy"
        fit="cover"
        class="cup"
      ></el-image>
      <span class="span_bm">
        <span class="today_title">今日总报名数</span>
        <br />
        <span class="totady_pers">{{ totalCount }}</span>
      </span>
    </div>
    <div id="bm_content" class="bm_content" ref="bmContent">
      <table class="table table-condensed">
        <thead style="position: fixed; background-color: #eeeeee">
          <tr>
            <th style="width: 60px; text-align: right">用户</th>
            <th style="width: 110px; text-align: center">购买商品</th>
            <th style="width: 69px; padding-right: 30px">时间</th>
          </tr>
        </thead>
        <tbody ref="tb1"></tbody>
        <tbody ref="tb2"></tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import img1 from "/@/assets/beauty/1/1-1.jpg";
import img2 from "/@/assets/beauty/1/1-2.jpg";

const totalCount = ref(100);
const tb1 = ref(null);
const tb2 = ref(null);
const bmContent = ref(null);
let scrollMove;

onMounted(() => {
  autoScroll();
});

function autoScroll() {
  const product = renderList();
  tb1.value.innerHTML = product;

  if (tb1.value.offsetHeight > bmContent.value.offsetHeight) {
    tb2.value.innerHTML = tb1.value.innerHTML; // Clone tb1
    scrollMove = setInterval(scrollUp, 30);

    bmContent.value.onmouseover = () => {
      clearInterval(scrollMove);
    };

    bmContent.value.onmouseout = () => {
      scrollMove = setInterval(scrollUp, 30);
    };
  }
}

function scrollUp() {
  const box = bmContent.value;
  if (box.scrollTop >= tb1.value.offsetHeight) {
    box.scrollTop = 0;
  } else {
    box.scrollTop++;
  }
}

function renderList() {
  let str = "";
  for (let i = 0; i < 20; i++) {
    const a = i + 1;
    str += "<tr>";
    str += '<td class="ellipsis">';
    str += '<img :src="${img2}" />';
    str += `<span class="center" title="张三${a}" style="margin-left: 10px;">张三${a}</span>`;
    str += "</td>";
    str += `<td class="ellipsis" title="${a}年级上海教育版同步课">${a}年级上海教育版同步课</td>`;
    str += '<td class="ellipsis" title="16点46分">16点46分</td>';
    str += "</tr>";
  }
  return str;
}
</script>

<style scoped>
.lunbo_div {
  width: 250px !important;
  height: 365px;
  background-color: #db3b3a;
  position: fixed;
  border-radius: 10px;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.cup {
  width: 70px;
  height: auto;
  margin-top: -17px;
  margin-left: 20px;
}

.span_bm {
  float: right;
}

.today_title {
  display: inline-block;
  color: white;
  font-size: 14px;
  margin-right: 20px;
  margin-top: 10px;
}

.totady_pers {
  font-size: 30px;
  color: white;
  font-weight: 600;
}

.bm_content {
  width: 240px;
  height: 295px;
  background-color: white;
  margin: 0px 5px 0 5px;
  border-radius: 3px;
  font-size: 14px;
  overflow: hidden;
  position: relative;
  top: -5px;
}

table {
  table-layout: fixed;
  font-size: 12px;
}

thead {
  font-size: 12px;
}

.table > thead > tr > th {
  border-bottom: 1px solid #eeeeee;
  text-align: center;
}

.table > tbody + tbody {
  border-top: 0px;
}

.table img {
  width: 15px;
  border-radius: 50%;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.center {
  vertical-align: middle;
}
</style>
