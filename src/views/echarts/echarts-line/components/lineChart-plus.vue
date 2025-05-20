<template>
	<div class="chart">
		<div ref="chartRef" class="chartBox"></div>
	</div>
</template>

<script setup>
/** 组件参数配置
 *  xAxisData 传入x轴数据  ['周一', '周二', '周三']
 *  yAxisData 传入Y轴数据  [{name:"城燃气供应量",data:[332, 465, 345, 365, 287, 362, 295]},{name:"电厂耗气量",data:[221, 232, 283, 154, 212, 290, 260]}]
 *  unitY 传入y轴单位   ['单位：亿千瓦时','单位：%']  最多传两个参数，当只传一个参数时，右侧y轴默认不显示
 *  unitX 传入x轴单位   '月'
 *  colorGroup: 颜色盘  ["#ffffff","#24a76d"]
 *  customTitle: 是否显示标题和标题名字   '天然气消费量'
 *  otherYvalue： 第二条Y轴是否显示  [最小值,最大值,间隔值] [0,100,20]
 *  legendPosition  legend的位置  ["center","top"] 第一个参数是x轴方向位置left,right,center;第二个参数是y轴方向位置top,bottom,center
 *  legendCot 图表选择控制器位置控制 padding:[20,0,0,0]
 *  gridCot 图标距离上下左右的padding距离  grid:{ left: '3%', right: '4%', bottom: '3%', top:'5%', containLabel: true},
 *  showLegend 是否显示legend
 *  isShowAreaStyle 是否显示折现下方渐变色
 *  isSmooth 是否将曲线设置为平滑曲线
 *  isShowSymbol 是否显示折线图节点
 *  wrapMaxlength 设置x轴数据的换行限制字符长度 是否显示折线图节点
 *  intervalValue x轴的间隔显示 默认0,可设置为'auto'
 *  isAutoTipPositon 悬浮提示框显示位置 默认false固定， true 自动位置
 */
import * as echarts from 'echarts';
import { ref, watch, onMounted, onUnmounted, nextTick, reactive } from 'vue';
// 添加防抖
import { debounce } from 'lodash-es';

const props = defineProps({
	scale: {
		type: Boolean,
		default: false,
	},
	xAxisData: {
		type: Array,
		default: () => [],
	},
	xAxisData1: {
		type: Array,
		default: () => [],
	},
	yAxisData: {
		type: Array,
		default: () => [],
	},
	unitY: {
		default: '',
	},
	unitX: {
		type: String,
		default: '',
	},
	colorGroup: {
		type: Array,
		default: () => ['#5470c6', '#91cc75', '#f7cd03'],
	},
	legendCot: {
		type: Array,
		default: () => [12, 0, 0, 0],
	},
	gridCot: {
		type: Object,
		default: () => ({
			left: '3%',
			right: '4%',
			bottom: '3%',
			top: '20%',
			containLabel: true,
		}),
	},
	customTitle: {
		type: String,
		default: '',
	},
	otherYvalue: {
		type: Array,
		default: () => [0, 100, 20],
	},
	showLegend: {
		type: Boolean,
		default: true,
	},
	legendPosition: {
		type: Array,
		default: () => ['center', 'top'],
	},
	isShowAreaStyle: {
		type: Boolean,
		default: true,
	},
	isSmooth: {
		type: Boolean,
		default: false,
	},
	isShowSymbol: {
		type: Boolean,
		default: false,
	},
	wrapMaxlength: {
		type: Number,
		default: 6,
	},
	intervalValue: {
		type: Number,
		default: 0,
	},
	isAutoLoop: {
		type: Boolean,
		default: false,
	},
	isAutoHover: {
		type: Boolean,
		default: true,
	},
	isAutoTipPosition: {
		type: Boolean,
		default: false,
	},
	tipPositionTop: {
		type: Number,
		default: 20,
	},
	needAreaStyle: {
		type: Boolean,
		default: false,
	},
	selectedMode: {
		type: Boolean,
		default: false,
	},
});

