<template>
	<div class="map-container">
		<chartMap :geoCoordMap="geoCoordMap" :mapData="mapData" @map="clickMap" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import chartMap from './components/map.vue';
import { jiangsuMapData, cityGeoListObj } from '/@/utils/map/GeoData/jiangsuCityLngLatData.js';

const mapData = ref(jiangsuMapData);
const geoCoordMap = ref(cityGeoListObj);

// 处理城市点击事件
const clickMap = (data) => {
	console.log('点击地图:', data);
};
</script>

<style scoped lang="scss">
.map-container {
	width: 100%;
	height: 800px;
	background: #0a1d3a;
	border-radius: 8px;
	padding: 15px;
}
</style>
