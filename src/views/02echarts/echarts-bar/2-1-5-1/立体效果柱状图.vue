<template>
	<div class="home">
		<div class="containers">
			<div ref="chartRef" class="chart"></div>
		</div>
	</div>
</template>

<script setup>
import * as echarts from 'echarts';
let chart = null;
const chartRef = ref(null);

const Icon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAyCAYAAADCxvyGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI1LTA2LTA5VDE2OjAxOjIzKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNS0wNi0wOVQxNjoxMjozMSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNS0wNi0wOVQxNjoxMjozMSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiYzdjZTMzMy02MWI2LWIzNDYtYWY4Ni1mMjIwZWJkYTk1YWQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmYmMzNTRkZi00NjMwLTA1NDItOTJhMy1kZjEwYjMyMWI0ZjkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4M2Y3YmYzNy05YzAyLTJhNDYtOTc3MC1iZmFiNTdkOGNmNTYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjgzZjdiZjM3LTljMDItMmE0Ni05NzcwLWJmYWI1N2Q4Y2Y1NiIgc3RFdnQ6d2hlbj0iMjAyNS0wNi0wOVQxNjowMToyMyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiYzdjZTMzMy02MWI2LWIzNDYtYWY4Ni1mMjIwZWJkYTk1YWQiIHN0RXZ0OndoZW49IjIwMjUtMDYtMDlUMTY6MTI6MzErMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4wIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6iajSnAAAJYklEQVR42u2bWWxc1RnHf+femYSZcbzHS+wYZ7OzYkgKYW8KZNihIFyCRKW+tH2o1D60okIqyBIPYanUVqWtqjyQQoEiUpCCmhE3BEIRBNKSsiQ2sUmcON5CLEiunXiZuefrw519JoPjeBmIP2l0zzn3zJ17f/6f7zvn+LuKPDVpweBIIIijgygJuo3KwjQs6k9bqgWdj/et8grijwqXITqIQRAhCFx0lq4jKCw0Fsqw1Fa7YxYoIM2YFBZuBCOIJoiSVRO7kDqAgQXawrZ3qpdx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`;
const IconB = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAMCAYAAAD8tppbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI1LTA2LTA5VDE2OjIzOjA5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNS0wNi0wOVQxNjo0MzoyMSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNS0wNi0wOVQxNjo0MzoyMSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkOTk0ZGVmYS02ODg1LWY1NDktOGUwNC1mNGEzYjYwZGMzYzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZDk5NGRlZmEtNjg4NS1mNTQ5LThlMDQtZjRhM2I2MGRjM2M1IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDk5NGRlZmEtNjg4NS1mNTQ5LThlMDQtZjRhM2I2MGRjM2M1Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkOTk0ZGVmYS02ODg1LWY1NDktOGUwNC1mNGEzYjYwZGMzYzUiIHN0RXZ0OndoZW49IjIwMjUtMDYtMDlUMTY6MjM6MDkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4wIChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6mRn67AAABUklEQVRIx+2Xy07CQBSGJ+pCY4MkCImIiaC2XhJ8BZfUvUu1WAuSthIkce0TUF7F8iqUV6Fd/Z4zjQsTTcQQbKGTfOmknTmXL2dTIRK68CbWYGw3cLs1wN3mWMJ7fkffRLZ+IdHIneBesdFU3mEoUwI/MJVn+Czdycx9CrwR6zBzDZj5AZr5MR528Cf4LsfgWBRztSRauyrMgkP4eCyE9MRciWP6MgflWs4ptIo6WkUPrVIAq4SFwjk5N9eQ1umFta/iqeygXfaJEO09JAOuhWri2qjGZE9hp6Kjc+ARAYGUEMQ1V/5/emHXVLhVB3bVh30YEkg5oexF9lRTFzOFzpEO99gjAgJLTiB75Z7nNb3oahqeT1101RHtIwIrSiQdSBeaNsPfydUGXs6u0bsYonc+IZDxLRPpiF2Rs68SX+sa+pcu+vURERHImIkodkcOyeUHnzhKpjLJsOYAAAAASUVORK5CYII=`;

