<template>
	<div>
		<div class="preview-overlay" @click="hidePreview">
			<img :src="currentImage" alt="preview image" class="preview-image" />
			<div class="export-button" @click.stop="handleExport">
				<span>导出图片</span>
				<span class="shine"></span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
	imageList: {
		type: Array,
		default: () => [],
	},
	currentImage: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['close', 'export']);

const hidePreview = () => {
	emit('close');
};

const handleExport = () => {
	emit('export', props.currentImage);
};
</script>

<style lang="scss">
.preview-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;

	.preview-image {
		max-width: 80%;
		max-height: 80%;
		object-fit: contain;
	}

	.export-button {
		position: absolute;
		bottom: 20px;
		padding: 10px;
		background-color: #00aaff;
		color: white;
		border-radius: 5px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		box-shadow: 0 0 10px #00aaff;
		overflow: hidden;

		&:hover {
			background-color: #00e5ff;
		}

		.shine {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: linear-gradient(45deg, #ffffff 10%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%);
			animation: exportButtonShine 2s linear infinite;
		}
	}
}

@keyframes exportButtonShine {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