const chartRef = ref(null);
let chart = null;

const colorGroupRgb = ref([]);
const xMax = ref(10); //x轴最大个数
let timeTicket = null;

const areaStyleRgb = () => {
	colorGroupRgb.value = [];
	if (props.colorGroup) {
		props.colorGroup.forEach((item) => {
			colorGroupRgb.value.push(
				parseInt('0x' + item.slice(1, 3)) + ',' + parseInt('0x' + item.slice(3, 5)) + ',' + parseInt('0x' + item.slice(5, 7))
			);
		});
	}
};

const initChart = () => {
	let minY = 0;
	let maxMinYList = [];
	//生成legend标签列表
	let legendTagList = [];
	// 构建折现光电轨迹图的数据
	let coordList = [];
	let seriesList = [];
	// 是否显示折线图的拐点、x轴显示的最大值（value类型决定刻度的数量，category决定到那个值停止展示）
	let localShowSymbol = props.isShowSymbol;
	if (props.xAxisData && props.xAxisData.length > 0) {
		if (props.xAxisData.length == 1) {
			localShowSymbol = true;
		}
		if (props.xAxisData.length > 50) {
			xMax.value = props.xAxisData.length;
		} else {
			xMax.value = props.xAxisData.length - 1;
		}
	}
	if (props.yAxisData && props.yAxisData.length > 0) {
		props.yAxisData.forEach((item, index) => {
			legendTagList.push(item.name);
			item.data.forEach((val) => {
				if (val != null) {
					maxMinYList.push(val);
				}
			});
			let tempCoord = [];
			if (item.data) {
				for (var i = 0; i < item.data.length; i++) {
					if (props.xAxisData[i] && item.data[i] && item.data[i] != '-') {
						tempCoord.push([props.xAxisData[i], item.data[i]]);
					}
				}
				if (tempCoord.length == 0) {
					tempCoord.push([]);
				}
				coordList.push({ coords: tempCoord });

				seriesList.push({
					animationDuration: 2000,
					animationDurationUpdate: 2000,
					animationEasingUpdate: 'linear',
					showSymbol: localShowSymbol,
					name: item ? item.name : '',
					type: 'line',
					animationEasing: 'linear',
					smooth: props.isSmooth,
					data: item ? item.data : [],
					lineStyle: {
						//线条样式
						width: 2,
						// color:'red'
						// normal:{
						//     color:"red"
						// }
					},
					areaStyle: props.needAreaStyle
						? {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: index == 0 ? 1 : 0.7,
									colorStops: [
										{
											offset: 0,
											color: props.isShowAreaStyle
												? `rgba(${colorGroupRgb.value[index] ? colorGroupRgb.value[index] : `255,255,255`},0.6)`
												: `rgba(${colorGroupRgb.value[index] ? colorGroupRgb.value[index] : `255,255,255`},0)`,
										},
										{
											offset: 1,
											color: `rgba(${colorGroupRgb.value[index] ? colorGroupRgb.value[index] : `255,255,255`},0)`,
										},
									],
									global: false,
								},
						  }
						: { color: '#000', opacity: 0 },
				});
			}
		});
	}
	// 数据在0到1之间
	minY = maxMinYList.length > 0 ? Math.min(...maxMinYList) : 0;
	if (minY < 0.1) {
		minY = 0;
	} else {
		minY = Math.ceil((minY - 0.1) * 10) / 10;
	}
	let maxY = 1;
	maxY = maxY = maxMinYList.length > 0 ? Math.max(...maxMinYList) : 1;
	if (maxY > 0.9) {
		maxY = 1;
	} else {
		maxY = Math.floor((maxY + 0.1) * 10) / 10;
	}
	areaStyleRgb();
	if (!chart) {
		chart = echarts.init(chartRef.value);
	}

	let option = {
		color: props.colorGroup, //颜色盘
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(5,28,50,0.8)',
			borderColor: '#4CCCFF',
			borderWidth: 1,
			textStyle: {
				color: '#fff',
			},
			position: (pos, params, dom, rect, size) => {
				if (!props.isAutoTipPosition) {
					//悬浮提示框显示位置固定
					return [pos[0] < size.viewSize[0] / 2 ? pos[0] : pos[0] - size.contentSize[0], props.tipPositionTop];
				} else {
					return [pos[0] - (size.contentSize[0] * 3) / 2.5, '-40%'];
				}
			},
			formatter: (value) => {
				if (value.length > 0) {
					let strHtml;
					let labelTemp;
					if (props.xAxisData1 && props.xAxisData1.length > 0) {
						strHtml = `<div><div style="font-weight:800">${props.xAxisData1[value[0].dataIndex]}</div>`;
					} else {
						if (value[0].axisValueLabel?.length > props.wrapMaxlength) {
							labelTemp =
								String(value[0].axisValueLabel).slice(0, props.wrapMaxlength) +
								'-' +
								String(value[0].axisValueLabel).slice(props.wrapMaxlength);
							strHtml = `<div><div style="font-weight:800">${labelTemp}</div>`;
						} else {
							strHtml = `<div><div style="font-weight:800">${value[0].axisValueLabel}</div>`;
						}
					}

					let valueTemp = value;
					valueTemp.forEach((item) => {
						strHtml += `<div>
                                  <div style="display:inline-block;background:${
																		item.color
																	};height:10px;width:10px;line-height:10px;border-radius:5px;}"></div>
                                  <span style="padding:0 6px">${item.seriesName}</span>
                                  <span style="font-weight:800">${item.data == null ? '' : item.data}</span>
                              </div>`;
					});
					strHtml = strHtml + '</div>';
					return strHtml;
				} else {
					return;
				}
			},
		},
		legend: {
			show: props.showLegend && !props.isAutoTipPosition,
			selectedMode: props.selectedMode,
			// data: legendTagList,
			// x: props.legendPosition[0], //left right center
			// y: props.legendPosition[1], //top bottom center
			padding: props.legendCot,
			left: 'center',
			width: 300,
			icon: 'rect',
			itemWidth: 10,
			itemHeight: 10,
			itemGap: 12,
			borderRadius: 2,
			textStyle: {
				color: '#fff',
				fontSize: 13,
			},
		},
		grid: props.gridCot,
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: props.xAxisData,
			max: xMax.value,
			axisLine: {
				//x轴的样式
				lineStyle: {
					color: '#464647',
				},
			},
			axisLabel: {
				// interval: props.intervalValue,
				interval: props.xAxisData.length > 12 ? 2 : 0,
				color: '#fff',
				// showMaxLabel:true,
				formatter: (value) => {
					//当x轴文字超过四个字符便换行
					var ret = '';
					var maxlength = props.wrapMaxlength;
					var vallength = value.length;
					var rowN = Math.ceil(vallength / maxlength);
					if (rowN > 1) {
						for (var i = 0; i < rowN; i++) {
							var temp = '';
							var start = i * maxlength;
							var end = start + maxlength;
							temp = value.substring(start, end) + '\n';
							ret += temp;
						}
						return ret;
					} else {
						return value;
					}
				},
			},
			splitLine: {
				//背景线格条
				show: false,
				lineStyle: {
					color: '#000000',
				},
			},
		},

		yAxis: [
			{
				min: minY,
				max: maxY,
				scale: props.scale,
				type: 'value',
				minInterval: 0.1,
				// MaxInterval:0.1,
				// name: '单位：亿千瓦时',
				name: props.unitY[0] ? props.unitY[0] : '',
				axisLabel: {
					margin: 15,
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
					},
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#464647',
						type: 'dotted', //soild实线，dashed ，dotted虚线
					},
				},
			},
			{
				type: 'value',
				// name:'单位：%',
				name: props.unitY[1] ? props.unitY[1] : '',
				show: true,
				// min: props.otherYvalue[0],
				// max: props.otherYvalue[1],
				min: minY,
				max: maxY,
				interval: props.otherYvalue[2] ? props.otherYvalue[2] : null,
				// axisLabel:{
				//     formatter:'{value}'
				// },
				axisLine: {
					lineStyle: {
						color: '#fff',
					},
				},
				splitLine: {
					show: false,
					lineStyle: {
						color: '#464647',
						type: 'dotted', //soild实线，dashed ，dotted虚线
					},
				},
			},
		],
		series: [
			...seriesList,
			{
				name: '',
				type: 'lines',
				coordinateSystem: 'cartesian2d',
				symbolSize: 30,
				polyline: true,
				showAllSymol: false,
				animationDelay: function (idx) {
					// 与主折线保持一致的延迟
					return idx * 300 + (coordList.length - 1) * 500;
				},
				animationDelayUpdate: function (idx) {
					return idx * 300 + (coordList.length - 1) * 500;
				},
				effect: {
					show: true,
					trailLength: 0.5,
					period: 8,
					symbolSize: 5,
				},
				lineStyle: {
					color: '#feffc1',
					width: 1.5,
					opacity: 0,
					curveness: 0,
					cap: 'round',
				},
				data: coordList,
			},
		],
	};

	if (props.unitY.length < 2) {
		option.yAxis[1].show = false;
	}

	if (props.isAutoHover && props.xAxisData.length > 0) {
		if (timeTicket) {
			clearInterval(timeTicket);
			timeTicket = null;
		}
		autoHover(props.xAxisData.length);
	}
	chart.setOption(option);
};

