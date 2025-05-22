<template>
	<div class="img-cut-content">
		<div class="canvas-content">
			<canvas ref="canvas" id="example-canvas" :width="width" :height="height" @click="canvasClick" tabindex="0"></canvas>
		</div>
		<div class="tools-content">
			<div class="tools-content-box">
				<div class="row-item">
					<label for="file-upload" class="custom-file-upload"> <i class="fas fa-cloud-upload-alt"></i> 选择文件 </label>
					<input v-show="false" id="file-upload" type="file" accept="image/*" @change="handleFileUpload" />
				</div>
				<div class="row-item">
					<input
						type="input"
						@change="inputSrc"
						placeholder="输入图片在线地址"
						v-model="srcLink"
						class="input-style"
						style="width: 100%"
					/>
				</div>
				<div class="row-item">
					<label class="label-style">宽</label>
					<input
						type="number"
						v-model="width"
						@input="resizeImage($event, 'width')"
						@keydown.ctrl.z.prevent
						class="input-style"
					/>

					<label class="label-style">高</label>
					<input
						type="number"
						v-model="height"
						@input="resizeImage($event, 'height')"
						@keydown.ctrl.z.prevent
						class="input-style"
					/>

					<label class="label-style">按比例缩放</label>
					<input type="checkbox" v-model="aspectRatio" class="checkbox-style" />
				</div>
				<div class="row-item">
					<div style="width: 100%">
						<div>锚点集</div>
						<div style="color: red">ctrl+z可撤回最后一次锚点</div>
						<textarea v-model="pointsStr" class="points-list"></textarea>
					</div>
				</div>
				<div class="row-item">
					<button @click="clearPoints" class="button-three">清除所有锚点</button>
					<button @click="cutImg" class="button-four">预览</button>
				</div>
			</div>
		</div>
		<preview-img :currentImage="currentImage" v-if="showImg" @close="showImg = false" @export="downloadImg"></preview-img>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import PreviewImg from './components/previewImg.vue';

const canvas = ref(null);
const image = ref(null);
const width = ref(null);
const height = ref(null);
const aspectRatio = ref(true);
const ctx = ref(null);
const points = ref([]);
const srcLink = ref('');
const currentImage = ref('');
const showImg = ref(false);
const originHeight = ref(0);
const originWidth = ref(0);

const pointsStr = computed(() => {
	return JSON.stringify(realPoints.value);
});

const realPoints = computed(() => {
	const computedPoints = [];
	points.value.forEach((point) => {
		computedPoints.push(tranPoint(point));
	});
	return computedPoints;
});

onMounted(() => {
	ctx.value = canvas.value.getContext('2d');
	document.addEventListener('keydown', (event) => {
		if (event.ctrlKey && event.key === 'z') {
			event.preventDefault();
			undoPoint();
		}
	});
});

const tranPoint = (point) => {
	let { x, y } = point;
	x = x * (width.value / originWidth.value);
	y = y * (height.value / originHeight.value);
	return { x, y };
};

const handleFileUpload = (e) => {
	const file = e.target.files[0];
	if (!file) return;
	srcLink.value = '';
	const reader = new FileReader();
	reader.onload = (event) => {
		const img = new Image();
		img.onload = () => {
			image.value = img;
			width.value = img.width;
			height.value = img.height;
			originWidth.value = img.width;
			originHeight.value = img.height;
			drawCanvas();
		};
		img.src = event.target.result;
	};
	reader.readAsDataURL(file);
};

const getImageBase64FromURL = (url) => {
	return new Promise((resolve) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			const reader = new FileReader();
			reader.onloadend = function () {
				resolve(reader.result);
			};
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	});
};

const inputSrc = async () => {
	const src = await getImageBase64FromURL(srcLink.value);
	const img = new Image();
	img.onload = () => {
		image.value = img;
		width.value = img.width;
		height.value = img.height;
		originWidth.value = img.width;
		originHeight.value = img.height;
		drawCanvas();
	};
	img.src = src;
};

const resizeImageByWidth = (event) => {
	width.value = event.target.value ? parseInt(event.target.value) : null;
	if (aspectRatio.value && width.value) {
		height.value = Math.round((width.value / originWidth.value) * originHeight.value);
	}
};

const resizeImageByHeight = (event) => {
	height.value = event.target.value ? parseInt(event.target.value) : null;
	if (aspectRatio.value && height.value) {
		width.value = Math.round((height.value / originHeight.value) * originWidth.value);
	}
};

const resizeImage = (event, dimension) => {
	if (!image.value) {
		return;
	}
	if (dimension === 'width') {
		resizeImageByWidth(event);
	} else if (dimension === 'height') {
		resizeImageByHeight(event);
	}
	if (aspectRatio.value && (!event || event.target !== document.activeElement)) {
		const ratio = originWidth.value / originHeight.value;
		if (width.value && !height.value) {
			height.value = Math.round(originWidth.value / ratio);
		} else if (!width.value && height.value) {
			width.value = Math.round(originHeight.value * ratio);
		} else if (width.value / ratio < height.value) {
			width.value = Math.round(originHeight.value * ratio);
		} else {
			height.value = Math.round(originWidth.value / ratio);
		}
	}
	canvas.value.width = width.value ? width.value : null;
	canvas.value.height = height.value ? height.value : null;
	image.value.width = width.value;
	image.value.height = height.value;
	drawCanvas();
};

