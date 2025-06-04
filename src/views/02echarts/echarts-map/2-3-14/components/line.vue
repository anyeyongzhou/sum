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
			series: {
				type: 'map3D',
				map: 'jiangsu',
				show: true,
				viewControl: {
					distance: 150,
					center: [-2, -5, 0],
				},
				itemStyle: {
					color: 'rgba(255,255,255,1)',
					borderWidth: 0.5,
					borderColor: `#539efe9a`,
				},
				shading: 'lambert',
				lambertMaterial: {
					detailTexture: img1,
				},
				light: {
					main: {
						color: '#fff',
						intensity: 1.2,
						shadow: true,
						shadowQuality: 'ultra',
					},
					ambient: {
						color: 'skyblue',
						intensity: 0.2,
					},
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 16,
						color: '#f9fcff',
						fontWeight: 600,
					},
					itemStyle: {
						color: '#539efe9a',
					},
				},
			},
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
