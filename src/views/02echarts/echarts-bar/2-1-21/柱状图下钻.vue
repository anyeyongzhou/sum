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

  option = {
    xAxis: {
      data: ["Animals", "Fruits", "Cars"],
    },
    yAxis: {},
    dataGroupId: "",
    animationDurationUpdate: 500,
    series: {
      type: "bar",
      id: "sales",
      data: [
        {
          value: 5,
          groupId: "animals",
        },
        {
          value: 2,
          groupId: "fruits",
        },
        {
          value: 4,
          groupId: "cars",
        },
      ],
      /* 
      全局过渡动画相关的配置。
      全局过渡动画（Universal Transition）提供了任意系列之间进行变形动画的功能。开启该功能后，每次setOption，相同id的系列之间会自动关联进行动画的过渡，更细粒度的关联配置见universalTransition.seriesKey配置。
      通过配置数据项的groupId和childGroupId，还可以实现诸如下钻，聚合等一对多或者多对一的动画。
      */
      universalTransition: {
        enabled: true,
        /* divideShape决定在一对多或者多对一的动画中，当前系列的图形如何分裂成多个图形。目前支持
        'split' 通过一定的算法将分割图形成为多个。
        'clone' 从当前图形克隆得到多个。
        为了较好的效果，不同的系列会默认有不同的配置，比如散点图这种图形比较小且复杂的默认采用了'clone'，而柱状图这种更加规则的则默认是'split' */
        divideShape: "clone",
      },
    },
  };
  const drilldownData = [
    {
      dataGroupId: "animals",
      data: [
        ["Cats", 4],
        ["Dogs", 2],
        ["Cows", 1],
        ["Sheep", 2],
        ["Pigs", 1],
      ],
    },
    {
      dataGroupId: "fruits",
      data: [
        ["Apples", 4],
        ["Oranges", 2],
      ],
    },
    {
      dataGroupId: "cars",
      data: [
        ["Toyota", 4],
        ["Opel", 2],
        ["Volkswagen", 2],
      ],
    },
  ];
  chart.on("click", function (event) {
    if (event.data) {
      var subData = drilldownData.find(function (data) {
        return data.dataGroupId === event.data.groupId;
      });
      if (!subData) {
        return;
      }
      chart.setOption({
        xAxis: {
          data: subData.data.map(function (item) {
            return item[0];
          }),
        },
        series: {
          type: "bar",
          id: "sales",
          dataGroupId: subData.dataGroupId,
          data: subData.data.map(function (item) {
            return item[1];
          }),
          universalTransition: {
            enabled: true,
            divideShape: "clone",
          },
        },
        graphic: [
          {
            type: "text",
            left: 50,
            top: 20,
            style: {
              text: "Back",
              fontSize: 18,
            },
            onclick: function () {
              chart.setOption(option);
            },
          },
        ],
      });
    }
  });

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
