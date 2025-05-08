<template>
	<div class="container">
		<div class="box">
			<div
				v-for="(item, index) in menuItems"
				:key="index"
				class="item"
				@mouseenter="activeIndex = index"
				@mouseleave="activeIndex = null"
			>
				<div :class="['iconfont', item.icon]"></div>
				<div class="badge"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref(null);
const menuItems = [
	{ icon: 'icon-bytedance' },
	{ icon: 'icon-list' },
	{ icon: 'icon-plan' },
	{ icon: 'icon-screen' },
	{ icon: 'icon-menu' },
	{ icon: 'icon-lock' },
	{ icon: 'icon-home' },
];
</script>

<style lang="scss">
.container {
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #1e2759;

	.box {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		box-shadow: 0 5px 25px rgba(0, 0, 0, 0.25);
		cursor: pointer;

		.item {
			position: relative;

			.iconfont {
				font-size: 20px;
				pointer-events: none;
				color: #fff;
				opacity: 0.25;
				padding: 20px 40px;
				transition: 0.25s;
				position: relative;
				z-index: 2;
			}

			&:first-child .iconfont {
				border-top-left-radius: 10px;
				border-bottom-left-radius: 10px;
			}

			&:last-child .iconfont {
				border-top-right-radius: 10px;
				border-bottom-right-radius: 10px;
			}

			&:hover .iconfont {
				backdrop-filter: blur(15px);
				opacity: 1;
			}

			&:hover .badge {
				opacity: 1;
			}

			.badge {
				position: absolute;
				top: -10px;
				left: 50%;
				transform: translateX(-50%);
				width: 50px;
				height: 40px;
				border-radius: 10px;
				background-color: #5da6ff;
				box-shadow: 0 0 15px #5da6ff, 0 0 30px #5da6ff, 0 0 45px #5da6ff, 0 0 60px #5da6ff;
				transition: 0.5s;
				z-index: 1;
				opacity: 0;
			}

			@for $i from 1 through 7 {
				&:nth-child(#{$i}) .badge {
					$colors: (
						1: #ff0000,
						2: #ff7f00,
						3: #ffff00,
						4: #00ff00,
						5: #00ffff,
						6: #0000ff,
						7: #8b00ff,
					);

					background-color: map-get($colors, $i);
					box-shadow: 0 0 15px map-get($colors, $i), 0 0 30px map-get($colors, $i), 0 0 45px map-get($colors, $i),
						0 0 60px map-get($colors, $i);
				}
			}
		}
	}
}
</style>
