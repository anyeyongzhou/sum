## 横向元素居中滚动效果

当用户点击其中一个卡片时，应该实现该卡片自动滚动到容器的中央位置，以提升用户体验和视觉效果。

### 1.获取容器和元素的尺寸

```js
const container = document.querySelector(".container");
const containerRect = container.getBoundingClientRect(); // 获取内容的大小
const elementRect = element.getBoundingClientRect();
```

首先通过 `querySelector` 获取滚动容器和目标元素，然后使用 `getBoundingClientRect` 获取它们的尺寸和位置.

### 2.计算偏移量

```js
const offset = elementRect.left - containerRect.left;
```

目标元素相对于容器的左边缘的偏移量

### 3.计算中心位置

```js
const containerCenter = containerRect.width / 2; // 获取容器中间位置
const elementCenter = elementRect.width / 2; // 获取卡片的中间位置
```

这两行代码分别计算了容器和目标元素的中心位置。

### 4.计算滚动位置

```js
const scrollPos =
  container.scrollLeft + offset - containerCenter + elementCenter;
```

这一步计算出目标元素居中时容器需要滚动到的位置。公式解释如下：

- `container.scrollLeft` 是容器当前的滚动位置。
- `offset` 是目标元素相对于容器的左边缘的偏移量。
- `containerCenter` 和 `elementCenter` 分别是容器和元素的中心位置。

### 5.执行平滑滚动

```js
container.scrollTo({
  left: scrollPos,
  behavior: "smooth",
});
```

最后，使用 `scrollTo` 方法进行平滑滚动。`behavior: 'smooth'` 表示滚动过程是平滑的。
