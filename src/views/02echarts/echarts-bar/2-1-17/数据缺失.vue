<template>
  <div class="home">
    <div class="containers">
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
let chart = null;
const chartRef = ref(null);

let option = null;

const init = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  // 中间的数据缺失可以用'-'来表示，也可以用null来表示,undefined会报错,也可以直接不写，两个逗号连接
  // 末尾的数据缺失直接缺少即可，图标也可正常展示
  option = {
    title: {
      text: "Accumulated Waterfall Chart",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        let tar;
        if (params[1] && params[1].value !== "-") {
          tar = params[1];
        } else {
          tar = params[2];
        }
        return tar && tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
      },
    },
    legend: {
      data: ["Expenses", "Income"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: (function () {
        let list = [];
        for (let i = 1; i <= 11; i++) {
          list.push("Nov " + i);
        }
        return list;
      })(),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Placeholder",
        type: "bar",
        stack: "Total",
        silent: true,
        itemStyle: {
          borderColor: "transparent",
          color: "transparent",
        },
        emphasis: {
          itemStyle: {
            borderColor: "transparent",
            color: "transparent",
          },
        },
        data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292],
      },
      {
        name: "Income",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          position: "top",
        },
        data: [900, 345, 393, "-", "-", , 178, 286, "-", "-", "-"],
      },
      {
        name: "Expenses",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          position: "bottom",
        },
        data: ["-", "-", "-", , 154, "-", "-", "-", 119, 361],
      },
    ],
  };

  chart.setOption(option);
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
  display: flex;
  // flex-wrap: nowrap;
  // flex-direction: row;
  justify-content: center;
  align-items: center;

  .containers {
    width: 600px;
    height: 400px;
    padding: 10px;
    border: 1px solid #7f8de0;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
