## 指标统计展示

### 1.底座

3 个 div 经过变换组合而成

```scss
@mixin layerBase {
  position: absolute;
  width: 90%;
  height: 40px;
  background: linear-gradient(to bottom, rgba(#0d2857, 0.8), rgba(#0d2857, 1));
  border-radius: 4px;
  border: 1px solid #0b4f81;
}
// 底座效果 css
.layer-base-3 {
  @include layerBase;
  top: 40px;
  z-index: 1;
  opacity: 0.9;
  transform: rotateX(30deg);
}
.layer-base-2 {
  @include layerBase;
  width: 80%;
  top: 50px;
  left: 5%;
  z-index: 1;
  opacity: 0.4;
  transform: rotateX(30deg);
}
.layer-base-1 {
  @include layerBase;
  width: 70%;
  top: 60px;
  left: 10%;
  z-index: 1;
  opacity: 0.2;
  transform: rotateX(30deg);
}
```

### 2.数据项的变化

主要是使用 transform 的 rotate 来实现倾斜的

```scss
// 统计项css
.list-item-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 170px;
  height: 60px;
  cursor: pointer;
  transition: 200ms linear;
  &:hover {
    top: -10px;
    * {
      transform: rotateX(0deg) rotateY(0deg) !important;
      left: 0px !important;
    }
    .layer-2 {
      background: #39ffff !important;
      animation-play-state: paused !important;
    }
    .layer-icon {
      * {
        fill: #021129 !important;
      }
    }
  }
  .list-item-icon {
    position: relative;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    margin-right: 20px;
    // 图标
    .layer-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 5;
      left: 6px;
      top: -1px;
      transform: rotateX(20deg) rotateY(15deg);
      * {
        fill: #87fcff;
        filter: drop-shadow(0 0 8px rgba(#26c1ff, 0.8)); // 不规则形状加阴影
      }
    }
    // 图标闪亮动画
    @keyframes iconOpacity {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
    .layer-1 {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 1px solid #0967e3;
      border-radius: 100%;
      filter: blur(1px);
      background: rgba(#0474f2, 0.4);
      transform: rotateX(20deg) rotateY(15deg);
      animation: iconOpacity 1s linear infinite;
    }
    // size动画
    @keyframes iconSize {
      0% {
        width: 100%;
        height: 100%;
      }
      50% {
        width: 95%;
        height: 92%;
      }
      100% {
        width: 100%;
        height: 100%;
      }
    }
    .layer-2 {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid #39ffff;
      border-radius: 100%;
      background: rgba(#193f66, 0.9);
      transform: rotateX(20deg) rotateY(15deg);
      animation: iconSize 1s linear infinite;
      left: 5px;
      top: -2px;
    }
  }
  .list-item-info {
    width: 0px;
    flex-grow: 1;
    p,
    h1 {
      margin: 0px;
    }
    p {
      font-size: 14px;
      color: #83c9ff;
    }
    h1 {
      font-size: 18px;
      color: #e7ffff;
      padding-top: 2px;
    }
  }
}
```
