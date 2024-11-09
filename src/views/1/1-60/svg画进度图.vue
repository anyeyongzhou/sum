<template>
	<div class="home">
		<svg width="200" height="200">
			<circle fill="none" cx="100" cy="100" r="50" stroke="#EBEDF0" stroke-width="10" />
			<path fill="none" :d="d" stroke="#50D4AB" stroke-width="10" :stroke-dasharray="dasharray" />
		</svg>
	</div>
</template>

<script setup>
const girth = 2 * Math.PI * 50;
const dasharray = `${0.25 * girth} ${0.75 * girth}`;
const d = 'M 100, 50 A 50, 50, 0, 0, 1, 100, 150 A 50, 50, 0, 0, 1, 100, 50';
</script>

<style lang="scss" scoped>
.home {
	height: 110%;
	width: 100%;
	background-color: #fff;
	position: relative;
	overflow-y: scroll;

	.containers {
		width: 60%;
		height: 100%;
		padding: 10px;
		border: 1px solid black;

		/* 编写CSS begin */

		/* 编写CSS end */

		.code {
			padding: 20px;
			border: 1px solid gray;
			font-size: 20px;
		}
	}

	.tip {
		width: 30%;
		min-height: 100px;
		max-height: 600px;
		position: fixed;
		right: 50px;
		top: 200px;
		overflow-y: scroll;
		padding: 10px;
		background-color: #e0e0e0;
		box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);
		border-radius: 10px;
	}

	.button {
		position: fixed;
		right: 50px;
		top: 130px;
	}
}
</style>
