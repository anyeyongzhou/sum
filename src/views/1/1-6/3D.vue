<template>
	<div class="home">
		<div class="container">
			<template v-if="flag">
				<Title :orderNum="1" context="3D正方体" :size="1" :color="9" :wight="1" :backgroundColor="3" />
				<div class="cube">
					<ul class="cube-inner">
						<li class="top"></li>
						<li class="bottom"></li>
						<li class="front"></li>
						<li class="back"></li>
						<li class="right"></li>
						<li class="left"></li>
					</ul>
				</div>
				<Title :orderNum="2" context="正四面体" :size="1" :color="9" :wight="1" :backgroundColor="3" />
				<div class="cones">
					<ul class="cones-inner">
						<li class="bottom"></li>
						<li class="front"></li>
						<li class="right"></li>
						<li class="left"></li>
					</ul>
				</div>
				<Title :orderNum="3" context="球体" :size="1" :color="9" :wight="1" :backgroundColor="3" />
				<div class="sphere">
					<ul class="sphere-inner">
						<li class="a"></li>
						<li class="b"></li>
						<li class="c"></li>
						<li class="d"></li>
					</ul>
				</div>
				<Title :orderNum="4" context="照片墙" :size="1" :color="9" :wight="1" :backgroundColor="3" />
				<div class="prespective-photo">
					<div class="stage">
						<div class="containers">
							<el-image :src="pic1" fit="contain" class="piece"></el-image>
							<el-image :src="pic2" fit="contain" class="piece"></el-image>
							<el-image :src="pic3" fit="contain" class="piece"></el-image>
							<el-image :src="pic4" fit="contain" class="piece"></el-image>
							<el-image :src="pic5" fit="contain" class="piece"></el-image>
							<el-image :src="pic6" fit="contain" class="piece"></el-image>
						</div>
					</div>
				</div>
				<Title :orderNum="5" context="跳动图表" :size="1" :color="9" :wight="1" :backgroundColor="3" />
			</template>
			<template v-else>
				<div class="code">
					<pre><code>{{ indexFile }}</code></pre>
				</div>
			</template>
		</div>
		<div class="tip" v-marked:hl="markdownContent"></div>
		<div class="button">
			<el-button type="primary" @click="handleClick">{{ buttonContent }}</el-button>
		</div>
	</div>
</template>

<script setup>
import pic1 from '/@/assets/beauty/1/1-1.jpg';
import pic2 from '/@/assets/beauty/2/2-1.jpg';
import pic3 from '/@/assets/beauty/3/3-1.jpg';
import pic4 from '/@/assets/beauty/4/4-1.jpg';
import pic5 from '/@/assets/beauty/5/5-1.jpg';
import pic6 from '/@/assets/beauty/6/6-1.jpg';
/* 不改的代码 begin */
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import 'highlight.js/styles/monokai-sublime.css';

const route = useRoute();
const flag = ref(true);
const buttonContent = ref('查看代码');
const indexFile = ref(''); // 用于存储动态加载的内容

const handleClick = async () => {
	flag.value = !flag.value;
	buttonContent.value = flag.value ? '查看代码' : '返回';

	if (!flag.value) {
		// 动态加载 .vue 文件的原始内容
		const filePath = `./${route.meta.title}.vue?raw`; // 根据实际路径设置
		try {
			const module = await import(filePath);
			indexFile.value = module.default; // 读取原始代码
		} catch (error) {
			console.error('加载文件错误:', error);
		}
	}
};

