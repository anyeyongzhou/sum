# 问题原因

flex: 1 是 CSS 中用于弹性布局（Flexbox）的一个简写属性，用于在容器内分配多余空间或者收缩元素以适应容器大小。它综合了 **flex-grow**、**flex-shrink** 和 **flex-basis** 三个属性的值

当使用 flex: 1 时，你实际上是在设置：

- &emsp;&emsp;`flex-grow`: 1：元素会尝试占据多余的空间。
- &emsp;&emsp;`flex-shrink`: 1：元素在必要时会缩小。
- &emsp;&emsp;`flex-basis: 0%`：元素的默认大小是 0，这意味着它会完全依赖 flex-grow 来分配空间

flex 属性只是**对父元素的多余空间按什么比例去分配**，并不是按我们的理解意思为**固定分配**的方式，不会对子元素原本实际内容宽度进行处理

<br/>

浏览器默认为 flex 容器的子元素设置了 “**min-width: auto;min-height: auto**”，这意味着子元素的最小宽度和高度不能小于其内容的宽度和高度。

我们设置为**min-width: 0**，覆盖掉了其默认行为，即使其内容为空或者宽度很小，也可以使得 flex 子元素在 flex 容器中正确地布局
