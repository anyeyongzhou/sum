## 改变图片的颜色

### 1.传统的兼容性方案

#### (1)使用多个PNG图标
``` css
.icon-red {
  background-image: url('path/to/icon-red.png');
}

.icon-blue {
  background-image: url('path/to/icon-blue.png');
}
```
#### (2)使用CSS Sprites技术
``` css
.icon {
  background: url('path/to/icons-sprite.png') no-repeat;
  width: 16px;
  height: 16px;
}

.icon-red {
  background-position: 0 0;
}

.icon-blue {
  background-position: -16px 0; /* 假设图标宽度为16px */
}

```
#### (3)使用JavaScript动态修改
``` js
var iconElement = document.getElementById('iconElement');
iconElement.style.backgroundImage = 'url(path/to/icon-blue.png)';

```
#### (4)使用HTML5 Canvas
``` js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var img = new Image();
img.onload = function() {
  ctx.drawImage(img, 0, 0);
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = 'rgba(255, 0, 0, 1)'; // 纯红色
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
img.src = 'path/to/icon.png';

```
使用canvas的做法属于大杀器了，毕竟操作像素级别的改变可以解决绝大多数问题


### 2.使用CSS3新特性

#### (1)使用CSS的tint属性
在一些支持该属性的浏览器中，你可以使用-webkit-mask-box-image的tint色值来给图标上色。这是一个实验性的CSS3特性
``` css
.icon {
  -webkit-mask: url('path/to/icon.png') no-repeat;
  -webkit-mask-size: 100%;
  -webkit-mask-box-image: tint(#ff0000); /* 将图标颜色变为红色 */
}

```
#### (2)使用SVG作为轮廓并填充颜色（利用CSS3的mask属性）
对于简单的图标轮廓，可以使用SVG，并通过CSS3的mask属性应用PNG图标作为蒙版。这样可以通过改变SVG的颜色来改变图标颜色
``` css
.icon {
  width: 100px;
  height: 100px;
  -webkit-mask-image: url('path/to/icon.png');
  mask-image: url('path/to/icon.png');
  background-color: red; /* 设置你需要的颜色 */
}

```
#### (3)使用CSS滤镜效果
CSS3引入了滤镜效果，虽然不能直接改变图标的颜色，但可以创建各种视觉效果，从而间接改变图标的外观
``` css
.icon {
  filter: brightness(0) saturate(100%) invert(30%) sepia(100%) saturate(500%) hue-rotate(180deg);
}
```
