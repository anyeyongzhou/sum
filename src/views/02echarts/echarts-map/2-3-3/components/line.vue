<template>
	<div class="geo-map-chart">
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

const props = defineProps({
	// 地图GeoJSON数据URL
	geoJsonUrl: {
		type: String,
		default: 'https://www.isqqw.com/asset/get/areas_v3/province/620000_full.json',
	},
	// 城市坐标映射
	geoCoordMap: {
		type: Object,
		default: () => ({
			嘉峪关市: [98.277304, 39.786529],
			金昌市: [102.187888, 38.514238],
			兰州市: [103.823557, 36.058039],
			天水市: [105.724998, 34.578529],
			张掖市: [100.455472, 38.932897],
			平凉市: [106.684691, 35.54279],
			武威市: [102.634697, 37.929996],
			白银市: [104.173606, 36.54568],
			庆阳市: [107.638372, 35.734218],
			甘南藏族自治州: [102.911008, 34.986354],
			临夏回族自治州: [103.212006, 35.599446],
			定西市: [104.626294, 35.579578],
			陇南市: [104.929379, 33.388598],
			酒泉市: [96.063265, 40.283136],
			榆中县: [104.11, 35.84],
		}),
	},
	// 初始数据
	initData: {
		type: Array,
		default: () => [
			{ name: '兰州市', value: 0 },
			{ name: '天水市', value: 0 },
			// ...其他城市数据
		],
	},
	// 地图中心点
	centerPoint: {
		type: Array,
		default: () => [103.823557, 36.058039], // 兰州市坐标
	},
	// 地图缩放配置
	zoomConfig: {
		type: Object,
		default: () => ({
			current: 1, // 初始缩放级别
			min: 1, // 最小缩放
			max: 2, // 最大缩放
		}),
	},
});

const chartRef = ref(null);
let chartInstance = null;

/**
 * 转换数据格式为飞线图所需格式
 */
const convertData = (data, fromCoord) => {
	return data
		.map((item) => {
			const toCoord = props.geoCoordMap[item.name];
			return toCoord
				? [
						{
							coord: toCoord,
						},
						{
							coord: fromCoord,
							value: item.value,
						},
				  ]
				: null;
		})
		.filter(Boolean);
};

/**
 * 初始化地图图表
 */
const initChart = async () => {
	if (!chartRef.value) return;

	try {
		// 加载GeoJSON数据
		const { data: geoJson } = await axios.get(props.geoJsonUrl);
		echarts.registerMap('gansu', geoJson);

		// 准备系列数据
		const series = [
			// 基础地图
			{
				type: 'map',
				map: 'gansu',
				aspectScale: 0.95,
				layoutCenter: ['50%', '50%'],
				layoutSize: '108%',
				selectedMode: 'single',
				zoom: props.zoomConfig.current,
				scaleLimit: props.zoomConfig,
				label: {
					show: true,
					color: '#fff',
				},
				itemStyle: {
					areaColor: {
						type: 'radial',
						x: 0.5,
						y: 0.5,
						r: 0.9,
						colorStops: [
							{ offset: 0, color: 'RGBA(40, 99, 113, 1)' },
							{ offset: 1, color: 'RGBA(28, 79, 105, 0.6)' },
						],
					},
					borderColor: 'RGBA(52, 140, 250, 1)',
					borderWidth: 2,
					shadowColor: '#092f8f',
					shadowBlur: 20,
				},
				emphasis: {
					areaColor: '#0c274b',
					label: { color: '#fff' },
				},
			},
			// 散点图
			{
				type: 'effectScatter',
				coordinateSystem: 'geo',
				symbolSize: 10,
				rippleEffect: {
					period: 3,
					scale: 5,
					brushType: 'fill',
				},
				data: props.initData.map((item) => ({
					name: item.name,
					value: props.geoCoordMap[item.name],
					label: {
						show: true,
						position: 'right',
						formatter: '{b}',
						color: '#f28813',
						fontWeight: 'bold',
						fontSize: 14,
					},
				})),
				symbolSize: 6,
				showEffectOn: 'render',
				hoverAnimation: true,
				itemStyle: {
					color: 'yellow',
					shadowBlur: 10,
					shadowColor: 'yellow',
				},
				zlevel: 1,
			},
			// 飞线图
			{
				type: 'lines',
				zlevel: 2,
				effect: {
					show: true,
					period: 4,
					trailLength: 0.02,
					symbol: 'arrow',
					symbolSize: 5,
				},
				lineStyle: {
					width: 1,
					opacity: 1,
					curveness: 0.3,
					color: 'yellow',
				},
				data: convertData(props.initData, props.centerPoint),
			},
			// 涟漪散点
			{
				type: 'scatter',
				coordinateSystem: 'geo',
				zlevel: 2,
				rippleEffect: {
					period: 4,
					brushType: 'stroke',
					scale: 4,
				},
				symbol: 'circle',
				symbolSize: 10,
				itemStyle: {
					color: 'yellow',
				},
				data: props.initData.map((item) => ({
					name: item.name,
					value: [...(props.geoCoordMap[item.name] || []), item.value],
				})),
			},
		];

		// 图表配置
		const option = {
			tooltip: {
				trigger: 'item',
				backgroundColor: 'transparent',
				formatter: (params) => `
          <div style="
            background: rgba(0,0,0,0.7);
            padding: 10px;
            border-radius: 4px;
            color: #fff;
            border: 1px solid #3CCFDB;
          ">
            <div style="font-weight:bold;">${params.name}</div>
            <div>人数: ${params.value || 0}</div>
          </div>
        `,
			},
			geo: {
				map: 'gansu',
				zoom: props.zoomConfig.current,
				aspectScale: 0.95,
				layoutCenter: ['50%', '50%'],
				layoutSize: '108%',
				itemStyle: {
					shadowColor: '#276fce',
					shadowOffsetX: 0,
					shadowOffsetY: 15,
					opacity: 0.3,
				},
			},
			series: series,
		};

		// 初始化图表
		chartInstance = echarts.init(chartRef.value);
		chartInstance.setOption(option);

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
	chartInstance?.resize();
};

onMounted(() => {
	initChart();
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize);
	chartInstance?.dispose();
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
