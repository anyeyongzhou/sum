<template>
	<div class="container">
		<div class="item1">
			<el-input v-model="value1" oninput="value = value.replace(/[@!#$]/g, '')" placeholder="请输入alert("></el-input>
		</div>
	</div>
</template>

<script setup>
const value1 = ref();
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	background-color: #fff;
	.item1 {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px 0;
		border: 1px solid red;
		position: relative;
	}
}
</style>
