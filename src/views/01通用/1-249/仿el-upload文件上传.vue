<template>
	<upload
		ref="uploadRef"
		action="http://localhost:3000/upload"
		multiple
		show-file-list
		drag
		auto-upload
		upload-folder
		:headers="headers"
		:data="data"
		:limit="3"
		:before-upload="beforeUpload"
		:before-remove="beforeRemove"
		@on-change="handleChange"
		@on-success="handleSuccess"
		@on-error="handleError"
		@on-preview="handlePreview"
		@on-remove="handleRemove"
		@on-exceed="handleExceed"
		@on-progress="handleProgress"
	>
	</upload>
</template>

<script setup>
import { ref } from 'vue';
import upload from './components/custom-upload.vue';

const uploadRef = ref(null);

const data = {
	name: '张三',
	age: 20,
};

const headers = {
	a: 111,
};

const handleChange = (file, fileList) => {
	// console.log('onChange', file, fileList)
};
const handleSuccess = (res, file, fileList) => {
	console.log(res, file, fileList);
};
const handleError = (err, file, fileList) => {
	console.log(err, file, fileList);
};
const handlePreview = (file) => {
	console.log('handlePreview', file);
};
const handleRemove = (file, fileList) => {
	console.log('handleRemove', file, fileList);
};
const handleExceed = (files, fileList) => {
	console.log('文件个数超限', files, fileList);
};
const handleProgress = (e, file, fileList) => {
	console.log('上传进度');
	if (e.lengthComputable) {
		const percentComplete = Math.ceil((e.loaded / e.total) * 100);
		console.log('[ percentComplete ] >', percentComplete);
	}
};
const beforeUpload = (file) => {
	return true;
};
const beforeRemove = (file, fileList) => {
	return true;
};
</script>

<style></style>
