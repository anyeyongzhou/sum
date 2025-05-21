<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import "echarts-gl";

let chart = null;
const chartRef = ref(null);

// 定义柱状扇形的高度比例
const heightProportion = 0.2;

const initChart = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  // 定义饼图的数据列表，每个对象包含名称、值和样式
  const dataList = [
    {
      name: "公务用车运行维护费",
      val: 1230, //存储数据的地方
      itemStyle: {
        color: "rgba(0, 81, 180, 0.5)", // 设置扇形的颜色
      },
    },

    {
      name: "办公费",
      val: 800, //存储数据的地方
      itemStyle: {
        color: "rgba(255, 196, 0, 0.5)", // 设置扇形的颜色
      },
    },
    {
      name: "差旅费",
      val: 500, //存储数据的地方
      itemStyle: {
        color: "rgba(95, 144, 110, 0.5)", // 设置扇形的颜色
      },
    },
  ];

  // 计算所有数据的总和
  let total = 0;
  dataList.forEach(item => {
    total += item.val;
  });

  // 调用 getPie3D 函数生成 3D 饼图的 series 数据
  const series = getPie3D(
    dataList.map(item => {
      // 计算每个数据项的百分比，并保留两位小数
      item.value = Number(((item.val / total) * 100).toFixed(2));
      return item;
    }),
    0.8, // 内部直径比例
    240, // 饼图的半径
    28, // 饼图的高度
    26, // 饼图的厚度
    1 // 饼图的倾斜角度
  );

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  let option = {
    legend: {
      tooltip: {
        show: true,
      },
      data: dataList.map(item => item.name),
      top: "5%",
      left: "5%",
      icon: "circle",
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
    },
    animation: true, // 启用动画效果
    title: [
      {
        x: "center", // 标题水平居中
        top: "40%", // 标题距离顶部的距离
        text: total, // 标题文本内容
        textStyle: {
          color: "#fff", // 标题文字颜色
          fontSize: 42, // 标题文字大小
          fontWeight: "bold", // 标题文字加粗
        },
      },
      {
        x: "center", // 副标题水平居中
        top: "48%", // 副标题距离顶部的距离
        text: "还款总额", // 副标题文本内容
        textStyle: {
          color: "#fff", // 副标题文字颜色
          fontSize: 22, // 副标题文字大小
          fontWeight: 400, // 副标题文字不加粗
        },
      },
    ],
    backgroundColor: "#333", // 背景颜色
    xAxis3D: {
      min: -1.5, // X 轴的最小值
      max: 1.5, // X 轴的最大值
    },
    yAxis3D: {
      min: -1.5, // Y 轴的最小值
      max: 1.5, // Y 轴的最大值
    },
    zAxis3D: {
      min: -1, // Z 轴的最小值
      max: 1, // Z 轴的最大值
    },
    grid3D: {
      show: false, // 不显示 3D 网格
      boxHeight: 4, // 3D 盒子的高度
      bottom: "50%", // 3D 盒子的底部位置
      viewControl: {
        distance: 180, // 视角距离
        alpha: 25, // 视角的 alpha 角度
        beta: 60, // 视角的 beta 角度
        autoRotate: true, // 启用自动旋转
        rotateSensitivity: 0, // 禁用鼠标旋转
        zoomSensitivity: 0, // 禁用鼠标缩放
        panSensitivity: 0, // 禁用鼠标平移
      },
    },
    series: series,
  };
  chart.setOption(option);
};

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
/* 
startRatio 和 endRatio
  这两个参数定义了扇形在饼图中的起始和结束位置。它们的取值范围是 [0, 1]，表示整个饼图的百分比。例如，startRatio = 0.2 和 endRatio = 0.5 表示扇形从饼图的 20% 位置开始，到 50% 位置结束。
isSelected 和 isHovered
  这两个布尔值参数用于控制扇形的交互效果：
  isSelected：如果为 true，扇形会被选中，产生位移效果。
  isHovered：如果为 true，扇形会被高亮，产生放大效果。
k
  这是一个辅助参数，用于控制扇形的内径和外径的比例。默认值为 1/3，表示内径是外径的 1/3。可以通过调整 k 的值来改变扇形的厚度。
height
  这是扇形的高度，用于控制 3D 饼图的立体效果
*/
function getParametricEquation(
  startRatio, // 扇形起始比例（0 ~ 1）
  endRatio, // 扇形结束比例（0 ~ 1）
  isSelected, // 是否选中该扇形
  isHovered, // 是否高亮该扇形
  k, // 辅助参数，控制扇形的内径/外径比例
  height // 扇形的高度
) {
  // 计算
  let midRatio = (startRatio + endRatio) / 3;

  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  // 辅助参数，用于控制扇形的内径和外径的比例。默认值为 1/3，表示内径是外径的 1/3。可以通过调整 k 的值来改变扇形的厚度
  k = typeof k !== "undefined" ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.1 : 1;

  // 返回曲面参数方程
  /* 
  u 控制扇形的弧度，v 控制扇形的径向

  x(u, v)：根据弧度 u 和径向 v 计算 X 轴坐标。如果 u 超出扇形的范围，则使用起始或结束弧度的值。

  y(u, v)：根据弧度 u 和径向 v 计算 Y 轴坐标。如果 u 超出扇形的范围，则使用起始或结束弧度的值。

  z(u, v)：根据径向 v 计算 Z 轴坐标。如果 v 的值大于 0，则返回扇形的高度；否则返回 -1，表示扇形的底部
  */
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },

    x: function (u, v) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y: function (u, v) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u);
      }
      return Math.sin(v) > 0 ? heightProportion * height : -1;
    },
  };
}

