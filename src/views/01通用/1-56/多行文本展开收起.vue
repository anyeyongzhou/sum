<template>
	<div class="container">
		<div class="wrap">
			<input type="checkbox" id="exp" class="exp" />
			<div class="text">
				<label class="btn" for="exp"></label>
				互联网信息服务(含发布网络广告);第二类增值电信业务中的信息服务业务(不含固定网电话信息服务和互联网信息服务);制作、发行动画片、专题、电视综艺,不得制作时政新闻及同类专题、专栏等广播电视节目(广播电视节目制作经营许可证有效期至2023年1月12日)
			</div>
		</div>
	</div>
</template>

<script setup>
const onTabClick = () => {};
</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	background: #fff;
	.wrap {
		display: flex;
		width: 200px;
		border: 1px solid black;
		padding: 10px;
	}

	.text {
		overflow: hidden;
		line-height: 20px;
		max-height: 60px;
		text-align: justify;
		position: relative;
	}

	.text::before {
		content: '';
		float: right;
		width: 0;
		/* height: calc(100% - 20px); */
		height: 100%;
		margin-bottom: -20px;
	}

	.text::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		background: #fff;
	}

	.btn {
		float: right;
		clear: both;
		height: 20px;
		line-height: 18px;
		margin-left: 20px;
		position: relative;
		color: #025cdc;
		cursor: pointer;
	}

	.btn::before {
		content: '...';
		position: absolute;
		left: -10px;
		color: #333;
		transform: translateX(-100%);
	}

	.btn::after {
		content: '展开';
	}

	.exp:checked + .text .btn::after {
		content: '收起';
	}

	.exp {
		display: none;
	}

	.exp:checked + .text {
		max-height: none;
	}

	.exp:checked + .text .btn::before {
		visibility: hidden;
		/*在展开状态下隐藏省略号*/
	}

	.exp:checked + .text::after {
		visibility: hidden;
	}
}
</style>
