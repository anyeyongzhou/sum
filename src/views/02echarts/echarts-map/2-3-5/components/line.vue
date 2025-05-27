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

/**
 * 初始化地图图表
 */
const initChart = async () => {
	if (!chartRef.value) return;

	try {
		// 加载GeoJSON数据
		echarts.registerMap('china', chinaJson);

		let data = [
			{
				name: '北京',
				value: [116.405285, 39.904989, 116.405285, 39.904989, 49],
			},
			{
				name: '天津',
				value: [117.190182, 39.125596, 117.190182, 39.125596, 18],
			},
			{
				name: '河北',
				value: [114.502461, 38.045474, 114.502461, 38.045474, 97],
			},
			{
				name: '山西',
				value: [112.549248, 37.857014, 112.549248, 37.857014, 85],
			},
			{
				name: '内蒙古',
				value: [111.670801, 40.818311, 111.670801, 40.818311, 83],
			},
		];

		const option = {
			// 背景色（深蓝色）
			backgroundColor: '#101c5e',

			// 提示框配置
			tooltip: {
				trigger: 'item', // 触发类型（数据项图形触发）
				formatter: function (params, ticket, callback) {
					// 自定义提示内容
					if (params.seriesType == 'scatter') {
						return '线路：' + params.data.name + '' + params.data.value[2];
					} else if (params.seriesType == 'lines') {
						return params.data.fromName + '>' + params.data.toName + '<br />' + params.data.value;
					}
				},
			},

			// 视觉映射组件（颜色映射）
			visualMap: {
				show: false, // 不显示视觉映射控制器
				min: 0, // 最小值
				max: 100, // 最大值
				left: 'left', // 位置
				top: 'bottom',
				text: ['高', '低'], // 文本标签
				calculable: true, // 是否显示拖拽用的手柄
				seriesIndex: [1], // 指定影响的系列
				inRange: {
					color: ['#004693'], // 映射颜色范围
				},
			},

			// 地理坐标系配置
			geo: [
				{
					map: 'china', // 使用注册的地图
					zoom: 1, // 缩放级别
					z: 70, // 层级控制
					top: '100px', // 距离顶部距离
					selected: false, // 是否可以被选中
					label: {
						show: true, // 显示标签
						padding: 4, // 标签内边距
						color: '#ddd', // 标签颜色
						fontFamily: 'pf-zh', // 字体
					},
					itemStyle: {
						areaColor: '#0c4c91', // 区域颜色
						borderColor: 'rgba(147,234,245,.5)', // 边框颜色
						borderWidth: 1, // 边框宽度
					},
					emphasis: {
						disabled: true, // 禁用高亮状态
					},
					regions: [
						{
							name: '南海诸岛', // 特殊区域配置
							emphasis: {
								disabled: true,
							},
							itemStyle: {
								borderWidth: 1,
							},
						},
					],
				},
			],

			// 数据系列配置
			series: [
				// 基础地图系列
				{
					type: 'map', // 地图类型
					map: 'china', // 地图类型
					geoIndex: 0, // 使用的地理坐标系索引
					roam: true, // 是否开启鼠标缩放和平移
					aspectScale: 0.75, // 长宽比（小于1会拉伸高度）
					showLegendSymbol: false, // 是否显示图例标记
					label: {
						normal: {
							show: true, // 常规状态标签显示
						},
						emphasis: {
							show: false, // 高亮状态标签隐藏
							textStyle: {
								color: '#fff',
							},
						},
					},
					itemStyle: {
						normal: {
							areaColor: '#031525', // 常规区域颜色
							borderColor: '#3B5077', // 边框颜色
						},
						emphasis: {
							areaColor: '#2B91B7', // 高亮区域颜色
						},
					},
					animation: false, // 禁用动画
					data: data, // 数据
				},

				// 散点图系列（小圆点）
				{
					name: '散点', // 系列名称
					type: 'scatter', // 散点图类型
					coordinateSystem: 'geo', // 使用地理坐标系
					symbolSize: 5, // 散点大小
					label: {
						normal: {
							show: false, // 不显示标签
							position: 'right',
						},
					},
					itemStyle: {
						normal: {
							color: 'red', // 散点颜色
						},
					},
					zlevel: 10, // 层级（控制绘制顺序）
					data: data, // 数据
				},

				// 气泡图系列（带数字的大头针）
				{
					name: '点',
					type: 'scatter',
					coordinateSystem: 'geo',
					symbol: 'pin', // 使用大头针符号
					symbolSize: function (val) {
						return 40; // 固定大小40
					},
					label: {
						show: true, // 显示标签
						formatter: function (parm) {
							return parm.value[4]; // 显示数据中的第5个值
						},
						textStyle: {
							color: '#fff', // 标签文字颜色
						},
					},
					itemStyle: {
						color: '#F62157', // 气泡颜色
					},
					zlevel: 6, // 层级
					data: data,
				},
			],
		};

		// 初始化图表
		chart = echarts.init(chartRef.value);
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
