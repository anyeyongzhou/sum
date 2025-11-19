<template>
	<div ref="chartContainer" :style="{ width: '100%', height: '600px' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

// 图表容器
const chartContainer = ref(null);
let chartInstance = null;

const MONTHS_IN_YEAR = 12;

// 将年份与月份下标拼接成 YYYY-MM 的标签，用于 X 轴展示
const formatMonthLabel = (year, monthIndex) => `${year}-${String(monthIndex + 1).padStart(2, '0')}`;

// 根据年度数组生成完整的月度时间轴（2000-01 ~ 2024-12）
const createMonthlyTimeline = (years) => {
	const timeline = [];
	years.forEach((year) => {
		for (let month = 0; month < MONTHS_IN_YEAR; month++) {
			timeline.push(formatMonthLabel(year, month));
		}
	});
	return timeline;
};

// 通过线性插值将年度值拆分到 12 个月，模拟月度走势
const createMonthlyValues = (yearlyValues) => {
	const monthlyValues = [];
	for (let i = 0; i < yearlyValues.length - 1; i++) {
		const startValue = yearlyValues[i];
		const endValue = yearlyValues[i + 1];
		const step = (endValue - startValue) / MONTHS_IN_YEAR;
		for (let month = 0; month < MONTHS_IN_YEAR; month++) {
			monthlyValues.push(parseFloat((startValue + step * month).toFixed(2)));
		}
	}

	const lastValue = yearlyValues[yearlyValues.length - 1];
	for (let month = 0; month < MONTHS_IN_YEAR; month++) {
		monthlyValues.push(lastValue);
	}
	return monthlyValues;
};

// diff 符号变化意味着折线互穿；每次变化都记录 i-1 位置（满足“往回延一月”），可收集多个交点
const findIntersectionIndices = (seriesA, seriesB) => {
	const intersections = new Set();
	for (let i = 0; i < seriesA.length; i++) {
		const currentDiff = seriesA[i] - seriesB[i];
		if (currentDiff === 0) {
			intersections.add(i);
			continue;
		}

		if (i > 0) {
			const prevDiff = seriesA[i - 1] - seriesB[i - 1];
			if (prevDiff * currentDiff < 0) {
				intersections.add(i - 1);
			}
		}
	}
	return Array.from(intersections).sort((a, b) => a - b);
};

const formatIntersectionLabel = (label) => {
	if (!label) return '';
	const [year, month] = label.split('-');
	return `${year}年${Number(month)}月`;
};

