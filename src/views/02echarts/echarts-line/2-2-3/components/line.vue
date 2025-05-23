<template>
	<div class="time-series-chart">
		<!-- 图表容器 -->
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as echarts from 'echarts';

// 定义组件属性
const props = defineProps({
	// 图表数据
	chartData: {
		type: Object,
		required: true,
		validator: (data) => {
			return Array.isArray(data.value) && Array.isArray(data.Xdata) && data.value.length === data.Xdata.length;
		},
	},
	// 图表背景色
	backgroundColor: {
		type: String,
		default: 'rgba(0, 66, 80, 0.4)',
	},
	// 是否显示平滑曲线
	smooth: {
		type: Boolean,
		default: false,
	},
	// 数据点大小
	symbolSize: {
		type: [Boolean, Number],
		default: 8,
	},
});

const chartRef = ref(null); // 图表DOM引用
let chartInstance = null; // ECharts实例

/**
 * 初始化或更新图表
 */
const initChart = () => {
	if (!chartRef.value || !props.chartData) return;

	// 准备图表配置
	const option = {
		backgroundColor: props.backgroundColor,
		// 标题配置
		title: {
			text: `{titleText|${props.chartData.titleText || ''}} {titleVal|${props.chartData.titleVal || ''}} {titleUnit|${
				props.chartData.titleUnit || ''
			}}`,
			left: '40%',
			top: '7%',
			textStyle: {
				rich: {
					titleText: {
						fontSize: 14,
						color: '#c5e5f9',
						align: 'center',
					},
					titleVal: {
						fontSize: 14,
						color: '#fff',
						align: 'center',
						textShadowColor: 'rgba(61, 180, 255, 0.6)',
						fontWeight: 'bold',
					},
					titleUnit: {
						fontSize: 12,
						color: '#c5e5f9',
						align: 'center',
					},
				},
			},
		},
		// 提示框配置
		tooltip: {
			trigger: 'axis',
			backgroundColor: '#fff',
			borderColor: '#fff',
			formatter: (params) => {
				const data = params[0];
				return `
          <div style="font-weight:bold;color:#333;">${data.name}</div>
          <div>${data.seriesName}: ${data.value} ${props.chartData.unit || ''}</div>
        `;
			},
		},
		// 图表边距
		grid: {
			top: props.chartData.grid?.[0] || '20%',
			right: props.chartData.grid?.[1] || '10%',
			bottom: props.chartData.grid?.[2] || '20%',
			left: props.chartData.grid?.[3] || '10%',
		},
		// X轴配置
		xAxis: {
			type: 'category',
			boundaryGap: true,
			axisLine: {
				show: true,
				lineStyle: {
					color: '#427394',
				},
			},
			axisLabel: {
				color: '#C5E5F9',
				padding: [5, 0, 0, 0],
				fontSize: 12,
			},
			splitLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			data: props.chartData.Xdata,
		},
		// Y轴配置
		yAxis: {
			name: props.chartData.unit || '',
			nameTextStyle: {
				color: '#C5E5F9',
				fontSize: 12,
				padding: [0, 31, 0, 0],
				opacity: 0.5,
			},
			min: 0,
			splitLine: {
				show: true,
				lineStyle: {
					color: 'RGBA(45, 92, 111, 0.4)',
					type: 'dashed',
				},
			},
			axisLine: {
				show: false,
			},
			axisLabel: {
				show: true,
				color: '#C5E5F9',
				fontSize: 12,
			},
			axisTick: {
				show: false,
			},
		},
		// 数据系列配置
		series: {
			name: props.chartData.titleText || '',
			type: 'line',
			showAllSymbol: true,
			smooth: props.smooth,
			symbolSize: props.symbolSize === true ? 8 : props.symbolSize,
			lineStyle: {
				width: 2,
				color: '#3CCFDB',
			},
			itemStyle: {
				shadowColor: '#fff',
				shadowBlur: 15,
				color: '#3CCFDB',
			},
			areaStyle: {
				color: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[
						{ offset: 0, color: 'rgba(25,163,223,0.2)' },
						{ offset: 1, color: 'rgba(25,163,223, 0)' },
					],
					false
				),
				shadowColor: 'rgba(25,163,223, 0.5)',
				shadowBlur: 20,
			},
			data: props.chartData.value.map(Number), // 确保数据为数值类型
		},
	};

	// 初始化或更新图表
	if (!chartInstance) {
		chartInstance = echarts.init(chartRef.value);
	}
	chartInstance.setOption(option);
};

/**
 * 处理窗口大小变化
 */
const handleResize = () => {
	chartInstance?.resize();
};

// 监听数据变化
watch(
	() => props.chartData,
	() => {
		initChart();
	},
	{ deep: true }
);

// 组件挂载时初始化
onMounted(() => {
	initChart();
	window.addEventListener('resize', handleResize);
});

// 组件卸载前清理
onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize);
	chartInstance?.dispose();
});
</script>

<style lang="scss">
.time-series-chart {
	width: 100%;
	height: 100%;

	.chart-container {
		width: 100%;
		height: 100%;
		min-height: 400px; // 确保图表有最小高度

		// 移动端适配
		@media (max-width: 768px) {
			min-height: 300px;
		}
	}
}
</style>
