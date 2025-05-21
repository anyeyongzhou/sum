<template>
	<div class="home">
		<div class="container">
			<template v-if="flag">
				<Heads :context="route.meta.title" />
				<Title context="形成X号" :orderNum="1"></Title>
				<button class="hamburger">
					<div class="hamburger__line"></div>
					<div class="hamburger__line"></div>
					<div class="hamburger__line"></div>
				</button>
				<Title context="形成减号" :orderNum="2"></Title>
				<button class="hamburger minus">
					<div class="hamburger__line"></div>
					<div class="hamburger__line"></div>
					<div class="hamburger__line"></div>
				</button>
				<Title context="形成减号1" :orderNum="3"></Title>
				<button class="hamburger minuso">
					<div class="hamburger__line"></div>
					<div class="hamburger__line"></div>
					<div class="hamburger__line"></div>
				</button>
				<Title context="形成加号" :orderNum="4"></Title>
				<button class="hamburger add">
					<div class="hamburger__line"></div>
					<div class="hamburger__line"></div>
					<div class="hamburger__line"></div>
				</button>
				<Title context="形成箭头" :orderNum="5"></Title>
				<button class="hamburger arrow">
					<div class="hamburger__line"></div>
					<div class="hamburger__line"></div>
					<div class="hamburger__line"></div>
				</button>
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
	const replaceUrl = `../src/views/${route.name.split('-').at(0)}/${route.fullPath}`;
	const markdownText = marked(mdFileContent.default);
	markdownContent.value = markdownText
		.replace(/src="(images\/code\/\d+\.png)"/, `src="${replaceUrl}/$1"`)
		.replace(/(<img[^>]*)(>)/, '$1 style="width:100%;height:100%;"$2');
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

		/* 编写CSS begin */
		.hamburger {
			background: transparent;
			border: transparent;
			cursor: pointer;
			padding: 0 0 0 20px;
			.hamburger__line {
				background: rgb(203 213 225);
				margin: 5px 0;
				height: 4px;
				width: 32px;

				transition: all 0.3s ease-out;
			}

			&:hover .hamburger__line:nth-child(1) {
				transform: translateY(9px) rotate(45deg);
			}
			&:hover .hamburger__line:nth-child(2) {
				opacity: 0;
			}
			&:hover .hamburger__line:nth-child(3) {
				transform: translateY(-9px) rotate(-45deg);
			}
		}

		.minus {
			&:hover .hamburger__line:nth-child(1) {
				transform: translateY(9px);
			}
			&:hover .hamburger__line:nth-child(2) {
				opacity: 0;
			}
			&:hover .hamburger__line:nth-child(3) {
				transform: translateY(-9px);
			}
		}

		.minuso {
			&:hover .hamburger__line:nth-child(1) {
				opacity: 0;
				transform: translateX(-100%);
			}
			&:hover .hamburger__line:nth-child(2) {
				opacity: 1;
			}
			&:hover .hamburger__line:nth-child(3) {
				opacity: 0;
				transform: translateX(100%);
			}
		}

		.add {
			&:hover .hamburger__line:nth-child(1) {
				transform: translateY(9px);
			}

			&:hover .hamburger__line:nth-child(2) {
				opacity: 0;
			}

			&:hover .hamburger__line:nth-child(3) {
				transform: translateY(-9px) rotate(-90deg);
			}
		}

		.arrow {
			&:hover .hamburger__line:nth-child(1) {
				transform: translate(-2px, 4px) rotate(-45deg);
				width: 16px;
			}

			&:hover .hamburger__line:nth-child(2) {
				opacity: 1;
			}

			&:hover .hamburger__line:nth-child(3) {
				transform: translate(-2px, -4px) rotate(45deg);
				width: 16px;
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
