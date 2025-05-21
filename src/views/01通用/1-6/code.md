# CSS 3D图形
主要使用的css属性为:
&emsp;transform-style;
&emsp;transform-origin;
&emsp;transform;
## 立方体

```css
.cube-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  transform-style: preserve-3d;
  transform-origin: 25px 25px;
  transform: rotateX(-33.5deg) rotateY(45deg);
  // perspective: 100px;
  // perspective-origin: 50% 50%;
  animation: fastspin 6s ease-in-out infinite 2s;
  li {
    position: absolute;
    width: 50px;
    height: 50px;
  }

  .top {
    background-color: rgba(255, 0, 0, 0.8);
    transform: rotateX(90deg) translateZ(25px);
  }

  .bottom {
    background-color: rgba(255, 255, 0, 0.8);
    transform: rotateX(-90deg) translateZ(25px);
  }

  .front {
    background-color: rgba(0, 128, 0, 0.8);
    transform: translateZ(25px);
  }

  .back {
    background-color: rgba(255, 152, 0, 0.8);
    transform: rotateX(-180deg) translateZ(25px);
  }

  .left {
    background-color: rgba(103, 58, 183, 0.8);
    transform: rotateY(-90deg) translateZ(25px);
  }

  .right {
    background-color: rgba(33, 150, 243, 0.8);
    transform: rotateY(90deg) translateZ(25px);
  }
}

```