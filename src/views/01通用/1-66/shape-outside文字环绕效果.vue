<template>
	<div class="home">
		<div class="containers">
			文字环绕效果
			<div class="float-image"></div>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante
				ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed blandit ligula non leo cursus, vitae eleifend
				nisl molestie. Nulla quis ligula at mauris rhoncus vestibulum. Maecenas at nulla ipsum. Donec rutrum congue leo at
				malesuada. Integer auctor tristique sem, vitae lacinia sem sagittis sed. Nullam auctor, enim nec pellentesque aliquam,
				arcu dui lacinia mauris, id lobortis enim odio id felis.
			</p>
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
		width: 60%;
		height: 100%;
		padding: 10px;
		border: 1px solid black;

		/* 编写CSS begin */
		.float-image {
			float: left;
			shape-outside: circle(50%); /* 50% of the element's width */
			width: 200px; /* Width of the image */
			height: 200px; /* Height of the image */
			margin: 10px;
			padding: 5px;
			border: 1px solid #000;
			background-image: url('../.././../assets/beauty/1/1-1.jpg'); /* Replace with your image path */
			background-size: cover; /* Ensure the image covers the entire element */
			clip-path: circle(50%); /* Optional: to clip the element itself to a circle */
		}
		/* 编写CSS end */
	}
}
</style>
