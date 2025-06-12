<template>
	<div class="counter-container">
		<div class="prefix">今日已解决</div>
		<div id="counter" ref="counterRef">
			<div v-for="(digit, index) in digits" :key="index" class="digit-container">
				<div class="digit-list" :style="digitListStyle(index)" ref="digitLists">
					<div v-for="(d, i) in digitItems" :key="i" class="digit">
						{{ d }}
					</div>
				</div>
			</div>
		</div>
		<div class="suffix">个问题</div>
	</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

// 配置参数
const config = {
	duration: 2000, // 动画持续时间(毫秒)
	rollCount: 2, // 数字额外滚动圈数
	delayBetweenDigits: 40, // 数字间延迟时间(毫秒)
	digitHeight: 60, // 数字高度(像素)
	targetNumber: 7140909, // 目标数字
};

const counterRef = ref(null);
const digitLists = ref([]);
const digits = ref([]);
const digitItems = ref([]);

// 初始化数字列表(0-9循环多次)
const initDigitItems = () => {
	const items = [];
	for (let i = 0; i <= config.rollCount; i++) {
		for (let j = 0; j < 10; j++) {
			items.push(j);
		}
	}
	digitItems.value = items;
};

// 获取数字列表的样式
const digitListStyle = (index) => {
	return {
		transition: `transform ${config.duration - index * config.delayBetweenDigits}ms ease-in-out`,
		transform: 'translateY(0)',
	};
};

// 开始动画
const startAnimation = () => {
	nextTick(() => {
		digitLists.value.forEach((list, index) => {
			const targetDigit = parseInt(digits.value[index], 10);
			const extraRolls = config.rollCount * 10;
			const targetY = -(extraRolls + targetDigit) * config.digitHeight;

			// 先重置位置
			list.style.transition = 'none';
			list.style.transform = 'translateY(0)';

			// 强制重绘
			void list.offsetHeight;

			// 设置动画属性
			list.style.transition = `transform ${config.duration - index * config.delayBetweenDigits}ms ease-in-out`;
			list.style.transform = `translateY(${targetY}px)`;
		});
	});
};

// 初始化计数器
const initCounter = () => {
	digits.value = config.targetNumber.toString().split('');
	initDigitItems();
};

onMounted(() => {
	initCounter();
	// 稍等DOM更新完成后再开始动画
	setTimeout(startAnimation, 100);
});
</script>

<style lang="scss">
body {
	font-family: Arial, sans-serif;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	margin: 0;
	background-color: #f5f5f5;
}

.counter-container {
	display: flex;
	background-color: #fff;
	border-radius: 8px;
	padding: 20px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

	#counter {
		display: flex;
	}
}

.digit-container {
	width: 40px;
	height: 60px;
	overflow: hidden;
	position: relative;
	margin: 0 2px;
}

.digit-list {
	position: absolute;
	will-change: transform; /* 优化动画性能 */
}

.digit {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 36px;
	height: 60px;
	font-weight: bold;
}

.prefix,
.suffix {
	font-size: 24px;
	margin: 0 10px;
	align-self: center;
}
</style>
