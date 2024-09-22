## 复选框交互展示效果

交互效果是通过数据汇总 check 属性的 true 或 false 来控制样式 ui-item-check 来控制的

中间有个有意思的 css 效果，右上角的小三角框如何实现，答案是 border

```css
.icon-check {
  position: absolute;
  width: 0px;
  height: 0px;
  top: 2px;
  right: 2px;
  border-top: 20px solid $primary-color;
  border-left: 25px solid transparent;
  border-radius: 5px 3px 5px 0px;
  &:after {
    content: "✓";
    position: relative;
    color: #fff;
    font-size: 12px;
    left: -12px;
    top: -26px;
  }
}
```
