<template>
	<div
		class="custom-list"
		ref="scrollBody"
		@mouseenter="mouseenterFunc"
		@mouseleave="mouseleaveFunc"
		@mousewheel="mousewheelFunc"
	>
		<div class="list-body" :class="{ 'list-body2': isHorizontal }" ref="listBody" :style="{ transform: scrollTransform }">
			<slot></slot>
		</div>
		<div
			class="list-body"
			:class="{ 'list-body2': isHorizontal }"
			ref="tBody"
			v-if="isCanScroll"
			:style="{ transform: scrollTransform }"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
	steep: {
		// 滚动速度
		type: Number,
		default: 1,
	},
	scrollDirection: {
		// 滚动方向
		type: String,
		default: 'top',
	},
	isRoller: {
		// 是否可以滑轮滚动
		type: Boolean,
		default: true,
	},
	rollerScrollDistance: {
		// 滑轮滚动的距离
		type: Number,
		default: 20,
	},
	data: {
		type: Array,
		default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9],
	},
});

const isHorizontal = computed(() => {
	return props.scrollDirection === 'left' || props.scrollDirection === 'right';
});

const scrollBody = ref(null);
const listBody = ref(null);
const tBody = ref(null);

const timer = ref(null);
const scrollDistance = ref(0);
const bodyHeight = ref(0);
const bodyWidth = ref(0);
const listHeight = ref(0);
const listWidth = ref(0);
const isStop = ref(false);
const animationFrame = ref(null);
const isCanScroll = ref(true);

const scrollTransform = computed(() => {
	if (!isHorizontal.value) {
		return `translate(0px, ${scrollDistance.value}px)`;
	} else {
		return `translate(${scrollDistance.value}px, 0px)`;
	}
});

function clearAnimation() {
	if (animationFrame.value) {
		cancelAnimationFrame(animationFrame.value);
		animationFrame.value = null;
	}
}

function start() {
	// 判断是否可以滚动函数
	const isScrollFunc = (bodySize, listSize) => {
		if (bodySize > listSize) {
			scrollDistance.value = 0;
			isCanScroll.value = false;
		}
	};

	isStop.value = false;
	// 判断是否可以滚动
	if (!isHorizontal.value) {
		isScrollFunc(bodyHeight.value, listHeight.value);
	} else {
		isScrollFunc(bodyWidth.value, listWidth.value);
	}
	if (isCanScroll.value) {
		run();
	}
}

function run() {
	clearAnimation();

	animationFrame.value = window.requestAnimationFrame(() => {
		// 滚动主逻辑函数
		const main = (listSize, bodySize) => {
			const currentScrollDistance = Math.abs(scrollDistance.value);
			if (scrollDistance.value < 0) {
				const cc = 2 * listSize - bodySize;
				if (currentScrollDistance > cc) {
					scrollDistance.value = -(listSize - bodySize);
				}
			} else {
				scrollDistance.value = -listSize;
			}
		};

		// 根据滚动方向判断使用高度或宽度控制效果
		if (!isHorizontal.value) {
			main(listHeight.value, bodyHeight.value);
		} else {
			main(listWidth.value, bodyWidth.value);
		}

		// 判断滚动值
		if (!isStop.value) {
			if (props.scrollDirection === 'top' || props.scrollDirection === 'left') {
				scrollDistance.value -= props.steep;
			} else if (props.scrollDirection === 'bottom' || props.scrollDirection === 'right') {
				scrollDistance.value += props.steep;
			}
			run();
		}
	});
}

// 停止滚动
function stop() {
	isStop.value = true;
	clearAnimation();
}

// 初始化数值
function initData() {
	nextTick(() => {
		scrollDistance.value = 0;
		isCanScroll.value = true;

		if (scrollBody.value && listBody.value) {
			bodyHeight.value = scrollBody.value.clientHeight;
			bodyWidth.value = scrollBody.value.clientWidth;
			listHeight.value = listBody.value.clientHeight;
			listWidth.value = listBody.value.clientWidth;

			if (
				(bodyHeight.value !== 0 && listHeight.value !== 0 && listHeight.value >= bodyHeight.value) ||
				(bodyWidth.value !== 0 && listWidth.value !== 0 && listWidth.value >= bodyWidth.value)
			) {
				isCanScroll.value = true;
				start();
			} else {
				isCanScroll.value = false;
			}
		}
	});
}

function mouseenterFunc() {
	stop();
}

function mouseleaveFunc() {
	start();
}

function mousewheelFunc(e) {
	if (!isCanScroll.value || !props.isRoller) {
		return false;
	}

	const dis = e.deltaY;
	if (dis > 0) {
		scrollDistance.value -= props.rollerScrollDistance;
	} else {
		scrollDistance.value += props.rollerScrollDistance;
	}
	run();
}

// 监听数据变化
watch(() => props.data, initData, { deep: true });

onMounted(() => {
	nextTick(() => {
		initData();
	});
});

onBeforeUnmount(() => {
	clearInterval(timer.value);
	timer.value = null;
	clearAnimation();
});
</script>

<style scoped>
.custom-list {
	white-space: nowrap;
	font-size: 0;
	overflow: hidden;
}
.list-body {
	overflow: hidden;
	white-space: nowrap;
	font-size: 0;
}
.list-body2 {
	display: inline-block;
}
</style>
