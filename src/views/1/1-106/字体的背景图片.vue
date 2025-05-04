<template>
  <div class="textBg">字体也要有背景图片</div>
</template>

<script setup>
// 无需额外的脚本逻辑
</script>

<style lang="scss" scoped>
$text-color: rgba(78, 75, 75, 0.1);
$background-image: url(./bg.png);

.textBg {
  height: 100px;
  width: 710px;
  line-height: 100px;
  font-size: 40px;
  font-weight: 700;
  color: $text-color;
  background-image: $background-image;
  background-size: 28% 140%;
  background-clip: text;
  -webkit-background-clip: text;
  text-transform: uppercase;
}
</style>
