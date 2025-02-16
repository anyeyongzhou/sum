<template>
	<div class="home">
		<div class="containers">
			<template v-if="flag">
				<Heads :context="route.meta.title" />
				<Title :orderNum="1" context="" :size="1" :color="9" :wight="1" :backgroundColor="3" />
			</template>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home {
	height: 110%;
	width: 100%;
	background-color: #fff;
	position: relative;
	overflow-y: scroll;

	.containers {
		width: 100%;
		height: 100%;
		padding: 10px;
		border: 1px solid black;

		/* 编写CSS begin */

		/* 编写CSS end */
	}
}
</style>
