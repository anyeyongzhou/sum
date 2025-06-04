<template>
	<div class="geo-map-chart">
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl';
import jiangsuJson from '/@/utils/geoJson/province/province-jiangsu.json';
import img1 from '/@/assets/beauty/3/3-1.jpg';

const chartRef = ref(null);
let chart = null;

/**
 * 初始化地图图表
 */
const initChart = async () => {
	if (!chartRef.value) return;

	try {
		// 加载GeoJSON数据
		echarts.registerMap('jiangsu', jiangsuJson);

		// 初始化图表
		chart = echarts.init(chartRef.value);
		let option = {
			tooltip: {
				show: false,
				trigger: 'item',
				formatter: function (params) {},
			},
			geo: [
				{
					map: 'jiangsu',
					aspectScale: 1,
					roam: false, //是否允许缩放
					zoom: 0.95, //默认显示级别
					layoutSize: '96%',
					layoutCenter: ['50%', '49%'],
					label: {
						show: true,
						formatter: '{t|}\n\n{a}',
						rich: {
							t: {
								width: 13,
								height: 13,
								borderRadius: 10,
								backgroundColor: '#fff',
							},
						},
						color: '#EEEEEE',
						emphasis: {
							// areaColor: '#38c7dd',
							color: '#000',
						},
					},
					itemStyle: {
						color: {
							image: img1, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
							repeat: 'repeat', // 是否平铺，可以是 'repeat-x', 'repeat-y', 'no-repeat'
						},
						borderColor: '#3587F6',
						borderWidth: 1,
					},
					z: 4,
				},
				{
					map: 'jiangsu',
					aspectScale: 1,
					roam: false, //是否允许缩放
					zoom: 0.95, //默认显示级别
					layoutSize: '96%',
					layoutCenter: ['50%', '49%'],
					itemStyle: {
						borderColor: '#A4E5F9',
						borderWidth: 6,
					},
					z: 3,
					silent: true,
				},
				{
					map: 'jiangsu',
					aspectScale: 1,
					roam: false, //是否允许缩放
					zoom: 0.95, //默认显示级别
					layoutSize: '96%',
					layoutCenter: ['50.3%', '50.5%'],
					itemStyle: {
						areaColor: '#0A1527',
					},
					z: 2,
					silent: true,
				},
				{
					map: 'jiangsu',
					aspectScale: 1,
					roam: false, //是否允许缩放
					zoom: 0.95, //默认显示级别
					layoutSize: '96%',
					layoutCenter: ['51%', '52.5%'],
					itemStyle: {
						areaColor: '#1094D2',
					},
					z: 1,
					silent: true,
				},
			],
			series: [],
		};
		chart.setOption(option);

		// 窗口大小变化时重绘
		window.addEventListener('resize', handleResize);
	} catch (error) {
		console.error('地图加载失败:', error);
	}
};

/**
 * 处理窗口大小变化
 */
const handleResize = () => {
	chart?.resize();
};

onMounted(() => {
	initChart();
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize);
	chart?.dispose();
});
</script>

<style lang="scss">
.geo-map-chart {
	width: 100%;
	height: 100%;

	.chart-container {
		width: 100%;
		height: 100%;
		min-height: 500px;

		@media (max-width: 768px) {
			min-height: 300px;
		}
	}
}
</style>
