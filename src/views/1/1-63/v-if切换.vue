<template>
	<p style="color: #fff">主要是为了看一下:v-if的切换导致的页面布局变化,是否会导致其它组件触发的生命周期变化(事实证明不会触发)</p>
	<div class="home">
		<div class="item" v-if="leftFlag">
			<Left />
		</div>
		<div class="item">
			<Center />
		</div>
		<div class="item">
			<Right />
		</div>
	</div>
	<div class="button">
		<el-button type="primary" @click="switchLeft">左侧容器切换</el-button>
	</div>
</template>

<script setup>
import Left from './components/left.vue';
import Center from './components/center.vue';
import Right from './components/right.vue';

const leftFlag = ref(true);

const switchLeft = () => {
	leftFlag.value = !leftFlag.value;
};
</script>

<style lang="scss" scoped>
.home {
	height: 50%;
	width: 100%;
	background-color: #fff;
	display: flex;

	.item {
		flex: 1;
		height: 100%;
	}
}
</style>
