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

<script>
import previewImg from './components/previewImg.vue';
export default {
	components: { previewImg },
	name: 'imgCut',
	comments: {
		previewImg,
	},
	data() {
		return {
			image: null,
			width: null,
			height: null,
			aspectRatio: true, // 默认按比例缩放
			ctx: null, // canvas 上下文对象
			points: [], // 存储点击位置的坐标
			srcLink: '',
			currentImage: '',
			showImg: false,
			originHeight: 0,
			originWidth: 0,
		};
	},
	computed: {
		pointsStr() {
			return JSON.stringify(this.realPoints);
		},
		realPoints() {
			const points = [];
			this.points.forEach((point) => {
				points.push(this.tranPoint(point));
			});
			return points;
		},
	},
	mounted() {
		this.ctx = this.$refs.canvas.getContext('2d');
		const that = this;
		document.addEventListener('keydown', (event) => {
			if (event.ctrlKey && event.key === 'z') {
				event.preventDefault();
				that.undoPoint();
			}
		});
	},
	methods: {
		tranPoint(point) {
			let { x, y } = point;
			x = x * (this.width / this.originWidth);
			y = y * (this.height / this.originHeight);
			return { x, y };
		},
		handleFileUpload(e) {
			let file = e.target.files[0];
			if (!file) return;
			this.srcLink = '';
			const reader = new FileReader();
			reader.onload = (event) => {
				const img = new Image();
				img.onload = () => {
					this.image = img;
					this.width = img.width;
					this.height = img.height;
					this.originWidth = img.width;
					this.originHeight = img.height;
					this.drawCanvas();
				};
				img.src = event.target.result;
			};
			reader.readAsDataURL(file);
		},
		getImageBase64FromURL(url, callback) {
			return new Promise((resove) => {
				const xhr = new XMLHttpRequest();
				xhr.onload = function () {
					const reader = new FileReader();
					reader.onloadend = function () {
						resove(reader.result);
					};
					reader.readAsDataURL(xhr.response);
				};
				xhr.open('GET', url);
				xhr.responseType = 'blob';
				xhr.send();
			});
		},
		async inputSrc() {
			const src = await this.getImageBase64FromURL(this.srcLink);
			const img = new Image();
			img.onload = () => {
				this.image = img;
				this.width = img.width;
				this.height = img.height;
				this.drawCanvas();
			};
			img.src = src;
		},
		resizeImageByWidth(event) {
			this.width = event.target.value ? parseInt(event.target.value) : null;
			if (this.aspectRatio && this.width) {
				this.height = Math.round((this.width / this.originWidth) * this.originHeight);
			}
		},
		resizeImageByHeight(event) {
			this.height = event.target.value ? parseInt(event.target.value) : null;
			if (this.aspectRatio && this.height) {
				this.width = Math.round((this.height / this.originHeight) * this.originWidth);
			}
		},
		resizeImage(event, dimension) {
			if (!this.image) {
				return;
			}
			if (dimension === 'width') {
				this.resizeImageByWidth(event);
			} else if (dimension === 'height') {
				this.resizeImageByHeight(event);
			}
			if (this.aspectRatio && (!event || event.target !== document.activeElement)) {
				const aspectRatio = this.originWidth / this.originHeight;
				if (this.width && !this.height) {
					this.height = Math.round(this.originWidth / aspectRatio);
				} else if (!this.width && this.height) {
					this.width = Math.round(this.originHeight * aspectRatio);
				} else if (this.width / aspectRatio < this.height) {
					this.width = Math.round(this.originHeight * aspectRatio);
				} else {
					this.height = Math.round(this.originWidth / aspectRatio);
				}
			}
			this.$refs.canvas.width = this.width ? this.width : null;
			this.$refs.canvas.height = this.height ? this.height : null;
			this.image.width = this.width;
			this.image.height = this.height;
			this.drawCanvas();
		},
		drawCanvas() {
			setTimeout(() => {
				if (!this.image || !this.ctx) {
					return;
				}
				this.ctx.clearRect(0, 0, this.width, this.height);
				this.ctx.save();
				this.ctx.translate(this.width / 2, this.height / 2);
				this.ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
				this.ctx.restore();
				this.realPoints.forEach((point) => {
					this.drawPoint(point.x, point.y);
				});
				this.connectPoints(); // 每次绘制canvas后连接所有点
			}, 100);
		},
		canvasClick(event) {
			if (!this.image || !this.ctx) {
				return;
			}
			const x = event.offsetX / (this.width / this.originWidth);
			const y = event.offsetY / (this.height / this.originHeight);
			this.points.push({ x, y }); // 将坐标添加到数组中
			const point = this.tranPoint({ x, y });
			this.drawPoint(point.x, point.y);
		},
		drawPoint(x, y) {
			// 绘制一个小圆点
			this.ctx.beginPath();
			this.ctx.arc(x, y, 4, 0, 2 * Math.PI);
			this.ctx.fillStyle = 'red';
			this.ctx.fill();
			this.ctx.closePath();
			this.connectPoints(); // 每次点击后连接所有点
		},
		undoPoint() {
			if (this.points.length > 0) {
				this.points.pop();
				this.drawCanvas();
			}
		},
		clearPoints() {
			this.points = [];
			this.drawCanvas();
		},
		connectPoints() {
			if (this.realPoints.length <= 1) {
				return;
			}
			this.ctx.beginPath();
			this.ctx.moveTo(this.realPoints[0].x, this.realPoints[0].y);
			for (let i = 1; i < this.realPoints.length; i++) {
				this.ctx.lineTo(this.realPoints[i].x, this.realPoints[i].y);
			}
			this.ctx.setLineDash([5, 5]);
			this.ctx.strokeStyle = 'blue';
			this.ctx.lineWidth = 2;
			this.ctx.stroke();
			this.ctx.closePath();
		},
		cutImg() {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!this.image || !ctx) {
				return;
			}
			const image = this.image;
			canvas.width = image.width;
			canvas.height = image.height;

			// 定义剪切路径
			const cutPath = this.realPoints;
			ctx.beginPath();
			ctx.moveTo(cutPath[0].x, cutPath[0].y);
			for (let i = 1; i < cutPath.length; i++) {
				ctx.lineTo(cutPath[i].x, cutPath[i].y);
			}
			ctx.closePath();
			ctx.clip();

			// 绘制图片
			ctx.drawImage(image, 0, 0, this.width, this.height);
			// 将Canvas元素转换为PNG图像
			const imgData = canvas.toDataURL('image/png');
			this.currentImage = imgData;
			this.showImg = true;
		},
		downloadImg(imgData) {
			// 创建一个链接元素，将图像数据作为URL设置给它
			const link = document.createElement('a');
			link.download = 'myImage.png';
			link.href = imgData;

			// 触发链接的下载事件
			link.click();
		},
	},
};
</script>

