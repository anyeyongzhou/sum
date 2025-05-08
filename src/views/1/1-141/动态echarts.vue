<template>
	<div class="home">
		<div class="containers">
			<lineChart
				:scale="true"
				:xAxisData="data.xAxisData"
				:xAxisData1="data.xAxisData1"
				:yAxisData="data.yAxisData"
				:unitY="data.unitY"
				:unitX="data.unitX"
				:colorGroup="data.colorGroup"
				:legendCot="data.legendCot"
				:gridCot="data.gridCot"
				:isShowSymbol="data.isShowSymbol"
				:legendPosition="data.legendPosition"
				:isShowAreaStyle="data.isShowAreaStyle"
				:intervalValue="data.intervalValue"
				:wrapMaxlength="data.wrapMaxlength"
			/>
		</div>
	</div>
</template>

<script setup>
import lineChart from './components/lineChart.vue';
const data = {
	xAxisData: ['04-01', '04-02', '04-03', '04-04'],
	xAxisData1: ['04-01', '04-02', '04-03', '04-04'],
	yAxisData: [
		{
			name: '日上网电量',
			data: ['7140.00', '7086.00', '6657.00', '6660.00'],
		},
		{
			name: '日下网电量',
			data: ['5052.00', '5052.00', '4887.00', '4462.00'],
		},
	],
	unitY: ['万kWh'],
	colorGroup: ['#96f203', '#f59a23'],
	legendCot: [20, 40, 0, 0],
	gridCot: {
		left: '2%',
		right: '0%',
		bottom: '3%',
		top: '20%',
		containLabel: true,
	},
	legendPosition: ['center', 'top'],
	isShowAreaStyle: true,
	intervalValue: 'auto',
};
</script>

<style lang="scss" scoped>
.home {
	height: 110%;
	width: 100%;
	background-color: #fff;
	position: relative;
	overflow-y: scroll;

	.containers {
		width: 100%;
		height: 100%;
		padding: 10px;
		border: 1px solid black;

		/* 编写CSS begin */

		/* 编写CSS end */
	}
}
</style>
