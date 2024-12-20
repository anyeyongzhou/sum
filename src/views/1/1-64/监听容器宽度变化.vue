<template>
	<div class="container">
		<div ref="domRef" class="resizable-div">监听容器的宽度:{{ domWidth }}</div>
	</div>
</template>

<script setup>
const domWidth = ref(0);
const domRef = ref();
const resizeObserver = ref(null);
const observeResize = () => {
	resizeObserver.value = new ResizeObserver((entries) => {
		for (let entry of entries) {
			// 获取当前宽度
			domWidth.value = entry.contentRect.width;
		}
	});
	resizeObserver.value.observe(domRef.value);
};

onMounted(() => {
	observeResize();
});

onBeforeUnmount(() => {
	if (resizeObserver.value) {
		resizeObserver.value.disconnect();
	}
});
</script>

<style>
.container {
	width: 100%;
	height: 100%;
	border: 1px solid #ff0;
	background-color: #fff;
	.resizable-div {
		width: 50%; /* 可以随意调整宽度 */
		height: 50%;
		background-color: red;
	}
}
</style>
