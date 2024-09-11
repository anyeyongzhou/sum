<template>
	<div class="all">
		<canvas ref="canvas" height="300" width="900" id="canvas"></canvas>
		<div class="list">
			<vxe-table
				align="center"
				:data="props.tableData"
				stripe
				header-row-class-name="tableHeader"
				:row-config="{ isHover: true, keyField: 'id' }"
			>
				<vxe-column type="seq" width="60" title="序号" show-overflow="tooltip" show-header-overflow></vxe-column>
				<vxe-column field="name" title="处理人" show-overflow="tooltip" show-header-overflow></vxe-column>
				<vxe-column field="sex" title="处理结果" show-overflow="tooltip" show-header-overflow></vxe-column>
				<vxe-column field="address" title="处理意见" show-overflow="tooltip" show-header-overflow></vxe-column>
				<vxe-column field="age" title="处理时间" show-overflow="tooltip" show-header-overflow></vxe-column>
			</vxe-table>
		</div>
	</div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { useDrawLine } from '/@/hooks/canvas/drawLine';
import { useDrawRect, useDrawDiamond } from '/@/hooks/canvas/drawRect';
interface RowVO {
	id: number;
	name: string;
	role: string;
	sex: string;
	age: number;
	address: string;
}
// 后台传入表格数据
const props = defineProps({
	tableData: {
		type: Array<RowVO>,
		default: () => {
			return [
				{ id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
				{ id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
				{ id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
				{ id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
			];
		},
	},
});

// 注意：
// 请一定要将下面这段代码拷贝到获取 canvas 元素的上面，即document.getElementById("canvas")前面
// 否则vscode无法设置Canvas命令的智能提示
/** @type {HTMLCanvasElement} */
const canvas = ref<any>();
let line: any = [
	{
		start: {
			x: 285,
			y: 65,
		},
		turnPoint: [
			{
				x: 285,
				y: 20,
			},
			{
				x: 105,
				y: 20,
				font: '退回',
			},
		],
		end: {
			x: 105,
			y: 70,
		},
		linecolor: '#000',
	},
	{
		start: {
			x: 145,
			y: 100,
		},
		end: {
			x: 245,
			y: 100,
			font: '上报',
		},
		linecolor: '#00a',
	},
	{
		start: {
			x: 330,
			y: 100,
		},
		end: {
			x: 425,
			y: 100,
			font: '上报',
		},
		linecolor: '#000',
	},
	{
		start: {
			x: 510,
			y: 100,
		},
		end: {
			x: 605,
			y: 100,
			font: '上报',
		},
		linecolor: '#000',
	},
	{
		start: {
			x: 690,
			y: 100,
		},
		end: {
			x: 785,
			y: 100,
			font: '上报',
		},
		linecolor: '#000',
	},
	{
		start: {
			x: 465,
			y: 135,
		},
		turnPoint: [
			{
				x: 465,
				y: 180,
			},
			{
				x: 285,
				y: 180,
				font: '退回',
			},
		],
		end: {
			x: 285,
			y: 130,
		},
		linecolor: '#000',
	},
	{
		start: {
			x: 645,
			y: 65,
		},
		turnPoint: [
			{
				x: 645,
				y: 20,
			},
			{
				x: 465,
				y: 20,
				font: '退回',
			},
		],
		end: {
			x: 465,
			y: 70,
		},
		linecolor: '#000',
	},
];
const diamond1: any = {
	x: 245,
	y: 100,
	halfWidth: 40,
	halfHeight: 30,
};
const diamond2: any = {
	x: 425,
	y: 100,
	halfWidth: 40,
	halfHeight: 30,
};
const diamond3: any = {
	x: 605,
	y: 100,
	halfWidth: 40,
	halfHeight: 30,
};
const rect1: any = {
	x: 65,
	y: 70,
	w: 75,
	h: 60,
	font: {
		text: '提交',
		fontSize: 15,
	},
};
const rect2: any = {
	x: 785,
	y: 70,
	w: 75,
	h: 60,
	font: {
		text: '提交',
		fontSize: 15,
	},
};
// 图例
const rect3: any = {
	x: 615,
	y: 230,
	w: 30,
	h: 20,
};
const rect4: any = {
	x: 615,
	y: 270,
	w: 30,
	h: 20,
};
const egLine: any = [
	{
		start: {
			x: 825,
			y: 240,
		},
		end: {
			x: 755,
			y: 240,
			font: '退回',
		},
	},
	{
		start: {
			x: 825,
			y: 280,
		},
		end: {
			x: 755,
			y: 280,
			font: '退回',
		},
		linecolor: '#00a',
	},
];

onMounted(() => {
	nextTick(() => {
		let context = canvas.value.getContext('2d');
		useDrawLine(context, line, 13, 3, 6);
		useDrawRect(context, rect1, '#9dcce9');
		useDrawRect(context, rect2, '#fff');
		useDrawDiamond(context, diamond1, '#9dcce9', 14, '汇总');
		useDrawDiamond(context, diamond2, '#fff', 14, '汇总');
		useDrawDiamond(context, diamond3, '#fff', 14, '汇总');
		// 绘制图例
		useDrawRect(context, rect3, '#9dcce9');
		useDrawRect(context, rect4, '#fff');

		context.save();
		context.font = '14px 微软雅黑';
		context.textAlign = 'center';
		context.fillStyle = '#000'; // 字的颜色
		context.fillText('当前位置', 700, 240);
		context.fillText('未完成', 700, 280);
		context.restore();

		useDrawLine(context, egLine, 13, 3, 6);

		context.save();
		context.font = '14px 微软雅黑';
		context.fillStyle = '#000'; // 字的颜色
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText('未流转', 870, 240);
		context.restore();
		context.save();
		context.font = '14px 微软雅黑';
		context.fillStyle = '#00a'; // 字的颜色
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText('已流转', 870, 280);
		context.restore();
	});
});
</script>
<style lang="scss" scoped>
#canvas {
	display: block;
	margin: 15px auto;
}
.all {
	overflow: auto;
}
.list {
	width: 100%;
	min-height: 150px;
}
</style>
