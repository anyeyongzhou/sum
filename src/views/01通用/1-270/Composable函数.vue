<template>
	<div class="container">
		<div class="items">
			<h1>不共享状态</h1>
			<div class="item">
				<ComponentA />
			</div>
			<div class="item">
				<ComponentB />
			</div>
		</div>
		<div class="items">
			<h1>共享状态</h1>
			<div class="item">
				<ComponentC />
			</div>
			<div class="item">
				<ComponentD />
			</div>
		</div>
	</div>
</template>

<script setup>
import ComponentA from './components/ComponentA.vue';
import ComponentB from './components/ComponentB.vue';
import ComponentC from './components/ComponentC.vue';
import ComponentD from './components/ComponentD.vue';
</script>

<style lang="scss" scoped>
.container {
	width: 100% !important;
	height: 100%;
	display: flex;
	color: #fff;
	.items {
		width: 100%;
		.item {
			width: 300px;
			height: 100px;
			border: 1px solid red;
			margin-right: 20px;
		}
	}
}
</style>
