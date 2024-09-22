## 实现长串单词不会被截断

当元素的宽度不足以容纳长串单词时，我们可以使用 CSS 的 word-break 属性来实现不截断长串单词的效果。word-break 属性有以下几种取值：

1. &emsp;&emsp; `normal`：默认值。单词会被截断并换行。
2. &emsp;&emsp; `break-all`：单词会被强制截断，即使在单词内部也会进行截断。
3. &emsp;&emsp; `keep-all`：只有在连续字符内部的断点才会截断，不会在单词内部截断
   <br>

可以将 word-break 设置为 `break-all` 来实现长串单词不被截断的效果
