<!-- DonutRoseChart.vue -->
<template>
	<div class="donut-rose-chart" ref="chartRef"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);
let chartInstance = null;

const initChart = () => {
	if (!chartRef.value) return;
	chartInstance = echarts.init(chartRef.value);

	const option = {
		backgroundColor: '#000',
		tooltip: {
			trigger: 'item',
		},
		legend: {
			show: false,
		},
		series: [
			{
				name: '成本结构',
				type: 'pie',
				radius: ['0%', '15%'],
				itemStyle: { borderWidth: 0 },
				label: { show: false },
				data: [{ value: 1 }],
			},
			{
				name: '中心',
				type: 'pie',
				radius: ['15%', '30%'],
				label: { show: false },
				itemStyle: { borderWidth: 0 },
				data: [{ value: 1, name: '中心', itemStyle: { color: '#ffffff' } }],
			},
			{
				name: '内圈',
				type: 'pie',
				radius: ['30%', '50%'],
				label: {
					show: false,
				},
				data: [
					{ value: 45.8, name: '实验成本', itemStyle: { color: '#45d6e3' } },
					{ value: 37.2, name: '研发成本', itemStyle: { color: '#3b9eff' } },
				],
			},
			{
				name: '外圈',
				type: 'pie',
				radius: ['55%', '75%'],
				label: {
					formatter: '{b}\n{d}%',
					color: '#fff',
				},
				labelLine: {
					length: 15,
					length2: 10,
					lineStyle: { color: '#fff' },
				},
				data: [
					{ value: 61.3, name: '运营成本', itemStyle: { color: '#ffcc00' } },
					{ value: 100 - 61.3, name: '', itemStyle: { color: 'transparent' }, label: { show: false }, tooltip: { show: false } },
					{ value: 45.8, name: '实验成本', itemStyle: { color: '#ff6600' } },
					{ value: 100 - 45.8, name: '', itemStyle: { color: 'transparent' }, label: { show: false }, tooltip: { show: false } },
				],
			},
		],
	};

	chartInstance.setOption(option);
};

onMounted(() => {
	initChart();
	window.addEventListener('resize', () => chartInstance?.resize());
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', () => chartInstance?.resize());
	chartInstance?.dispose();
});
</script>

<style lang="scss" scoped>
.donut-rose-chart {
	width: 100% !important;
	height: 500px;
	background-color: #fff;
}
</style>
