<template>
	<div class="geo-map-chart">
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import jiangsuJeoJson from '/@/utils/geoJson/province/province-jiangsu.json';

const props = defineProps({
	// 初始数据
	initData: {
		type: Array,
		default: () => [
			{ name: '苏州市', value: 0 },
			{ name: '泰州市', value: 0 },
			{ name: '扬州市', value: 0 },
			{ name: '南京市', value: 0 },
			{ name: '镇江市', value: 0 },
			{ name: '宿迁市', value: 0 },
			{ name: '徐州市', value: 0 },
			{ name: '南通市', value: 0 },
			{ name: '盐城市', value: 0 },
			{ name: '无锡市', value: 0 },
			{ name: '常州市', value: 0 },
			{ name: '淮安市', value: 0 },
			{ name: '连云港市', value: 0 },
		],
	},
});

const chartRef = ref(null);
let chart = null;

/**
 * 初始化地图图表
 */
const initChart = async () => {
	if (!chartRef.value) return;

	try {
		// 加载GeoJSON数据
		echarts.registerMap('JiangSu', jiangsuJeoJson);

		var dataLabel = [];
		jiangsuJeoJson.features.forEach(function (item, num) {
			dataLabel.push({
				name: item.properties.name,
				value: Math.round(Math.random() * 100),
				// level: item.properties.level,
				// adcode: item.properties.adcode + '',
			});
		});
		console.log('dataLabel', dataLabel);

		// 图表配置
		const option = {
			backgroundColor: '#021032',
			// series中绑定数据data展示使用tooltip来显示出来
			tooltip: {
				trigger: 'item',
				show: true,
				textStyle: {
					fontSize: 14,
					color: '#fff',
				},
				backgroundColor: '#493406',
				borderColor: '#f0ac1c',
				formatter: '{b}<br />{c}',
			},
			geo: [
				// 主要是为了添加江苏省的轮廓的宽度为5
				{
					map: 'JiangSu',
					roam: false,
					zoom: 1.2,
					itemStyle: {
						borderColor: '#70EEFF',
						borderWidth: 5,
					},
					z: 2,
				},
			],
			series: [
				{
					type: 'map',
					mapType: 'JiangSu',
					roam: false,
					zoom: 1.2,
					z: 3,
					// 展示各个地市的前面的小圆点和城市名称(label中的城市名称通过geoJson获取到,和data中的数据无关)
					label: {
						show: true,
						formatter: '{t|} {b}',
						color: '#fff',
						fontSize: 12,
						rich: {
							t: {
								width: 12,
								height: 12,
								borderRadius: 12,
								backgroundColor: '#FFB81F',
							},
						},
					},
					itemStyle: {
						areaColor: '#0A448E',
						borderColor: '#70EEFF',
						borderWidth: 1,
					},
					emphasis: {
						itemStyle: {
							areaColor: '#70EEFF',
							color: '#FFB81F',
						},
					},
					select: {
						itemStyle: {
							areaColor: '#70EEFF',
						},
					},
					data: dataLabel,
				},
			],
		};

		// 初始化图表
		chart = echarts.init(chartRef.value);
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
