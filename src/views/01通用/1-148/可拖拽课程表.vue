<template>
  <div style="text-align: center">
    <h1>课程表</h1>
    <div id="divcontainer" class="container" ref="containerRef">
      <div class="left">
        <div
          v-for="(subject, index) in subjects"
          :key="index"
          draggable="true"
          class="item"
          :class="subject.color"
          @dragstart="onDragStart"
        >
          {{ subject.name }}
        </div>
      </div>
      <div class="right">
        <table>
          <colgroup>
            <col v-for="n in 8" :key="n" />
          </colgroup>
          <thead>
            <tr>
              <td></td>
              <th v-for="day in days" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(time, index) in times" :key="index">
              <tr>
                <th rowspan="4" class="span">{{ time.label }}</th>
                <td
                  v-for="n in 7"
                  :key="n"
                  data-allowed="true"
                  @dragover.prevent
                  @drop="onDrop"
                >
                  <div
                    v-if="time.subjects[n - 1]"
                    draggable="true"
                    @dragstart="onDragStart"
                  >
                    {{ time.subjects[n - 1] }}
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const subjects = ref([
  { name: "语文", color: "color1" },
  { name: "数学", color: "color2" },
  { name: "英语", color: "color3" },
  { name: "音乐", color: "color4" },
  { name: "政治", color: "color5" },
  { name: "历史", color: "color6" },
  { name: "体育", color: "color7" },
]);

const days = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];
const times = ref([
  { label: "上午", subjects: ["", "体育", "", "", "", "", ""] },
  { label: "下午", subjects: ["", "", "", "", "", "", ""] },
]);

let currentSubject;

const onDragStart = event => {
  currentSubject = event.target.innerText;
};

const onDrop = event => {
  const targetCell = event.target.closest("td");
  if (targetCell && targetCell.dataset.allowed === "true") {
    const index = Array.from(targetCell.parentNode.children).indexOf(
      targetCell
    );
    const timeIndex = Math.floor(index / 7);
    const subjectIndex = index % 7;

    // Move or Clone subject
    if (currentSubject) {
      const subjectsArray = times.value[timeIndex].subjects;
      subjectsArray[subjectIndex] = currentSubject;
      targetCell.innerHTML = currentSubject;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.container .left {
  padding: 10px;
  width: 80px;
  background: #eee;
}

.container .left .item {
  margin-bottom: 10px;
}

.item {
  width: 100%;
  line-height: 40px;
  text-align: center;
  cursor: move;
}

.color1 {
  background: #f26395;
}
.color2 {
  background: #62efab;
}
.color3 {
  background: #ef7658;
}
.color4 {
  background: #ffe868;
}
.color5 {
  background: #80e3f7;
}
.color6 {
  background: #d781f9;
}
.color7 {
  background: #62efab;
}

.container .right {
  background: #eee;
  width: 800px;
  margin-left: 10px;
  padding: 10px;
}

.container .right table {
  width: 100%;
}

.container .right td,
.container .right th {
  border: 1px solid #999;
  height: 33px;
  padding: 8px;
  text-align: center;
}

.container .right col:first-child {
  width: 40px;
}

.container .right .span {
  line-height: 40px;
}

.container .right thead td:first-child,
.container .right .noborder {
  border: none;
}

.container .right th {
  font-weight: normal;
  background: #ccc;
}
</style>
