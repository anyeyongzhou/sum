<template>
	<div class="container">
		<div class="item1">
			<p class="border-around">边框环绕</p>
		</div>
		<div class="item2">
			<div class="contrast">反差颜色进度</div>
		</div>
		<div class="item3">
			<div class="active-menu">选中菜单</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
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
		.border-around {
			width: 100px;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		}
		.border-around::before,
		.border-around::after {
			content: '';
			position: absolute;
			width: 0;
			height: 0;
			border: 2px solid transparent;
			box-sizing: border-box;
		}
		.border-around::before {
			top: 0;
			left: 0;
		}
		.border-around::after {
			bottom: 0;
			right: 0;
		}
		.border-around:hover::before,
		.border-around:hover::after {
			width: 100%;
			height: 100%;
		}

		.border-around:hover::before {
			border-top: 2px solid blue;
			border-right: 2px solid blue;
			transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
		}
		.border-around:hover::after {
			border-bottom: 2px solid blue;
			border-left: 2px solid blue;
			transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 0.9s;
		}
	}
	.item2 {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px 0;
		border: 1px solid red;
		position: relative;
		.contrast {
			display: inline-block;
			position: relative;
			background: #fff;
			color: #000;
			padding: 3px 12px;
			border: 1px solid #000;
			box-sizing: border-box;
			cursor: pointer;
		}
		.contrast::after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 0;
			background: #fff;
			mix-blend-mode: difference;
			transition: all 1s ease-in-out;
		}
		.contrast:hover::after {
			width: 100%;
		}
	}
	.item3 {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px 0;
		border: 1px solid red;
		position: relative;
		.active-menu {
			width: 100px;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		}
		.active-menu::before,
		.active-menu::after {
			content: '';
			position: absolute;
			width: 10px;
			height: 10px;
			opacity: 0;
			transition: all 0.6s ease;
		}
		.active-menu::before {
			bottom: 0;
			left: 0;
			transform: translate(100%, -50%);
			border-left: 2px solid #000;
			border-bottom: 2px solid #000;
		}
		.active-menu::after {
			right: 0;
			top: 0;
			transform: translate(-100%, 50%);
			border-top: 2px solid #000;
			border-right: 2px solid #000;
		}
		.active-menu:hover::before,
		.active-menu:hover::after {
			transform: translate(0, 0);
			opacity: 1;
		}
	}
}
</style>
