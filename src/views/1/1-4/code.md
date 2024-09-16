# 利用 text-shadow 实现文字发光

主要是就是使用 text-shadow 属性

```css
.glowing-text {
  font-size: 48px; /* 字体大小 */
  color: transparent; /* 文字颜色透明 */
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), /* 外层发光 */ 0 0 10px rgba(255, 255, 255, 0.7),
    /* 中层发光 */ 0 0 20px rgba(255, 0, 0, 1), /* 红色发光 */ 0 0 30px rgba(255, 0, 0, 1); /* 红色发光 */
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 0, 0, 1);
}
```
