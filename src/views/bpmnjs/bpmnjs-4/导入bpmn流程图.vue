<template>
  <div class="containers">
    <div class="canvas" ref="canvas"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BpmnModeler from "bpmn-js/lib/Modeler";
const bpmnModeler = ref();
const canvas = ref();

const bpmnContent = ref("");

const init = () => {
  bpmnModeler.value = new BpmnModeler({
    container: canvas.value,
  });

  bpmnModeler.value.importXML(bpmnContent.value).then(res => {
    console.log("res", res);
  });
};

onMounted(() => {
  fetch("./diagram.bpmn") // 确保路径正确
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // 读取为文本
    })
    .then(data => {
      bpmnContent.value = data; // 将内容存储为字符串
      console.log(bpmnContent.value); // 输出 BPMN 字符串
      init();
    })
    .catch(error => {
      console.error("Error fetching BPMN file:", error);
    });
});
</script>

<style scoped>
.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
}
.canvas {
  width: 100%;
  height: 100%;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}
</style>
