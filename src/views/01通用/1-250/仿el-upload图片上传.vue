<template>
	<div>
		<h2>图片上传示例</h2>
		<ImageUpload ref="imageUpload" />

		<div style="margin-top: 20px">
			<el-button @click="submit">提交</el-button>
			<el-button @click="clear">清空</el-button>
		</div>
	</div>
</template>

<script>
import ImageUpload from './components/imageUpload.vue';

export default {
	components: {
		ImageUpload,
	},
	methods: {
		submit() {
			const files = this.$refs.imageUpload.getUploadedFiles();
			if (files.length === 0) {
				this.$message.warning('请先上传图片');
				return;
			}

			// 这里可以添加实际的上传逻辑
			console.log('准备上传的文件:', files);
			this.$message.success(`已选择 ${files.length} 张图片`);
		},
		clear() {
			this.$refs.imageUpload.clearFiles();
			this.$message.info('已清空上传列表');
		},
	},
};
</script>