// 准备图表配置项
const getChartOption = () => {
	// 年份数据 (X轴)
	const years = [
		2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
		2021, 2022, 2023, 2024,
	];

	// 人口出生率数据 (‰) - 末段刻意制造多次上下震荡以观察多交点
	const birthRates = [
		14.03, 13.38, 12.86, 12.41, 12.29, 12.4, 12.09, 12.1, 12.14, 11.95, 11.9, 11.93, 12.1, 12.08, 12.37, 12.07, 12.2, 11.5, 10.4,
		9.6, 8.9, 7.2, 7.9, 7.1, 7.4,
	];

	// 人口死亡率数据 (‰) - 逐年缓慢上升，同时伴随轻微波动
	const deathRates = [
		6.45, 6.43, 6.41, 6.4, 6.42, 6.51, 6.65, 6.8, 6.95, 7.05, 7.08, 7.1, 7.1, 7.12, 7.15, 7.2, 7.35, 7.4, 7.55, 7.7, 7.85, 7.9,
		7.6, 7.95, 8.1,
	];

	// 将年度数据扩展成月度时间序列（X 轴标签 & 两条折线的取值）
	const months = createMonthlyTimeline(years);
	const monthlyBirthRates = createMonthlyValues(birthRates);
	const monthlyDeathRates = createMonthlyValues(deathRates);

	// 获取所有交点索引，并映射出每个交点对应的 X 轴标签和出生率值
	const intersectionIndices = findIntersectionIndices(monthlyBirthRates, monthlyDeathRates);

	const minValue = Math.min(...monthlyBirthRates, ...monthlyDeathRates);
	const yAxisMin = Math.floor(minValue - 1);

	let markLineData = [];
	if (intersectionIndices.length > 0) {
		// 每个交点都通过 markLine 定义“交点 ➝ X 轴投影”的虚线段
		markLineData = intersectionIndices.map((index) => {
			const label = months[index];
			const value = monthlyBirthRates[index];
			return [
				{
					coord: [label, value],
					symbol: 'circle',
					symbolSize: 8,
					itemStyle: {
						color: '#5470c6',
					},
				},
				{
					coord: [label, yAxisMin],
					symbol: 'none',
					label: {
						formatter: () => formatIntersectionLabel(label),
						position: 'end',
						distance: 8,
					},
				},
			];
		});
	}

	return {
		// 标题和提示框
		title: {
			text: '2000-2024年中国人口出生率与死亡率变化趋势',
			left: 'center',
			textStyle: {
				fontSize: 18,
			},
		},
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				let result = `时间：${params[0].name}<br/>`;
				params.forEach((param) => {
					result += `${param.seriesName}：${param.value} ‰<br/>`;
				});
				return result;
			},
		},
		// 图例
		legend: {
			data: ['人口出生率 (‰)', '人口死亡率 (‰)'],
			top: 30,
		},
		// 网格
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			top: 80,
			containLabel: true,
		},
		// 工具栏 (保存图片等)
		toolbox: {
			feature: {
				saveAsImage: {
					title: '保存为图片',
				},
			},
			top: 30,
			right: 10,
		},
		// X轴 (月份)
		xAxis: {
			type: 'category',
			data: months,
			name: '时间',
			axisLabel: {
				rotate: 60,
			},
		},
		// Y轴 (比率)
		yAxis: {
			type: 'value',
			name: '比率 (‰)',
			min: () => yAxisMin,
		},
		// 数据系列
		series: [
			{
				name: '人口出生率 (‰)',
				type: 'line',
				data: monthlyBirthRates,
				// 线条样式
				lineStyle: {
					color: '#5470c6',
					width: 3,
				},
				// 数据点样式
				itemStyle: {
					color: '#5470c6',
				},
				// 区域填充样式
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: 'rgba(84, 112, 198, 0.5)' },
						{ offset: 1, color: 'rgba(84, 112, 198, 0.1)' },
					]),
				},
				// 数据标签
				label: {
					show: true,
					position: 'top',
					formatter: '{c} ‰',
					fontSize: 10,
				},
				// 平滑曲线
				smooth: true,
				markLine: {
					symbol: 'none',
					data: markLineData,
					lineStyle: {
						type: 'dashed',
						color: '#c4c4c4',
					},
					label: {
						color: '#333',
						fontSize: 12,
					},
				},
			},
			{
				name: '人口死亡率 (‰)',
				type: 'line',
				data: monthlyDeathRates,
				lineStyle: {
					color: '#91cc75',
					width: 3,
				},
				itemStyle: {
					color: '#91cc75',
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: 'rgba(145, 204, 117, 0.5)' },
						{ offset: 1, color: 'rgba(145, 204, 117, 0.1)' },
					]),
				},
				label: {
					show: true,
					position: 'bottom',
					formatter: '{c} ‰',
					fontSize: 10,
				},
				smooth: true,
			},
		],
	};
};

// 初始化图表
let resizeHandler = null;

onMounted(() => {
	chartInstance = echarts.init(chartContainer.value);
	chartInstance.setOption(getChartOption());

	// 响应式调整
	resizeHandler = () => {
		chartInstance?.resize();
	};
	window.addEventListener('resize', resizeHandler);
});

// 清理资源
onUnmounted(() => {
	if (resizeHandler) {
		window.removeEventListener('resize', resizeHandler);
		resizeHandler = null;
	}
	chartInstance?.dispose();
	chartInstance = null;
});
</script>
