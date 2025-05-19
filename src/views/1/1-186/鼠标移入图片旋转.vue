<template>
	<div class="wrapper">
		<div class="container">
			<div class="row">
				<div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-6">
					<div class="box" @mouseover="hoverBox(index)" @mouseout="unhoverBox(index)">
						<div class="box-img" :class="{ 'rotate-out': activeIndex === index }">
							<img :src="item.image" :alt="item.title" />
						</div>
						<div class="box-con" :class="{ 'rotate-in': activeIndex === index }">
							<h4 class="title">{{ item.title }}</h4>
							<p class="des">{{ item.description }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

// 图片资源引入
import image1 from './images/1.png';
import image2 from './images/2.png';
import image3 from './images/3.png';

// 响应式数据
const activeIndex = ref(null);
const items = ref([
	{
		image: image1,
		title: 'Duende',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae libero orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vestibulum.',
	},
	{
		image: image1,
		title: 'Duende',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae libero orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vestibulum.',
	},
	{
		image: image2,
		title: 'Duende',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae libero orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vestibulum.',
	},
	{
		image: image3,
		title: 'Duende',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae libero orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vestibulum.',
	},
]);

// 鼠标悬停事件
const hoverBox = (index) => {
	activeIndex.value = index;
};

// 鼠标离开事件
const unhoverBox = (index) => {
	if (activeIndex.value === index) {
		activeIndex.value = null;
	}
};
</script>

<style lang="scss">
/* 组件样式 */
.wrapper {
	padding: 30px;

	.box {
		position: relative;
		perspective: 1000px;
		margin-bottom: 20px;

		.box-img {
			transform: rotateY(0);
			transition: all 0.5s ease-in-out 0s;

			img {
				width: 100%;
			}

			&.rotate-out {
				transform: rotateY(-90deg);
			}
		}

		.box-con {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			color: #fff;
			text-align: center;
			transform: rotateY(90deg);
			transition: all 0.5s ease-in-out 0s;
			padding: 20px;
			box-sizing: border-box;
			background: rgba(0, 0, 0, 0.7);
			opacity: 0;

			&.rotate-in {
				transform: rotateY(0);
				opacity: 1;
			}

			.title {
				font-size: 20px;

				&::after {
					content: '';
					width: 80%;
					display: block;
					border-bottom: 1px solid #fff;
					margin: 15px auto;
				}
			}

			.des {
				font-size: 14px;
				line-height: 24px;

				&::after {
					content: '';
					width: 80%;
					display: block;
					border-bottom: 1px solid #fff;
					margin: 15px auto;
				}
			}
		}
	}
}

/* 响应式设计 */
@media only screen and (max-width: 990px) {
	.box {
		margin-bottom: 20px;
	}
}
</style>
