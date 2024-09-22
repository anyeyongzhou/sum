## 图标交互动画

其中动画的图片其实是使用的精灵图

需要注意的点为，animation 的时间函数需要和精灵图的图片个数对应上

```css
animation: move 0.6s forwards steps(20, end);

@keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 -1280px;
    /* 动画帧-1  1340px-64 */
  }
}
```
