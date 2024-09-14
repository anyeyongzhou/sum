<template>
	<div class="home">
		<div class="container">
			<template v-if="flag">
				<Title :orderNum="1" context="文本溢出" :size="1" :color="9" :wight="1" :backgroundColor="3" />
				<Title :orderNum="1" context="单行文本溢出" :size="2" :color="9" :wight="1" :backgroundColor="1" />
				<Text orderNum="a" context="原始的字符串" />
				<div class="content">
					<span>{{ textContext }}</span>
				</div>
				<Text orderNum="b" context="理想的效果" effect />
				<div class="content correct">
					<span>{{ textContext }}</span>
				</div>
				<Text orderNum="c" context="没有加width的字符串" />
				<div class="content no-width">
					<span></span>
					<span>{{ textContext }}</span>
				</div>
				<Text orderNum="d" context="本身不是块级元素的字符串" />
				<div class="content not-block"></div>
			</template>
			<template v-else>
				<div class="code">
					<pre><code>{{ indexFile }}</code></pre>
				</div>
			</template>
		</div>
		<div class="tip" v-marked:hl="markdownContent"></div>
		<!-- <div class="tip" v-html="markdownContent"></div> -->
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

const textContext = ref('1234567890111213141511617181920212223242526272829303132333435363738394041424344454647484950');
</script>

<style lang="scss" scoped>
.home {
	height: 100%;
	width: 100%;
	background-color: #fff;
	position: relative;
	overflow-y: scroll;

	.container {
		width: 100%;
		height: 100%;
		padding: 10px;
		border: 1px solid black;
		.content {
			padding: 20px;
			span {
				border: 1px solid green;
			}
		}
		.correct {
			max-width: 100px;
			white-space: nowrap; //文本不换行
			overflow: hidden; //溢出隐藏
			text-overflow: ellipsis; //文本溢出显示符号：省略号
		}
		.no-width {
			white-space: nowrap; //文本不换行
			overflow: hidden; //溢出隐藏
			text-overflow: ellipsis; //文本溢出显示符号：省略号
		}
		.not-block {
			max-width: 100px;
			white-space: nowrap; //文本不换行
			overflow: hidden; //溢出隐藏
			text-overflow: ellipsis; //文本溢出显示符号：省略号
			display: flex;
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
