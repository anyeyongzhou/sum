<template>
	<div class="parent-container">
		<div class="scroll-wrapper">
			<scroll :loopData="operatorData" />
		</div>
		<button @click="addData">添加数据</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import scroll from './components/scroll.vue';

const operatorData = ref([
	{ name: '星星充电', value: '21.34', rate: '21.34' },
	{ name: '国网电动', value: '18.26', rate: '18.26' },
	{ name: '特来电', value: '22.02', rate: '22.02' },
	{ name: '其他', value: '38.38', rate: '38.38' },
	{ name: '1星星充电', value: '21.34', rate: '21.34' },
	{ name: '1国网电动', value: '18.26', rate: '18.26' },
	{ name: '1特来电', value: '22.02', rate: '22.02' },
	{ name: '1其他', value: '38.38', rate: '38.38' },
]);

const addData = () => {
	operatorData.value.push({
		name: `新增运营商${operatorData.value.length + 1}`,
		value: (Math.random() * 30).toFixed(2),
		rate: (Math.random() * 30).toFixed(2),
	});
};
</script>

<style scoped>
.parent-container {
	width: 500px;
	height: 400px;
	margin: 0 auto;
	padding: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.scroll-wrapper {
	width: 50%;
	height: 100%;
	border: 1px solid #eee;
	margin-bottom: 20px;
	overflow: hidden;
}

button {
	padding: 8px 16px;
	background: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
</style>