function autoHover(num = 5, time = 2000) {
	var count = 0;
	// 确保图表实例存在
	if (!chart) return;

	timeTicket = setInterval(function () {
		if (!chart) {
			// 检查图表实例是否存在
			clearInterval(timeTicket);
			return;
		}
		chart.dispatchAction({
			type: 'downplay',
			seriesIndex: 0, // serieIndex的索引值   可以触发多个
		});
		chart.dispatchAction({
			type: 'highlight',
			seriesIndex: 0,
			dataIndex: count,
		});
		chart.dispatchAction({
			type: 'showTip',
			seriesIndex: 0,
			dataIndex: count,
		});
		count++;
		if (count >= num) {
			count = 0;
		}
	}, time);
	console.log('timeTicket', timeTicket);
	// 添加事件监听器前先移除旧的
	chart.off('mouseover');
	chart.off('mouseout');

	chart.on('mouseover', function (params) {
		clearInterval(timeTicket);
		chart.dispatchAction({
			type: 'downplay',
			seriesIndex: 0,
		});
		chart.dispatchAction({
			type: 'highlight',
			seriesIndex: 0,
			dataIndex: params.dataIndex,
		});
		chart.dispatchAction({
			type: 'showTip',
			seriesIndex: 0,
			dataIndex: params.dataIndex,
		});
	});

	chart.on('mouseout', function () {
		if (timeTicket) clearInterval(timeTicket);
		autoHover(num, time);
	});
}

const handleResize = () => {
	if (chart) {
		chart.resize();
	}
};

const cleanup = () => {
	if (timeTicket) {
		clearInterval(timeTicket);
		timeTicket = null;
	}

	// 移除图表事件监听器并销毁图表
	if (chart) {
		chart.off('mouseover');
		chart.off('mouseout');
		chart.dispose();
		chart = null;
	}
};

watch(
	() => [props.yAxisData, props.xAxisData],
	() => {
		console.log('timeTicket1', timeTicket);
		initChart();
	},
	{ deep: true }
);

// 添加 resize 监听
onMounted(() => {
	window.addEventListener('resize', handleResize);
	if (props.yAxisData.length > 0) {
		initChart();
	}
});

onUnmounted(() => {
	window.removeEventListener('resize', handleResize);
	// 清理所有定时器
	cleanup();
});
</script>

<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 100%;

	.chartBox {
		width: 100%;
		height: 100%;
	}
}
</style>
