<template>
	<div class="main">
		<video :src="videoUrl" style="width: 100%; height: 100%" controls></video>
	</div>
</template>

<script setup>
import videoUrl from '/@/assets/video/1.mp4';
onMounted(() => {
	console.log('中间的容器加载');
});
</script>

<style lang="scss" scoped>
.main {
	width: 100%;
	height: 100%;
	background: #0f0;
	p {
		font-size: 30px;
		font-weight: 700;
		text-align: center;
		color: #fff;
	}
}
</style>
