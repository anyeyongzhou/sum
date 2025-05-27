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

		let option = {
			// 基础动画配置
			animation: true,
			animationDuration: 1000,
			backgroundColor: '#003366', // 背景色
			animationEasing: 'quinticOut',
			geo: [
				// 第一层地图(主地图)
				{
					layoutCenter: ['50%', '50%'], // 地图中心位置(相对容器)
					layoutSize: '150%', // 地图大小(相对容器)
					center: [103.6, 35.4], // 地理中心点坐标
					show: true,
					map: 'china', // 使用注册的地图名称
					roam: false, // 禁止拖动缩放
					zoom: 0.8, // 缩放级别
					aspectScale: 0.74, // 长宽比缩放
					// 标签样式
					label: {
						normal: { show: false }, // 默认不显示标签
						emphasis: { show: true, textStyle: { color: '#fff' } }, // 高亮时显示
					},
					// 地图区域样式
					itemStyle: {
						normal: {
							// 渐变色填充
							areaColor: {
								type: 'linear', // 线性渐变
								x: 1200,
								y: 0,
								x2: 0,
								y2: 0, // 渐变方向
								colorStops: [
									{ offset: 0, color: 'rgba(3,27,78,0.75)' }, // 起始颜色
									{ offset: 1, color: 'rgba(58,149,253,0.75)' }, // 结束颜色
								],
								global: true, // 全局渐变
							},
							borderColor: '#c0f3fb', // 边框颜色
							borderWidth: 1, // 边框宽度
							shadowColor: '#8cd3ef', // 阴影颜色
							shadowOffsetY: 10, // 阴影Y轴偏移
							shadowBlur: 120, // 阴影模糊大小
						},
						emphasis: {
							areaColor: 'rgba(0,254,233,0.6)', // 高亮区域颜色
						},
					},
					zlevel: 3, // 图层层级
				},
				// 后面4层地图(用于创建立体阴影效果)
				// 每层地图逐渐偏移并降低透明度，形成立体效果
				{
					type: 'map',
					map: 'china',
					zlevel: -1,
					aspectScale: 0.74,
					zoom: 0.8,
					layoutCenter: ['50%', '51%'],
					layoutSize: '150%',
					center: [103.6, 35.4],
					roam: false,
					silent: true,
					itemStyle: {
						normal: {
							borderWidth: 1,
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
					map: 'china',
					zlevel: -2,
					aspectScale: 0.74,
					zoom: 0.8,
					layoutCenter: ['50%', '52%'],
					layoutSize: '150%',
					center: [103.6, 35.4],
					roam: false,
					silent: true,
					itemStyle: {
						normal: {
							borderWidth: 1,
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
					map: 'china',
					zlevel: -3,
					aspectScale: 0.74,
					zoom: 0.8,
					layoutCenter: ['50%', '53%'],
					layoutSize: '150%',
					center: [103.6, 35.4],
					roam: false,
					silent: true,
					itemStyle: {
						normal: {
							borderWidth: 1,
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
					map: 'china',
					zlevel: -4,
					aspectScale: 0.74,
					zoom: 0.65,
					layoutCenter: ['50%', '54%'],
					layoutSize: '150%',
					center: [103.6, 35.4],
					roam: false,
					silent: true,
					itemStyle: {
						normal: {
							borderWidth: 5,
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
				// 1. 枢纽圈(散点图表示枢纽城市)
				{
					name: '枢纽圈',
					type: 'scatter', // 散点图类型
					coordinateSystem: 'geo', // 使用地理坐标系
					selectedMode: 'single', // 单选模式
					data: hubLists.map((item) => ({
						// 数据映射
						name: item.name,
						id: item.id,
						value: item.lat, // 经纬度坐标
					})),
					itemStyle: { color: 'rgba(0,0,0,0)' }, // 透明点
					symbol: 'circle', // 圆形标记
					zlevel: 9, // 较高层级
					// 标签配置
					label: {
						show: true,
						formatter: '{name|{b}}', // 富文本格式
						position: 'inside',
						rich: {
							// 富文本样式
							name: {
								borderColor: 'rgba(10,10,10,0.3)',
								fontSize: 12,
								borderWidth: 0.7,
								borderRadius: 5,
								backgroundColor: 'rgba(10,10,10,0.3)',
								padding: [12, 15, 5, 15],
								fontWeight: 'bold',
								color: '#fff',
							},
						},
					},
					// 标签布局调整(针对特定城市)
					labelLayout: function (params) {
						if (params.text === '{name|京津冀枢纽}') return { dy: 30 };
						if (params.text === '{name|内蒙古枢纽}') return { dy: -10 };
						if (params.text === '{name|宁夏枢纽}') return { dy: -10 };
					},
					// 选中状态样式
					select: {
						label: {
							show: true,
							formatter: '{name|{b}}',
							position: 'inside',
							rich: {
								name: {
									borderColor: 'rgba(0,18,88,0.9)',
									fontSize: 12,
									borderWidth: 0.7,
									borderRadius: 5,
									backgroundColor: 'rgba(0,18,88,0.9)',
									padding: [12, 15, 5, 15],
									fontWeight: 'bold',
									color: '#29F6FB',
								},
							},
						},
					},
				},
				// 2. 时延目标地市(特效散点图)
				{
					name: '时延目标地市',
					type: 'effectScatter', // 特效散点图
					coordinateSystem: 'geo',
					zlevel: 11, // 更高层级
					data: targetPoints.map((item) => ({
						// 数据映射
						name: item.name,
						delay: item.delay,
						value: item.lat,
					})),
					symbolSize: 10, // 标记大小
					showEffectOn: 'render', // 渲染时显示特效
					// 涟漪特效配置
					rippleEffect: {
						period: 15, // 动画周期
						scale: 6, // 缩放比例
						color: 'rgba(255,182,40,0.3)', // 特效颜色
						brushType: 'fill', // 填充类型
					},
					// 复杂标签格式(显示城市名和时延信息)
					label: {
						formatter: function (params) {
							let result = `{name|${params?.data?.name}}{abg|}`;
							for (const item of params?.data?.delay ?? []) {
								result += `\n{name|${item?.operator ? item.operator + '：' : ''}}{delay|${item?.delay}ms}`;
							}
							return result;
						},
						position: 'top',
						show: true,
						distance: 20,
						backgroundColor: 'rgba(59,86,137,1)',
						padding: [0, 15, 5, 15],
						borderRadius: 2,
						borderColor: 'rgba(0,223,255,.7)',
						borderWidth: 0.7,
						// 富文本样式
						rich: {
							name: {
								fontSize: 12,
								align: 'center',
								color: '#fff',
							},
							abg: {
								width: '100%',
								align: 'right',
								height: 25,
							},
							delay: {
								fontSize: 12,
								color: 'rgb(255,182,40)',
							},
						},
					},
					// 标签布局
					labelLayout: function () {
						return { moveOverlap: 'shiftY' }; // Y轴方向避免重叠
					},
					// 标记样式
					itemStyle: {
						color: 'rgb(255,182,40)', // 标记颜色
						shadowBlur: 40, // 阴影模糊
						shadowColor: 'rgba(255,182,40,0.5)', // 阴影颜色
					},
					emphasis: { scale: true }, // 高亮时放大
				},
				// 3. 地市时延连线(连接线)
				{
					name: '地市时延连线',
					type: 'lines', // 线图类型
					zlevel: 11,
					// 线特效配置
					effect: {
						show: true,
						period: 4, // 动画周期
						trailLength: 0.02, // 轨迹长度
						symbol: 'arrow', // 箭头符号
						symbolSize: 8, // 符号大小
						color: 'rgb(255,182,40)', // 颜色
					},
					// 线样式(渐变)
					lineStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: 'rgba(255,182,40,0)' },
							{ offset: 0.5, color: 'rgba(255,182,40,0.5)' },
							{ offset: 1, color: 'rgba(255,182,40, 1)' },
						]),
						width: 3, // 线宽
						opacity: 1, // 透明度
						curveness: 0.1, // 曲率
					},
					data: seriesLineData, // 线数据
				},

				// 4. 时延圈(自定义图形)
				{
					name: '时延圈',
					type: 'custom', // 自定义类型
					zlevel: 10,
					coordinateSystem: 'geo',
					renderItem: (params, api) => renderItem(params, api, loopData), // 自定义渲染函数
					itemStyle: { opacity: 0.8 },
					silent: true, // 不响应事件
					data: [0], // 占位数据
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
 * 计算两点间指定角度的位置
 * @param {Array} dot1 起点坐标[x,y]
 * @param {Array} dot2 终点坐标[x,y]
 * @param {Number} angle 角度
 * @returns {Array} 新位置坐标[x,y]
 */
const getPosition = (dot1, dot2, angle) => {
	// 计算两点间角度
	var xAngle = Math.atan2(dot2[1] - dot1[1], dot2[0] - dot1[0]);
	xAngle = (360 * xAngle) / (2 * Math.PI);

	// 计算两点间距离
	var L = Math.sqrt(Math.pow(dot2[1] - dot1[1], 2) + Math.pow(dot2[0] - dot1[0], 2));

	// 计算新位置
	var L2 = L / 2 / Math.cos((angle * 2 * Math.PI) / 360);
	var val1 = {
		x: dot1[0] + Math.round(L2 * Math.cos(((xAngle + angle) * 2 * Math.PI) / 360)),
		y: dot1[1] + Math.round(L2 * Math.sin(((xAngle + angle) * 2 * Math.PI) / 360)),
	};
	return [val1.x, val1.y];
};

/**
 * 生成SVG路径
 * @param {Object} api ECharts API
 * @param {Array} coords 坐标数组
 * @returns {String} SVG路径字符串
 */
const generatePath = (api, coords) => {
	var points = coords.map((coord) => api.coord(coord));
	let temp = [];

	// 为每对点生成贝塞尔曲线路径
	for (var i = 0; i < points.length; i++) {
		const start = i;
		let end = i + 1;
		if (start === points.length - 1) end = 0;

		const controlPoint = getPosition(points[start], points[end], 15);
		temp.push(
			`${start === 0 ? 'M' : 'L'}${points[start][0]} ${points[start][1]} ` +
				`Q${controlPoint[0]} ${controlPoint[1]} ` +
				`${points[end][0]} ${points[end][1]} ` +
				`${end === 0 ? 'Z' : ''}`
		);
	}
	return temp.join(' ');
};

/**
 * 自定义渲染函数(绘制时延圈)
 * @param {Object} params ECharts参数
 * @param {Object} api ECharts API
 * @param {Object} loopData 时延圈数据
 * @returns {Object} 渲染结果
 */
const renderItem = (params, api, loopData) => {
	// 从loopData获取各种时延圈的坐标
	const greenCoords = loopData?.green ?? []; // 绿色圈坐标
	const blueCoords = loopData?.blue ?? []; // 蓝色圈坐标
	const redCoords = loopData?.red ?? []; // 红色圈坐标
	const center = loopData?.center ?? []; // 中心点坐标

	// 定义三种时延圈的样式
	const temp = [
		{ coords: greenCoords, color: '0,255,54', z: 3 }, // 绿色
		{ coords: blueCoords, color: '0,233,247', z: 2 }, // 蓝色
		{ coords: redCoords, color: '255,13,0', z: 1 }, // 红色
	];

	// 返回一个包含所有时延圈的组
	return {
		type: 'group',
		children: temp.map((item) => ({
			type: 'path',
			shape: { d: generatePath(api, item.coords) }, // 生成路径
			z2: item.z, // 层级
			originX: api.coord(center)[0], // 中心点X
			originY: api.coord(center)[1], // 中心点Y
			// 动画效果
			keyframeAnimation: {
				duration: 500,
				keyframes: [
					{ percent: 0, easing: 'sinusoidalInOut', scaleX: 0, scaleY: 0 },
					{ percent: 0.5, easing: 'sinusoidalInOut', scaleX: 0.1, scaleY: 0.1 },
					{ percent: 1, easing: 'sinusoidalInOut', scaleX: 1, scaleY: 1 },
				],
			},
			transition: 'shape',
			// 样式设置
			style: api.style({
				lineWidth: 2,
				fill: `rgba(${item.color},0.5)`, // 填充色
				lineDash: 6, // 虚线
				lineJoin: 'round', // 线条连接处圆角
				lineCap: 'round', // 线帽圆角
				stroke: `rgba(${item.color},1)`, // 边框色
			}),
		})),
	};
};

const loopData = {
	center: [106.49, 26.47],
	green: [
		[105.762007, 24.747506],
		[109.809413, 26.084192],
		[109.14711, 27.2084],
		[109.073521, 28.516449],
		[107.38097, 29.486886],
		[105.467651, 28.06045],
		[103.925728, 27.92709],
		[103.407153, 25.417722],
		[104.955976, 24.677491],
	],
	blue: [
		[99.501249, 25.246824],
		[105.535562, 23.222448],
		[112.894481, 24.440989],
		[114.881389, 31.805613],
		[105.167616, 32.991861],
		[99.942784, 28.804969],
	],
	red: [
		[101.046622, 37.692576],
		[95.601022, 28.54536],
		[98.323822, 24.036098],
		[112.894481, 22.266822],
		[121.13647, 31.30146],
		[115.322924, 39.539997],
	],
};

const targetPoints = [
	{ id: 7, name: '张家口市', delay: [{ operator: '移动', delay: 888 }], lat: [114.53, 40.48] },
	{ id: 296, name: '上海市', delay: [{ operator: '移动', delay: 888 }], lat: [121.29, 31.14] },
	{ id: 185, name: '韶关市', delay: [{ operator: '移动', delay: 888 }], lat: [113.37, 24.48] },
	{ id: 223, name: '成都市', delay: [{ operator: '移动', delay: 888 }], lat: [104.04, 30.4] },
	{ id: 280, name: '庆阳市', delay: [{ operator: '移动', delay: 888 }], lat: [107.63, 35.73] },
	{ id: 289, name: '中卫市', delay: [{ operator: '移动', delay: 888 }], lat: [105.2, 37.5] },
	{ id: 23, name: '呼和浩特市', delay: [{ operator: '移动', delay: 888 }], lat: [111.41, 40.48] },
];
const seriesLineData = [
	[{ coord: [106.59, 26.43] }, { coord: [114.53, 40.48] }],
	[{ coord: [106.59, 26.43] }, { coord: [121.29, 31.14] }],
	[{ coord: [106.59, 26.43] }, { coord: [113.37, 24.48] }],
	[{ coord: [106.59, 26.43] }, { coord: [104.04, 30.4] }],
	[{ coord: [106.59, 26.43] }, { coord: [107.63, 35.73] }],
	[{ coord: [106.59, 26.43] }, { coord: [105.2, 37.5] }],
	[{ coord: [106.59, 26.43] }, { coord: [111.41, 40.48] }],
];
const hubLists = [
	{ name: '京津冀枢纽', id: 1, lat: [116.41, 39.9], children: [{ name: '张家口市', id: 11, lat: [114.89, 40.77] }] },
	{ name: '粤港澳大湾区枢纽', id: 2, lat: [113.26, 24.15], children: [{ name: '韶关市', id: 21, lat: [113.6, 24.81] }] },
	{ name: '贵州枢纽', id: 3, lat: [106.49, 26.47], children: [{ name: '贵安市', id: 31, lat: [106.49, 26.47] }] },
	{ name: '甘肃枢纽', id: 4, lat: [107.63, 35.69], children: [{ name: '庆阳市', id: 41, lat: [107.63, 35.69] }] },
	{ name: '宁夏枢纽', id: 5, lat: [105.19, 37.52], children: [{ name: '中卫市', id: 51, lat: [105.19, 37.52] }] },
	{
		name: '成渝枢纽',
		id: 6,
		lat: [104.07, 30.57],
		children: [
			{ name: '成都市', id: 61, lat: [104.07, 30.7] },
			{ name: '简阳市', id: 62, lat: [104.55, 30.38] },
			{ name: '重庆市', id: 63, lat: [106.55, 29.55] },
		],
	},
	{
		name: '内蒙古枢纽',
		id: 7,
		lat: [111.67, 40.83],
		children: [
			{ name: '呼和浩特市', id: 71, lat: [111.67, 40.83] },
			{ name: '乌兰察布市', id: 72, lat: [113.16, 40.96] },
		],
	},
	{
		name: '长三角枢纽',
		id: 8,
		lat: [118.5, 31.25],
		children: [
			{ name: '芜湖市', id: 81, lat: [118.39, 31.35] },
			{ name: '上海市', id: 82, lat: [121.46, 31.25] },
			{ name: '苏州市', id: 83, lat: [120.61, 31.33] },
			{ name: '嘉兴市', id: 84, lat: [120.76, 30.76] },
		],
	},
];

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
