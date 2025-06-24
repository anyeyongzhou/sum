<template>
	<div class="upload-container">
		<!-- 隐藏的文件输入 -->
		<input type="file" ref="fileInput" accept="image/*" style="display: none" @change="handleFileChange" />

		<!-- 上传/预览区域 -->
		<div
			class="upload-area"
			@click="triggerFileInput"
			@dragover.prevent="dragOver = true"
			@dragleave="dragOver = false"
			@drop.prevent="handleDrop"
			:class="{ 'drag-over': dragOver }"
		>
			<!-- 上传提示（无图片时显示） -->
			<template v-if="!currentImage">
				<span>+</span>
				<div>点击上传图片</div>
			</template>

			<!-- 图片预览（有图片时显示） -->
			<template v-else>
				<img :src="currentImage.preview" :alt="currentImage.name" class="preview-image" />
				<div class="delete-btn" @click.stop="removeImage">×</div>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ImageUpload',
	data() {
		return {
			currentImage: null,
			dragOver: false,
		};
	},
	methods: {
		// 触发文件选择
		triggerFileInput() {
			this.$refs.fileInput.click();
		},

		// 处理文件选择变化
		handleFileChange(event) {
			const files = event.target.files;
			if (files && files.length > 0) {
				this.processFile(files[0]);
			}
			// 重置input，以便可以重复选择同一文件
			event.target.value = '';
		},

		// 处理拖放文件
		handleDrop(event) {
			this.dragOver = false;
			const files = event.dataTransfer.files;
			if (files && files.length > 0) {
				this.processFile(files[0]);
			}
		},

		// 处理单个文件
		processFile(file) {
			// 检查文件类型
			if (!file.type.startsWith('image/')) {
				this.$message.error('请选择图片文件');
				return;
			}

			// 生成预览
			const reader = new FileReader();
			reader.onload = (e) => {
				this.currentImage = {
					file: file,
					preview: e.target.result,
					name: file.name,
				};

				// 通知父组件图片已更新
				this.$emit('change', file);
			};
			reader.readAsDataURL(file);
		},

		// 删除图片
		removeImage() {
			this.currentImage = null;
			this.$emit('change', null);
		},

		// 获取当前上传的文件（供父组件调用）
		getCurrentFile() {
			return this.currentImage ? this.currentImage.file : null;
		},

		// 清空当前文件（供父组件调用）
		clearFile() {
			this.currentImage = null;
		},
	},
};
</script>

<style lang="scss">
.upload-container {
	display: flex;
	flex-direction: column;
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;

	.upload-area {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 150px;
		height: 150px;
		border: 2px dashed #ccc;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.3s;
		overflow: hidden;

		// 上传提示样式
		span {
			font-size: 30px;
			color: #8c939d;
		}

		// 图片预览样式
		.preview-image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		// 删除按钮
		.delete-btn {
			position: absolute;
			top: 5px;
			right: 5px;
			width: 20px;
			height: 20px;
			background-color: rgba(255, 0, 0, 0.7);
			color: white;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			opacity: 0;
			transition: opacity 0.3s;
			z-index: 10;
		}

		&:hover {
			border-color: #409eff;
			color: #409eff;

			span {
				color: #409eff;
			}

			.delete-btn {
				opacity: 1;
			}
		}

		// 拖拽状态
		&.drag-over {
			border-color: #409eff;
			color: #409eff;

			span {
				color: #409eff;
			}
		}
	}
}
</style>
