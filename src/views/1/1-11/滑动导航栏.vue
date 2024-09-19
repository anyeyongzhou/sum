<template>
	<div class="home">
		<div class="container">
			<template v-if="flag">
				<Title :orderNum="1" context="滑动导航栏" :size="1" :color="9" :wight="1" :backgroundColor="3" />
				<div class="navigation">
					<div
						href="#"
						class="label"
						:class="currentIndex == index ? 'change' : ''"
						v-for="(item, index) in aList"
						:key="index"
						@click="handleClickNav(index)"
					>
						{{ item }}
					</div>
					<div class="line" :style="{ left: linePosition }"></div>
				</div>
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
	markdownContent.value = marked(mdFileContent.default);
});
/* 不改的代码 end */

const aList = reactive(['HOME', 'ARTICLE', 'COMMENT', 'INTRODUCE', 'OTHER']);
let currentIndex = ref(0);

const handleClickNav = (index) => {
	currentIndex.value = index;
};

// 计算 line 的位置
const linePosition = computed(() => {
	return `${48 + currentIndex.value * 195}px`;
});
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

		.navigation {
			position: relative;
			width: 100%;
			height: 50px;
			background-color: rgb(30, 45, 112);
			border-radius: 10px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			box-shadow: 1.5px 2px 2px rgb(0, 0, 0), inset 3px 3px 4px rgba(255, 255, 255, 0.1);
			.label {
				width: 100px;
				height: 30px;
				text-align: center;
				line-height: 30px;
				color: #fff;
				text-decoration: none;
				font-size: 14px;
				transition: color 0.3s ease; /* 平滑颜色变化 */
			}
			.change {
				color: #0ff;
				border-radius: 10px;
				box-shadow: inset 3px 3px 4px rgb(0, 0, 0), 1.5px 2px 2px rgba(255, 255, 255, 0.1);
			}
			div:hover {
				color: #0ff;
				cursor: pointer;
			}
			.line {
				position: absolute;
				left: 48px; //244
				bottom: 0;
				height: 3px;
				width: 100px;
				background-color: rgb(66, 104, 207);
				border-radius: 2px;
				transition: left 0.3s ease; /* 平滑位置变化 */
			}
		}

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
