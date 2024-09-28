## 输入框长度变化

借助 el-select`prefix`的插槽，再把`prefix`的定位改成`relative`，并且把`input`的定位改成绝对定位`absolute`。最后将`prefix`的内容改成我们的选项内容

还有一些注意点：

1. 将`prefix`的内容调整到和`select`框中的内容位置`重叠`，并且将它`隐藏`

2. 给.el-select 的 width auto（覆盖默认的宽度），同样的 div 加一个样式，给一个最小宽度

3. select 的图标需要调整对齐
