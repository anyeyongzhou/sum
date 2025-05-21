<template>
	<div class="home"></div>
</template>

<script setup>
class Ball {
	constructor({ origin, speed, angle, color, context }) {
		this.origin = origin; // 起始坐标
		this.position = { ...this.origin }; // 运动轨迹坐标
		this.color = color; // 填充颜色
		this.speed = speed; // 速率
		this.angle = angle; // 角度
		this.context = context;
		this.renderCount = 0;
	}

	draw() {
		// 抛物线运动轨迹坐标计算
		this.position.x = Math.sin(this.angle) * this.speed + this.position.x;
		this.position.y = Math.cos(this.angle) * this.speed + this.position.y + this.renderCount * 0.3;
		// 绘制小球
		this.context.fillStyle = this.color;
		this.context.beginPath();
		this.context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2);
		this.context.fill();
		this.renderCount++;
	}
}

class Boom {
	constructor({ origin, count = 10, context, area }) {
		this.origin = origin; // 起始坐标
		this.count = count; // 小球数量
		this.context = context;
		this.area = area; // 画布的大小
		this.stop = false; // 运动状态
		this.balls = [];
	}
	// 初始化创建指定数量随机小球
	init() {
		for (let i = 0; i < this.count; i++) {
			const ball = new Ball({
				origin: { x: this.origin.x, y: this.origin.y },
				context: this.context,
				color: randomColor(),
				angle: randomRange(Math.PI - 1, Math.PI + 1),
				speed: randomRange(1, 6),
			});
			this.balls.push(ball);
		}
	}
	draw() {
		this.balls.forEach((ball, index) => {
			// 如果超出画布
			if (ball.position.x > this.area.width || ball.position.y > this.area.height) {
				return this.balls.splice(index, 1);
			}
			ball.draw();
		});
		if (this.balls.length == 0) {
			this.stop = true;
		}
	}
}

function randomArray(range) {
	const length = range.length;
	const randomIndex = Math.floor(length * Math.random());
	return range[randomIndex];
}

function randomColor() {
	const range = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	return (
		'#' +
		randomArray(range) +
		randomArray(range) +
		randomArray(range) +
		randomArray(range) +
		randomArray(range) +
		randomArray(range)
	);
}

function randomRange(start, end) {
	return (end - start) * Math.random() + start;
}

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
document.body.append(canvas);

const booms = [];
let running = false;

function handleMouseDown(e) {
	const boom = new Boom({
		origin: { x: e.clientX, y: e.clientY },
		count: 20,
		context: ctx,
		area: { width: window.innerWidth, height: window.innerHeight },
	});
	boom.init();
	booms.push(boom);
	// 执行运动
	const run = () => {
		running = true;
		if (booms.length == 0) {
			return (running = false);
		}
		requestAnimationFrame(run.bind(this));
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		booms.forEach((item, index) => {
			if (item.stop) {
				return booms.splice(index, 1);
			}
			item.draw();
		});
	};
	running || run();
}

onMounted(() => {
	window.addEventListener('mousedown', handleMouseDown.bind(this));
});
</script>

<style lang="scss" scoped>
.home {
	height: 100%;
	width: 100%;
	background-color: #fff;
	position: relative;
	overflow-y: scroll;
}
</style>
