## 前端纯 css 实现-一个卡片列表

主要是 scss 中各个函数的使用

### 通过@each 动态生成 css

```css
/* 通过@each动态生成css */
$cardArr: (
  0: #eea362,
  1: #da2128,
  2: #4889da,
  3: #29c5e8,
  4: #4e71fd,
);
@each $index, $colorBg in $cardArr {
  .card-card-#{$index} {
    background: rgba($colorBg, 0.1);

    .card-icon {
      background: rgba($colorBg, 1);
      box-shadow: 0px 3px 8px rgba($colorBg, 0.3);
    }
  }
}
```

### 通过@mixin @if 方法来判断超出省略行数

```css
/* 文本超出省略 $line行数 */
@mixin textOverEllipsis($line: 1) {
  text-align: justify;
  @if $line==1 {
    // 单行超出省略
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    // 多行超出省略
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: $line;
    -webkit-box-orient: vertical;
  }
}
```
