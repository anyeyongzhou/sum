<template>
	<div class="home">
		<div class="containers">
			<div class="form-item">
				<input require type="text" id="username" class="input" />
				<span class="bar"></span>
				<label for="username">User Name</label>
			</div>
		</div>
	</div>
</template>

<script setup>
/* 不改的代码 begin */

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
		.form-item {
			position: relative;
		}

		/* 编写CSS begin */
		.form-item .bar {
			position: absolute;
			width: 0;
			height: 2px;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, -50%);
			background: #5264ae;
			transition: 0.4s ease;
			border: 1px solid red;
		}
		.form-item .input:focus ~ .bar {
			width: 100%;
			border: 1px solid green;
		}

		.form-item .input:focus ~ label {
			color: #5264ae;
			transform: translateY(-40px);
			font-size: 16px;
		}

		.form-item .input:valid ~ label {
			color: #5264ae;
			transform: translateY(-40px);
			font-size: 16px;
		}
		/* 编写CSS end */
	}
}
</style>
