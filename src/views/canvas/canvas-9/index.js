const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", {
  willReadFrequently: true,
});

function initCanvasSize() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
}

initCanvasSize();

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min));
}

class Partcle {
  constructor() {
    const r = Math.min(canvas.width, canvas.height) / 2;
    const cx = canvas.width / 2,
      cy = canvas.height / 2;
    const rad = (getRandom(0, 360) * Math.PI) / 180;
    this.x = cx + r * Math.cos(rad);
    this.y = cy + r * Math.sin(rad);
    this.size = getRandom(2 * devicePixelRatio, 7 * devicePixelRatio);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "#5445544d";
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  moveTo(tx, ty) {
    const duration = 500;
    const sx = this.x;
    const sy = this.y;
    const xSpeed = (tx - sx) / duration;
    const ySpeed = (ty - sy) / duration;
    const startTime = Date.now();
    const _move = () => {
      const t = Date.now() - startTime;
      const x = sx + xSpeed * t;
      const y = sy + ySpeed * t;
      this.x = x;
      this.y = y;
      if (t >= duration) {
        this.x = tx;
        this.y = ty;
        return;
      }
      requestAnimationFrame(_move);
    };

    _move();
  }
}

const partciles = [];

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// for (let index = 0; index < 1000; index++) {
//   partciles.push(new Partcle());
// }

let text = null;
let textWidth = null;

function draw() {
  clear();
  updata();
  partciles.forEach(p => p.draw());
  requestAnimationFrame(draw);
}

draw();

function getText() {
  return new Date().toTimeString().substring(0, 8);
}

function updata() {
  const newText = getText();
  if (newText === text) {
    return;
  }
  clear();
  text = newText;
  //画文本
  const { width, height } = canvas;
  ctx.fillStyle = "#000";
  ctx.textBaseline = "middle";
  ctx.font = `${140 * devicePixelRatio}px 'DS-Digital', sans-serif`;
  if (!textWidth) {
    textWidth = ctx.measureText(text).width;
  }
  ctx.fillText(text, (width - textWidth) / 2, height / 2);
  const points = getPoints();
  clear();
  for (let i = 0; i < points.length; i++) {
    let p = partciles[i];
    if (!p) {
      p = new Partcle();
      partciles.push(p);
    }
    const [x, y] = points[i];
    p.moveTo(x, y);
  }
  if (points.length < partciles.length) {
    partciles.splice(points.length);
  }
}

function getPoints() {
  const { width, height, data } = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const points = [];
  const gap = 3;

  for (let i = 0; i < width; i += gap) {
    for (let j = 0; j < height; j += gap) {
      const index = (i + j * width) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];
      //寻找黑色的像素点
      if (r === 0 && g === 0 && b === 0 && a === 255) {
        points.push([i, j]);
      }
    }
  }

  return points;
}
