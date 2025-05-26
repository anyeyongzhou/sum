<template>
	<div class="geo-map-chart">
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
import jiangsuJeoJson from '/@/utils/map/sgmap/mapData/jiangsuData.json';

const props = defineProps({
	// 城市坐标映射
	geoCoordMap: {
		type: Object,
		default: () => ({
			苏州市: [120.585315, 31.298886],
			泰州市: [120.1, 32.5],
			扬州市: [119.512966, 32.69421],
			南京市: [118.796877, 32],
			镇江市: [119.5, 32.1],
			宿迁市: [118.475198, 33.8],
			徐州市: [117.5, 34.3],
			南通市: [120.994291, 32.15],
			盐城市: [120.163561, 33.5],
			无锡市: [120.4, 31.7],
			常州市: [119.5, 31.6],
			淮安市: [119, 33.4],
			连云港市: [119.221611, 34.596653],
		}),
	},
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
	// 地图中心点
	centerPoint: {
		type: Array,
		default: () => [120.1, 32.5],
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
		echarts.registerMap('gansu', jiangsuJeoJson);

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
