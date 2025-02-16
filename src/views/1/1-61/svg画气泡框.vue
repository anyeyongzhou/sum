<template>
	<div class="home">
		<div class="containers">
			<svg width="17" height="10" class="cusp">
				<path
					fill="white"
					d="
        M 0 10 
        A 10,10,0,0,0,8 7 
        A 3,3,0,0,1,9 7
        A 10 10,0,0,0,17 10
      "
					stroke="#f00"
				/>
			</svg>
			<span>气泡框</span>
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
		position: relative;
		display: inline-block;
		height: 20px;
		line-height: 20px;
		background: #fff;
		border: 1px solid #ffe3c9;
		border-radius: 20px;
		font-size: 12px;
		padding: 0 10px;
		margin: 100px;
		box-sizing: border-box;

		.cusp {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: -10px;
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
