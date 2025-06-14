# 主题色切换方法

## 1.初始化 themeIndex

```css
themeindex: "light";
```

## 2.html 标签添加:data-theme="themeIndex"

```html
<div class="easy-layout-body" :data-theme="themeIndex">
  <!-- 面板内容 -->
</div>
```

## 3.黑白主题样式定义

```css
// 浅色主题
.easy-layout-body[data-theme="light"] {
  --background: rgba(237, 241, 244, 0.8);
  --text-color: #07080a;
  --hint-color: #7b7f82;
  --card-border-color: rgba(255, 255, 255, 0.5);
}
// 黑色主题
.easy-layout-body[data-theme="dark"] {
  --background: rgba(20, 26, 41, 0.6);
  --text-color: #e2e1e7;
  --hint-color: #939397;
  --card-border-color: rgba(42, 54, 73, 0.5);
}
```

## 4.切换主题的点击事件

切换的时候给`themeIndex`赋值

```html
<a v-show="themeIndex=='dark'" @click="themeIndex='light'">浅色主题</a>
<a v-show="themeIndex=='light'" @click="themeIndex='dark'">深色主题</a>
```

## 5.通过 localStorage 存储用户的主题

这个函数允许用户通过改变 `<body>` 元素的类名来切换网页的主题，同时利用 `localStorage` 存储用户的主题偏好，以便在用户重新访问网站时能够保持相同的主题。

```js
// 切换皮肤
changeTheme(type) {
  const currentThemeColor= localStorage.getItem('data-theme') ? localStorage.getItem('data-theme') : 'themeIndex';
  if (currentThemeColor!== type) {
    document.body.className = type;
    localStorage.setItem('data-theme',type)
  }
}

/** watch 周期函数 */
watch: {
    // 监听 themeIndex 的变化
    themeIndex(newVal,oldVal){
      document.documentElement.setAttribute('data-theme',newVal);
    }
}

```
