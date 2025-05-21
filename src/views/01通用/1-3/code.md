# 利用 liner-gradient 实现切角图形

主要是就是使用了两个伪类

伪类使用绝对定位，叠加在元素本身上

伪类的背景颜色使用了 liner-gradient 来实现渐变色

```css
.corner-shape {
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
}

.corner-shape::before,
.corner-shape::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
}

.corner-shape::before {
  background: linear-gradient(
    to top right,
    rgba(255, 0, 0, 0) 0%,
    rgba(255, 0, 0, 1) 100%
  );
  top: 0;
  left: 0;
}

.corner-shape::after {
  background: linear-gradient(
    to bottom left,
    rgba(0, 0, 255, 0) 0%,
    rgba(0, 0, 255, 1) 100%
  );
  bottom: 0;
  right: 0;
}
```
