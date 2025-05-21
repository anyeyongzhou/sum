## 切换 svg 颜色

简单的 svg 图的颜色主要是内部图形的 fill 属性控制的，比如：

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  width="100"
  height="100"
>
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
```

不过我们也可以通过 svg 上的 fill="currentColor"属性来控制内部图形的颜色

```html
<div style="color: blue">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
    fill="currentColor"
    ref="svgRef"
  >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" />
  </svg>
</div>
```

这样 currentColor 会取父节点的颜色值，还可以通过改变 svg 的 color 值来改变内部图形的颜色值

```java
const svgRef = ref(null);
const toggleColor = () => {
  svgRef.value.style.color = "#0f0";
};
```
