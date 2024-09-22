## 仪表盘

仪表盘有几个动画组成

&nbsp;&nbsp;最底层的虚线圆圈不动

&nbsp;&nbsp;第二个上下运动

&nbsp;&nbsp;第三个大小不断变化，且透明度变化

&nbsp;&nbsp;第四个自己旋转

```css
// 动画-顺时针旋转
@keyframes animationRotateZ {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
// 动画-逆时针旋转
@keyframes animationRotateF {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
// 动画-3D上下移动
@keyframes animationMove {
  0% {
    top: 20px;
  }
  50% {
    top: -30px;
  }
  100% {
    top: 20px;
  }
}
// 动画-透明度变化
@keyframes animationOpacity {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
// 动画-透明度&圆半径变化
@keyframes animationSize {
  0% {
    opacity: 1;
    width: 90px;
    height: 90px;
  }
  50% {
    opacity: 0.6;
    width: 60px;
    height: 60px;
  }
  100% {
    opacity: 1;
    width: 90px;
    height: 90px;
  }
}
```