const init = () => {
	if (!chart) {
		chart = echarts.init(chartRef.value);
	}

	const option = {
		backgroundColor: '#000',
		grid: {
			top: 30,
			left: 45,
			right: 62,
			bottom: 25,
			containLabel: true,
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: '#081429',
			textStyle: {
				color: '#fff',
			},
			borderColor: '#0a355d',
			axisPointer: {
				z: 111,
				lineStyle: {
					color: 'rgba(153, 153, 153, 0.5)',
				},
			},
		},
		xAxis: [
			{
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				axisLabel: {
					color: '#fff',
					fontSize: 14,
					fontFamily: 'HarmonyOS Sans SC',
					margin: 10,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 255, 255, 1)',
					},
				},
				axisTick: {
					show: false,
				},
			},
			{
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				position: 'bottom',
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					margin: -6,
					formatter: () => {
						return `{icon|}`;
					},
					rich: {
						icon: {
							width: 42,
							height: 6,
							backgroundColor: {
								image: IconB,
								replace: 'no-repeat',
							},
						},
					},
				},
			},
		],
		yAxis: {
			type: 'value',
			axisLabel: {
				color: '#fff',
				fontSize: 12,
				fontFamily: '思源黑体',
				margin: 4,
			},
			max: 50,
			splitLine: {
				lineStyle: {
					color: 'rgba(153, 153, 153, 0.5)',
					type: 'dashed',
				},
			},
		},
		color: [
			{
				type: 'linear',
				x: 0,
				y: 0,
				x2: 0,
				y2: 1,
				colorStops: [
					{
						offset: 0,
						color: 'rgba(252, 105, 0, 1)', // 0% 处的颜色
					},
					{
						offset: 1,
						color: 'rgba(158, 113, 6, 0.5)', // 100% 处的颜色
					},
				],
				global: false, // 缺省为 false
			},
			{
				type: 'linear',
				x: 0,
				y: 0,
				x2: 0,
				y2: 1,
				colorStops: [
					{
						offset: 0,
						color: 'rgba(255, 254, 254, 1)', // 0% 处的颜色
					},
					{
						offset: 1,
						color: 'rgba(255, 225, 213, 0)', // 100% 处的颜色
					},
				],
				global: false, // 缺省为 false
			},
			{
				type: 'linear',
				x: 0,
				y: 0,
				x2: 0,
				y2: 1,
				colorStops: [
					{
						offset: 0,
						color: 'rgba(204, 71, 0, 1)', // 0% 处的颜色
					},
					{
						offset: 1,
						color: 'rgba(159, 51, 6, 0.5)', // 100% 处的颜色
					},
				],
				global: false, // 缺省为 false
			},
		],
		series: [
			{
				type: 'bar',
				data: [18, 12, 17, 16, 8, 18],
				barWidth: 20,
				barGap: 0,
				emphasis: {
					disabled: true,
				},
				tooltip: {
					show: false,
				},
			},
			{
				type: 'bar',
				data: [18, 12, 17, 16, 8, 18],
				barWidth: 2,
				label: {
					position: 'top',
					show: true,
					distance: -6,
					formatter: (v) => {
						return `{rect|}`;
					},
					rich: {
						rect: {
							width: 42,
							height: 25,
							backgroundColor: {
								image: Icon,
								replace: 'no-repeat',
							},
						},
					},
				},
				emphasis: {
					disabled: true,
				},
			},
			{
				type: 'bar',
				data: [18, 12, 17, 16, 8, 18],
				barWidth: 20,
				emphasis: {
					disabled: true,
				},
				tooltip: {
					show: false,
				},
			},
			{
				type: 'bar',
				data: [18, 12, 17, 16, 8, 18],
				barWidth: 1,
				xAxisIndex: 1,
				tooltip: {
					show: false,
				},
				emphasis: {
					disabled: true,
				},
				label: {
					position: 'top',
					show: true,
					distance: 25,
					formatter: (v) => {
						return `{value|${v.value}}`;
					},
					rich: {
						value: {
							color: '#f3dfb8',
							fontSize: 20,
							fontFamily: 'D-Din',
							fontWeight: 'bold',
							textShadowColor: 'rgba(129, 183, 247, 0.46)',
							textShadowBlur: 30,
						},
					},
				},
			},
		],
	};

	chart.setOption(option);
};

onMounted(() => {
	init();
});
</script>

<style lang="scss" scoped>
.home {
	height: 100%;
	width: 100%;
	background-color: #fff;
	position: relative;
	display: flex;
	// flex-wrap: nowrap;
	// flex-direction: row;
	justify-content: center;
	align-items: center;

	.containers {
		width: 600px;
		height: 400px;
		padding: 10px;
		background-color: #7f8de0;

		.chart {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
