<template>
	<div class="box" ref="box">
		<div
			v-for="(item, index) in items"
			:key="index"
			class="tile"
			:style="getTileStyle(index)"
			@mouseover="hoverTile(index)"
			@mouseout="unhoverTile(index)"
		></div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 图片资源引入 - 假设图片在src/assets/images目录下
import backgroundImage from './pic.jpg';

// DOM 引用
const box = ref(null);

// 响应式数据
const row = 9; // 行数
const col = 10; // 列数
const items = ref(Array(row * col).fill(0));
const hoveredIndex = ref(null);

// 获取瓦片样式
const getTileStyle = (index) => {
	const i = Math.floor(index / row); // 列索引
	const j = index % row; // 行索引
	const tileSize = 100;
	const gap = 2;

	const baseStyle = {
		width: `${tileSize}px`,
		height: `${tileSize}px`,
		left: `${i * (tileSize + gap)}px`,
		top: `${j * (tileSize + gap)}px`,
		backgroundImage: `url(${backgroundImage})`,
		backgroundPosition: `-${i * tileSize}px -${j * tileSize}px`,
		opacity: hoveredIndex.value === index ? 1 : 0.2,
		transform: hoveredIndex.value === index ? 'scale(1.5)' : 'scale(1)',
		zIndex: hoveredIndex.value === index ? 2 : 0,
	};

	return baseStyle;
};

// 鼠标悬停事件
const hoverTile = (index) => {
	hoveredIndex.value = index;
};

// 鼠标离开事件
const unhoverTile = (index) => {
	if (hoveredIndex.value === index) {
		hoveredIndex.value = null;
	}
};

onMounted(() => {
	// 初始化代码可以在这里执行
});
</script>

<style lang="scss">
/* 组件样式 */
.box {
	width: 1018px !important;
	height: 916px;
	position: relative;
	border: 1px solid #000;

	.tile {
		position: absolute;
		background-color: green;
		transition: all 0.5s ease;
		background-size: 1000px 900px; /* 背景图片总大小 */
	}
}
</style>
