<template>
	<div class="map-container">
		<GansuMapChart :init-data="mapData" @city-click="handleCityClick" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import GansuMapChart from './components/line.vue';

// 地图数据
const mapData = ref([
	{ name: '兰州市', value: 120 },
	{ name: '天水市', value: 80 },
	{ name: '酒泉市', value: 65, selected: true },
]);

// 处理城市点击事件
const handleCityClick = (city) => {
	console.log('选中城市:', city);
	// 可以在这里更新数据或执行其他操作
};
</script>

<style scoped>
.map-container {
	width: 100%;
	height: 600px;
	background: #0a1d3a;
	border-radius: 8px;
	padding: 15px;
}
</style>
