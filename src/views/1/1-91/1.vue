<template>
	<div class="home">
		<div class="containers">
			<span>这是一张网络图片,可以在el-image中添加请求头header</span>
			<el-image
				style="width: 100px; height: 100px"
				src="http://localhost:8888/w700d1q75cms.jpg"
				:headers="{
					Authorization: 'Bearer xxx',
				}"
				fit="cover"
			></el-image>
		</div>
	</div>
</template>

<script setup>
import axios from 'axios';
/* 不改的代码 begin */
const url = ref();
onMounted(async () => {
	const response = await axios.get('http://localhost:8888/w700d1q75cms.jpg', {
		responseType: 'blob',
		headers: {
			Authorization: 'Bearer xxx',
		},
	});
	console.log('response', response);
});
/* 不改的代码 end */
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
	}
}
</style>
