<template>
	<div class="wrapper" ref="wrapper">
		<ul class="wrap-ul">
			<li
				v-for="(item, index) in items"
				:key="index"
				:class="{ active: activeIndex === index }"
				:style="getLiStyle(index)"
				@click="toggleImage(index)"
			>
				<div class="box">
					<img :src="getImageUrl(index)" alt="" />
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 图片资源引入
const getImageUrl = (index) => {
	return new URL(`./img/pic${index}.jpg`, import.meta.url).href;
};

// DOM 引用
const wrapper = ref(null);

// 响应式数据
const items = ref(Array(25).fill(0));
const activeIndex = ref(null);
const isExpanded = ref(false);
const wrapperSize = ref({ width: 0, height: 0 });

// 获取元素样式
const getLiStyle = (index) => {
	if (isExpanded.value && activeIndex.value === index) {
		// 展开状态的样式
		return {
			position: 'fixed',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			zIndex: 100,
			transform: 'none',
			transition: 'all 0.5s ease',
		};
	} else if (!isExpanded.value) {
		// 正常状态的样式
		const row = Math.floor(index / 5);
		const col = index % 5;
		const width = wrapperSize.value.width / 5;
		const height = wrapperSize.value.height / 5;

		return {
			width: `${width}px`,
			height: `${height}px`,
			left: `${width * col}px`,
			top: `${height * row}px`,
			transform: `scale(0.9) rotate(${Math.random() * 40 - 20}deg)
                 translateX(${30 * col - 60}px)
                 translateY(${30 * row - 60}px)
                 translateZ(-${Math.random() * 500}px)`,
			transition: 'all 0.5s ease',
			zIndex: 1,
		};
	} else {
		// 其他图片在展开状态下的样式
		return {
			opacity: 0,
			pointerEvents: 'none',
			transition: 'all 0.3s ease',
		};
	}
};

// 切换图片状态
const toggleImage = (index) => {
	if (isExpanded.value) {
		// 如果已经展开，则关闭
		isExpanded.value = false;
		setTimeout(() => {
			activeIndex.value = null;
		}, 500); // 等待动画完成
	} else {
		// 如果未展开，则展开点击的图片
		activeIndex.value = index;
		isExpanded.value = true;
	}
};

// 初始化
const init = () => {
	if (wrapper.value) {
		const { width, height } = window.getComputedStyle(wrapper.value);
		wrapperSize.value = {
			width: parseInt(width),
			height: parseInt(height),
		};
	}
};

onMounted(() => {
	init();

	// 窗口大小变化时重新初始化
	window.addEventListener('resize', init);
});
</script>

<style lang="scss">
.wrapper {
	width: 100% !important;
	height: 100%;
	background-color: #cecece;
}

.wrapper {
	position: relative;
}

.wrap-ul {
	width: 80%;
	height: 80%;
	position: relative;
	margin: 50px auto;
	perspective: 700px;

	li {
		transform-style: preserve-3d;
		position: absolute;
		background-color: #fff;

		&.active {
			cursor: zoom-out;
		}

		.box {
			width: 100%;
			height: 100%;
			transform: scale(0.9);
			transition: transform 0.3s ease;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
}
</style>