<style>
.img-cut-content {
	display: flex;
	width: 100%;
	height: 80vh;
}
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
}
.tools-content-box {
	margin: auto;
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
.row-item-input {
	width: 4em;
}
.button-one {
	display: inline-block;
	padding: 10px 20px;
	background-color: #00aaff;
	color: white;
	border-radius: 5px;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	cursor: pointer;
	box-shadow: 0 0 10px #00aaff;
	position: relative;
}

.button-one:before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: linear-gradient(45deg, #ffffff 10%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%);
	animation: buttonOneShine 2s linear infinite;
}

@keyframes buttonOneShine {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
.button-two {
	display: inline-block;
	padding: 10px 20px;
	background-color: #ff5500;
	color: white;
	border-radius: 5px;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	cursor: pointer;
	box-shadow: 0 0 10px #ff5500;
	position: relative;
	animation: buttonTwoBreath 3s ease-in-out infinite;
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
}

.button-three:hover {
	color: #fff;
	background-position: right center;
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
}

.button-four:before {
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

.button-four:hover:before {
	left: 0;
	transform: skewX(0);
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
}

.custom-file-upload:hover {
	background-color: #45a049;
}
.input-style {
	display: block;
	width: 4em;
	padding: 10px;
	font-size: 16px;
	border: 2px solid #4caf50;
	border-radius: 5px;
	transition: border-color 0.3s;
}

.input-style:focus {
	outline: none;
	border-color: #2196f3;
}
.label-style {
	margin: auto;
	font-weight: bold;
}

.checkbox-style {
	vertical-align: middle;
}
</style>
