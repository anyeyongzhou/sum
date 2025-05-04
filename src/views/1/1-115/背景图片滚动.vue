<template>
  <div class="home">
    <div class="banner">
      <div class="bg">
        <div class="bg1"></div>
        <div class="bg2"></div>
      </div>
      <div class="box">
        <div class="install">
          <h1>定制我的游戏电脑</h1>
          <p>专为游戏玩家提供硬件服务的平台</p>
          <div class="info">
            <span>1&nbsp; 选择游戏</span>
            <span>2&nbsp; 选择预算</span>
            <span>3&nbsp; 完成打造</span>
          </div>
          <button class="btn-home">
            <span>开始我的定制</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无需额外的脚本逻辑
</script>

<style lang="scss" scoped>
$primary-color: #fa5e2e;
$background-color: #000;
$border-color: #66666d;
$text-color: #fff;
$secondary-text-color: #99999b;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home {
  .banner {
    height: 650px;
    border-bottom: 1px solid $border-color;
    position: relative;
    overflow: hidden;
    perspective: 500px;
    transform-style: preserve-3d;

    .bg {
      min-width: 2200px;
      height: 1432px;
      z-index: 0;
      position: absolute;
      left: -22%;
      right: -22%;
      top: -22%;
      bottom: -22%;
      transform: rotateX(15deg);
      transform-origin: center;
      vertical-align: middle;

      .bg1 {
        height: 916px;
        background: 50% no-repeat;
        background-size: 100% 100%;
        background-image: url(./img/photo-1.jpg);
        animation: animate2 30s linear infinite;
      }

      .bg2 {
        height: 916px;
        background: 50% no-repeat;
        background-image: url(./img/photo-2.jpg);
        background-size: 100% 100%;
        animation: animate2 30s linear infinite;
        opacity: 0.5;
      }
    }

    &:before {
      content: "";
      position: absolute;
      right: 0;
      top: -2%;
      bottom: 0;
      left: 0;
      background-size: 105% 105%;
      z-index: 1;
      background-color: $background-color;
      opacity: 0.7;
    }

    &:after {
      content: "";
      position: absolute;
      right: 4%;
      top: 38%;
      bottom: 0;
      width: 1266px;
      height: 337px;
      background: url(./img/background.png) no-repeat 50%;
      z-index: 1;
    }

    .box {
      display: flex;
      justify-content: space-between;
      max-width: 1440px;
      height: 100%;
      margin: auto;
      z-index: 3;

      .install {
        width: 580px;
        height: 210px;
        border-bottom: 1px solid $border-color;
        border-left: 1px solid $border-color;
        border-right: 1px solid $border-color;
        z-index: 2;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        &:before {
          content: "";
          width: 20%;
          border-top: 1px solid $border-color;
          position: absolute;
          left: 0;
          top: 0;
        }

        &:after {
          content: "";
          width: 20%;
          border-top: 1px solid $border-color;
          position: absolute;
          right: 0;
          top: 0;
        }

        h1 {
          color: $text-color;
          font-size: 34px;
          letter-spacing: 0.06em;
          font-weight: 400;
          white-space: nowrap;
          margin: auto;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        p {
          padding-top: 40px;
          font-size: 18px;
          color: $secondary-text-color;
          text-align: center;
        }

        .info {
          color: $text-color;
          display: flex;
          justify-content: space-around;
          margin: 40px 0;

          span {
            font-size: 18px;
          }
        }

        .btn-home {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 250px;
          font-size: 16px;
          transform: translate(-50%, 50%);
          letter-spacing: 0.02em;
          overflow: hidden;
          color: $text-color;
          background-color: $primary-color;
          border: 1px solid $primary-color;
          display: inline-block;
          box-sizing: border-box;
          height: 44px;
          margin: 0;
          padding: 0;
          line-height: 1.2;
          text-align: center;
          border-radius: 2px;
          cursor: pointer;
          transition: opacity 0.2s;
          -webkit-appearance: none;
        }
      }
    }
  }
}

@keyframes animate2 {
  0% {
    transform: translateY(0);
  }
  to {
    transform: translateY(-916px);
  }
}
</style>
