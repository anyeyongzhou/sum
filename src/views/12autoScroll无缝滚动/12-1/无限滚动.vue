<template>
	<div class="parent-container">
		<h2>垂直滚动示例</h2>
		<scroll class="scroll-container" :data="items" scroll-direction="top" :steep="1">
			<div v-for="item in items" :key="item.id" class="scroll-item">
				{{ item.text }}
			</div>
		</scroll>

		<h2>水平滚动示例</h2>
		<scroll class="scroll-container horizontal" :data="items" scroll-direction="left" :steep="1">
			<div v-for="item in items" :key="'h-' + item.id" class="scroll-item horizontal">
				{{ item.text }}
			</div>
		</scroll>

		<div class="controls">
			<button @click="addItem">添加项目</button>
			<button @click="removeItem">移除项目</button>
			<button @click="changeDirection">切换方向</button>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import scroll from './components/scroll.vue'; // 确保路径正确

// 示例数据
const items = ref([
	{ id: 1, text: '项目 1' },
	{ id: 2, text: '项目 2' },
	{ id: 3, text: '项目 3' },
	{ id: 4, text: '项目 4' },
	{ id: 5, text: '项目 5' },
	{ id: 6, text: '项目 6' },
	{ id: 7, text: '项目 7' },
	{ id: 8, text: '项目 8' },
	{ id: 9, text: '项目 9' },
]);

const direction = ref('top');

// 添加新项目
function addItem() {
	const newId = items.value.length + 1;
	items.value.push({ id: newId, text: `项目 ${newId}` });
}

// 移除最后一个项目
function removeItem() {
	if (items.value.length > 0) {
		items.value.pop();
	}
}

// 切换滚动方向
function changeDirection() {
	direction.value = direction.value === 'top' ? 'bottom' : 'top';
}
</script>

<style scoped>
.parent-container {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
	font-family: Arial, sans-serif;
	color: #fff;
}

h2 {
	margin: 30px 0 15px;
	color: #fff;
}

.scroll-container {
	height: 200px;
	border: 1px solid #ddd;
	border-radius: 4px;
	margin-bottom: 20px;
}

.scroll-container.horizontal {
	height: auto;
	white-space: nowrap;
}

.scroll-item {
	padding: 15px;
	border-bottom: 1px solid #eee;
	font-size: 16px;
	color: #fff;
}

.scroll-item.horizontal {
	display: inline-block;
	border-bottom: none;
	border-right: 1px solid #eee;
	padding: 15px 30px;
}

.controls {
	margin-top: 20px;
}

button {
	padding: 8px 15px;
	margin-right: 10px;
	background: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;
}

button:hover {
	background: #45a049;
}
</style>
