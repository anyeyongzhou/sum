<template>
	<div class="chart">
		<div ref="lineChart" class="chartBox"></div>
	</div>
</template>

<script>
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
 */
import { autoHover } from '/@/utils/autoloop.js';
import * as echarts from 'echarts';
export default {
	props: {
		scale: {
			type: Boolean,
			default: false,
		},
		xAxisData: {
			type: Array,
			// required:true,
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
			default: 0,
		},
		isAutoLoop: {
			default: false,
		},
		isAutoHover: {
			default: true,
		},
	},
	data() {
		return {
			chart: null,
			colorGroupRgb: [],
			legendTagList: [],
			barBackgroundData: [],
			xMax: 10, //x轴最大个数
			timer: '',
		};
	},
	watch: {
		yAxisData: {
			handler(newV) {
				this.initChart();
			},
		},
	},
	mounted() {
		this.initChart();
	},
	destroyed() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	},
	// computed:{
	// },
	methods: {
		areaStyleRgb() {
			this.colorGroupRgb = [];
			if (this.colorGroup) {
				this.colorGroup.forEach((item, index, array) => {
					this.colorGroupRgb.push(
						parseInt('0x' + item.slice(1, 3)) + ',' + parseInt('0x' + item.slice(3, 5)) + ',' + parseInt('0x' + item.slice(5, 7))
					);
				});
			}
		},
		initChart() {
			this.areaStyleRgb();
			this.chart = echarts.init(this.$refs.lineChart);

			//生成legend标签列表
			this.legendTagList = [];
			if (this.yAxisData && this.yAxisData.length > 0) {
				this.yAxisData.forEach((item) => {
					this.legendTagList.push(item.name);
				});
			}

			// 是否显示折线图的拐点、x轴显示的最大值（value类型决定刻度的数量，category决定到那个值停止展示）
			if (this.xAxisData && this.xAxisData.length > 0) {
				if (this.xAxisData.length == 1) {
					this.isShowSymbol = true;
				}
				if (this.xAxisData.length > 50) {
					this.xMax = this.xAxisData.length;
				} else {
					this.xMax = this.xAxisData.length - 1;
				}
			}
			// 构建折现光电轨迹图的数据
			let coordList = [];
			this.yAxisData.forEach((item) => {
				let tempCoord = [];
				for (var i = 0; i < item.data.length; i++) {
					if (this.xAxisData[i] && item.data[i] && item.data[i] != '-') {
						tempCoord.push([this.xAxisData[i], item.data[i]]);
					}
				}
				if (tempCoord.length == 0) {
					tempCoord.push([]);
				}
				coordList.push({ coords: tempCoord });
			});

			let option = {
				color: this.colorGroup, //颜色盘
				tooltip: {
					trigger: 'axis',
					backgroundColor: 'rgba(5,28,50,0.8)',
					borderColor: '#4CCCFF',
					borderWidth: 1,
					textStyle: {
						color: '#fff',
					},
					formatter: (value) => {
						if (value.length > 0) {
							let strHtml;
							let labelTemp;
							if (this.xAxisData1 && this.xAxisData1.length > 0) {
								strHtml = `<div><div style="font-weight:800">${this.xAxisData1[value[0].dataIndex]}</div>`;
							} else {
								if (value[0].axisValueLabel.length > this.wrapMaxlength) {
									labelTemp =
										String(value[0].axisValueLabel).slice(0, this.wrapMaxlength) +
										'-' +
										String(value[0].axisValueLabel).slice(this.wrapMaxlength);
									strHtml = `<div><div style="font-weight:800">${labelTemp}</div>`;
								} else {
									strHtml = `<div><div style="font-weight:800">${value[0].axisValueLabel}</div>`;
								}
							}

							let valueTemp = value;
							valueTemp.forEach((item, index, array) => {
								// array[index].data = String(item.data).slice(0,this.wrapMaxlength) + '-' + String(item.data).slice(this.wrapMaxlength)
								strHtml += `<div>
                                        <div style="display:inline-block;background:${item.color};height:10px;width:10px;line-height:10px;border-radius:5px;}"></div>
                                        <span style="padding:0 6px">${item.seriesName}</span>
                                        <span style="font-weight:800">${item.data}</span>
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
					show: this.showLegend,
					selectedMode: false,
					data: this.legendTagList,
					x: this.legendPosition[0], //left right center
					y: this.legendPosition[1], //top bottom center
					icon: 'roundRect',
					itemHeight: 13,
					itemWidth: 13,
					padding: this.legendCot,
					textStyle: {
						color: '#fff',
					},
				},
				grid: this.gridCot,
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.xAxisData,
					max: this.xMax,
					axisLine: {
						//x轴的样式
						lineStyle: {
							color: '#464647',
						},
					},
					axisLabel: {
						interval: this.intervalValue,
						color: '#fff',
						// showMaxLabel:true,
						formatter: (value) => {
							//当x轴文字超过四个字符便换行
							var ret = '';
							var maxlength = this.wrapMaxlength;
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
						scale: this.scale,
						type: 'value',
						// name: '单位：亿千瓦时',
						name: this.unitY[0] ? this.unitY[0] : '',
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
						name: this.unitY[1] ? this.unitY[1] : '',
						show: true,
						min: this.otherYvalue[0],
						max: this.otherYvalue[1],
						interval: this.otherYvalue[2] ? this.otherYvalue[2] : null,
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
					{
						// symbol:"",
						animationDuration: 2000,
						showSymbol: this.isShowSymbol,
						symbolSize: 8,
						name: this.yAxisData[0] ? this.yAxisData[0].name : '',
						type: 'line',
						smooth: this.isSmooth,
						data: this.yAxisData[0] ? this.yAxisData[0].data : [],
						// stack: '总量',
						lineStyle: {
							//线条样式
							width: 2,
							// color:'red'
							// normal:{
							//     color:"red"
							// }
						},
						// itemStyle:{  //拐点样式
						//     normal:{
						//         color:"red"
						//     }
						// },
						areaStyle: {
							//下方区域样式
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										// color:"rgba(9, 130, 108, 0.6)",
										color: this.isShowAreaStyle
											? `rgba(${this.colorGroupRgb[0] ? this.colorGroupRgb[0] : `255,255,255`},0.6)`
											: `rgba(${this.colorGroupRgb[0] ? this.colorGroupRgb[0] : `255,255,255`},0)`,
									},
									{
										offset: 1,
										// color:"rgba(249, 105, 39, 0)",
										color: `rgba(${this.colorGroupRgb[0] ? this.colorGroupRgb[0] : `255,255,255`},0)`,
									},
								],
								global: false,
							},
						},
					},
					// 第二条
					{
						showSymbol: this.isShowSymbol,
						name: this.yAxisData[1] ? this.yAxisData[1].name : '',
						type: 'line',
						smooth: this.isSmooth,
						data: this.yAxisData[1] ? this.yAxisData[1].data : [],
						lineStyle: {
							//线条样式
							width: 2,
							// normal:{
							//     color:"red"
							// }
						},
						// itemStyle:{  //拐点样式
						//     normal:{
						//         color:"red"
						//     }
						// },
						areaStyle: {
							//下方区域样式
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 0.7,
								colorStops: [
									{
										offset: 0,
										// color:"rgba(9, 130, 108, 0.6)",
										color: this.isShowAreaStyle
											? `rgba(${this.colorGroupRgb[1] ? this.colorGroupRgb[1] : `255,255,255`},0.6)`
											: `rgba(${this.colorGroupRgb[1] ? this.colorGroupRgb[1] : `255,255,255`},0)`,
									},
									{
										offset: 1,
										// color:"rgba(249, 105, 39, 0)",
										color: `rgba(${this.colorGroupRgb[1] ? this.colorGroupRgb[1] : `255,255,255`},0)`,
									},
								],
							},
							// color:this.colorGroup[0]
						},
					},
					// 第三条
					{
						showSymbol: this.isShowSymbol,
						name: this.yAxisData[2] ? this.yAxisData[2].name : '',
						type: 'line',
						smooth: this.isSmooth,
						data: this.yAxisData[2] ? this.yAxisData[2].data : [],
						lineStyle: {
							//线条样式
							width: 2,
							// normal:{
							//     color:"red"
							// }
						},
						// itemStyle:{  //拐点样式
						//     normal:{
						//         color:"red"
						//     }
						// },
						areaStyle: {
							//下方区域样式
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 0.7,
								colorStops: [
									{
										offset: 0,
										// color:"rgba(9, 130, 108, 0.6)",
										color: this.isShowAreaStyle
											? `rgba(${this.colorGroupRgb[2] ? this.colorGroupRgb[2] : `255,255,255`},0.6)`
											: `rgba(${this.colorGroupRgb[2] ? this.colorGroupRgb[2] : `255,255,255`},0)`,
									},
									{
										offset: 1,
										// color:"rgba(249, 105, 39, 0)",
										color: `rgba(${this.colorGroupRgb[2] ? this.colorGroupRgb[2] : `255,255,255`},0)`,
									},
								],
							},
							// color:this.colorGroup[0]
						},
					},
					// 第四条
					{
						showSymbol: this.isShowSymbol,
						name: this.yAxisData[3] ? this.yAxisData[3].name : '',
						type: 'line',
						smooth: this.isSmooth,
						data: this.yAxisData[3] ? this.yAxisData[3].data : [],
						lineStyle: {
							//线条样式
							width: 2,
							// normal:{
							//     color:"red"
							// }
						},
						// itemStyle:{  //拐点样式
						//     normal:{
						//         color:"red"
						//     }
						// },
						areaStyle: {
							//下方区域样式
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 0.7,
								colorStops: [
									{
										offset: 0,
										// color:"rgba(9, 130, 108, 0.6)",
										color: this.isShowAreaStyle
											? `rgba(${this.colorGroupRgb[3] ? this.colorGroupRgb[3] : `255,255,255`},0.6)`
											: `rgba(${this.colorGroupRgb[3] ? this.colorGroupRgb[3] : `255,255,255`},0)`,
									},
									{
										offset: 1,
										// color:"rgba(249, 105, 39, 0)",
										color: `rgba(${this.colorGroupRgb[3] ? this.colorGroupRgb[3] : `255,255,255`},0)`,
									},
								],
							},
							// color:this.colorGroup[0]
						},
					},
					// 第五条
					{
						showSymbol: this.isShowSymbol,
						name: this.yAxisData[4] ? this.yAxisData[4].name : '',
						type: 'line',
						smooth: this.isSmooth,
						data: this.yAxisData[4] ? this.yAxisData[4].data : [],
						lineStyle: {
							//线条样式
							width: 2,
							// normal:{
							//     color:"red"
							// }
						},
						// itemStyle:{  //拐点样式
						//     normal:{
						//         color:"red"
						//     }
						// },
						areaStyle: {
							//下方区域样式
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 0.7,
								colorStops: [
									{
										offset: 0,
										// color:"rgba(9, 130, 108, 0.6)",
										color: this.isShowAreaStyle
											? `rgba(${this.colorGroupRgb[4] ? this.colorGroupRgb[4] : `255,255,255`},0.6)`
											: `rgba(${this.colorGroupRgb[4] ? this.colorGroupRgb[4] : `255,255,255`},0)`,
									},
									{
										offset: 1,
										// color:"rgba(249, 105, 39, 0)",
										color: `rgba(${this.colorGroupRgb[4] ? this.colorGroupRgb[4] : `255,255,255`},0)`,
									},
								],
							},
							// color:this.colorGroup[0]
						},
					},
					{
						name: '光点',
						type: 'lines',
						coordinateSystem: 'cartesian2d',
						symbolSize: 30,
						polyline: true,
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

			if (this.unitY.length < 2) {
				option.yAxis[1].show = false;
			}
			// 区域缩放
			if (this.isAutoLoop && this.xAxisData && this.xAxisData.length > 6) {
				option = {
					...option,
					dataZoom: [
						{
							xAxisData: 0,
							show: false,
							type: 'slider',
							startValue: 0,
							endValue: 5,
							zoomLock: true,
						},
					],
				};
				this.chart.setOption(option);
				if (this.timer) {
					clearInterval(this.timer);
				}
				this.timer = setTimeout(() => {
					if (this.xAxisData && this.xAxisData.length > 0) {
						setInterval(() => {
							if (option.dataZoom[0].endValue == this.xAxisData.length) {
								option.dataZoom[0].endValue = 5;
								option.dataZoom[0].startValue = 0;
							} else {
								option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
								option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
							}
							this.chart.setOption(option);
						}, 2000);
					}
				}, 2000);
			} else {
				this.chart.setOption(option);
				if (this.isAutoHover) {
					autoHover(this.chart, option, this.xAxisData.length);
				}
			}

			// this.chart.on("click", this.handleClick);
		},
	},
};
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
