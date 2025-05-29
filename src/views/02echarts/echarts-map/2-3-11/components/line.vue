<template>
	<div class="geo-map-chart">
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import chinaJson from '/@/utils/geoJson/china.json';

const chartRef = ref(null);
let chart = null;

let dataList = [
	{ name: '澳门', value: 18 },
	{ name: '香港', value: 273 },
	{ name: '台湾', value: 153 },
	{ name: '新疆', value: 76 },
	{ name: '宁夏', value: 75 },
	{ name: '青海', value: 18 },
	{ name: '甘肃', value: 134 },
	{ name: '陕西', value: 248 },
	{ name: '西藏', value: 1 },
	{ name: '云南', value: 176 },
	{ name: '贵州', value: 146 },
	{ name: '四川', value: 543 },
	{ name: '重庆', value: 576 },
	{ name: '海南', value: 168 },
	{ name: '广西', value: 254 },
	{ name: '广东', value: 1407 },
	{ name: '湖南', value: 1018 },
	{ name: '湖北', value: 67800 },
	{ name: '河南', value: 1273 },
	{ name: '山东', value: 765 },
	{ name: '江西', value: 936 },
	{ name: '福建', value: 307 },
	{ name: '安徽', value: 990 },
	{ name: '浙江', value: 1237 },
	{ name: '江苏', value: 633 },
	{ name: '上海', value: 394 },
	{ name: '黑龙江', value: 484 },
	{ name: '吉林', value: 93 },
	{ name: '辽宁', value: 126 },
	{ name: '内蒙古', value: 75 },
	{ name: '山西', value: 133 },
	{ name: '河北', value: 319 },
	{ name: '天津', value: 137 },
	{ name: '北京', value: 512 },
];

/**
 * 初始化地图图表
 */
const initChart = async () => {
	if (!chartRef.value) return;

	try {
		// 加载GeoJSON数据
		echarts.registerMap('china', chinaJson);

		// 初始化图表
		chart = echarts.init(chartRef.value);
		let option = {
			//你的代码
			title: {
				text: '企业数量(家)',
				textStyle: {
					color: 'rgba(28, 31, 35, 0.80)',
					fontSize: '12px',
					fontWeight: 'normal',
				},
				top: '20',
				left: '0',
			},
			tooltip: {
				// triggerOn: "click",
				padding: 0,
				borderWidth: 0,
				formatter: function (e, t, n) {
					// return '.5' == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
					return `<div class="tooltip-area"><p>${e.marker}${e.name}</p><h4>${e.value}</h4></div>`;
				},
			},
			// visualMap 定义了一个颜色范围，inRange 中的颜色数组表示从低到高的范围。
			//ECharts 会根据 dataList 中每个省份的 value 值，自动计算该值在给定范围内的位置，并根据位置选择相应的颜色
			// ECharts 会根据 min 和 max 的值来确定数据值的范围，并进行颜色插值。通过这种方式，可以灵活地控制颜色变化与数据值之间的关系。
			visualMap: {
				min: 0,
				max: 1000000,
				left: 0,
				bottom: 0,
				showLabel: true,
				inRange: {
					color: [
						'rgba(0, 119, 250, 0.10)',
						'rgba(0, 119, 250, 0.20)',
						'rgba(0, 119, 250, 0.40)',
						'rgba(0, 119, 250, 0.60)',
						'rgba(0, 119, 250, 0.80)',
					],
				},
				text: ['高', '低'],
				show: true,
			},
			geo: {
				map: 'china',
				roam: true,
				scaleLimit: {
					min: 1,
					max: 2,
				},
				zoom: 1.13,
				top: 50,
				label: {
					show: true,
					fontSize: '12',
					color: '#003d8f',
				},
				itemStyle: {
					borderColor: 'rgba(0, 0, 0, 0.2)',
				},
				emphasis: {
					areaColor: '#f2d5ad',
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					borderWidth: 0,
				},
			},
			series: [
				{
					name: '',
					type: 'map',
					geoIndex: 0,
					data: dataList,
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
