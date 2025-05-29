<template>
	<div class="geo-map-chart">
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import wuhanJson from '/@/utils/geoJson/city/wuhan.json';
import img1 from '/@/assets/beauty/1/1-1.jpg';

const chartRef = ref(null);
let chart = null;

var mapDate = [
	{
		name: '江岸区',
		value: [114.320896, 30.642672],
		datas: 2432,
		img: img1,
	},
	{
		name: '汉阳区',
		value: [114.209517, 30.541833],
		datas: 9462,
		img: img1,
	},
	{
		name: '蔡甸区',
		value: [113.96512, 30.451884],
		datas: 1354,
		img: img1,
	},
	{
		name: '江夏区',
		value: [114.360325, 30.243389],
		datas: 1402,
		img: img1,
	},

	{
		name: '新洲区',
		value: [114.752673, 30.798095],
		datas: 2468,
		img: img1,
	},
	{
		name: '黄陂区',
		value: [114.355245, 30.978113],
		datas: 768,
		img: img1,
	},
	{
		name: '东西湖区',
		value: [114.076902, 30.690527],
		datas: 768,
		img: img1,
	},
];
var img2 =
	'image://data:image/png;base64,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';
let index = -1;

/**
 * 初始化地图图表
 */
const initChart = async () => {
	if (!chartRef.value) return;

	try {
		// 加载GeoJSON数据
		echarts.registerMap('wuhan', wuhanJson);

		// 初始化图表
		chart = echarts.init(chartRef.value);
		chart.showLoading('default', {
			text: '统计中，请稍候...',
			maskColor: '#2957A2',
			textColor: '#fff',
		});
		wuhanJson.features.map((el) => {
			el.numData = mapDate.find((item) => item.name == el.properties.name);
		});

		let data = wuhanJson.features.map((item, index) => {
			return {
				name: item.properties.name,
				datas: item.numData?.datas || 0,
			};
		});

		chart.hideLoading();
		let option = {
			backgroundColor: '#030528',
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
					var tipHtml = '';
					tipHtml = `
                    <div class="ui-map-img">
                        <div class='ui-maptxt'>${params.name}</div>
                        <div class='ui-mapNum'>数量:${params.data.datas}</div>
                    </div>
                `;
					return tipHtml;
				},
			},
			title: {
				top: 20,
				text: '',
				subtext: '',
				x: 'center',
				textStyle: {
					color: 'BLACK',
					fontWeight: 100,
					fontSize: 14,
				},
			},
			geo: [
				{
					map: 'wuhan',
					aspectScale: 1,
					zoom: 0.56,
					silent: true,
					layoutCenter: ['50%', '50%'],
					layoutSize: '180%',
					show: true,
					roam: false,
					label: {
						emphasis: {
							show: false,
						},
					},
					itemStyle: {
						normal: {
							borderColor: '#c0f3fb',
							borderWidth: 1,
							shadowColor: '#8cd3ef',
							shadowOffsetY: 10,
							shadowBlur: 120,
							areaColor: 'transparent',
						},
						emphasis: {
							areaColor: '#2AB8FF',
							borderWidth: 1,
							color: 'green',
							label: {
								show: false,
							},
						},
					},
				},
				// 重影
				{
					type: 'map',
					map: 'wuhan',
					zlevel: -1,
					aspectScale: 1,
					zoom: 0.56,
					layoutCenter: ['50%', '51%'],
					layoutSize: '180%',
					roam: false,
					silent: true,
					itemStyle: {
						normal: {
							borderWidth: 1,
							// borderColor:"rgba(17, 149, 216,0.6)",
							borderColor: 'rgba(58,149,253,0.8)',
							shadowColor: 'rgba(172, 122, 255,0.5)',
							shadowOffsetY: 5,
							shadowBlur: 15,
							areaColor: 'rgba(5,21,35,0.1)',
						},
					},
				},
				{
					type: 'map',
					map: 'wuhan',
					zlevel: -2,
					aspectScale: 1,
					zoom: 0.56,
					layoutCenter: ['50%', '52%'],
					layoutSize: '180%',
					roam: false,
					silent: true,
					itemStyle: {
						normal: {
							borderWidth: 1,
							// borderColor: "rgba(57, 132, 188,0.4)",
							borderColor: 'rgba(58,149,253,0.6)',
							shadowColor: 'rgba(65, 214, 255,1)',
							shadowOffsetY: 5,
							shadowBlur: 15,
							areaColor: 'transpercent',
						},
					},
				},
				{
					type: 'map',
					map: 'wuhan',
					zlevel: -3,
					aspectScale: 1,
					zoom: 0.56,
					layoutCenter: ['50%', '53%'],
					layoutSize: '180%',
					roam: false,
					silent: true,
					itemStyle: {
						normal: {
							borderWidth: 1,
							// borderColor: "rgba(11, 43, 97,0.8)",
							borderColor: 'rgba(58,149,253,0.4)',
							shadowColor: 'rgba(58,149,253,1)',
							shadowOffsetY: 15,
							shadowBlur: 10,
							areaColor: 'transpercent',
						},
					},
				},
				{
					type: 'map',
					map: 'wuhan',
					zlevel: -4,
					aspectScale: 1,
					zoom: 0.56,
					layoutCenter: ['50%', '54%'],
					layoutSize: '180%',
					roam: false,
					silent: true,
					itemStyle: {
						normal: {
							borderWidth: 5,
							// borderColor: "rgba(11, 43, 97,0.8)",
							borderColor: 'rgba(5,9,57,0.8)',
							shadowColor: 'rgba(29, 111, 165,0.8)',
							shadowOffsetY: 15,
							shadowBlur: 10,
							areaColor: 'rgba(5,21,35,0.1)',
						},
					},
				},
			],
			series: [
				{
					type: 'map',
					zoom: 0.56,
					roam: false,
					map: 'wuhan',
					aspectScale: 1,
					layoutCenter: ['50%', '50%'],
					layoutSize: '180%',
					showLegendSymbol: true,
					markPoint: {
						symbol: 'none',
					},
					label: {
						normal: {
							show: true,
							textStyle: {
								color: '#fff',
							},
						},
						emphasis: {
							textStyle: {
								color: '#fff',
							},
						},
					},
					itemStyle: {
						normal: {
							areaColor: {
								type: 'linear',
								x: 1200,
								y: 0,
								x2: 0,
								y2: 0,
								colorStops: [
									{
										offset: 0,
										color: 'rgba(3,27,78,0.75)', // 0% 处的颜色
									},
									{
										offset: 1,
										color: 'rgba(58,149,253,0.75)', // 50% 处的颜色
									},
								],
								global: true, // 缺省为 false
							},
							borderColor: '#fff',
							borderWidth: 0.2,
						},
						emphasis: {
							show: false,
							color: '#fff',
							areaColor: 'rgba(0,254,233,0.6)',
						},
					},
					data: data,
				},
				{
					tooltip: {
						show: false,
					},
					type: 'effectScatter',
					coordinateSystem: 'geo',
					rippleEffect: {
						scale: 10,
						brushType: 'stroke',
					},
					showEffectOn: 'render',
					itemStyle: {
						normal: {
							shadowColor: '#0ff',
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							color: function (params) {
								var colorList = [
									new echarts.graphic.LinearGradient(1, 0, 0, 0, [
										{
											offset: 0,
											color: '#64fbc5',
										},
										{
											offset: 1,
											color: '#018ace',
										},
									]),
									new echarts.graphic.LinearGradient(1, 0, 0, 0, [
										{
											offset: 0,
											color: '#64fbc5',
										},
										{
											offset: 1,
											color: '#018ace',
										},
									]),
									new echarts.graphic.LinearGradient(1, 0, 0, 0, [
										{
											offset: 0,
											color: '#168e6d',
										},
										{
											offset: 1,
											color: '#c78d7b',
										},
									]),
									new echarts.graphic.LinearGradient(1, 0, 0, 0, [
										{
											offset: 0,
											color: '#61c0f1',
										},
										{
											offset: 1,
											color: '#6f2eb6',
										},
									]),
									new echarts.graphic.LinearGradient(1, 0, 0, 0, [
										{
											offset: 0,
											color: '#168e6d',
										},
										{
											offset: 1,
											color: '#c78d7b',
										},
									]),
									new echarts.graphic.LinearGradient(1, 0, 0, 0, [
										{
											offset: 0,
											color: '#61c0f1',
										},
										{
											offset: 1,
											color: '#6f2eb6',
										},
									]),
								];
								return colorList[params.dataIndex];
							},
						},
					},
					label: {
						normal: {
							color: '#fff',
						},
					},
					symbol: 'circle',
					symbolSize: [10, 5],
					data: mapDate,
					zlevel: 1,
				},
				{
					type: 'scatter',
					coordinateSystem: 'geo',
					itemStyle: {
						color: '#f00',
					},
					symbol: function (value, params) {
						return params.data.img;
					},
					symbolSize: [32, 41],
					symbolOffset: [0, -20],
					z: 9999,
					data: mapDate,
				},
				{
					type: 'scatter',
					coordinateSystem: 'geo',

					label: {
						normal: {
							show: true,
							formatter: function (params) {
								var name = params.name;
								var value = params.data.datas;
								//   var text = `{tline|${name}} : {fline|${value}}个`
								// var text = `{tline|项目个数} : {fline|${value}}`

								var text = `{tline|${name}}`;
								return text;
							},
							color: '#fff',
							rich: {
								fline: {
									padding: [0, 25],
									color: '#fff',
									textShadowColor: '#030615',
									textShadowBlur: '0',
									textShadowOffsetX: 1,
									textShadowOffsetY: 1,
									fontSize: 8,
									fontWeight: 400,
								},
								tline: {
									padding: [6, 27],
									color: '#ABF8FF',
									fontSize: 12,
								},
							},
						},
						emphasis: {
							show: true,
						},
					},
					itemStyle: {
						color: '#00FFF6',
					},
					symbol: img2,
					symbolSize: [100, 50],
					symbolOffset: [0, -60],
					z: 999,
					data: mapDate,
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
