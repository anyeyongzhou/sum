<template>
	<div class="home">
		<div class="container">
			<el-upload
				list-type="picture-card"
				:auto-upload="false"
				:limit="10"
				v-model:file-list="userInfo.picturePc"
				:on-change="handleChange"
				class="upload"
			>
				<!-- 自定义文件项模板 -->
				<template #file="{ file }">
					<div
						draggable="true"
						@dragstart="handleDragStart($event, file, 'mb')"
						@dragend="handleDragEnd"
						@drop="handleDrop($event, file, 'mb')"
						@dragover.prevent
					>
						<img :src="file.url" />
						<!-- 操作按钮 -->
						<span class="el-upload-list__item-actions">
							<span @click="handlePictureCardPreview(file)">
								<el-icon><ZoomIn /></el-icon>
							</span>
							<span @click="handleRemove(file, 'mb')">
								<el-icon><Delete /></el-icon>
							</span>
						</span>
					</div>
				</template>
			</el-upload>
		</div>
	</div>
</template>

<script setup>
import { Delete, ZoomIn } from '@element-plus/icons-vue';

const userInfo = ref({
	picturePc: [],
});

const handleDragStart = (event, file, type) => {
	const imgList = userInfo.value.picturePc;
	const index = imgList.findIndex((element) => element === file);
	event.dataTransfer.setData('index', index.toString());

	// 设置自定义拖拽图像
	const dragImage = new Image();
	dragImage.src = file.url;
	event.dataTransfer.setDragImage(dragImage, 0, 0);

	// 添加拖动样式
	event.currentTarget.classList.add('dragging');
};

const handleDragEnd = (event) => {
	document.querySelectorAll('.dragging').forEach((el) => {
		el.classList.remove('dragging');
	});
};

const handleDrop = (event, file, type) => {
	// 获取图片列表
	const imgList = userInfo.value.picturePc;

	// 获取目标位置索引
	const index = imgList.findIndex((element) => element === file);

	// 阻止默认行为
	event.preventDefault();

	// 获取拖拽源索引
	const draggedIndex = Number(event.dataTransfer.getData('index'));

	// 如果位置没变化，不做任何操作
	if (draggedIndex === index) return;

	// 创建数组副本（保证响应式更新）
	const updatedList = [...imgList];

	// 执行数组元素移动
	const [draggedItem] = updatedList.splice(draggedIndex, 1);
	updatedList.splice(index, 0, draggedItem);

	// 更新对应类型的图片列表
	userInfo.value.picturePc = updatedList;
};

const handleChange = (uploadFile, uploadFiles) => {
	console.log('handleChange', uploadFile);
};
</script>

<style lang="scss" scoped>
.home {
	height: 110%;
	width: 100%;
	background-color: #fff;
	position: relative;
	overflow-y: scroll;

	.container {
		width: 60%;
		height: 100%;
		padding: 10px;
		border: 1px solid black;

		:deep(.upload) {
			.el-upload-list__item {
				transition: transform 0.2s;
			}
			.el-upload-list__item.dragging {
				opacity: 0.5;
			}
			.el-upload-list__item.drop-target {
				border: 2px dashed #409eff;
			}
		}
	}
}
</style>
