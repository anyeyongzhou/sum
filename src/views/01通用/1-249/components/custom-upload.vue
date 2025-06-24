<template>
	<div class="container">
		<!-- 隐藏的 input[type="file"]，用于触发文件选择 -->
		<input type="file" id="file" :multiple="multiple" :accept="accept" @change="handleChange" />

		<!-- 普通上传模式：显示一个按钮 -->
		<button class="upload-btn" v-if="!drag" @click="choose">点击上传</button>

		<!-- 拖拽上传模式：显示拖拽区域 -->
		<div
			v-else
			class="drag-box"
			@dragover="handleDragOver"
			@dragleave="handleDragLeave"
			@drop="handleDrop"
			@click="choose"
			:class="{ dragging: isDragging }"
		>
			将文件拖到此处，或<span>点击上传</span>
		</div>

		<!-- 文件列表展示（仅当 showFileList 为 true 时显示） -->
		<template v-if="showFileList">
			<!-- 文本模式列表 -->
			<template v-if="listType === 'text'">
				<!-- 遍历文件列表 -->
				<p class="file-item" v-for="(file, index) in fileList" :key="index" @click="preview(file)">
					<span>{{ file.name }}</span>
					<!-- 文件名 -->
					<!-- 删除按钮（阻止事件冒泡） -->
					<span class="remove" @click.stop="remove(file, index)">×</span>
				</p>
			</template>
		</template>
	</div>
</template>

<script setup>
import { ref, toRaw, onMounted } from 'vue';
import property from './props'; // 组件属性配置

// 定义组件属性和事件
const props = defineProps(property);
const emit = defineEmits();

// 响应式数据
const fileList = ref([]); // 已选择的文件列表
const isDragging = ref(false); // 是否正在拖拽

// 触发文件选择（模拟点击 input[type="file"]）
const choose = () => {
	document.querySelector('#file').click();
};

// 拖拽相关事件处理
const handleDragOver = (event) => {
	event.preventDefault(); // 阻止默认行为（允许放置）
	isDragging.value = true; // 标记为拖拽状态
};

const handleDragLeave = (event) => {
	isDragging.value = false; // 取消拖拽状态
};

let files = []; // 临时存储选择的文件

// 拖拽释放文件处理
const handleDrop = (event) => {
	event.preventDefault();
	isDragging.value = false;
	files = Array.from(event.dataTransfer.files); // 获取拖拽的文件
	handleBeforeUpload(files); // 处理上传前的逻辑
};

// input[type="file"] 文件选择处理
const handleChange = (event) => {
	files = Array.from(event.target.files); // 获取选择的文件
	handleBeforeUpload(files);
};

// 上传前的校验和处理
const handleBeforeUpload = (files) => {
	// 检查文件数量是否超过限制
	if (files.length > props.limit - fileList.value.length) {
		console.error(
			`当前限制选择 ${props.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
				files.length + fileList.value.length
			} 个文件`
		);
		emit('on-exceed', files, toRaw(fileList.value)); // 触发超额事件
		return;
	}

	// 遍历处理每个文件
	files.forEach(async (file) => {
		emit('on-change', file, files); // 触发文件变化事件

		// 调用 beforeUpload 钩子（如果返回 false 则阻止上传）
		if (!props.beforeUpload()) {
			return;
		}

		// 自动上传模式
		if (props.autoUpload) {
			uploadRequest(file, files);
		}
	});
};

// 手动提交上传
const submit = () => {
	files.forEach(async (file) => {
		uploadRequest(file, files);
	});
};

let xhrs = []; // 存储所有 XHR 对象（用于取消上传）

// 文件上传核心逻辑
const uploadRequest = async (file, files) => {
	let xhr = new XMLHttpRequest();

	// 初始化请求
	xhr.open('POST', props.action); // 配置上传地址

	// 设置请求头
	Object.keys(props.headers).forEach((k) => {
		xhr.setRequestHeader(k, props.headers[k]);
	});

	// 构建 FormData（支持额外参数）
	const formData = new FormData();
	formData.append('file', file); // 添加文件
	Object.keys(props.data).forEach((k) => {
		formData.append(k, props.data[k]); // 添加额外参数
	});

	// 是否携带 Cookie
	xhr.withCredentials = props.withCredentials;

	// 上传进度事件
	xhr.upload.onprogress = (e) => {
		emit('on-progress', e, file, files); // 触发进度事件
	};

	// 请求状态变化监听
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			// 请求完成
			const res = JSON.parse(xhr.response);
			const fileObj = {
				// 构建文件对象
				name: file.name,
				percentage: 100, // 进度 100%
				raw: file, // 原始文件对象
				response: res, // 服务器响应
				status: 'success', // 状态标记
				size: file.size, // 文件大小
				uid: file.uid, // 唯一标识
			};

			fileList.value.push(fileObj); // 添加到文件列表

			// 根据状态码触发不同事件
			if (xhr.status === 200 || xhr.status === 201) {
				emit('on-success', res, fileObj, toRaw(fileList.value));
			} else {
				emit('on-error', res, fileObj, toRaw(fileList.value));
			}
		}
	};

	xhr.send(formData); // 发送请求

	// 存储 XHR 对象（用于取消）
	xhrs.push({
		xhr,
		file,
	});
};

// 文件预览
const preview = (file) => {
	emit('on-preview', file);
};

// 移除文件
const remove = (file, index) => {
	// 调用 beforeRemove 钩子（如果返回 false 则阻止删除）
	if (!props.beforeRemove()) {
		return;
	}
	fileList.value.splice(index, 1); // 从列表中移除
	emit('on-remove', file, fileList.value); // 触发移除事件
};

// 取消上传（示例方法，需完善）
const abort = (file) => {
	// 根据 file 查找对应的 xhr 并调用 abort()
	// xhr.abort()
};

// 暴露组件方法
defineExpose({
	abort,
	submit,
});
</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
}
/* 隐藏原生文件输入 */
#file {
	display: none;
}

/* 上传按钮样式 */
.upload-btn {
	border: none;
	background-color: #07c160;
	color: #fff;
	padding: 6px 10px;
	cursor: pointer;
}

/* 拖拽区域样式 */
.drag-box {
	width: 240px;
	height: 150px;
	line-height: 150px;
	text-align: center;
	border: 1px dashed #ddd;
	cursor: pointer;
	border-radius: 8px;
}
.drag-box:hover {
	border-color: cornflowerblue;
}
.drag-box.dragging {
	background-color: rgb(131, 161, 216, 0.2);
	border-color: cornflowerblue;
}
.drag-box span {
	color: cornflowerblue;
}

/* 文件列表项样式 */
.file-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 12px;
	padding: 0 8px;
	border-radius: 4px;
	cursor: pointer;
}
.file-item:hover {
	background-color: #f5f5f5;
	color: cornflowerblue;
}
.file-item .remove {
	font-size: 20px;
}
</style>
