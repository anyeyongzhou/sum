<template>
	<div class="geo-map-chart">
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import jiangsuJson from '/@/utils/geoJson/province/province-jiangsu.json';

const props = defineProps({
	mapData: {
		type: Object,
	},
});

const chartRef = ref(null);
let chart = null;
var geoCoordMap = {};
var customerBatteryCityData = [];

for (let item of props.mapData) {
	geoCoordMap[item.name] = item.center.split(',').map(Number);
	customerBatteryCityData.push({
		name: item.name,
		value: (Math.random() * 100).toFixed(0),
	});
}

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
			backgroundColor: '#131C38',
			tooltip: {
				// borderWidth: 0,
				trigger: 'item',
				show: true,
				enterable: true,
				textStyle: {
					fontSize: 20,
					color: '#fff',
				},
				backgroundColor: 'rgba(0,2,89,0.8)',
				formatter: '{b}<br />{c}',
			},
			geo: [
				{
					map: 'jiangsu',
					aspectScale: 0.9,
					roam: false, // 是否允许缩放
					zoom: 1.2, // 默认显示级别
					layoutSize: '95%',
					layoutCenter: ['55%', '50%'],
					itemStyle: {
						normal: {
							areaColor: {
								type: 'linear-gradient',
								x: 0,
								y: 400,
								x2: 0,
								y2: 0,
								colorStops: [
									{
										offset: 0,
										color: 'rgba(37,108,190,0.3)', // 0% 处的颜色
									},
									{
										offset: 1,
										color: 'rgba(15,169,195,0.3)', // 50% 处的颜色
									},
								],
								global: true, // 缺省为 false
							},
							borderColor: '#4ecee6',
							borderWidth: 1,
						},
						emphasis: {
							areaColor: {
								type: 'linear-gradient',
								x: 0,
								y: 300,
								x2: 0,
								y2: 0,
								colorStops: [
									{
										offset: 0,
										color: 'rgba(37,108,190,1)', // 0% 处的颜色
									},
									{
										offset: 1,
										color: 'rgba(15,169,195,1)', // 50% 处的颜色
									},
								],
								global: true, // 缺省为 false
							},
						},
					},
					emphasis: {
						itemStyle: {
							areaColor: '#0160AD',
						},
						label: {
							show: 0,
							color: '#fff',
						},
					},
					zlevel: 3,
				},
				{
					map: 'jiangsu',
					aspectScale: 0.9,
					roam: false, // 是否允许缩放
					zoom: 1.2, // 默认显示级别
					layoutSize: '95%',
					layoutCenter: ['55%', '50%'],
					itemStyle: {
						normal: {
							borderColor: 'rgba(192,245,249,.6)',
							borderWidth: 2,
							shadowColor: '#2C99F6',
							shadowOffsetY: 0,
							shadowBlur: 120,
							areaColor: 'rgba(29,85,139,.2)',
						},
					},
					zlevel: 2,
					silent: true,
				},
				{
					map: 'jiangsu',
					aspectScale: 0.9,
					roam: false, // 是否允许缩放
					zoom: 1.2, // 默认显示级别
					layoutSize: '95%',
					layoutCenter: ['55%', '51.5%'],
					itemStyle: {
						// areaColor: '#005DDC',
						areaColor: 'rgba(0,27,95,0.4)',
						borderColor: '#004db5',
						borderWidth: 1,
					},
					zlevel: 1,
					silent: true,
				},
			],
			series: [
				{
					geoIndex: 0,
					showLegendSymbol: true,
					type: 'map',
					roam: true,
					label: {
						normal: {
							show: false,
							textStyle: {
								color: '#fff',
							},
						},
						emphasis: {
							show: false,
							textStyle: {
								color: '#fff',
							},
						},
					},

					itemStyle: {
						normal: {
							borderColor: '#2ab8ff',
							borderWidth: 1.5,
							areaColor: '#12235c',
						},
						emphasis: {
							areaColor: '#2AB8FF',
							borderWidth: 0,
							color: 'red',
						},
					},
					map: 'jiangsu', // 使用
					data: customerBatteryCityData,
					// data: this.difficultData //热力图数据   不同区域 不同的底色
				},
				{
					type: 'lines',
					zlevel: 5,
					effect: {
						show: false,
						symbolSize: 5, // 图标大小
					},
					lineStyle: {
						width: 17, // 尾迹线条宽度
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: 'rgba(252, 231, 209, 0.6)', // 0% 处的颜色
								},
								{
									offset: 0.5,
									color: 'rgba(195, 106, 11, 0.8)', // 0% 处的颜色
								},
								{
									offset: 0.5,
									color: 'rgba(195, 106, 11, 0.8)', // 0% 处的颜色
								},
								{
									offset: 1,
									color: 'rgba(195, 106, 11, 1)', // 100% 处的颜色
								},
							],
							global: false, // 缺省为 false
						},
						opacity: 0.7, // 尾迹线条透明度
						curveness: 0, // 尾迹线条曲直度
					},
					label: {
						show: true,
						position: 'end',
						formatter(e) {
							const data = customerBatteryCityData[e.dataIndex];
							return '{num|' + data.name + ':}{unit|' + data.value + '}';
						},
						rich: {
							num: {
								backgroundColor: '#C36A0B',
								fontFamily: 'dine-bold',
								fontSize: 12,
								color: '#fff',
								padding: 8,
							},
							unit: {
								backgroundColor: '#C36A0B',
								fontSize: 16,
								color: '#fff',
								padding: 6,
							},
						},
					},
					labelLayout: {
						dy: -8,
					},
					silent: true,
					data: lineData(),
				},
				{
					type: 'scatter',
					coordinateSystem: 'geo',
					geoIndex: 0,
					zlevel: 5,
					label: {
						show: false,
						position: 'bottom',
						formatter: (params) => this.data[params.dataIndex].value,
						padding: [4, 8],
						backgroundColor: '#003F5E',
						borderRadius: 5,
						borderColor: '#67F0EF',
						borderWidth: 1,
						color: '#67F0EF',
					},
					symbol: 'diamond',
					symbolSize: [17, 8],
					itemStyle: {
						color: '#F18410',
						opacity: 1,
					},
					silent: true,
					data: scatterData(),
				},
				{
					type: 'scatter',
					coordinateSystem: 'geo',
					geoIndex: 0,
					zlevel: 4,
					label: {
						formatter: '{b}',
						position: 'bottom',
						color: '#fff',
						fontSize: 12,
						distance: 10,
						show: true,
					},
					symbol: 'diamond',
					symbolSize: [17, 8],
					itemStyle: {
						// color: '#F7AF21',
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 1,
							y2: 0,
							colorStops: [
								{
									offset: 0,
									color: 'rgb(199,145,41)', // 0% 处的颜色
								},
								{
									offset: 0.5,
									color: 'rgb(199,145,41)', // 0% 处的颜色
								},
								{
									offset: 0.5,
									color: 'rgb(223,176,32)', // 0% 处的颜色
								},
								{
									offset: 1,
									color: 'rgb(223,176,32)', // 0% 处的颜色
								},
								{
									offset: 1,
									color: 'rgba(252, 231, 209, 0.6)', // 100% 处的颜色
								},
							],
							global: false, // 缺省为 false
						},
						opacity: 0.7,
						// shadowColor: '#fff',
						// shadowBlur: 5,
						// shadowOffsetY: 2
					},
					silent: true,
					data: scatterData2(),
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

// 动态计算柱形图的高度（定一个max）
function lineMaxHeight() {
	const maxValue = Math.max(...customerBatteryCityData.map((item) => item.value));
	return 0.9 / maxValue;
}
// 柱状体的主干
function lineData() {
	return customerBatteryCityData.map((item) => {
		return {
			coords: [geoCoordMap[item.name], [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight()]],
		};
	});
}
// 柱状体的顶部
function scatterData() {
	return customerBatteryCityData.map((item) => {
		return [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight()];
	});
}
// 柱状体的底部
function scatterData2() {
	return customerBatteryCityData.map((item) => {
		return {
			name: item.name,
			value: geoCoordMap[item.name],
		};
	});
}

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
