<template>
	<div class="main">
		<p>左侧的容器</p>
	</div>
</template>

<script setup>
onMounted(() => {
	console.log('左侧的容器加载');
});
</script>

<style lang="scss" scoped>
.main {
	width: 100%;
	height: 100%;
	background: #f00;
	p {
		font-size: 30px;
		font-weight: 700;
		text-align: center;
		color: #fff;
	}
}
</style>
