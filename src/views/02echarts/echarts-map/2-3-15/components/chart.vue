<template>
	<div :id="id" :class="className" :style="{ height: height, width: width }" ref="chartRef" />
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import * as echarts from 'echarts';
import jiangsuJson from '/@/utils/geoJson/province/province-jiangsu.json';

const props = defineProps({
	className: {
		type: String,
		default: 'chart',
	},
	id: {
		type: String,
		default: 'chart',
	},
	width: {
		type: String,
		default: '100%',
	},
	height: {
		type: String,
		default: '100%',
	},
	options: {
		type: Object,
		default: () => ({}),
	},
});

const emit = defineEmits(['returnDom']);

const chartRef = ref(null);
const chartInstance = ref(null);

const initChart = () => {
	if (!chartRef.value) return;

	// 初始化echart
	chartInstance.value = echarts.init(chartRef.value);
	echarts.registerMap('js', jiangsuJson);

	try {
		chartInstance.value.setOption(props.options);
		emit('returnDom', chartInstance.value);
	} catch (e) {
		console.error('ECharts init error:', e);
	}

	const handleResize = () => {
		chartInstance.value?.resize();
	};

	window.addEventListener('resize', handleResize);

	// 鼠标移入不变色
	chartInstance.value.on('mouseover', () => {
		chartInstance.value.dispatchAction({
			type: 'downplay',
		});
	});

	// 组件卸载时清理
	onBeforeUnmount(() => {
		window.removeEventListener('resize', handleResize);
		chartInstance.value?.dispose();
	});
};

onMounted(() => {
	initChart();
});

watch(
	() => props.options,
	(newOptions) => {
		// 设置true清空echart缓存
		nextTick(() => {
			chartInstance.value?.setOption(newOptions, true);
		});
	},
	{ deep: true }
);
</script>
