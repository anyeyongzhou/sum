<template>
	<div class="container" :style="`--progress: ${progress}`">
		<div class="inner position-center">
			<div class="circle circle-bottom position-center">
				<div class="circle-mask"></div>
			</div>
			<div class="circle circle-top position-center">
				<div id="circle" class="circle-main position-center" :style="`transform: translateX(-50%) rotate(${rotation}deg)`">
					<div v-for="(item, index) in items" :key="index" class="item" :style="`--rotate: ${item.rotation};`">
						<div class="item-inner" :class="{ active: index === currentIndex }">
							<div class="label-top">{{ item.topLabel }}</div>
							<div class="point"></div>
							<div class="label-bottom">{{ item.bottomLabel }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="btns">
		<button @click="prev">上一个</button>
		<button @click="next">下一个</button>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';

const items = [
	{ rotation: -15, topLabel: '10-15w', bottomLabel: '旅行家 V1' },
	{ rotation: 0, topLabel: '15-20w', bottomLabel: '旅行家 V2' },
	{ rotation: 15, topLabel: '20w+', bottomLabel: '旅行家 V3' },
	{ rotation: 30, topLabel: '30w+', bottomLabel: '旅行家 V4' },
	{ rotation: 45, topLabel: '50w+', bottomLabel: '旅行家 V5' },
];

const currentIndex = ref(0);
const maxIndex = items.length - 1;

const rotation = computed(() => {
	return currentIndex.value > 0 ? 15 * (currentIndex.value - 1) : 0;
});

const progress = computed(() => {
	if (currentIndex.value === 0) return 33.33;
	if (currentIndex.value < maxIndex) return 50;
	return 100;
});

const next = () => {
	if (currentIndex.value < maxIndex) {
		currentIndex.value += 1;
	}
};

const prev = () => {
	if (currentIndex.value > 0) {
		currentIndex.value -= 1;
	}
};
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.position-center {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 0;
}

.container {
	--height: 20vh;
	--progress: 0;

	width: 100%;
	height: var(--height);
	position: relative;
	overflow: hidden;

	.inner {
		width: 200%;
		height: calc(var(--height) * 2);
		background-color: #2f2f2f;
		border-radius: 50%;
		overflow: hidden;

		.circle {
			width: calc(var(--height) * 6.5);
			height: calc(var(--height) * 6.5);
			border-radius: 50%;
		}

		.circle-bottom {
			bottom: 12%;
			overflow: hidden;
			padding: 25% 15% 0 15%;
			background-color: #535353;

			.circle-mask {
				width: calc(var(--progress) * 1%);
				height: 100%;
				background-image: linear-gradient(to right, rgba(31, 231, 236, 0.3), rgba(31, 231, 236, 0.7));
				transition: all 0.3s ease-in-out;
			}
		}

		.circle-top {
			background-color: #2f2f2f;
			bottom: 13%;
			padding: 27% 15% 0 15%;

			color: #fff;
			display: flex;
			justify-content: space-around;
			align-items: flex-end;
		}

		.circle-main {
			width: calc(var(--height) * 6.5);
			height: calc(var(--height) * 6.5);
			border-radius: 50%;
			transition: all 0.3s ease-in-out;
			transform: translateX(-50%) rotate(0deg);

			.item {
				--rotate: 0;
				position: absolute;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: flex-end;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) rotate(calc(var(--rotate) * -1deg));

				.item-inner {
					display: flex;
					flex-direction: column;
					align-items: center;
					position: relative;
					bottom: -30px;
					font-size: 14px;
					color: #ccc;

					.point {
						width: 7px;
						height: 7px;
						background-color: #fff;
						border-radius: 50%;
						margin-top: 4px;
						box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);

						&::before {
							content: '';
							width: 12px;
							height: 12px;
							border-radius: 50%;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
						}
					}

					.label-bottom {
						margin-top: 5px;
					}
				}

				.active {
					.point {
						background-color: rgba(31, 231, 236, 1);

						&::before {
							background-color: rgba(31, 231, 236, 0.3);
						}
					}
				}
			}
		}
	}
}

.btns {
	position: absolute;
	bottom: 500px;
	left: 50%;
	transform: translateX(-50%);

	button {
		color: #1fe7ec;
		border: 1px solid #1fe7ec;
		background-color: transparent;
		padding: 4px 15px;
		border-radius: 4px;
		font-size: 14px;
	}
}
</style>
