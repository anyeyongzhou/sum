<template>
	<div class="geo-map-chart">
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import beijingJson from '/@/utils/geoJson/province/beijing.json';

const chartRef = ref(null);
let chart = null;

let dataList = [
	{ name: '海淀区', value: 18 },
	{ name: '顺义区', value: 60 },
	{ name: '昌平区', value: 89 },
	{ name: '房山区', value: 60 },
];

/**
 * 初始化地图图表
 */
const initChart = async () => {
	if (!chartRef.value) return;

	try {
		// 加载GeoJSON数据
		echarts.registerMap('beijing', beijingJson);

		// 初始化图表
		chart = echarts.init(chartRef.value);
		let option = {
			backgroundColor: '#BEE2EB',
			graphic: {
				elements: [
					{
						type: 'image',
						top: '4%',
						left: '29%',
						style: {
							image: '//img.isqqw.com/profile/upload/2025/02/06/e456654a-b2ea-4f7e-bd39-a94f6ed2f5f4.png',
							width: 800,
							height: 800,
						},
					},
				],
			},
			tooltip: {
				trigger: 'item',
				position: function (point, params, dom, rect, size) {
					var x = 0; // x坐标位置
					var y = 0; // y坐标位置
					// 当前鼠标位置
					var pointX = point[0];
					var pointY = point[1];
					// 提示框大小
					var boxWidth = size.contentSize[0];
					var boxHeight = size.contentSize[1];

					// boxWidth > pointX 说明鼠标左边放不下提示框
					if (boxWidth > pointX) {
						x = pointX + 10;
					} else {
						// 左边放的下
						x = pointX - boxWidth - 10;
					}

					// boxHeight > pointY 说明鼠标上边放不下提示框
					if (boxHeight > pointY) {
						y = 5;
					} else {
						// 上边放得下
						y = pointY - boxHeight;
					}
					return [x, y];
				},
				show: true,
				enterable: true,
				textStyle: {
					fontSize: 13,
					color: '#fff',
				},
				backgroundColor: 'rgba(0,2,89,0.8)',

				formatter: function (params) {
					let pvalue = isNaN(params.value) ? 0 : params.value;

					return `${params.name}<br>换电柜数量:${pvalue}`;
				},
			},
			visualMap: {
				min: 0,
				max: 100,
				left: 26,
				bottom: 40,
				showLabel: false,

				pieces: [
					{
						gt: 100,
						label: '100',
						color: '#FF1208',
					},
					{
						gte: 50,
						lt: 100,
						label: '50 - 100',
						color: '#FE5C27',
					},
					{
						gte: 10,
						lt: 50,
						label: '10 - 50',
						color: '#FE933F',
					},
					{
						gte: 1,
						lt: 10,
						label: '1 - 10',
						color: '#FDCA56',
					},
				],
				show: false,
			},
			series: [
				{
					type: 'map',
					mapType: 'beijing',
					aspectScale: 0.9,
					zoom: 1,
					scaleLimit: {
						min: 1,
						max: 2,
					},
					data: dataList,
					label: {
						show: true,
						formatter: '{b}',
						textStyle: {
							color: 'rgba(14, 14, 14, 1)',
							fontSize: '12',
						},
					},
					itemStyle: {
						normal: {
							areaColor: 'rgba(0,54,255, 0)',
							borderColor: 'rgba(26, 190, 163, 1)',
							borderWidth: 1,
						},
						emphasis: {
							areaColor: '#FDCD57',
							label: {
								color: 'rgba(14, 14, 14, 1)',
							},
						},
					},
				},
			],
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