const markdownContent = ref(null);
onMounted(async () => {
	const mdFileContent = await import('./code.md?raw');
	markdownContent.value = marked(mdFileContent.default);
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

	.container {
		width: 60%;
		height: 100%;
		padding: 10px;
		border: 1px solid black;
		position: relative;

		/* 编写CSS begin */
		.cube {
			position: relative;
			width: 100%;
			height: 200px;
			background-color: #efefef;
			zoom: 2;
			.cube-inner {
				position: absolute;
				top: 50%;
				left: 50%;
				margin: -25px 0 0 -25px;
				transform-style: preserve-3d;
				transform-origin: 25px 25px;
				transform: rotateX(-33.5deg) rotateY(45deg);
				// perspective: 100px;
				// perspective-origin: 50% 50%;
				animation: fastspin 6s ease-in-out infinite 2s;
				li {
					position: absolute;
					width: 50px;
					height: 50px;
				}

				.top {
					background-color: rgba(255, 0, 0, 0.8);
					transform: rotateX(90deg) translateZ(25px);
				}

				.bottom {
					background-color: rgba(255, 255, 0, 0.8);
					transform: rotateX(-90deg) translateZ(25px);
				}

				.front {
					background-color: rgba(0, 128, 0, 0.8);
					transform: translateZ(25px);
				}

				.back {
					background-color: rgba(255, 152, 0, 0.8);
					transform: rotateX(-180deg) translateZ(25px);
				}

				.left {
					background-color: rgba(103, 58, 183, 0.8);
					transform: rotateY(-90deg) translateZ(25px);
				}

				.right {
					background-color: rgba(33, 150, 243, 0.8);
					transform: rotateY(90deg) translateZ(25px);
				}
			}

			@keyframes fastspin {
				0% {
					transform: rotateX(-33.5deg) rotateY(45deg);
				}
				40% {
					transform: rotateX(-33.5deg) rotateY(-315deg);
				}
			}
		}

		.cones {
			width: 100%;
			height: 200px;
			background-color: #efefef;
			zoom: 2;

			.cones-inner {
				position: relative;
				top: 50%;
				left: 50%;
				margin: 0px 0 0 -25px;
				transform-style: preserve-3d;
				transform-origin: 25px 25px;
				transform: rotateY(35deg);
				animation: alowRotate 6s ease-in-out infinite 2s;

				li {
					position: absolute;
					top: 0;
					z-index: 10;
					border-left: 30px solid transparent;
					border-right: 30px solid transparent;
				}

				.front {
					border-bottom: 50px solid rgba(255, 0, 0, 0.7);
					transform: rotate3d(-1, 1.732, 0, 70.5deg);
					transform-origin: 25% 50%;
				}

				.left {
					border-bottom: 50px solid rgba(0, 255, 0, 0.7);
					transform: rotate3d(1, 1.732, 0, -70.5deg);
					transform-origin: 75% 50%;
				}

				.right {
					border-bottom: 50px solid rgba(0, 0, 255, 0.7);
					transform: rotate3d(1, 0, 0, 70.5deg);
					transform-origin: 50% 100%;
				}

				.bottom {
					border-bottom: 50px solid rgba(0, 255, 255, 0.7);
				}
			}

			@keyframes alowRotate {
				0% {
					transform: rotateY(35deg);
				}
				40%,
				to {
					transform: rotateY(395deg);
				}
			}
		}

		.sphere {
			width: 100%;
			height: 200px;
			background-color: #efefef;
			zoom: 2;

			.sphere-inner {
				position: relative;
				top: 50%;
				left: 50%;
				margin: 0px 0 0 -25px;
				transform-style: preserve-3d;
				transform-origin: 25px 25px;
				transform: rotateX(-15deg) rotateY(70deg);
				animation: ballRotate 6s ease-in-out infinite 2s;
				li {
					width: 50px;
					height: 50px;
					position: absolute;
					top: 0;
					left: 0;
					border-radius: 100%;
					background: radial-gradient(transparent 30%, rgba(0, 0, 0, 0.3) 100%);
				}

				.a {
					transform: rotateY(-90deg);
				}
				.b {
					transform: rotateY(45deg);
				}
				.c {
					transform: rotateY(225deg);
				}
				.d {
					transform: rotateY(315deg);
				}
			}

			@keyframes ballRotate {
				0% {
					transform: rotateX(-15deg) rotateY(70deg);
				}
				100% {
					transform: rotateX(-15deg) rotateY(430deg);
				}
			}
		}

		.prespective-photo {
			width: 100%;
			height: 200px;
			background-color: #fff;
			zoom: 2;

			.stage {
				width: 100%;
				height: 200px;
				perspective: 800px;
				transition: top 0.5s;
				position: relative;

				.containers {
					position: absolute;
					width: 64px;
					height: 36px;
					left: 50%;
					top: 50%;
					cursor: pointer;
					transition: transform 1s;
					transform-style: preserve-3d;
					animation: photoRotate 18s ease-in-out infinite 2s;

					.piece {
						width: 64px;
						height: 36px;
						overflow: hidden;
						box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
						transition: opacity 1s, transform 1s;
						position: absolute;
						bottom: 0;
					}

					.piece:nth-child(1) {
						transform: rotateY(0deg) translateZ(98px);
						background-color: rgba(153, 204, 204, 0.8);
					}
					.piece:nth-child(2) {
						transform: rotateY(60deg) translateZ(98px);
						background-color: rgba(153, 204, 204, 0.8);
					}
					.piece:nth-child(3) {
						transform: rotateY(120deg) translateZ(98px);
						background-color: rgba(153, 204, 204, 0.8);
					}
					.piece:nth-child(4) {
						transform: rotateY(180deg) translateZ(98px);
						background-color: rgba(153, 204, 204, 0.8);
					}
					.piece:nth-child(5) {
						transform: rotateY(240deg) translateZ(98px);
						background-color: rgba(153, 204, 204, 0.8);
					}
					.piece:nth-child(6) {
						transform: rotateY(300deg) translateZ(98px);
						background-color: rgba(153, 204, 204, 0.8);
					}
				}

				@keyframes photoRotate {
					0% {
						-webkit-transform: rotateY(0deg);
						transform: rotateY(0deg);
					}
					16.7% {
						-webkit-transform: rotateY(60deg);
						transform: rotateY(60deg);
					}
					33.3% {
						-webkit-transform: rotateY(120deg);
						transform: rotateY(120deg);
					}
					50% {
						-webkit-transform: rotateY(180deg);
						transform: rotateY(180deg);
					}
					66.7% {
						-webkit-transform: rotateY(240deg);
						transform: rotateY(240deg);
					}
					83.3% {
						-webkit-transform: rotateY(300deg);
						transform: rotateY(300deg);
					}
					100% {
						-webkit-transform: rotateY(360deg);
						transform: rotateY(360deg);
					}
				}
			}
		}

		/* 编写CSS end */

		.code {
			padding: 20px;
			border: 1px solid gray;
			font-size: 20px;
		}
	}

	.tip {
		width: 600px;
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
