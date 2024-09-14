# 1.单行文本溢出

```css
.du{
    width:200px;
    height:30px;//固定宽高
    white-space:nowrap;//文本不换行
    overflow:hidden;//溢出隐藏
    text-overflow:ellipsis;//文本溢出显示符号：省略号
}
```

注意点:  
只对块级元素起效果(设置了display:flex,后面的三个小点就会不出现)  
块级元素本身要有要有一个宽度(最小宽度和最大宽度都可以)

# 2.多行文本溢出

多行文本溢出官方还没有出标准，但是webkit内核的浏览器中是可以做到的

```css
.div{
    width:200px;
    height:150px;
    line-height:30px;//高度除以行高就可以设置几行文本了
    overflow:hidden;//溢出隐藏
    display:-webkit-box;
    -webkit-line-clamp:5;//设置文本的行数
    -webkit-box-orient:vertical;//文本排列的方向
}
```

但是离开了webkit内核的浏览器，就没有省略号了，这时候就需要js来处理了
## （1）利用伪类

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>多行省略号</title>
  <style>
    .content {
      display: inline-block;
      width: 400px;
      height: 56px;
      line-height: 28px;
      margin: 50px 0 0 50px;
      border: 1px solid red
      overflow: hidden;
    }
    .ellipsis::after{
        content: "...";
        display: inline;
    }
  </style>
</head>
<body>
  <div class="app">
    <span class="content">你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说.
    </span>
    <span class="ellipsis"></span>
  </div>
</body>
</html>
```

## （2）利用定位和padding-right
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>desktop demo</title>
  <style>
    .content {
      width: 400px;
      height: 56px;
      line-height: 28px;
      margin: 50px 0 0 50px;
      border: 1px solid red;
      overflow: hidden;
      padding-right: 12px; /* 留出省略号位置 */
      position: relative;
    }
    .ellipsis{
        position: absolute;
        right:10px;
        bottom: 0;
    }
  </style>
</head>
<body>
  <div class="content">你问我为何时常沉默，有的人无话可说，有的话无人可说.你问我为何时常沉默，有的人无话可说，有的话无人可说.
    <span class="ellipsis">...</span>
  </div>
</body>
</html>
```