const drawCanvas = () => {
	setTimeout(() => {
		if (!image.value || !ctx.value) {
			return;
		}
		ctx.value.clearRect(0, 0, width.value, height.value);
		ctx.value.save();
		ctx.value.translate(width.value / 2, height.value / 2);
		ctx.value.drawImage(image.value, -width.value / 2, -height.value / 2, width.value, height.value);
		ctx.value.restore();
		realPoints.value.forEach((point) => {
			drawPoint(point.x, point.y);
		});
		connectPoints();
	}, 100);
};

const canvasClick = (event) => {
	if (!image.value || !ctx.value) {
		return;
	}
	const x = event.offsetX / (width.value / originWidth.value);
	const y = event.offsetY / (height.value / originHeight.value);
	points.value.push({ x, y });
	const point = tranPoint({ x, y });
	drawPoint(point.x, point.y);
};

const drawPoint = (x, y) => {
	ctx.value.beginPath();
	ctx.value.arc(x, y, 4, 0, 2 * Math.PI);
	ctx.value.fillStyle = 'red';
	ctx.value.fill();
	ctx.value.closePath();
	connectPoints();
};

const undoPoint = () => {
	if (points.value.length > 0) {
		points.value.pop();
		drawCanvas();
	}
};

const clearPoints = () => {
	points.value = [];
	drawCanvas();
};

const connectPoints = () => {
	if (realPoints.value.length <= 1) {
		return;
	}
	ctx.value.beginPath();
	ctx.value.moveTo(realPoints.value[0].x, realPoints.value[0].y);
	for (let i = 1; i < realPoints.value.length; i++) {
		ctx.value.lineTo(realPoints.value[i].x, realPoints.value[i].y);
	}
	ctx.value.setLineDash([5, 5]);
	ctx.value.strokeStyle = 'blue';
	ctx.value.lineWidth = 2;
	ctx.value.stroke();
	ctx.value.closePath();
};

const cutImg = () => {
	const tempCanvas = document.createElement('canvas');
	const tempCtx = tempCanvas.getContext('2d');
	if (!image.value || !tempCtx) {
		return;
	}
	tempCanvas.width = image.value.width;
	tempCanvas.height = image.value.height;

	const cutPath = realPoints.value;
	tempCtx.beginPath();
	tempCtx.moveTo(cutPath[0].x, cutPath[0].y);
	for (let i = 1; i < cutPath.length; i++) {
		tempCtx.lineTo(cutPath[i].x, cutPath[i].y);
	}
	tempCtx.closePath();
	tempCtx.clip();

	tempCtx.drawImage(image.value, 0, 0, width.value, height.value);
	const imgData = tempCanvas.toDataURL('image/png');
	currentImage.value = imgData;
	showImg.value = true;
};

const downloadImg = (imgData) => {
	const link = document.createElement('a');
	link.download = 'myImage.png';
	link.href = imgData;
	link.click();
};
</script>

<style lang="scss">
.img-cut-content {
	display: flex;
	width: 100%;
	height: 80vh;

	.canvas-content {
		border: 1px solid #ccc;
		width: 70%;
		display: flex;
		overflow: scroll;
		position: relative;
		background-color: #1e1e1e;
		color: #d4d4d4;
		padding: 20px;
		border-radius: 5px;
	}

	.tools-content {
		border: 1px solid #ccc;
		width: 30%;
		display: flex;
		background: #bdb9b9;

		.tools-content-box {
			margin: auto;
		}
	}

	.points-list {
		margin: 2% 10%;
		height: 30vh;
		width: 80%;
		word-break: break-all;
		padding: 0.5em 1em;
	}

	#example-canvas {
		border: 1px solid #ccc;
		margin: auto;
	}

	.row-item {
		padding: 0.5em;
		display: flex;
		justify-content: space-around;
		border: solid 1px #000;
	}

	.custom-file-upload {
		display: inline-block;
		padding: 10px 20px;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s;

		&:hover {
			background-color: #45a049;
		}
	}

	.input-style {
		display: block;
		width: 4em;
		padding: 10px;
		font-size: 16px;
		border: 2px solid #4caf50;
		border-radius: 5px;
		transition: border-color 0.3s;

		&:focus {
			outline: none;
			border-color: #2196f3;
		}
	}

	.label-style {
		margin: auto;
		font-weight: bold;
	}

	.checkbox-style {
		vertical-align: middle;
	}

	.button-three {
		display: inline-block;
		padding: 10px 20px;
		color: white;
		border: 2px solid #4caf50;
		background-image: linear-gradient(to right, #4caf50, #2196f3);
		border-radius: 5px;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		cursor: pointer;
		overflow: hidden;
		position: relative;
		transition: color 0.3s, background-position 0.3s;

		&:hover {
			color: #fff;
			background-position: right center;
		}
	}

	.button-four {
		display: inline-block;
		padding: 10px 20px;
		background-color: #ff3366;
		color: white;
		border-radius: 5px;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transform: perspective(1000px);
		transition: all 0.3s;

		&:before {
			content: '';
			position: absolute;
			background-color: rgba(255, 255, 255, 0.5);
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			transition: all 0.3s;
			transform: skewX(15deg);
		}

		&:hover:before {
			left: 0;
			transform: skewX(0);
		}
	}

	@keyframes buttonOneShine {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes buttonTwoBreath {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
}
</style>
