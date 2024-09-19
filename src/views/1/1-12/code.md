# 眼镜跟随转动的小黄人

只要搞懂眼镜随着鼠标如何转动的计算就没问题:

```javascript
const updateEye = (eyeRef) => {
  const rect = eyeRef.getBoundingClientRect(); // 获取眼睛的边界矩形
  const eyeCenterX = rect.left + eyeRef.clientLeft / 2; // 计算眼睛中心的 X 坐标
  const eyeCenterY = rect.top + eyeRef.clientTop / 2; // 计算眼睛中心的 Y 坐标
  const angle = Math.atan2(event.pageX - eyeCenterX, event.pageY - eyeCenterY); // 计算与鼠标之间的角度
  const rotation = ((angle * 180) / Math.PI) * -1 - 90; // 将角度转换为度，并调整起始角度
  eyeRef.style.transform = `rotate(${rotation}deg)`; // 应用旋转样式
};
```

&emsp;&emsp;getBoundingClientRect()==>提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息

&emsp;&emsp;clientLeft、clientTop==>元素节点左边框（left border）的宽度（单位像素），不包括左侧的padding和margin;网页元素顶部边框的宽度（单位像素）

