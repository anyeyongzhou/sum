<template>
  <div class="containers">
    <div class="canvas" ref="canvas"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BpmnModeler from "bpmn-js/lib/Modeler";
import { xmlStr } from "./xmlStr";
const bpmnModeler = ref();
const canvas = ref();

const init = () => {
  bpmnModeler.value = new BpmnModeler({
    container: canvas.value,
  });

  bpmnModeler.value.importXML(xmlStr).then(res => {
    console.log("res", res);
  });
};

onMounted(() => {
  init();
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
