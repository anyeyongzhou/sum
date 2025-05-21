<template>
  <div class="home">
    <div class="containers">
      <div class="chart-container">
        <chartA />
      </div>
      <div class="chart-container">
        <chartB />
      </div>
      <div class="chart1-container">
        <chartC />
      </div>
      <div class="chart2-container">
        <chartD />
      </div>
    </div>
  </div>
</template>

<script setup>
import chartA from "./components/chartA.vue";
import chartB from "./components/chartB.vue";
import chartC from "./components/chartC.vue";
import chartD from "./components/chartD.vue";
/* 不改的代码 begin */

/* 不改的代码 end */
</script>

<style lang="scss" scoped>
.home {
  height: 110%;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow-y: scroll;

  .containers {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    // align-items: center;
    padding-bottom: 20px;
    background: #000;
    /* 编写CSS begin */
    .chart-container {
      width: 400px;
      height: 400px;
      margin: 20px;
      // border: 1px solid red;
    }
    .chart1-container {
      width: 800px;
      height: 400px;
      margin: 20px;
    }
    .chart2-container {
      width: 800px;
      height: 400px;
      margin: 20px;
    }
    /* 编写CSS end */
  }
}
</style>
