<template>
	<div class="timeline-container">
		<div class="timeline">
			<div
				v-for="(item, index) in timelineItems"
				:key="index"
				class="timeline-item"
				:class="{ 'left-item': index % 2 === 0, 'right-item': index % 2 !== 0 }"
			>
				<div class="timeline-date">{{ item.date }}</div>
				<div class="timeline-content">
					<h2>{{ item.title }}</h2>
					<p>{{ item.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const timelineItems = ref([
	{
		date: '2020 年 1 月',
		title: '重大事件 1',
		description: '这是 2020 年 1 月发生的重大事件的详细描述。',
	},
	{
		date: '2020 年 3 月',
		title: '重大事件 2',
		description: '这是 2020 年 3 月发生的重大事件的详细描述。',
	},
]);
</script>

<style lang="scss" scoped>
.timeline-container {
	font-family: Arial, sans-serif;
	background-color: #f4f4f4;
	margin: 0;
	padding: 0;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	.timeline {
		position: relative;
		width: 80%;
		max-width: 800px;
		margin: 0 auto;
		padding: 50px 0;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 50%;
			width: 2px;
			height: 100%;
			background-color: #ccc;
			transform: translateX(-50%);
		}

		.timeline-item {
			position: relative;
			width: 50%;
			padding: 20px;
			margin-bottom: 40px;

			&.left-item {
				float: left;
				clear: right;

				.timeline-date {
					right: -75px;
				}
			}

			&.right-item {
				float: right;
				clear: left;

				.timeline-date {
					left: -75px;
				}
			}

			.timeline-date {
				background-color: #333;
				color: white;
				padding: 10px;
				border-radius: 5px;
				width: 150px;
				text-align: center;
				position: absolute;
				top: 0;
			}

			.timeline-content {
				background-color: white;
				padding: 20px;
				border-radius: 5px;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

				h2 {
					color: #333;
					margin: 0 0 10px 0;
				}

				p {
					color: #666;
					margin: 0;
				}
			}
		}
	}
}
</style>
