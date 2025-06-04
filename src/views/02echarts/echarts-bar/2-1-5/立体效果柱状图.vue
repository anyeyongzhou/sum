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

const data = [
  {
    name: "测试一",
    param1: 1,
    param2: 21,
    param3: 90,
  },
  {
    name: "测试二",
    param1: 45,
    param2: 35,
    param3: 56,
  },
  {
    name: "测试三",
    param1: 24,
    param2: 44,
    param3: 36,
  },
  {
    name: "测试四",
    param1: 6,
    param2: 61,
    param3: -6,
  },
];

const init = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  const name = data.map(item => item.name);
  const value = data.map(item => item.param1);
  const value1 = data.map(item => item.param2);
  const value2 = data.map(item => item.param3);

  const offsetX = 5;
  const offsetY = 2;
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint;
      const c0 = [shape.x, shape.y];
      const c1 = [shape.x - offsetX, shape.y - offsetY];
      const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
      const c3 = [xAxisPoint[0], xAxisPoint[1]];
      ctx
        .moveTo(c0[0], c0[1])
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath();
    },
  });
  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint;
      const c1 = [shape.x, shape.y];
      const c2 = [xAxisPoint[0], xAxisPoint[1]];
      const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
      const c4 = [shape.x + offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
      const c3 = [shape.x, shape.y - offsetX];
      const c4 = [shape.x - offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 注册三个面图形
  echarts.graphic.registerShape("CubeLeft", CubeLeft);
  echarts.graphic.registerShape("CubeRight", CubeRight);
  echarts.graphic.registerShape("CubeTop", CubeTop);

  const option = {
    backgroundColor: "black",
    legend: {
      icon: "circle",
      left: "center",
      bottom: "0",
      itemWidth: 5,
      itemHeight: 5,
      itemGap: 10,
      textStyle: {
        fontSize: 10,
        color: "#fff",
      },
      data: ["累计作业", "在施", "作业正确率"],
    },
    title: {
      text: "",
      left: "center",
      textStyle: {
        color: "#2B7BD6",
      },
    },
    tooltip: {
      trigger: "item",
    },
    grid: {
      top: "5%",
      left: "5%",
      right: "5%",
      bottom: "20%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: name,
      // X
      axisLine: {
        show: false,
        lineStyle: {
          // width: 1,
          color: "#2B7BD6",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 14,
        interval: 0,
        show: false,
        textStyle: {
          color: "#FFF", //更改坐标轴文字颜色
          fontSize: 12, //更改坐标轴文字大小
        },
      },
    },
    yAxis: [
      {
        name: "",
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#2B7BD6",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(20, 153, 255, 1)",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: "#FFF",
            fontSize: 12,
          },
        },
      },
      {
        name: "",
        type: "value",
        axisLine: {
          show: false,
          lineStyle: {
            color: "#FFE400",
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: "#FFF",
            fontSize: 12,
          },
          formatter: "{value}%", // 显示百分比
        },
      },
    ],
    series: [
      // 柱体
      {
        name: "累计作业",
        type: "custom",
        stack: "Ad",
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)]);
          return {
            type: "group",
            x: -12,
            children: [
              {
                type: "CubeLeft",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(0, 214, 253, 1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(2, 126, 220, 0.3)",
                    },
                  ]),
                },
              },
              {
                type: "CubeRight",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(5, 75, 94, 1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0, 204, 245, 0.34)",
                    },
                  ]),
                },
              },
              {
                type: "CubeTop",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#6DF0FF",
                    },
                    {
                      offset: 1,
                      color: "#6DF0FF",
                    },
                  ]),
                },
              },
            ],
          };
        },
        data: value,
      },
      // 柱体
      {
        name: "在施",
        type: "custom",
        stack: "Ad",
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)]);
          return {
            type: "group",
            x: 1,
            children: [
              {
                type: "CubeLeft",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(3, 251, 226, 1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(3, 251, 226, 0.3)",
                    },
                  ]),
                },
              },
              {
                type: "CubeRight",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(3, 251, 226, 0.34)",
                    },
                    {
                      offset: 1,
                      color: "rgba(3, 251, 226, 1)",
                    },
                  ]),
                },
              },
              {
                type: "CubeTop",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(3, 251, 226, 1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(3, 251, 226, 1)",
                    },
                  ]),
                },
              },
            ],
          };
        },
        data: value1,
      },
      {
        name: "作业正确率",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        symbol: "none",
        symbolSize: 10,
        lineStyle: {
          normal: {
            width: 2,
          },
        },
        itemStyle: {
          normal: {
            color: "#FFE400",
            borderColor: "#fff",
            borderWidth: 1,
          },
        },
        label: {
          normal: {
            show: false,
          },
        },
        data: value2,
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
    background-color: #7f8de0;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