// 生成模拟 3D 饼图的配置项
function getPie3D(pieData, internalDiameterRatio) {
  let series = []; // 存储生成的扇形配置项
  let sumValue = 0; // 所有扇形的值总和
  let startValue = 0; // 当前扇形的起始值
  let endValue = 0; // 当前扇形的结束值
  let legendData = []; // 存储图例数据
  let linesSeries = []; // 存储标签指示线的配置项

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  let k =
    typeof internalDiameterRatio !== "undefined"
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    let seriesItem = {
      name:
        typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k,
      },
    };

    if (typeof pieData[i].itemStyle != "undefined") {
      let itemStyle = {};

      typeof pieData[i].itemStyle.color != "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      typeof pieData[i].itemStyle.opacity != "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;

      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    // console.log(series[i]);
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );

    startValue = endValue;

    // 生成标签指示线,计算label指示线的起始和终点位置
    let midRadian =
      (series[i].pieData.endRatio + series[i].pieData.startRatio) * Math.PI;
    let posX = Math.cos(midRadian) * (1 + Math.cos(Math.PI / 2));
    let posY = Math.sin(midRadian) * (1 + Math.cos(Math.PI / 2));
    let posZ = Math.log(Math.abs(series[i].pieData.value + 1)) * 0.1;
    let flag =
      (midRadian >= 0 && midRadian <= Math.PI / 2) ||
      (midRadian >= (3 * Math.PI) / 2 && midRadian <= Math.PI * 2)
        ? 1
        : -1;
    let color = pieData[i].itemStyle.color;
    let turningPosArr = [
      posX * 1.8 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0),
      posY * 1.8 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0),
      posZ * 2,
    ];
    let endPosArr = [
      posX * 1.9 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0),
      posY * 1.9 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0),
      posZ * 6,
    ];

    linesSeries.push(
      // 标签指示线
      {
        type: "line3D",
        lineStyle: {
          color: color,
        },
        data: [[posX, posY, posZ], turningPosArr, endPosArr],
      },
      // 标签
      {
        type: "scatter3D",
        label: {
          show: true,
          distance: 0,
          position: "center",
          textStyle: {
            color: "#ffffff",
            backgroundColor: color,
            borderWidth: 2,
            fontSize: 14,
            padding: 10,
            borderRadius: 4,
          },
          formatter: "{b}",
        },
        symbolSize: 0,
        data: [
          {
            name: series[i].name + "\n" + series[i].pieData.val,
            value: endPosArr,
          },
        ],
      }
    );

    legendData.push(series[i].name);
  }
  series = series.concat(linesSeries);

  // 最底下圆盘
  series.push({
    name: "mouseoutSeries",
    type: "surface",
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 1,
      color: "rgba(25, 93, 176, 1)",
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -0 : -1.5;
      },
    },
  });
  return series;
}

onMounted(() => {
  chart = echarts.init(chartRef.value);
  initChart();
});
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  border: 1px solid green;
}
</style>
