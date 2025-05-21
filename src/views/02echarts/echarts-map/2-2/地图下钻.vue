<template>
	<div class="home">
		<div ref="chartRef" class="chart"></div>
	</div>
</template>

<script setup>
import * as echarts from 'echarts';
import chinaMapJson from '/@/utils/echartMap/json/china.json';
import jiangsuMapJson from '/@/utils/echartMap/json/province/jiangsu.json';

const chartRef = ref();

let chart = null;

const dataList = [
	{ name: '南海诸岛' },
	{ ename: 'beijing', name: '北京' },
	{ ename: 'tianjin', name: '天津' },
	{ ename: 'shanghai', name: '上海' },
	{ ename: 'chongqing', name: '重庆' },
	{ ename: 'hebei', name: '河北' },
	{ ename: 'henan', name: '河南' },
	{ ename: 'yunnan', name: '云南' },
	{ ename: 'liaoning', name: '辽宁' },
	{ ename: 'heilongjiang', name: '黑龙江' },
	{ ename: 'hunan', name: '湖南' },
	{ ename: 'anhui', name: '安徽' },
	{ ename: 'shandong', name: '山东' },
	{ ename: 'xinjiang', name: '新疆' },
	{ ename: 'jiangsu', name: '江苏' },
	{ ename: 'zhejiang', name: '浙江' },
	{ ename: 'jiangxi', name: '江西' },
	{ ename: 'hubei', name: '湖北' },
	{ ename: 'guangxi', name: '广西' },
	{ ename: 'gansu', name: '甘肃' },
	{ ename: 'shanxi', name: '山西' },
	{ ename: 'neimenggu', name: '内蒙古' },
	{ ename: 'shanxi1', name: '陕西' },
	{ ename: 'jilin', name: '吉林' },
	{ ename: 'fujian', name: '福建' },
	{ ename: 'guizhou', name: '贵州' },
	{ ename: 'guangdong', name: '广东' },
	{ ename: 'qinghai', name: '青海' },
	{ ename: 'xizang', name: '西藏' },
	{ ename: 'sichuan', name: '四川' },
	{ ename: 'ningxia', name: '宁夏' },
	{ ename: 'hainan', name: '海南' },
	{ name: '台湾' },
	{ ename: 'xianggang', name: '香港' },
	{ ename: 'aomen', name: '澳门' },
];

const initEchart = () => {
	if (!chart) {
		chart = echarts.init(chartRef.value);
	}
	echarts.registerMap('china', chinaMapJson);
	const option = {
		tooltip: {
			show: false,
		},
		visualMap: {
			show: false, //图注
		},
		geo: {
			map: 'china', //引入地图数据
			roam: true, //开启缩放和平移
			zoom: 1, //视角缩放比例
			label: {
				normal: {
					show: true,
					fontSize: '10',
					color: 'rgba(0,0,0,0.7)',
				},
			},
			itemStyle: {
				normal: {
					borderColor: 'rgba(0, 0, 0, 0.2)',
				},
				emphasis: {
					//高亮的显示设置
					areaColor: 'skyblue', //鼠标选择区域颜色
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					shadowBlur: 20,
					borderWidth: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
				},
			},
		},
		// 鼠标悬浮提示框
		series: [
			{
				name: '城市',
				type: 'map',
				geoIndex: 0,
				data: dataList,
			},
		],
	};
	chart.setOption(option);
	chart.on('click', function (params) {
		option.geo.map = 'jiangsu';
		echarts.registerMap('jiangsu', jiangsuMapJson);
		chart.setOption(option);
	});
};

onMounted(() => {
	initEchart();
});
</script>

<style lang="scss" scoped>
.home {
	height: 100%;
	width: 100%;
	background-color: #fff;
	border: 1px solid #0f0;
	.chart {
		height: 100%;
		width: 100%;
		border: 1px solid #000;
	}
}
</style>
