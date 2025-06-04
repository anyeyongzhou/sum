<template>
  <div class="home">
    <div class="containers">
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

let chart = null;
const chartRef = ref(null);
/* 
双层饼图叠加设计
背景环（第一个series）：

是一个纯视觉效果的无数据环，通过径向渐变创建了"金属光泽"效果

使用z:4确保显示在最上层

设置了silent: true和hoverAnimation: false使其不干扰主图交互

数据环（第二个series）：

实际展示数据的环形图

与背景环相同的半径(["38%", "70%"])确保完美重叠
*/

// 初始化图表
const init = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  // 图表配置项
  const option = {
    // 颜色主题
    color: ["#116d99", "#c2b53a"],

    // 提示框配置
    tooltip: {
      trigger: "item", // 触发类型，数据项图形触发
      formatter: "{a} <br/>{b}: {c} ({d}%)", // 提示框内容格式器
    },

    // 系列列表
    series: [
      {
        // 背景环系列 - 用于创建视觉效果
        type: "pie",
        radius: ["38%", "70%"], // 内外半径
        silent: true, // 不响应和触发鼠标事件
        legendHoverLink: false, // 禁用图例hover交互
        hoverAnimation: false, // 禁用hover动画
        z: 4, // 控制层叠顺序
        label: {
          show: false, // 不显示标签
        },
        data: [
          {
            value: 1, // 固定值
            itemStyle: {
              // 径向渐变颜色
              color: {
                type: "radial",
                x: 0.5, // 圆心x坐标
                y: 0.5, // 圆心y坐标
                r: 1, // 半径
                colorStops: [
                  {
                    offset: 0.32,
                    color: "rgba(255,255,255,0.35)", // 渐变起点颜色
                  },
                  {
                    offset: 0.39,
                    color: "rgba(255,255,255,0.01)", // 渐变中间颜色
                  },
                  {
                    offset: 0.43,
                    color: "rgba(255,255,255,.01)", // 渐变中间颜色
                  },
                  {
                    offset: 0.52,
                    color: "rgba(255,255,255,0.35)", // 渐变终点颜色
                  },
                ],
                global: false, // 不使用全局渐变
              },
            },
          },
        ],
      },
      {
        // 主数据系列 - 显示实际数据
        name: "访问来源", // 系列名称
        type: "pie",
        radius: ["38%", "70%"], // 内外半径，与背景环一致
        avoidLabelOverlap: true, // 防止标签重叠

        // 标签配置
        label: {
          show: true,
          formatter: params => {
            // 自定义标签格式
            return "{name|" + params.name + ": }{value|" + params.value + "%}";
          },
          // 富文本样式
          rich: {
            name: {
              fontSize: 14,
              color: "#a6e4ff", // 名称颜色
            },
            value: {
              fontSize: 14,
              color: "#fff", // 数值颜色
            },
          },
        },

        // 高亮状态下的标签样式
        emphasis: {
          label: {
            show: true,
            fontSize: 16, // 稍微增大字号
            fontWeight: "bold",
          },
          scale: true, // 高亮时放大
          scaleSize: 5, // 放大尺寸
        },

        // 标签引导线配置
        labelLine: {
          show: true,
          length: 10, // 第一段长度
          length2: 15, // 第二段长度
        },

        // 数据项
        data: [
          { value: 1048, name: "搜索引擎" },
          { value: 735, name: "直接访问" },
        ],
      },
    ],
  };

  // 应用配置
  chart.setOption(option);

  // 响应式调整
  window.addEventListener("resize", function () {
    chart.resize();
  });
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
  justify-content: center;
  align-items: center;

  .containers {
    width: 600px;
    height: 400px;
    padding: 10px;
    background-color: #7f8de0;
    border-radius: 8px; // 添加圆角
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // 添加阴影

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
