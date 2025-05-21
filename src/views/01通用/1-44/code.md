## 3D 饼图

需要注意的几个关键点：

- 扇区的大小由数据值 `value` 决定。
- 可以通过 `internalDiameterRatio` 控制饼图的内径和外径的比例，实现空心的效果。
- 样式 `itemStyle` 中包含颜色和透明度等配置。
- `startValue` 和 `endValue` 用来计算每个扇区的起始和结束角度
