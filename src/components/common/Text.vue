<!---->
<template>
	<div class="text">
		<div class="text-content">
			<div class="circle"></div>
			<div class="content">
				<p>{{ props.orderNum }}</p>
				.
				<p>{{ props.context }}</p>
			</div>
		</div>
	</div>
</template>

<script setup name="card">
const props = defineProps({
	//序号
	orderNum: {
		type: String,
		default: 'a',
	},
	//内容
	context: {
		type: String,
		default: '内容',
	},
	//字体大小
	size: {
		type: Number,
		default: 4,
	},
	//字体颜色
	color: {
		type: Number,
		default: 9,
	},
	//字体粗细
	weight: {
		type: Number,
		default: 0,
	},
	//背景颜色
	backgroundColor: {
		type: Number,
		default: 10,
	},
	//是否是想要的效果
	effect: {
		type: Boolean,
		default: false,
	},
});

const fontSizeList = ['40px', '32px', '28px', '24px', '20px'];
const backgroundColorList = ['red', 'orange', 'yellow ', 'green', 'cyan', 'blue', 'violet', 'gray', 'white', 'black'];
const wightList = [400, 700, 500];

const fontSize = fontSizeList[props.size];
const color = backgroundColorList[props.color];
const fontWeight = wightList[props.weight];
const backgroundColor = backgroundColorList[props.backgroundColor];
const marginLeft = (props.size - 1) * 10 + 'px';
const circleBgColor = props.effect ? '#f00' : '#fff';
const circleBorderColor = props.effect ? '1px solid #f00' : '1px solid #000';
</script>
<style lang="scss" scoped>
.text {
	padding: 10px 10px;
	.text-content {
		width: auto;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: center;
		margin-left: v-bind(marginLeft);
		position: relative;
		.circle {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: v-bind(circleBgColor);
			border: v-bind(circleBorderColor);
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
		.content {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding-left: 10px;
			p {
				background: v-bind(backgroundColor);
				font-size: v-bind(fontSize);
				color: v-bind(color);
				font-weight: v-bind(fontWeight);
				line-height: v-bind(fontSize);
				text-align: center;
				padding: 5px;
				border-radius: 10px;
			}
		}
	}
}
</style>
