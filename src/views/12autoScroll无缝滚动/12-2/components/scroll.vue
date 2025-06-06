<template>
	<div class="loop-container" ref="loopRef" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
		<div v-for="(item, index) in loopData" :key="index" class="loop-item">
			<div class="name">
				{{ item.name }}
			</div>
			<div class="bar">
				<div class="content" :title="'运营商：' + item.name + ',数量' + item.value" :style="{ width: item.rate + '%' }"></div>
			</div>
			<div class="rate">{{ item.rate }}%</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
	loopData: {
		type: Array,
		default: [],
	},
});

const loopRef = ref(null);
const timer = ref(null);
const totalHeight = ref(0);
const childHeight = ref(0);
const scrollAnimationId = ref(null);
const isPaused = ref(false);
const targetScrollPosition = ref(0);
const scrollDuration = 1000; // 滚动动画持续时间(ms)
const scrollIntervalTime = 2000; // 滚动间隔时间(ms)

// 缓动函数 - 平滑的加速减速效果
const easeInOutQuad = (t) => {
	return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

const autoScroll = () => {
	const container = loopRef.value;

	// 初始目标位置
	targetScrollPosition.value = childHeight.value;

	// 设置定时器，每隔一定时间更新目标位置
	timer.value = setInterval(() => {
		if (!isPaused.value && container) {
			const newPosition = targetScrollPosition.value + childHeight.value;

			// 检查是否滚动到底部
			if (newPosition + container.clientHeight >= container.scrollHeight) {
				targetScrollPosition.value = 0; // 回到顶部
			} else {
				targetScrollPosition.value = newPosition;
			}

			// 开始平滑滚动动画
			smoothScrollTo(targetScrollPosition.value);
		}
	}, scrollIntervalTime);
};

const smoothScrollTo = (targetPosition) => {
	const container = loopRef.value;
	if (!container) return;

	const startPosition = container.scrollTop;
	const distance = targetPosition - startPosition;
	let startTime = null;

	// 取消之前的动画
	if (scrollAnimationId.value) {
		cancelAnimationFrame(scrollAnimationId.value);
	}

	const animateScroll = (timestamp) => {
		if (!startTime) startTime = timestamp;
		const elapsed = timestamp - startTime;
		const progress = Math.min(elapsed / scrollDuration, 1);

		// 使用缓动函数使动画更自然
		container.scrollTop = startPosition + distance * easeInOutQuad(progress);

		if (progress < 1 && !isPaused.value) {
			scrollAnimationId.value = requestAnimationFrame(animateScroll);
		}
	};

	scrollAnimationId.value = requestAnimationFrame(animateScroll);
};

const pauseScroll = () => {
	isPaused.value = true;
	if (scrollAnimationId.value) {
		cancelAnimationFrame(scrollAnimationId.value);
		scrollAnimationId.value = null;
	}
};

const resumeScroll = () => {
	if (isPaused.value) {
		isPaused.value = false;
		smoothScrollTo(targetScrollPosition.value);
	}
};

const cleanUp = () => {
	if (timer.value) {
		clearInterval(timer.value);
		timer.value = null;
	}
	if (scrollAnimationId.value) {
		cancelAnimationFrame(scrollAnimationId.value);
		scrollAnimationId.value = null;
	}
};

onMounted(() => {
	nextTick(() => {
		if (loopRef.value) {
			// 整体高度
			totalHeight.value = loopRef.value.offsetHeight;
			// 子容器高度
			const childEls = loopRef.value.querySelectorAll('.loop-item');
			if (childEls.length > 0) {
				childHeight.value = childEls[0].offsetHeight;
			}
			autoScroll();
		}
	});
});

onBeforeUnmount(() => {
	cleanUp();
});
</script>

<style lang="scss" scoped>
.loop-container {
	width: 100%;
	height: 100%;
	color: #fff;
	margin: 0 0 0 1%;
	padding-right: 5%;
	border-radius: 3px;
	font-size: 14px;
	overflow-y: scroll;
	scroll-behavior: smooth;
	position: relative;
	top: -5px;

	&::-webkit-scrollbar {
		display: none;
	}

	.loop-item {
		width: 100%;
		height: 25%;
		padding: 2% 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 1px solid #43efff;

		.name {
			width: 30%;
			text-align: center;
		}
		.bar {
			background: #12314f;
			width: 40%;
			height: 60%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			cursor: pointer;
			.content {
				height: 50%;
				background: #43efff;
			}
		}
		.rate {
			width: 30%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
