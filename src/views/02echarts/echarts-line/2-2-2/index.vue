<template>
	<div class="chart-content">
		<echaetBox class="chart-content-main" :option="option" @moveLeft="moveLeft()" @moveRight="moveRight()"></echaetBox>
	</div>
</template>

<script>
import echaetBox from './components/echaetBox.vue';
export default {
	name: 'echartScroll',
	components: {
		echaetBox,
	},
	data() {
		return {
			chartData: [],
			option: {},
			startInd: -1,
			len: 10,
		};
	},
	created() {
		this.chartData = this.initChartData('2023-11-01', '2023-12-31');
		this.initOption();
	},
	mounted() {},
	methods: {
		initChartData(startDate, endDate) {
			startDate = new Date(startDate);
			endDate = new Date(endDate);
			const dateArray = [];
			for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
				const randomValue = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
				const randomValue1 = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
				const dateString = date.toISOString().slice(0, 10);
				dateArray.push({
					date: dateString,
					value: randomValue,
					value1: randomValue1,
				});
				date = new Date(date); // 修复日期对象被修改的问题
			}
			return dateArray;
		},
		initOption(start = 0) {
			if (start > this.chartData.length - this.len) start = this.chartData.length - this.len;
			if (start < 0) start = 0;
			if (this.startInd === start) return;
			this.startInd = start;
			const end = start + this.len;
			const chartData = this.chartData.slice(start, end);
			this.option = {
				tooltip: {
					trigger: 'axis',
				},
				xAxis: {
					type: 'category',
					data: chartData.map((item) => item.date),
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						name: '数据1',
						data: chartData.map((item) => item.value),
						type: 'line',
						smooth: true,
					},
					{
						name: '数据2',
						data: chartData.map((item) => item.value1),
						type: 'line',
						smooth: true,
					},
				],
			};
		},
		moveLeft() {
			if (this.startInd === 0) this.$toast.show('前面没有更多数据了');
			this.initOption(this.startInd - this.len);
		},
		moveRight() {
			if (this.startInd >= this.chartData.length - this.len) this.$toast.show('后面没有更多数据了');
			this.initOption(this.startInd + this.len);
		},
	},
};
</script>

<style>
.chart-content {
	height: 50vh;
	width: 100%;
}
.chart-content-main {
	width: 100%;
	height: 100%;
}
</style>
