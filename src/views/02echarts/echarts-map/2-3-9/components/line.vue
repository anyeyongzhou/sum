<template>
	<div class="geo-map-chart">
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import chinaJson from '/@/utils/geoJson/china.json';
import shangdongJson from '/@/utils/geoJson/province/province-shangdong.json';

const chartRef = ref(null);
let chart = null;

let data = [
	[
		[116.405285, 39.904989],
		[117.000923, 36.675807],
	],
	[
		[117.190182, 39.125596],
		[120.355173, 36.082982],
	],
	[
		[114.502461, 38.045474],
		[118.047648, 36.814939],
	],
	[
		[112.549248, 37.857014],
		[117.557964, 34.856424],
	],
	[
		[111.670801, 40.818311],
		[118.66471, 37.434564],
	],
	[
		[123.429096, 41.796767],
		[121.391382, 37.539297],
	],
	[
		[126.642464, 45.756967],
		[119.107078, 36.70925],
	],
	[
		[121.472644, 31.231706],
		[116.587245, 35.415393],
	],
	[
		[118.767413, 32.041544],
		[117.129063, 36.194968],
	],
	[
		[119.306239, 26.075302],
		[122.116394, 37.509691],
	],
];

// 两个 geo 的 center
const chinaCenter = [127, 10];
const shandongCenter = [113.97, 40.01];

let convertData = function () {
	let res = [];
	for (let index in data) {
		//  将坐标轴转换为像素
		let from = chart.convertToPixel({ geoIndex: 0 }, data[index][0]);
		from = chart.convertFromPixel('grid', from); //再将经纬度的像素，转为逻辑点轴
		let to = chart.convertToPixel({ geoIndex: 1 }, data[index][1]);
		to = chart.convertFromPixel('grid', to);
		res.push({
			coords: [from, to],
		});
	}

	return res;
};

/**
 * 初始化地图图表
 */
const initChart = async () => {
	if (!chartRef.value) return;

	try {
		// 加载GeoJSON数据
		echarts.registerMap('china', chinaJson);
		echarts.registerMap('shandong', shangdongJson);

		// 初始化图表
		chart = echarts.init(chartRef.value);

		let option = {
			xAxis: {
				type: 'value',
				show: false,
				min: 0,
				max: 100,
				position: 'top',
			},
			yAxis: {
				type: 'value',
				show: false,
				min: 0,
				max: 100,
				inverse: true,
			},
			geo: [
				{
					map: 'china',
					zoom: 0.6,
					center: chinaCenter,
					itemStyle: {
						shadowColor: 'black',
						shadowBlur: 15,
						shadowOffsetX: -5,
						shadowOffsetY: 15,
					},
				},
				{
					map: 'shandong',
					zoom: 0.4,
					center: shandongCenter,
					itemStyle: {
						shadowColor: 'black',
						shadowBlur: 15,
						shadowOffsetX: -5,
						shadowOffsetY: 15,
					},
				},
			],
			series: [
				{
					id: 'feixian',
					type: 'lines',
					coordinateSystem: 'cartesian2d',
					xAxisIndex: 0,
					yAxisIndex: 0,
					data: [],
					lineStyle: {
						width: 1,
						opacity: 1,
						curveness: 0.5, // 调整曲线弯曲程度
					},
					effect: {
						show: true,
						period: 4, // 动画周期
						trailLength: 0.5,
						color: 'yellow',
						symbol: 'arrow', // 动画符号
						symbolSize: 8,
					},
				},
			],
		};

		chart.setOption(option);

		requestAnimationFrame(() => {
			chart.setOption({
				series: [{ id: 'feixian', data: convertData() }],
			});
		});

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
